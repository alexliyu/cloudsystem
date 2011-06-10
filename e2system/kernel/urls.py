from django.conf.urls.defaults import *
from direct import javascript_provider


urlpatterns = patterns('',
    # sample page
    url(r'^[A-Za-z]+.js', javascript_provider.api),
    
    )

 
