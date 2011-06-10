#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2011-5-23

@author: alex Email:alexliyu2012@gmail.com QQ:939567050
'''
from e2system.kernel.ui import BaseUi
from django.template import Context, loader





class Systemadmin(BaseUi):
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
        
    def _onDelete(self):
        self.onDelete_enable = True
        
    def _onEdit(self, width, height, items):
        self.onEdit_width = width
        self.onEdit_height = height
        self.onEdit_items = items
        self.onEdit_enable = True
    def additems(self, uiitems):
        self.items.append(uiitems)
    
    def addevent(self, eventname, **kw):
        if self.event_list.has_key(eventname):
            if kw.has_key('items'):
                if not isinstance(kw['items'], unicode):
                    items = kw['items']
                    self.addScript(items)
                    kw['items'] = items.id
            getattr(self, self.event_list[eventname])(**kw)
        else:
            return self.event_list
    def makeAppModules(self):
        result = ''
        self.appModules = ''
        self.appStart = ''
        self.appDesktop = ''
        for item in self.apps:
            self.appModules += ',new E2system.ui.%s()' % item.classname
            if item.desktop:
                self.appDesktop += ''',{
                                                    name : "%s",
                                                    iconCls : "%s",
                                                    module : "%s"
                                                }''' % (item.name, item.icon, item.classname)
            if item.start:
                self.appStart += ''',{
                                                    name : "%s",
                                                    iconCls : "%s",
                                                    module : "%s"
                                                }''' % (item.name, item.icon, item.classname)
    def js(self):
        # View code here...
        t = loader.get_template('systemadmin.js')
        c = Context({"ui":self }, autoescape=False)
        return t.render(c) + self.scriptitems
        
