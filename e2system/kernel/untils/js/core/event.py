
from core.geom import Pos


KEYCODE_DELETE = 8
KEYCODE_TAB = 9
KEYCODE_RETURN = 13
KEYCODE_ESCAPE = 27
KEYCODE_SPACE = 32

KEYCODE_LEFT = 37
KEYCODE_UP = 38
KEYCODE_RIGHT = 39
KEYCODE_DOWN = 40


def ev_stop(e):
  
  if e.stopPropagation:
    e.stopPropagation()
  else:
    e.cancelBubble = True
  
  if e.preventDefault:
    e.preventDefault()
  else:
    e.returnValue = False


def ev_keycode(e):
  #XB?
  return e.keyCode


def ev_pos(e):
  
  if e.pageX or e.pageY:
    x = e.pageX
    y = e.pageY
  
  elif e.clientX or e.clientY:
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
  
  return Pos(x, y)


def ev_isRightButton(e):
  if e.which:
    return (e.which == 3)
  elif e.button:
    return (e.button == 2)


def ev_controlDown(e):
  return e.ctrlKey

def ev_altDown(e):
  return e.altKey

def ev_shiftDown(e):
  return e.shiftKey

def ev_metaDown(e):
  return e.metaKey


