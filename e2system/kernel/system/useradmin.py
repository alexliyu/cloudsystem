#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2011-5-12

@author: alex
'''
from e2system.kernel.ui.grid import Grid
from e2system.kernel.ui.windows import Windows 
from e2system.kernel.ui.form import RemotForm, EditForm
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
    fields = ['id', 'username', 'first_name', 'last_name', 'password', 'email', 'is_active', 'is_superuser', 'date_joined', 'last_login']
    grid = Grid(type='grid',
                     id='usergrid',
                     editable=False,
                     model='auth_User',
                     fields=fields,
                     colModel=True,
                     columns=jstools.makejs(User, fields)
                 )
    remoteform = RemotForm(type='remoteform',
                         id='userremoteform',
                         formCls='UserForm'
                         )
    editform = EditForm(type='editform',
                        id='usereditform',
                        form='UserForm',
                        item=jstools.getfilds(UserForm)                       
                        )
    
    grid.addevent('onAdd', width=600, height=500, items=remoteform)
    grid.addevent('onDelete')
    grid.addevent('onEdit', width=600, height=500, items=editform)
    
    root = Windows(type='window',
                           id='useradmin',
                           width=600,
                           height=400,
                           title='用户管理',
                           iconCls='e2system-desktop-useradmin',
                           )
    root.additems(grid)
    return root.js()

@property
def name():
    return 'useradmin'
