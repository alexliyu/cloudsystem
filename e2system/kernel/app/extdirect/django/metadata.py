# default fields configs

import extfields



def get_field_list(model, exclude=[], fields=None):
    # return all fields for a given model
    if not fields:
        fields = [f for f in model._meta.fields if f.name not in exclude]
        fields += [f for f in model._meta.many_to_many if f.name not in exclude]
    else:
        fields = [model._meta.get_field(f) for f in fields]
    return fields
    
def meta_columns(model, exclude=[], get_metacolumns=None, fields=None):
    """
    Generate columns metadata for a given Django model.
    You could provide the `get_metacolumns` function to generate
    custom metadata for some fields.
    """
    if not fields:
        fields = get_field_list(model, exclude=exclude)
    else:
        fields = [model._meta.get_field(f) for f in fields]
        
    result = []
    
    # always add unicode field to models
    # result.append({'name':'__unicode__', 'type':'string'})
    for field in fields:
        config = None
        klass = field.__class__.__name__
        if get_metacolumns:
            # If get_metacolumns is not None, then it must be a callable object
            # and should return the metadata for a given field or None
            config = get_metacolumns(field)
            
        if not config:
            #If get_metacolumns it's None or returned None for a given field
            #then, we try to generate the metadata for that field
            config = {}
            fieldCls = getattr(extfields, klass, None)
            if fieldCls:
                config = fieldCls(field).getColumnConfig()
             
            else:                    
                raise RuntimeError, \
                    "Field class `%s` not found in extfields.py. Use `get_metacolumns` to resolve the field `%s`." % (klass, field)
            
        result.append(config)
        
    
    return result
    
def meta_fields(model, mappings={}, exclude=[], get_metadata=None, fields=None):
    """
    Generate metadata for a given Django model.
    You could provide the `get_metadata` function to generate
    custom metadata for some fields.
    """
    
    
    # if not fields:
        # fields = get_field_list(model, exclude = exclude)
    # else:
        # fields = [model._meta.get_field(f) for f in fields]
        
    # always include all model fields as they are needed in case of update
    
    fields = get_field_list(model, exclude=exclude, fields=fields)
    result = []
    # always add unicode field to models
    result.append({'name':'__unicode__', 'type':'string', 'allowBlank': True, })
    for field in fields:
        config = None
        klass = field.__class__.__name__
        if get_metadata:
            #If get_metadata is not None, then it must be a callable object
            #and should return the metadata for a given field or None
            config = get_metadata(field)
            
        if not config:
            #If get_metadata it's None or returned None for a given field
            #then, we try to generate the metadata for that field
            config = {}
            fieldCls = getattr(extfields, klass, None)
            if fieldCls:
                configCls = fieldCls(field)
                config = configCls.getReaderConfig()
                
                if mappings.has_key(field.name):
                
                    config['mapping'] = unicode(field.name)
                    config['name'] = unicode(mappings[field.name])

                if field.has_default():
                    if callable(field.default):
                        config['defaultValue'] = configCls.getValue(field.default())
                    else:
                        config['defaultValue'] = configCls.getValue(field.default)
            else:                    
                raise RuntimeError, \
                    "Field class `%s` not found in extfields.py. Use `get_metadata` to resolve the field `%s`." % (klass, field.name)
            
        result.append(config)
        

    return result
    

