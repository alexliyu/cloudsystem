#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2011-5-23

@author: alex Email:alexliyu2012@gmail.com QQ:939567050
————————————————————————————————————————————————————————————
这是UI层的基类，INIT初始化配置，config方法用来修改设置

'''
class BaseUi(object):
    
    
    def __init__(self, type, id, **kw):        
        self.type = type        
        self.id = id
        self.items = []
        self.itemsdef = []
        self.scriptitems = ''
        for i in kw:
            setattr(self, i, kw[i])

    '''
    获取配置选项
    '''
    @property
    def config(self):
        
        return self.__dict__
    
    '''
    获取支持事件列表
    '''
    @property
    def eventlist(self):
        return self.event_list
    
    def event(self, *eventname):
        self.event = eventname            
        
    def update(self, **kw):
        for i in kw:
            setattr(self, i, kw[i])       
    
    def register(self, **kw):
        
        raise NotImplementedError
        
    def router(self, request):
        
        raise NotImplementedError
    
    def script(self, request):
        
        raise NotImplementedError
    
    def addScript(self, items):
        self.scriptitems += items.js()
        
    def additems(self, uiitems):
        self.itemsdef.append(uiitems.js())
        self.items.append(uiitems.id)
