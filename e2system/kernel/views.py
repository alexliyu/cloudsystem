#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.views.generic.simple import direct_to_template
from models import Contact, Company, Color, SampleModel, Keyword, AppModel
from django.contrib.auth.models import User, Group, Permission
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from django.http import HttpResponseRedirect
from django.forms import ModelMultipleChoiceField
#from extdirect.django import remoting
from django import forms
from e2system.kernel import direct
from e2system.kernel.system.useradmin import UserForm




def e2_login(request):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    user = auth.authenticate(username=username, password=password)
    if user is not None and user.is_active:
        # Correct password, and the user is marked "active"
        auth.login(request, user)
        # Redirect to a success page.
        return HttpResponseRedirect("/main/")
    else:
        # Show an error page
        return HttpResponseRedirect("/login/")
    
def e2_login_view(request):
        if   request.user.is_authenticated():
            return HttpResponseRedirect("/main/")
        else:
            return direct_to_template(request, 'login.html', {})
    
def e2_logout_view(request):
    auth.logout(request)
    # Redirect to a success page.
    return HttpResponseRedirect("/")

def e2_main(request):
    return direct_to_template(request, 'main.html', {})
    

class MultipleStringChoiceField(forms.fields.MultipleChoiceField):
     

    def to_python(self, value):
        if not value:
            return ""
        return [unicode(val.strip()) for val in value[0].split(',')]

    def validate(self, value):
        """
        Validates that the input is a list or tuple.
        """
        pass
    
class SampleForm(forms.Form):
    name = forms.CharField(label='Your nick name', required=True, max_length=50)
    sport = forms.ChoiceField(label='Sports', required=True, choices=(('BOXE', 'Boxing'), ('KUNGFU', 'Kung-Fu'), ('KAPOIERA', 'Kapoiera'), ('KRAVMAGA', 'KravMaga')))
    interests = MultipleStringChoiceField(help_text='Pick one or more', label='interests', required=False, choices=(('', 'Any'), ('BOOKS', 'Books'), ('TV', 'TV'), ('INTERNET', 'Internet'), ('TABLETS', 'Tablets'), ('SMARTPHONE', 'Smarthpones')))
    email = forms.EmailField(label='Email')
    url = forms.URLField(label='Url', required=False)
    message = forms.CharField(label='Your message', required=True, help_text='Send your wishes', initial='Hello, world')
    alert = forms.BooleanField(label='Notify me when received', required=False)
    newsletter = forms.BooleanField(label='Suscribe newsletter', initial=True, required=False)
    
    @classmethod
    def onsuccess(instance, request, form):
        return dict(success=True)

    

def sampleFormSuccess(request, form):
    print 'sampleFormSuccess'
'''
注册并发布模型到JAVASCRIPT，供给EXTJS DIRECT调用
'''
# register CRUD methods for these models
direct.remote_provider.registerCRUD(Contact)
direct.remote_provider.registerCRUD(Company)
direct.remote_provider.registerCRUD(Color)
direct.remote_provider.registerCRUD(SampleModel)
direct.remote_provider.registerCRUD(Keyword)
direct.remote_provider.registerCRUD(AppModel)
direct.remote_provider.registerCRUD(User, app='auth')
direct.remote_provider.registerCRUD(Group, app='auth')
direct.remote_provider.registerCRUD(Permission, app='auth')
'''
注册并发布表单到JAVASCRIPT，供给EXTJS DIRECT调用
'''    
direct.remote_provider.registerForm(SampleForm, success=SampleForm.onsuccess)
direct.remote_provider.registerForm(UserForm, success=UserForm.onsuccess)
