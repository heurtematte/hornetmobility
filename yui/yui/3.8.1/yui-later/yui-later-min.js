/* YUI 3.8.1 (build 5795) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("yui-later",function(e,t){var n=[];e.later=function(t,r,i,s,o){t=t||0,s=e.Lang.isUndefined(s)?n:e.Array(s),r=r||e.config.win||e;var u=!1,a=r&&e.Lang.isString(i)?r[i]:i,f=function(){u||(a.apply?a.apply(r,s||n):a(s[0],s[1],s[2],s[3]))},l=o?setInterval(f,t):setTimeout(f,t);return{id:l,interval:o,cancel:function(){u=!0,this.interval?clearInterval(l):clearTimeout(l)}}},e.Lang.later=e.later},"3.8.1",{requires:["yui-base"]});
