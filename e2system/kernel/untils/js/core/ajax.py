
from core.window import loadJs


G.__core_ajax_jsonp_callbacks = {}
G.__core_ajax_jsonp_counter = 0


ajax_jsonp = {
    '_callbacks': {},
    '_counter': 0,
}


def jsonp_request(d):
    '''
    {
        _url: required. Must not include GET params.
        _GET: optional dict
        _success: optional callback
    }
    
    If _success is specified, _GET['jsonp'] will be set to X s.t. eval(X) will be _success.
    '''
    
    d._GET = d._GET or {}
    
    if d._success:
        G['__core_ajax_jsonp_counter'] += 1
        G['__core_ajax_jsonp_callbacks']['' + G['__core_ajax_jsonp_counter']] = d._success
        
        d._GET['jsonp'] = EXTERNAL_MOUNT + '.__core_ajax_jsonp_callbacks[' + G['__core_ajax_jsonp_counter'] + ']'
    
    queryString = ''
    first = 1
    for k in dict(d._GET):
        queryString += (
                            ('?' if first else '&') + 
                            k + '=' + encodeURIComponent('' + d._GET[k]))
        first = 0
    
    loadJs(d._url + queryString)


