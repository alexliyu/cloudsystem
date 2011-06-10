#!/usr/bin/env python
import logging
import os
import Queue
import sys
import time
import threading
from logging.handlers import RotatingFileHandler
from optparse import OptionParser

if __name__ == '__main__':
    if not 'DJANGO_SETTINGS_MODULE' in os.environ:
        print 'DJANGO_SETTINGS_MODULE environment variable not set, exiting'
        sys.exit(2)

from django.db.models.loading import get_apps

# avoid importing these if the environment variable is not set
from djutils.daemon import Daemon
from djutils.queue import autodiscover
from djutils.queue.exceptions import QueueException
from djutils.queue.queue import invoker, queue_name, registry


class QueueDaemon(Daemon):
    """
    Queue consumer that runs as a daemon.  Example usage::
    
    To start the consumer (note you must export the settings module):
    
    # export PYTHONPATH=/path/to/code:$PYTHONPATH
    # export DJANGO_SETTINGS_MODULE=mysite.settings
    # python consumer.py start
    
    To stop the consumer:
    
    # python consumer.py stop
    """
    
    def __init__(self, options, *args, **kwargs):
        self.queue_name = queue_name
        
        self.pidfile = options.pidfile or '/var/run/djutils-%s.pid' % self.queue_name
        self.logfile = options.logfile or '/var/log/djutils-%s.log' % self.queue_name
        
        self.initialize_options(options)
        
        # Daemon class takes pidfile as first argument
        super(QueueDaemon, self).__init__(self.pidfile, *args, **kwargs)
    
    def initialize_options(self, options):
        self.default_delay = float(options.delay)
        self.max_delay = float(options.max_delay)
        self.backoff_factor = float(options.backoff)
        self.threads = int(options.threads)
        self.periodic_commands = not options.no_periodic

        if self.backoff_factor < 1.0:
            raise ValueError, 'backoff must be greater than or equal to 1'
        
        if self.threads < 1:
            raise ValueError, 'threads must be at least 1'
         
        # initialize delay
        self.delay = self.default_delay
        
        self.logger = self.get_logger()
    
    def get_logger(self):
        log = logging.getLogger('djutils.queue.logger')
        log.setLevel(logging.DEBUG)
        handler = RotatingFileHandler(self.logfile, maxBytes=1024 * 1024, backupCount=3)
        handler.setFormatter(logging.Formatter("%(asctime)s - %(name)s - %(message)s"))
        log.addHandler(handler)
        return log
    
    def start_periodic_command_thread(self):
        periodic_command_thread = threading.Thread(
            target=self.enqueue_periodic_commands
        )
        periodic_command_thread.daemon = True
        
        self.logger.info('Starting periodic command execution thread')
        periodic_command_thread.start()
        
        return periodic_command_thread
    
    def _queue_worker(self):
        """
        A worker thread that will chew on dequeued messages
        """
        while 1:
            message = self._queue.get()
            self._queue.task_done()
            
            try:
                command = registry.get_command_for_message(message)
                command.execute()
            except QueueException:
                # log error
                self.logger.warn('queue exception raised', exc_info=1)
            except:
                self.logger.error('exception encountered, exiting thread', exc_info=1)
                self._error.set()
    
    def initialize_threads(self):
        self._queue = Queue.Queue()
        self._error = threading.Event()
        self._threads = []
        
        for i in range(self.threads):
            thread = threading.Thread(target=self._queue_worker)
            thread.daemon = True
            self._threads.append(thread)

    def start_workers(self):
        [t.start() for t in self._threads]
    
    def run(self):
        """
        Entry-point of the daemon -- in what might be a premature optimization,
        I've chosen to keep the code paths separate depending on whether the
        periodic command thread is started.
        """
        self.logger.info('Initializing daemon with options:\npidfile: %s\nlogfile: %s\ndelay: %s\nbackoff: %s\nthreads: %s' % (
            self.pidfile, self.logfile, self.delay, self.backoff_factor, self.threads))

        self.logger.info('Loaded classes:\n%s' % '\n'.join([
            klass for klass in registry._registry
        ]))

        self.initialize_threads()
        self.start_workers()
        
        try:
            if self.periodic_commands:
                self.run_with_periodic_commands()
            else:
                self.run_only_queue()
        except:
            self.logger.error('error', exc_info=1)
    
    def run_with_periodic_commands(self):
        """
        Pull messages from the queue so long as:
        - no unhandled exceptions when dequeue-ing and processing messages
        - no unhandled exceptions while enqueue-ing periodic commands
        """
        t = self.start_periodic_command_thread()
        
        while t.is_alive():
            self.process_message()
        
        self.logger.error('Periodic command thread died, shutting down')
    
    def run_only_queue(self):
        """
        Pull messages from the queue until shut down or an unhandled exception
        is encountered while dequeue-ing and processing messages
        """
        while 1:
            self.process_message()
    
    def process_message(self):
        if self._error.is_set():
            raise Exception, 'Error raised by worker thread, shutting down'
        
        message = invoker.read()
        
        if message:
            self.logger.info('Processing: %s' % message)
            self.delay = self.default_delay
            self._queue.put(message)
            self._queue.join()
        else:
            if self.delay > self.max_delay:
                self.delay = self.max_delay
            
            self.logger.info('No messages, sleeping for: %s' % self.delay)
            
            time.sleep(self.delay)
            self.delay *= self.backoff_factor
    
    def enqueue_periodic_commands(self):
        while True:
            start = time.time()
            self.logger.info('Enqueueing periodic commands')
            
            try:
                invoker.enqueue_periodic_commands()
            except:
                self.logger.error('periodic command error, exiting', exc_info=1)
                raise
            
            end = time.time()
            time.sleep(60 - (end - start))

def get_parser():
    parser = OptionParser(usage='%prog [options]')
    parser.add_option('--foreground', '-f', dest='foreground', action='store_true',
        default=False, help='Run in foreground')
    parser.add_option('--delay', '-d', dest='delay', default=0.1,
        help='Default interval between invoking, in seconds - default = 0.1')
    parser.add_option('--backoff', '-b', dest='backoff', default=1.15,
        help='Backoff factor when no message found - default = 1.15')
    parser.add_option('--max', '-m', dest='max_delay', default=60,
        help='Maximum time to wait, in seconds - default = 60')
    parser.add_option('--pidfile', '-p', dest='pidfile', default='',
        help='Destination for pid file')
    parser.add_option('--logfile', '-l', dest='logfile', default='',
        help='Destination for log file')
    parser.add_option('--no-periodic', '-n', dest='no_periodic', action='store_true',
        default=False, help='Do not enqueue periodic commands')
    parser.add_option('--threads', '-t', dest='threads', default=1,
        help='Number of worker threads, default = 1')
    return parser

if __name__ == '__main__':
    get_apps() # populate app cache

    parser = get_parser()
    (options, args) = parser.parse_args()
    
    if options.foreground:
        args = ['start']
    
    if not args:
        print "usage: %s start|stop|restart" % sys.argv[0]
        sys.exit(2)
    
    # load up all commands.py modules in the installed apps
    autodiscover()
    
    daemon = QueueDaemon(options)
    
    if not options.foreground:
        daemon.run_simple(args[0])
    else:
        daemon.run()
