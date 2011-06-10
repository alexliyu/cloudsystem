
from core.random import randomToken


def doPopup(info):
    windowName = randomToken(10)
    w = window.open(
                        info._url,
                        windowName,
                        [
                            'height=' + info._dim.h,
                            'width=' + info._dim.w,
                            'status=1',
                            'toolbar=1',
                            'location=1',
                            'scrollbars=1',
                            'resizable=1',
                        ].join(','))
    if window.focus:
        w.focus()


