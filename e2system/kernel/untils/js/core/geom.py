

class Rect:
    def __init__(self, x, y, w, h):
        self.x = x
        self.y = y
        self.w = w
        self.h = h

class Pos:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class Dim:
    def __init__(self, w, h):
        self.w = w
        self.h = h


def rect_center(r):
    return Pos(
                r.x + (r.w / 2),
                r.y + (r.h / 2))


def rect_setPos(r, pos):
    r.x = pos.x
    r.y = pos.y

def rect_setDim(r, dim):
    r.w = dim.w
    r.h = dim.h


def rect_interpolate(r, r2, t):
    return Rect(
        r.x + (r2.x - r.x) * t,
        r.y + (r2.y - r.y) * t,
        r.w + (r2.w - r.w) * t,
        r.h + (r2.h - r.h) * t,
    )


def rect_containsPos(r, pos):
    return (
                (pos.x >= r.x) and
                (pos.y >= r.y) and
                (pos.x < (r.x + r.w)) and 
                (pos.y < (r.y + r.h)))

def rect_containsRect(r, r2):
    return (
                r2.x >= r.x and
                r2.y >= r.y and
                r2.x2 < (r.x + r.w) and
                r2.y2 < (r.y + r.h))


def rect_plus(r, r2):
    return Rect(
            r.x + (r2.x or 0),
            r.y + (r2.y or 0),
            r.w + (r2.w or 0),
            r.h + (r2.h or 0))

def rect_minus(r, r2):
    return Rect(
            r.x - (r2.x or 0),
            r.y - (r2.y or 0),
            r.w - (r2.w or 0),
            r.h - (r2.h or 0))

def rect_scaledBy(r, horizontal, vertical):
    return Rect(
                r.x,
                r.y,
                r.w * horizontal,
                r.h * (vertical or horizontal))

def rect_centeredAt(r, pos):
    return Rect(
            pos.x - (r.w / 2),
            pos.y - (r.h / 2),
            r.w,
            r.h)

def rect_centeredIn(r, r2):
    return rect_centeredAt(r, r2.center())


def rect_copy(r):
    return Rect(r.x, r.y, r.w, r.h)

def rect_butWith(r, r2):
    result = rect_copy(r)
    for k in dict(r):
        result[k] = r[k]
    return result



def pos_minus(p, p2):
    return Pos(
              p.x - p2.x,
              p.y - p2.y)


def pos_distance(p, p2):
    dx = p.x - p2.x
    dy = p.y - p2.y
    return Math.sqrt(dx * dx + dy * dy)


