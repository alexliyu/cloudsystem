import doctest
import unittest

from e2system.kernel.app.extdirect.django import ExtRemotingProvider, ExtPollingProvider
remote_provider = ExtRemotingProvider(namespace='django', url='/remoting/router/')
polling_provider = ExtPollingProvider(url='/polling/router/', event='some-event')

from django.conf import settings
from django.core.urlresolvers import clear_url_caches

def setUp(self):    
    self._old_root_urlconf = settings.ROOT_URLCONF
    self._old_debug = settings.DEBUG
    settings.ROOT_URLCONF = 'extdirect.django.test_urls'
    clear_url_caches()    

def tearDown(self):                
    settings.ROOT_URLCONF = self._old_root_urlconf
    settings.DEBUG = self._old_debug
    clear_url_caches()
    remote_provider.actions = {}

def suite():
    optionflags = doctest.NORMALIZE_WHITESPACE | doctest.ELLIPSIS
    globs = {}
    
    suite = unittest.TestSuite()

    suite.addTest(doctest.DocFileSuite(
        '../../README.txt',
        optionflags=optionflags,
        setUp=setUp,
        tearDown=tearDown,
        globs=globs))
    
    suite.addTest(doctest.DocFileSuite(
        './doctests/crud.txt',
        optionflags=optionflags,
        setUp=setUp,
        tearDown=tearDown,
        globs=globs))
    
    suite.addTest(doctest.DocFileSuite(
        './doctests/metadata.txt',
        optionflags=optionflags,
        setUp=setUp,
        tearDown=tearDown,
        globs=globs))
    
    suite.addTest(doctest.DocFileSuite(
        './doctests/auth.txt',
        optionflags=optionflags,
        setUp=setUp,
        tearDown=tearDown,
        globs=globs))
    
    return suite

