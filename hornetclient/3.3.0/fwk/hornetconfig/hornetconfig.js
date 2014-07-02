function hornet_config(){
	
	var _BASE_RE = /(?:\?(?:[^&]*&)*([^&]*))?\b(hornetconfig(?:-\w+)?)\/\2(?:-(min|debug))?\.js/,
    parseBasePath = function(src, pattern) {
        var match = src.match(pattern),
            path;
        if (match) {
            path = RegExp.leftContext || src.slice(0, src.indexOf(match[0]));
            // this is to set up the path to the loader.
            //if (match[1]) {
            //    path += '?' + match[1];
            //}
            path = {
                path: path
            };
        }
        return path;
    },
	getBase = function() {
        var nodes = (document && document.getElementsByTagName('script')) || [],
            path = '', parsed,
            i, len, src;
        for (i = 0, len = nodes.length; i < len; ++i) {
            src = nodes[i].src;
            if (src) {
                parsed = parseBasePath(src, _BASE_RE);
                if (parsed) {
                    path = parsed.path;
                    break;
                }
            }
        }
        return path;
    },
	
	FWK_BUILD = '/',
	FWK_BASE = getBase(),
	
	THEME = null,
	THEME_BUILD = '/',
	THEME_BASE = FWK_BASE + '../themes/',
	
	YUI3_VERSION = '3.8.1',
	YUI3_BUILD = '/',
	YUI3_ROOT = YUI3_VERSION + YUI3_BUILD,
	YUI3_BASE = FWK_BASE + '../../../yui/yui/',
	
	GALLERY_VERSION = '2012.12.12-21-11',
	GALLERY_BUILD = '/',
	GALLERY_BASE = FWK_BASE + '../../../yui/gallery/',
	
	YUI2_VERSION = '2.9.0',
	YUI2_BUILD = '/',
	YUI2_BASE = FWK_BASE + '../../../yui/2in3/',
			
	YUI_CONF = { version: YUI3_VERSION,
					filter: 'min',
					debug: false,
					lang: 'fr',
					root: YUI3_ROOT,
					base: YUI3_BASE + YUI3_ROOT,
					groups: {},
					patterns: {} },
	groups = YUI_CONF.groups,
					
	fwkUpdate = function(base, fwk) {
						groups.fwk.base = (base || FWK_BASE);
					},
	themeUpdate = function(base, theme) {
						groups.theme.base = (base || THEME_BASE);
					},
	yui2Update = function(base, yui2) {
						var root = (yui2 || YUI2_VERSION) + YUI2_BUILD;
						groups.yui2.root = root;
						groups.yui2.base = (base || YUI2_BASE) + root;
					},
	galleryUpdate = function(base, gallery) {
						var root = (gallery || GALLERY_VERSION) + GALLERY_BUILD;
						groups.gallery.root = root;
						groups.gallery.base = (base || GALLERY_BASE) + root;
					};

	
	groups.theme = {
		ext: false,
		combine: false,
		patterns: { 
			'hornet-skin-': {
				configFn: function(me) {
					me.type = 'css';
					me.path = me.path.replace(/\.js/, '.css');
				}
			}
		}
	};
	
	groups.fwk = {
		ext: false,
		combine: false,
		patterns: { 'hornet-': { },
					'lang/hornet-': {} }
	};
	
	groups.gallery = {
		ext: false,
		combine: false,
		patterns: { 'gallery-': { },
					'lang/gallery-': {},
					'gallerycss-': { type: 'css' } }
	};
	
	groups.yui2 = {
		ext: false,
		combine: false,
		patterns: {
			'yui2-': {
				configFn: function(me) {
					if (/-skin|reset|fonts|grids|base/.test(me.name)) {
						me.type = 'css';
						me.path = me.path.replace(/\.js/, '.css');
						me.path = me.path.replace(/\/yui2-skin/,
										 '/assets/skins/sam/yui2-skin');
					}
				}
			}
		}
	};

	themeUpdate();
	fwkUpdate();
	galleryUpdate();
	yui2Update();
	
	return YUI_CONF;
}

var hornet = function(config, newInstance) {
	var _config = config || hornet.getDefaultConfig();
	
	if (!(!!hornet._instance && (hornet._instance instanceof YUI)) || !!newInstance) {
		hornet._instance = YUI(_config);
	} else if(!!config){
		hornet._instance.applyConfig(config);
	}
	return hornet._instance;
};

hornet.getDefaultConfig = function(){
	return hornet_config();
};
