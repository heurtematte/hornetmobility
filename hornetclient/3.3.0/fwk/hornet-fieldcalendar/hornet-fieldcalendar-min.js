YUI.add("hornet-fieldcalendar",function(b){var g=b.Lang,j=g.isString,i=g.isBoolean,s=g.isDate,a="button",k="calendar",m="container",f="contentBox",n="element",c="fieldValue",o="displayFormat",h="id",r="iframe",p="strings",l="Invalid Date",q="%d/%m/%Y";function d(u,v){v=v||{};this._clickOutside=null;this._keyESC=null;this._field=null;if(!!u){var w=b.config.doc.getElementById(u);if(w){this._field=w;}}d.superclass.constructor.call(this,v);}function e(v){var u=v;u=u.replace("dd","%d");u=u.replace("MM","%m");u=u.replace("yyyy","%Y");u=u.replace("yy","%y");u=u.replace("HH","%H");u=u.replace("hh","%I");u=u.replace("mm","%M");return u;}function t(v,y){var w,A,u=new Date(),z=y,x=v;while(z.length>1){w=z.substring(0,2);switch(w){case"%d":A=parseInt(x.substring(0,2),10);z=z.substring(2,z.length);x=x.substring(2,x.length);if(!!A&&!isNaN(A)){u.setDate(A);}else{u=null;z="";}break;case"%m":A=parseInt(x.substring(0,2),10);z=z.substring(2,z.length);x=x.substring(2,x.length);if(!!A&&!isNaN(A)){u.setMonth(A-1);}else{u=null;z="";}break;case"%Y":A=parseInt(x.substring(0,4),10);z=z.substring(4,z.length);x=x.substring(4,x.length);if(!!A&&!isNaN(A)){u.setFullYear(A);}else{u=null;z="";}break;case"%y":A=parseInt(x.substring(0,2),10);z=z.substring(2,z.length);x=x.substring(2,x.length);if(!!A&&!isNaN(A)){u.setYear(A);}else{u=null;z="";}break;case"%H":A=parseInt(x.substring(0,2),10);z=z.substring(2,z.length);x=x.substring(2,x.length);if(!!A&&!isNaN(A)){u.setHours(A);}else{u=null;z="";}break;case"%M":A=parseInt(x.substring(0,2),10);z=z.substring(2,z.length);x=x.substring(2,x.length);if(!!A&&!isNaN(A)){u.setMinutes(A);}else{u=null;z="";}break;default:z=z.substring(1,z.length);x=x.substring(1,x.length);}}return u;}d.NAME="hornetFieldcalendar";d.ATTRS={button:{writeOnce:"true",value:null,setter:function(v){var u=b.one(v);if(u){return u;}else{return b.Attribute.INVALID_VALUE;}}},calendar:{writeOnce:"true"},container:{writeOnce:"true",value:null,setter:function(v){if(v){var u=b.one(v);if(u){return u;}}return b.Attribute.INVALID_VALUE;}},displayFormat:{value:q,setter:function(u){var v=e(u);if(v){return v;}else{return b.Attribute.INVALID_VALUE;}},validator:j},element:{writeOnce:"true"},fieldValue:{getter:function(){var u="";if(!!this._field){u=this._field.value;}return u;},setter:function(u){if(!!this._field){this._field.value=u;}}},iframe:{writeOnce:"true",value:false,validator:i},strings:{valueFn:function(){return b.Intl.get("hornet-fieldcalendar");}}};b.extend(d,b.Base,{initializer:function(){var u=this.get(a);if(!!u){u.on("fieldcalendar|click",b.bind(this._openCalendar,this));}},destructor:function(){if(!!this._clickOutside){this._clickOutside.detach();}var u=this.get(a);if(!!u){u.detach("fieldcalendar|click");}},hide:function(){var u=this.get(n);if(!!u){u.hide();}},show:function(){var z=this.get(k),y=this.get(c),x=this.get(a),u=this.get(o);if(!z){z=this._createCalendar();this.set(k,z);}this._selectDate(y||"");z.render();var w=this.get(n);if(!!w){var v=b.one("#"+w.id);this._clickOutside=b.one(b.config.doc.documentElement).on("closefieldcalendar|click",function(A){var B=A.target;if(B!=v&&v.contains(B)!==true&&B!=x&&x.contains(B)!==true){this.hide();}},this);this._keyESC=b.on("keydown",function(A){if(A.keyCode=="27"){this.hide();}},v,this);w.show();}},reset:function(){var u=this.get(k);this._selectDate();u.render();},_selectDate:function(y){var v,w,x,u=this.get(o),z=this.get(k);if(typeof(y)!="undefined"){if(!!y){v=t(y,u);}}else{x=z.getSelectedDates();if(x.length>0){v=x[0];}}if(!!v&&s(v)&&(v!=l)&&!isNaN(v)){w=b.DataType.Date.format(v,{format:q});}else{v=z.today;w="";}z.cfg.setProperty("pagedate",v);z.cfg.setProperty("selected",w||"");},_createCalendar:function(){var u=b.YUI2,F=this.get(p),w=this.get(m),x=this.get(r),z=this.get(a),B=z.get(h),D,v,y,C,E,A={navigator:{strings:{month:F.navigation_month,year:F.navigation_year,submit:F.navigation_submit,cancel:F.navigation_cancel,invalidYear:F.navigation_invalidYear},monthFormat:u.widget.Calendar.LONG,initialFocus:"year"},iframe:false,close:false,LOCALE_WEEKDAYS:"short",START_WEEKDAY:1,MULTI_SELECT:false,DATE_FIELD_DELIMITER:"/",MDY_DAY_POSITION:1,MDY_MONTH_POSITION:2,MDY_YEAR_POSITION:3,MD_DAY_POSITION:1,MD_MONTH_POSITION:2,MONTHS_SHORT:F.months_short,MONTHS_LONG:F.months_long,WEEKDAYS_1CHAR:F.weekdays_1char,WEEKDAYS_SHORT:F.weekdays_short,WEEKDAYS_MEDIUM:F.weekdays_medium,WEEKDAYS_LONG:F.weekdays_long};if(!!w&&!!x){A.visible=false;A.iframe=true;A.close=true;A.title=F.title;C=w.get(h);if(!C){C=b.guid("container-");w.set(h,C);}}else{C=b.guid("container-");E="panel-"+C;D=new u.widget.Dialog(E,{visible:false,context:[B,"tl","bl"],buttons:[{text:F.reset,handler:b.bind(this.reset,this)},{text:F.close,handler:b.bind(this.hide,this),isDefault:true}],modal:true,draggable:false,close:true});D.setHeader(F.title);D.setBody('<div id="'+C+'"></div>');if(w){D.render(w.getDOMNode());}else{D.render(document.body);}}v=new u.widget.Calendar(C,A);v.render();v.selectEvent.subscribe(b.bind(this._onSelect,this));if(D){v.renderEvent.subscribe(function(){D.fireEvent("changeContent");});y=D;}else{y=v;}this.set(n,y);y.hideEvent.subscribe(b.bind(function(){if(!!this._clickOutside){this._clickOutside.detach();}if(!!this._keyESC){this._keyESC.detach();}if(!!this._field){this._field.focus();}},this));return v;},_onSelect:function(){var x=this.get(k),u=this.get(o),v,w="";if(x.getSelectedDates().length>0){v=x.getSelectedDates()[0];w=b.DataType.Date.format(v,{format:u});}this.set(c,w);this.hide();},_openCalendar:function(u){this.show();}});b.namespace("hornet").fieldcalendar=d;},"3.3.0",{skinnable:false,requires:["base-base","node-base","datatype-date","yui2-calendar","yui2-container","yui2-button"],lang:["fr"]});
