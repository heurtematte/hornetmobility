YUI.add("hornet-autocomplete",function(e){var a=e.AutoCompleteList;var c=function(f){c.superclass.constructor.apply(this,arguments);};c.NAME="hornetAutoComplete";c.ATTRS={strings:{valueFn:function(){return e.Intl.get("hornet-autocomplete");}}};e.extend(c,a,[],{},{});e.namespace("hornet").AutoComplete=c;var c=e.namespace("hornet").AutoComplete,d=e.Lang,b="requestTemplate";e.mix(c.prototype,{_defaultAjaxJsonRequestTemplate:function(h,f){var g=this._inputNode,i="{name}={query}&maxResults={maxResults}";if(f.method&&(f.method.toUpperCase()==="POST")){i=f.data?"&"+i:i;}else{i=((h.indexOf("?")===-1?"?":"&")+i);}return function(j){return d.sub(i,{name:g.getAttribute("name"),query:encodeURIComponent(j),maxResults:this.get("maxResults")});};},_createAjaxJsonSource:function(i){var f=this.get("ajaxConfig")||{},g=this.get("schema"),j=this.get(b),h;f.method=(f.method||"POST");if(!j){this.set(b,this._defaultAjaxJsonRequestTemplate(i,f));}h=new e.DataSource.IO({ioConfig:f,source:i});h.set("io",function(l,k){return e.hornet.Ajax.submitAJAXJsonRequest(k.data,e.merge(k,{url:l}));});if(g){h.plug(e.Plugin.DataSourceJSONSchema,{schema:g});}return h;},_setSource:function(g){var f=this.get("sourceType")||d.type(g);if(f==="ajaxJson"){this._rawSource=g;return this._createAjaxJsonSource(g);}return c.superclass._setSource.apply(this,arguments);}},true);e.mix(c.ATTRS,{ajaxConfig:{writeOnce:"initOnly",value:{}},schema:{writeOnce:"initOnly",value:{resultListLocator:"data"}}});},"3.3.0",{requires:["base-build","autocomplete-list","datasource-io","datasource-jsonschema","hornet-ajax-json"],skinnable:true,lang:["fr"]});
