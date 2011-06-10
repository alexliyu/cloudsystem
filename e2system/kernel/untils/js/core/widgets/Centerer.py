
from core.element import *


class Centerer(Element):
  def __init__(self, centeree):
    
    #XB: IIRC IE6 requires something (<thead>?)
    
    td = Element('td', [centeree])
    
    super('table', [
      Element('tr', [td])])
    
    e_setStyles(self, {
      'width': '100%',
      'height': '100%',
    })
    
    e_setStyles(td, {
      'text-align': 'center',
      'vertical-align': 'middle',
      'background': 'red',
    })

