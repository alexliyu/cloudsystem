import sys, os

from gevent import wsgi 
from gevent import socket 
from gevent import monkey
from daemon import daemonize
from django.core.signals import got_request_exception
import traceback
PROJECT_DIR = os.path.abspath(os.path.dirname(__file__))
sys.stdout = sys.stderr
def GetParentPath(strPath):
    if not strPath:
        return None;
    
    lsPath = os.path.split(strPath);
    if lsPath[1]:
        return lsPath[0];
    
    lsPath = os.path.split(lsPath[0]);
    return lsPath[0];
# Just in case 
monkey.patch_all()

import pwd

# Get this so we can chown/chgrp the socket and let nginx read it 
pe = pwd.getpwnam('www-data')

SOCK = os.path.join(PROJECT_DIR, 'server.sock')

sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM) 
try: 
    os.remove(SOCK) 
except OSError: 
    pass

sock.bind(SOCK) 
os.chown(SOCK, pe.pw_uid, pe.pw_gid) 
os.chmod(SOCK, 0770) 
sock.listen(256)

import django.core.handlers.wsgi 
application = django.core.handlers.wsgi.WSGIHandler() 
def exception_printer(sender, **kwargs):
    traceback.print_exc()


# Set up for Django 
#sys.path.insert(0, GetParentPath(PROJECT_DIR)) 
#sys.path.insert(0, PROJECT_DIR) 
sys.path.append('..')
os.environ['DJANGO_SETTINGS_MODULE'] = 'e2system.settings' 
got_request_exception.connect(exception_printer)
#wsgi.WSGIServer(sock, application, spawn=None).serve_forever() 
address = "localhost",9000
#daemonize('lincdm.pid')
wsgi.WSGIServer(address, application).serve_forever()
