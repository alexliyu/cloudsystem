from serializer import Serializer as extdirectSerializer

from django.utils.encoding import smart_str, smart_unicode
from django.utils import simplejson
from django.db import models

import re

from django.core.serializers.json import DjangoJSONEncoder


class Serializer(extdirectSerializer):
    # this serialiser create sub-keys for related fields and adds a __unicode__ key for any model instance
    def handle_fk_field(self, obj, field):
        related = getattr(obj, field.name)
        relateds = {}
        if related is not None:
            if field.rel.field_name == related._meta.pk.name:
                # Related to remote object via primary key                
                self._current[field.name] = {'id':related._get_pk_val(), '__unicode__':smart_unicode(related, strings_only=True)}
            else:
                # Related to remote object via other field
                related = getattr(related, field.rel.field_name)
                self._current[field.name] = {'id':related._get_pk_val(), '__unicode__':smart_unicode(getattr(related, field.rel.field_name), strings_only=True)}
                
    def handle_m2m_field(self, obj, field):
        if field.rel.through._meta.auto_created:
            if self.use_natural_keys and hasattr(field.rel.to, 'natural_key'):
                m2m_value = lambda value: value.natural_key()
            else:
                m2m_value = lambda value: smart_unicode(value._get_pk_val(), strings_only=True)
            self._current[field.name] = []
            for related in getattr(obj, field.name).iterator():
                self._current[field.name].append({'id':m2m_value(related), '__unicode__':smart_unicode(related, strings_only=True)})
                
    def start_object(self, obj):
        super(Serializer, self).start_object(obj)
        if isinstance(obj, models.Model):
            self._current['__unicode__'] = smart_unicode(obj)
        
        
 
def jsonDump(obj):
    return simplejson.dumps(obj, cls=DjangoJSONEncoder, ensure_ascii=False, indent=4)
                    
def jsonDumpStripped(inDict):
    """ strip some specials values for ExtJs in the simplejson dump """
    jsonStr = jsonDump(inDict)
    rawstr = r"""\"(renderer|editor|hidden|sortable|sortInfo|listeners|view|failure|success|scope|fn|store|handler|callback|function)"\s*:\s*"(.+)\""""
    reg = re.compile(rawstr, re.MULTILINE)
    newstr = reg.subn('"\\1":\\2', jsonStr)[0]
  #  newstr = jsonStr
    return newstr 
  
