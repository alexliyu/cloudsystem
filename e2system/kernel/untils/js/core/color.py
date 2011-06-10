
from core.hex import hex_encode_256
from core.math import math_clamp



class Color:
    def __init__(self, arg1, g, b):
        if typeof(arg1) == 'string':
            self.r = parseInt(arg1.substr(1, 2), 16)
            self.g = parseInt(arg1.substr(3, 2), 16)
            self.b = parseInt(arg1.substr(5, 2), 16)
        else:
            self.r = arg1
            self.g = g
            self.b = b


def color_interpolate(c, c2, fraction):
    return Color(
        c.r + t * (c2.r - c.r),
        c.g + t * (c2.g - c.g),
        c.b + t * (c2.b - c.b))


def color_webString(self):
    return (
                '#' + 
                hex_encode_256(math_clamp(self.r, 0, 255)) + 
                hex_encode_256(math_clamp(self.g, 0, 255)) + 
                hex_encode_256(math_clamp(self.b, 0, 255)))


