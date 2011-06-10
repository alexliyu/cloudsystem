
from core.element import *


def loadJs(url):
    e_appendToBody(
        Element('script', {
            'src': url,
            'type': 'text/javascript'
        }))

def loadCss(url):
    e_appendToHead(
        Element('link', {
            'rel': 'stylesheet',
            'href': url,
            'type': 'text/css',
        }))

def addJsToHead(code):
    e_appendToHead(
        Element('script', [code], {
            'type': 'text/javascript',
        }))

def addCssToHead(code):
    e_appendToHead(
        Element('style', [code], {
            'type': 'text/css'
        }))


def window_rect():
    return Rect(
                    0,
                    0,
                    window.innerWidth,
                    window.innerHeight)

def visible_window_rect():
    return Rect(
        document.body.scrollLeft or document.body.parentNode.scrollLeft or 0,
        document.body.scrollTop or document.body.parentNode.scrollTop or 0,
        window.innerWidth,
        window.innerHeight)


def reloadWindow():
    location.reload()

def goToUrl(url):
    location.href = url


