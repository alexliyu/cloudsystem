
# Some chars removed to reduce human copying errors
RANDOM_TOKEN_ALPHABET = '23456789ABCEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz'


def random_random():
    'Random number from [0.0, 1.0)'
    x = Math.random()
    # Might not be needed. But it's easier to add this line
    # than to verify that EACH browser implementation
    # would NEVER return 1
    return 0 if x == 1 else x


def random_uniform(a, b):
    '''
    Random number from [   a, b   ] or )
    '''
    return a + (b - a) * Math.random()


def random_randint(a, b):
    '''
    Assumes a, b are integers.
    Returns a random integer from [a, b]
    '''
    return Math.floor(random_random() * (b - a + 1)) + a


def random_choice(arr):
    return arr[random_randint(0, len(arr) - 1)]


def random_perm(n):
    
    available = []
    for i in range(n):
        available[i] = 1
    
    numLeft = n
    
    perm = []
    
    for i in range(n):
        ri = random_randint(0, numLeft - 1)
        for j in range(n):
            if available[j]:
                if ri == 0:
                    perm.push(j)
                    available[j] = 0
                    numLeft -= 1
                    break
                else:
                    ri -= 1
    
    return perm


def random_shuffled(arr):
    arr2 = []
    for i in random_perm(len(arr)):
        arr2.push(arr[i])
    return arr2


def randomToken(length):
    alphabetLengthMinusOne = len(RANDOM_TOKEN_ALPHABET) - 1
    bits = []
    for i in range(length or 10):
        bits.push(RANDOM_TOKEN_ALPHABET.substr(
                        random_randint(0, alphabetLengthMinusOne),
                        1))
    return bits.join('')



