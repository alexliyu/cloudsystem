'''
Created on 2011-5-14

@author: alex
'''
from e2system.kernel.app.extdirect.django.metadata import meta_columns
from e2system.kernel.app.extdirect.django.extserializer import jsonDumpStripped
from e2system.kernel.app.extdirect.django import extforms
def makejs(model, fields=None):
    columns = meta_columns(model, fields=fields)
    for items in columns:
        try:
            del items['editor']['fieldLabel']
        except:
            pass
    return jsonDumpStripped(columns)
   
def getfilds(form):
     helper = extforms.Form(formInstance=form)
     extfieldsConfig = helper.getFieldsConfig()
     return jsonDumpStripped(extfieldsConfig) 
