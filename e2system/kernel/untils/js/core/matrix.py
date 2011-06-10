
'''
matrix: [[1, 2, 3],
         [4, 5, 6]]
'''

def matrix_solid(h, w, v):
    m2 = []
    for y in range(h):
        row = []
        for x in range(w):
            row.push(v)
        m2.push(row)
    return m2


def matrix_via_cellfunc(h, w, f):
    m2 = []
    for y in range(h):
        row = []
        for x in range(w):
            row.push(f(y, x))
        m2.push(row)
    return m2


def matrix_height(m):
    return len(m)

def matrix_width(m):
    return len(m[0])


def matrix_print(m, msg):
    if not msg:
        msg = 'matrix'
    print('---- ' + msg + ' ----')
    for y in range(matrix_height(m)):
        print(m[y])


def matrix_rotated(m, rotation90s):
    
    n = len(m)
    n_minus_one = n - 1
    
    # new blank matrix
    m2 = matrix_solid(n, n, 0)
    
    # fill new matrix
    for y in range(n):
        for x in range(n):
            if rotation90s == 0:
                m2[y][x] = m[y][x]
            elif rotation90s == 1:
                m2[y][x] = m[n_minus_one - x][y]
            elif rotation90s == 2:
                m2[y][x] = m[n_minus_one - y][n_minus_one - x]
            elif rotation90s == 3:
                m2[y][x] = m[x][n_minus_one - y]
    
    return m2

def matrix_centerOfGravity(m):
    totalWeight = 0
    xsum = 0
    ysum = 0
    for y in range(matrix_height(m)):
        for x in range(matrix_width(m)):
            weight = m[y][x]
            totalWeight += weight
            xsum += weight * (x + 0.5)
            ysum += weight * (y + 0.5)
    return [ysum / totalWeight, xsum / totalWeight]


