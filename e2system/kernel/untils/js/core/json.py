

def json_encode(x):
    
    t = typeof(x)
    
    if x == None or t == 'undefined':
        return 'null'
    
    elif t == 'boolean':
        return x.valueOf()
    
    elif t == 'number':
        return x.valueOf()
    
    elif t == 'string':
        #XB confirm replace is non-destructive
        #TODO escape unicode
        return ('"' + (
                            x.replace(RegExp(r'\\', 'g'), '\\\\')
                            .replace(RegExp(r'"', 'g'), '\\"')
                            .replace(RegExp(r'\n', 'g'), '\\n')) + '"')
    
    elif isinstance(x, Array):
        bs = []
        for i in range(len(x)):
            bs.push(arguments.callee(x[i]))
        return '[' + bs.join(',') + ']'
    
    else:
        bs = []
        for k in dict(x):
            bs.push(arguments.callee(k) + ':' + arguments.callee(x[k]))
        return '{' + bs.join(',') + '}'


def json_eval(s):
    return eval('(' + s + ')')


#LATER: json_decode_safe

