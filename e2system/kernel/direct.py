from e2system.kernel.app.extdirect.django import ExtRemotingProvider, ExtPollingProvider
from providers import ExtJavascriptProvider
from django.core.urlresolvers import reverse


remote_provider = ExtRemotingProvider(namespace='django', url='/remoting/router')
javascript_provider = ExtJavascriptProvider(namespace='e2system')
#a = reverse('directRouter') 
