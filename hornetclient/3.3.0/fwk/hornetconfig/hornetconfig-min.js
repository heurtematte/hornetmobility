function hornet_config(){var w=/(?:\?(?:[^&]*&)*([^&]*))?\b(hornetconfig(?:-\w+)?)\/\2(?:-(min|debug))?\.js/,m=function(B,z){var y=B.match(z),A;if(y){A=RegExp.leftContext||B.slice(0,B.indexOf(y[0]));A={path:A};}return A;},t=function(){var A=(document&&document.getElementsByTagName("script"))||[],C="",z,B,y,D;for(B=0,y=A.length;B<y;++B){D=A[B].src;if(D){z=m(D,w);if(z){C=z.path;break;}}}return C;},o="/",q=t(),k=null,s="/",x=q+"../themes/",l="3.8.1",f="/",r=l+f,g=q+"../../../yui/yui/",e="2012.12.12-21-11",p="/",a=q+"../../../yui/gallery/",b="2.9.0",i="/",d=q+"../../../yui/2in3/",c={version:l,filter:"min",debug:false,lang:"fr",root:r,base:g+r,groups:{},patterns:{}},v=c.groups,u=function(y,z){v.fwk.base=(y||q);},n=function(y,z){v.theme.base=(y||x);},h=function(z,A){var y=(A||b)+i;v.yui2.root=y;v.yui2.base=(z||d)+y;},j=function(A,z){var y=(z||e)+p;v.gallery.root=y;v.gallery.base=(A||a)+y;};v.theme={ext:false,combine:false,patterns:{"hornet-skin-":{configFn:function(y){y.type="css";y.path=y.path.replace(/\.js/,".css");}}}};v.fwk={ext:false,combine:false,patterns:{"hornet-":{},"lang/hornet-":{}}};v.gallery={ext:false,combine:false,patterns:{"gallery-":{},"lang/gallery-":{},"gallerycss-":{type:"css"}}};v.yui2={ext:false,combine:false,patterns:{"yui2-":{configFn:function(y){if(/-skin|reset|fonts|grids|base/.test(y.name)){y.type="css";y.path=y.path.replace(/\.js/,".css");y.path=y.path.replace(/\/yui2-skin/,"/assets/skins/sam/yui2-skin");}}}}};n();u();j();h();return c;}var hornet=function(a,b){var c=a||hornet.getDefaultConfig();if(!(!!hornet._instance&&(hornet._instance instanceof YUI))||!!b){hornet._instance=YUI(c);}else{if(!!a){hornet._instance.applyConfig(a);}}return hornet._instance;};hornet.getDefaultConfig=function(){return hornet_config();};
