#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2011-5-12

@author: alex
'''
from e2system.kernel.ui.systemadmin import Systemadmin
from e2system.kernel.models import User
from e2system.kernel.untils import jstools
from django import forms


class UserForm(forms.ModelForm):
    class Meta:
        model = User
    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        f = self.fields.get('user_permissions', None)
        if f is not None:
            f.queryset = f.queryset.select_related('content_type')

    @classmethod
    def onsuccess(instance, request, form):
        m = form.save(commit=False)
        m.save()
            
        #m.save(groups=t_seqid) 
        #m.save_m2m()
        return dict(success=True)




def script(request):
    app = Systemadmin(name='systemadmin', type='model', id='systemadmin')
    return app.js()

@property
def name():
    return 'useradmin'
