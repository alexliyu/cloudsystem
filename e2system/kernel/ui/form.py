#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2011-5-23

@author: alex Email:alexliyu2012@gmail.com QQ:939567050
'''
from e2system.kernel.ui import BaseUi
from django.template import Context, loader
class RemotForm(BaseUi):     
    '''
    事件列表，key为事件名称，value为对应的方法名称
    '''
    event_list = dict()
    event_list = {'onAdd':'_onAdd',
              'onDelete': '_onDelete',
              'onEdit': '_onEdit'
              }
    
    def _onAdd(self, width, height, items):
        self.onAdd_width = width
        self.onAdd_height = height
        self.onAdd_items = items
        self.onAdd_enable = True
        
        
    
    def addevent(self, eventname, **kw):
        if self.event_list.has_key(eventname):
           getattr(self, self.event_list[eventname])(**kw)
        else:
            pass
        
        return self.event_list

    def js(self):
        t = loader.get_template('remoteform.js')
        c = Context({"ui":self }, autoescape=False)
        return t.render(c)
    
class EditForm(BaseUi):     
    '''
    事件列表，key为事件名称，value为对应的方法名称
    '''
    event_list = dict()
    event_list = {'onAdd':'_onAdd',
              'onDelete': '_onDelete',
              'onEdit': '_onEdit'
              }
    
    def _onAdd(self, width, height, items):
        self.onAdd_width = width
        self.onAdd_height = height
        self.onAdd_items = items
        self.onAdd_enable = True
        
        
    
    def addevent(self, eventname, **kw):
        if self.event_list.has_key(eventname):
           getattr(self, self.event_list[eventname])(**kw)
        else:
            pass
        
        return self.event_list

    def js(self):
        t = loader.get_template('editform.js')
        c = Context({"ui":self }, autoescape=False)
        return t.render(c)
