

from core.misc import core_bind

'''

<script type="text/javascript"
    src="/static/lib/soundmanager/soundmanager2-nodebug-jsmin.js"></script>
<script type="text/javascript" charset="utf-8">
    soundManager.url = "/static/lib/soundmanager/swf/";
    soundManager.debugMode = false;
    soundManager.flashVersion = 9;
</script>

'''

class SMSound:
    
    def __init__(self, info):
        self._smSound = soundManager.createSound(info)
    
    def _play(self):
        self._smSound.play()
    
    def _stop(self):
        self._smSound.stop()
    
    def _getPos(self):
        return self.smSound.position or 0
    
    def _setPos(self, pos):
        self.smSound.setPosition(pos)
    
    def _isPlayingOrBuffering(self):
        return self.smSound.playState == 1



class SMAudioController:
    
    def __init__(self):
        '''
        The first soundManager script needs to be loaded before you invoke this.
        '''
        
        soundManager.onready(bind(self._soundManagerOnload, self))
        self._callWhenSoundManagerLoaded = []
        
        self._url_sound_map = {}
        self._url_loaded_map = {}
        self._url_onloadCallbacks_map = {}
    
    ##### Public
    
    def _play(self, url):
        if self._url_loaded_map[url]:
            self._url_sound_map[url]._play()
        else:
            if not self._url_onloadCallbacks_map[url]:
                self._url_onloadCallbacks_map[url] = []
            self._url_onloadCallbacks_map[url].push(
                        bind(lambda: self._play(url), self))
            self._load(url)
    
    def _load(self, url):
        f = bind(lambda: self._loadSound_(url), self)
        if self._soundManagerLoaded:
            f()
        else:
            self._callWhenSoundManagerLoaded.push(f)
    
    ##### Private
    
    def _loadSound_(self, url):
        self._url_sound_map[url] = SMSound({
            'id': url,
            'url': url,
            'volume': 75,
            'autoLoad': True,
            'autoPlay': False,
            'onload': bind(lambda: self._soundOnload(url), self),
        })
    
    def _soundManagerOnload(self):
        self._soundManagerLoaded = 1
        for f in self._callWhenSoundManagerLoaded:
            f()
    
    def _soundOnload(self, url):
        self._url_loaded_map[url] = 1
        callbacks = self._url_onloadCallbacks_map[url]
        if callbacks:
            for f in callbacks:
                f(url)


