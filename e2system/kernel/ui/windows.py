#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 2011-5-23

@author: alex Email:alexliyu2012@gmail.com QQ:939567050
'''
from e2system.kernel.ui import BaseUi
from django.template import Context, loader
class Windows(BaseUi):
        
    def script(self):
        tem_response = """
    Ext.define("%s", {
    extend: "Ext.django.Grid",
    %s
    
});     
        """ % (self.id, self.config())
        return tem_response
            


    def js(self):
        # View code here...
        t = loader.get_template('windows.js')
        c = Context({"ui":self }, autoescape=False)
        return  self.itemsdef[0] + t.render(c)
