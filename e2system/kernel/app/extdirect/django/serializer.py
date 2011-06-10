from django.core.serializers import python
from StringIO import StringIO
from django.utils.encoding import smart_str, smart_unicode
from django.utils import datetime_safe


class Serializer(python.Serializer):
    """    
    """
    def start_serialization(self, total):
        self._current = None
        self.objects = {
            self.meta['root']: [],
            self.meta['total']: total,
            self.meta['success']: True
        }

    def end_serialization(self, total, single_cast):
        if total == 1 and single_cast:
            self.objects[self.meta['root']] = self.objects[self.meta['root']][0]

    def start_object(self, obj):
        self._current = {}
        
    def end_object(self, obj):
        rec = self._current
        rec[self.meta['idProperty']] = smart_unicode(obj._get_pk_val(), strings_only=True)
        
        for extra in self.extras:
                rec[extra[0]] = extra[1](obj)
                
        self.objects[self.meta['root']].append(rec)
        self._current = None        
        
    def handle_field(self, obj, field):
        self._current[field.name] = smart_unicode(getattr(obj, field.name), strings_only=True)

    def handle_fk_field(self, obj, field):
        related = getattr(obj, field.name)
        if related is not None:
            if field.rel.field_name == related._meta.pk.name:
                # Related to remote object via primary key                
                self._current[field.name + '_id'] = smart_unicode(related._get_pk_val(), strings_only=True)
                self._current[field.name] = smart_unicode(related, strings_only=True)                
            else:
                # Related to remote object via other field
                related = getattr(related, field.rel.field_name)
                self._current[field.name] = self._current[field.name + '_id'] = smart_unicode(getattr(related, field.rel.field_name), strings_only=True)        

    def handle_m2m_field(self, obj, field):
        if field.rel.through._meta.auto_created:
            if self.use_natural_keys and hasattr(field.rel.to, 'natural_key'):
                m2m_value = lambda value: value.natural_key()
            else:
                m2m_value = lambda value: smart_unicode(value._get_pk_val(), strings_only=True)
            self._current[field.name + '_ids'] = [m2m_value(related)
                               for related in getattr(obj, field.name).iterator()]
                
    def serialize(self, queryset, **options):
        """
        Serialize a queryset.
        """
        self.options = options

        self.stream = options.get("stream", StringIO())
        self.selected_fields = options.get("fields")
        self.use_natural_keys = options.get("use_natural_keys", False)
        self.local_fields = options.get("local")
        
        self.exclude_fields = options.get("exclude_fields", [])
        
        self.meta = options.get('meta', dict(root='records', total='total', success='success', idProperty='id'))
        self.extras = options.get('extras', [])
        
        single_cast = options.get('single_cast', False)     
        total = options.get("total", queryset.count())   

        self.start_serialization(total)
                        
        for obj in queryset:
            if self.local_fields:
                fields = obj._meta.local_fields
            else:
                fields = obj._meta.fields
            
            fields = [f for f in fields if f.name not in self.exclude_fields]    
            self.start_object(obj)
            for field in fields:
                if field.serialize:
                    if field.rel is None:
                        if self.selected_fields is None or field.attname in self.selected_fields:
                            self.handle_field(obj, field)
                    else:
                        if self.selected_fields is None or field.attname[:-3] in self.selected_fields:
                            self.handle_fk_field(obj, field)
            for field in obj._meta.many_to_many:
                if field.serialize:
                    if self.selected_fields is None or field.attname in self.selected_fields:
                        self.handle_m2m_field(obj, field)
            self.end_object(obj)
        self.end_serialization(total, single_cast)
        return self.getvalue()    
