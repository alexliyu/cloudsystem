from django.conf.urls.defaults import *
from django.core.urlresolvers import reverse
from e2system.kernel import direct
 


urlpatterns = patterns('',
    url(r'^router$', direct.remote_provider.router, name='directRouter'),
    url(r'^provider.js$', direct.remote_provider.script, name='directProvider'),
    url(r'^api$', direct.remote_provider.api, name='directApi'),
    
)
 
