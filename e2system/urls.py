from django.conf.urls.defaults import patterns, include, url
import os
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    (r'^kernel/', include('e2system.kernel.urls')),
    (r'^remoting/', include('e2system.kernel.urls_remoting')),
    (r'^js/', include('e2system.kernel.urls')),
    (r'^main/', 'e2system.kernel.views.e2_main'),
    (r'^login/', 'e2system.kernel.views.e2_login'),
    (r'^logout/', 'e2system.kernel.views.e2_logout_view'),
 
   
    # Examples:
    # url(r'^$', 'e2system.views.home', name='home'),
    # url(r'^e2system/', include('e2system.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    (r'^$', 'e2system.kernel.views.e2_login_view'),
)

urlpatterns += patterns('django.contrib.staticfiles.views',
        url(r'^static/(?P<path>.*)$', 'serve'),
        url(r'^media/(?P<path>.*)$', 'serve'),
        )
