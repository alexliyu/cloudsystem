
from goog import bind

from core.geom import Rect, Pos, Dim


# e = Element(...) create a proxy object
# e._ is its DOM node


def e_appendChild(e, kid):
    e._.appendChild(kid._)

def e_insertBefore(e, kid, existingKid):
    e._.insertBefore(kid._, existingKid._)

def e_prependChild(e, kid):
    if len(e._.childNodes) == 0:
        e._.appendChild(kid._)
    else:
        e._.insertBefore(kid._, e._.firstChild)

def e_removeChildren(e):
    while e._.lastChild:
        e._.removeChild(e._.lastChild)

def e_appendChildren(e, kids):
    for kid in kids:
        e._.appendChild(kid._)

def e_setChildren(e, kids):
    e_removeChildren(e)
    e_appendChildren(e, kids)

def e_appendToBody(e):
    document.body.appendChild(e._)

def e_appendToHead(e):
    document.getElementsByTagName("head")[0].appendChild(e._)

def e_appendTo(e, dest):
    dest.appendChild(e._)

def e_prependTo(e, dest):
    e_prependChild(dest, e._)

def e_remove(e):
    e._.parentNode.removeChild(e._)

def e_setClasses(e, classes):
    e._.className = classes.join(' ')

def e_getClasses(e):
    return (
                e._.className.split(' ')
                if e._.className else
                [])

def e_addClass(e, className):
    arr = e_getClasses(e)
    arr.push(className)
    e._.className = arr.join(' ')

def e_removeClass(e, className):
    arr = e_getClasses(e)
    i = arr.indexOf(className)
    if i != -1:
        arr.splice(i, 1)
    e._.className = arr.join(' ')

def e_setHtml(e, html):
    e._.innerHTML = html

def e_setStyle(e, k, v):
    e._.style[k] = v

def e_setStyles(e, d):
    for k in dict(d):
        e._.style[k] = d[k]

def e_setOpacity(e, fraction):
    percent = '' + Math.round(100 * fraction)
    e_setStyles(e, {
        'opacity': '' + fraction,
        'filter': 'alpha(opacity=' + percent + ')',
        '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + percent + ')',
    })

def e_getValue(e):
    return e._.value

def e_setValue(e, value):
    e._.value = value


def e_leaves(e):
    if len(e._.childNodes) == 0:
        return [e]
    else:
        arr = []
        for i in range(len(e._.childNodes)):
            subArr = _(w._.childNodes[i]).leaves()
            for j in range(len(subArr)):
                arr.push(subArr[j])
        return arr
    return e

def e_getDescendentText(e):
    arr = []
    for leaf in e_leaves(e):
        text = leaf.textContent
        if text:
            arr.push(text)
    return arr.join('')


def e_setLeft(e, v):
    e_setStyle(e, 'left', Math.round(v) + 'px')

def e_setTop(e, v):
    e_setStyle(e, 'top', Math.round(v) + 'px')

def e_setWidth(e, v):
    e_setStyle(e, 'width', Math.round(v) + 'px')

def e_setHeight(e, v):
    e_setStyle(e, 'height', Math.round(v) + 'px')

def e_setPos(e, r):
    e_setStyles(e, {
        'left': Math.round(r.x) + 'px',
        'top': Math.round(r.y) + 'px',
    })

def e_setDim(e, r):
    e_setStyles(e, {
        'width': Math.round(r.w) + 'px',
        'height': Math.round(r.h) + 'px',
    })

def e_setRect(e, r):
    e_setStyles(e, {
        'left': Math.round(r.x) + 'px',
        'top': Math.round(r.y) + 'px',
        'width': Math.round(r.w) + 'px',
        'height': Math.round(r.h) + 'px',
    })


def e_getWidth(e):
    # XB?
    return e._.clientWidth

def e_getHeight(e):
    # XB?
    return e._.clientHeight

def e_getPos(e):
    
    left = 0
    top = 0
    if e._.offsetParent:
        node = e._
        while node:
            left += node.offsetLeft
            top += node.offsetTop
            node = node.offsetParent
    
    return Pos(left, top)

def e_getRect(e):
    r = e_getPos(e)
    r.w = e_getWidth(e);
    r.h = e_getHeight(e);
    return r


def e_scrollToBottom(e):
    e._.scrollTop = e._.scrollHeight - e_getHeight(e)



class Element:
    
    def __init__(self, nodeType):
        
        node = document.createElement(nodeType)
        
        for i in range(1, len(arguments)):
            arg = arguments[i]
            if typeof(arg) == 'string':
                node.className = arg
            elif isinstance(arg, Array):
                for kid in arg:
                    node.appendChild(
                                    document.createTextNode(kid)
                                    if typeof(kid) == 'string' else
                                    kid._)
            else:
                for k in dict(arg):
                    node[k] = arg[k]
        
        self._ = node
    
    def _on(self, name, callback):
        
        if not self._event_callbacks_map:
            self._event_callbacks_map = {}
        
        if not self._event_callbacks_map[name]:
            self._event_callbacks_map[name] = []
            self._['on' + name] = bind(
                          lambda e: self._Element_eventCallback(e, name),
                          self)
        
        self._event_callbacks_map[name].push(callback)
    
    def _Element_eventCallback(self, e, name):
        for f in (self._event_callbacks_map[name] or []):
            f(e)


