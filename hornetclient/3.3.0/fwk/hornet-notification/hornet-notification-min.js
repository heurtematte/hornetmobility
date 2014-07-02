YUI.add("hornet-notification",function(e){var c=e.Lang,a=c.isString,b=c.isBoolean;function d(f){d.superclass.constructor.apply(this,arguments);}d.resetNotifications=function(f){e.all(f||".messageBox").each(function(g){g.setContent("");});};d.writeNotifications=function(q,k,i){i=e.mix(i||{},{reset:true});var r=i.focus,p=i.title,m=i.reset;if(e.Lang.isArray(k)&&k.length>0){var l=e.one(q);if(!!l){var g=l.one("> div");if(!g){g=e.Node.create("<div/>");l.append(g);}else{if(!!m){g.setContent("");}else{p=null;}}if(!!p){var j=e.Node.create(p);g.prepend(j);}var n=g.one("ul");if(!n){n=e.Node.create("<ul/>");g.append(n);}else{if(!!m){n.setContent("");}}var f;for(f=0;f<k.length;f++){var h=k[f]||"";n.append("<li>"+h+"</li>");}if(!!r){var o=l.get("id");if(!!o){o=e.guid();l.set("id",o);}document.location.href="#"+o;}}}};d.addFocusForAnchorLinks=function(f,g,h,i){g=g||".messageBox a";h=h||"#";e.detach(f,"focusForAnchorLinks|click");e.delegate("focusForAnchorLinks|click",function(o){o.halt();var m=o.target.getAttribute("href"),l,k,j;if(!!m){j=m;if(!!h){l=j.indexOf(h,0);if(l!=-1){j=j.substring(l+h.length);}}if(!!i){l=j.indexOf(i,0);if(l!=-1){j=j.substring(0,l);}}if(!!j){k=e.one('[id="'+j+'"],[name="'+j+'"]');}}if(!!k){k.scrollIntoView();try{k.focus();}catch(n){}try{k.select();}catch(n){}}},f,g);};d.NAME="notification";d.ATTRS={zoneInfo:{value:".infoBox",setter:function(g){if(g){var f=e.one(g);if(f){return f;}}return e.Attribute.INVALID_VALUE;}},zoneError:{value:".errorBox",setter:function(g){if(g){var f=e.one(g);if(f){return f;}}return e.Attribute.INVALID_VALUE;}},titleInfo:{validator:a},titleError:{validator:a},focusNotifications:{value:true,validator:b},focus:{getter:function(){return this.get("focusNotifications");},setter:function(f){return this.set("focusNotifications",f);}},resetNotifications:{value:true,validator:b}};e.extend(d,e.Base,{initializer:function(){},destructor:function(){},reset:function(){d.resetNotifications(this.get("zoneInfo"));d.resetNotifications(this.get("zoneError"));},writeInfos:function(f){if(f){f=e.Lang.isArray(f)?f:[f];if(f.length>0){d.writeNotifications(this.get("zoneInfo"),f,{reset:this.get("resetNotifications"),focus:this.get("focusNotifications"),title:this.get("titleInfo")});}}},writeErrors:function(f){if(f){f=e.Lang.isArray(f)?f:[f];if(f.length>0){d.writeNotifications(this.get("zoneError"),f,{reset:this.get("resetNotifications"),focus:this.get("focusNotifications"),title:this.get("titleError")});}}}});e.namespace("hornet").Notification=d;},"3.3.0",{skinnable:false,requires:["base-base","node-base","event-delegate"]});
