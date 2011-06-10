

from core.misc import min


def string_strip(s, chars):
    chars = chars or ' \t\r\n\x00\x0B'
    return lstrip(rstrip(s, chars), chars)

def string_lstrip(s, chars):
    return s.replace(RegExp('^[' + chars + ']+', 'g'), '')

def string_rstrip(s, chars):
    return s.replace(RegExp('[' + chars + ']+$', 'g'), '')

def string_startswith(s, prefix):
    return len(s) >= len(prefix) and s.substr(0, len(prefix)) == prefix

def string_lowercase(s):
    return s.toLowerCase()

def string_uppercase(s):
    return s.toUpperCase()



def computeCommonPrefixLengthOfPair(s1, s2):
    result = 0
    for i in range(min(len(s1), len(s2))):
        # s1[i] ==> IE6 FAIL, IIRC
        if s1.substr(i, 1) == s2.substr(i, 1):
            result += 1
        else:
            break
    return result


def computeCommonSuffixLengthOfPair(s1, s2):
    result = 0
    s1_len = len(s1)
    s2_len = len(s2)
    for i in range(min(s1_len, s2_len)):
        # s1[i] ==> IE6 FAIL IIRC
        if s1.substr(s1_len - 1 - i, 1) == s2.substr(s2_len - 1 - i, 1):
            result += 1
        else:
            break
    return result



