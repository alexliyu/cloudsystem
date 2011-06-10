from crud import ExtDirectCRUD

def remoting(provider, action=None, name=None, len=0, form_handler=False, \
             login_required=False, permission=None):
    """
    Decorator to register a function for a given `action` and `provider`.
    `provider` must be an instance of ExtRemotingProvider
    """    
    def decorator(func):        
        provider.register(func, action, name, len, form_handler, login_required, permission)
        return func
        
    return decorator

def polling(provider, login_required=False, permission=None):
    """
    Decorator to register a function for a `provider`.
    `provider` must be an instance of ExtPollingProvider
    """
    def decorator(func):
        provider.register(func, login_required, permission)
        return func
    
    return decorator
 
def crud(original_class, provider, action=None, login_required=False, permission=None):
    orig_init = original_class.__init__
    # make copy of original __init__, so we can call it without recursion

    def __init__(self, id, *args, **kws):
        action = action or original_class.__name__   
        i = original_class()
        i.register_actions(provider, action, login_required, permission)
        
        orig_init(self, *args, **kws) # call the original __init__

    original_class.__init__ = __init__ # set the class' __init__ to the new one
    return original_class
