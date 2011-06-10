
from django import forms
from django.db import models


import extfields


# conversion for some django forms field types
FormField_to_ModelField = {
     'TypedChoiceField':'CharField'
    , 'ModelChoiceField':'ForeignKey'
    , 'ModelMultipleChoiceField':'ManyToManyField'

}
def model_to_modelform(model):
    meta = type('Meta', (), { "model":model, })
    modelform_class = type('modelform', (forms.ModelForm,), {"Meta": meta})
    return modelform_class
 
    
class Form(object):

    def __init__(self, formInstance=None, fields=[]):
        self.form = formInstance or forms.Form()
        self.fields = fields        # list of fields to display
        self.data = {}
      
     
    def getConfig(self, initialData=False):
        form_fields = self.getFieldsConfig(initialData=initialData)
        conf = {
            'xtype':'form'
            , 'items':form_fields
            
        }
        return conf
        
    def getFieldList(self):
        try:
            return self.form.fields
        except:
            return self.form.base_fields
        
    def getFieldValue(self, fieldName):
        return self.data.get(fieldName)
        
    def getFieldsConfig(self, initialData=False):
        conf = []
        for name, item in self.getFieldList().items():
            cls = item.__class__.__name__
            print dir(item), cls
            try:
                extField = getattr(extfields, cls)(item)
            except:
                
                extField = getattr(extfields, FormField_to_ModelField[cls])(item)
            editor = extField.getEditor(initialValue=(initialData and self.getFieldValue(item.name)), data={'name':name, })
            if editor:

                conf.append(editor)
        return conf
        
class ModelForm(Form):
    def __init__(self, modelCls, fields=[]):
        self.form = model_to_modelform(modelCls)()
        self.instance = None
        
        self.baseFields = self.form._meta.model._meta.fields + self.form._meta.model._meta.many_to_many
        self.baseFieldsNames = [f.name for f in self.baseFields]
        if not fields:
            fields = self.baseFieldsNames
        self.fields = fields

    def getFieldValue(self, fieldName):
        if self.instance:
            val = getattr(self.instance, fieldName, None)
            if val:
                # special case for related fields serialisation
                if isinstance(val, models.Model):
                    return {'id':val.pk, '__unicode__':str(val)}
                elif getattr(val, '__dict__', None) and val.__dict__.has_key('model'):
                    return [{'id':i.pk, '__unicode__':str(i)} for i in val.all()]
                return val
        return None
        
    def setInstance(self, instance):
        self.instance = instance
            
    def getConfig(self, initialData=True):
        conf = super(ModelForm, self).getConfig(initialData=initialData)
        conf.update({
            'api':{
                'load': 'django.ModelForm.load',
                'submit': 'django.ModelForm.submit'
            }
        })
        return conf
        
    def getFieldList(self):
        alist = self.baseFields
        tlist = []
        for item in alist:
            if item.name in self.fields:
                tlist.append(item)
        return tlist
 
        
    
