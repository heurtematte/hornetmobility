YUI.add("hornet-hijaxdatasource",function(b){var a=b.YUI2;(function(){var g=a.lang;var c=a.util;var f=c.Event;var e=c.XHRDataSource;var d=c.DataSourceBase;a.namespace("hornet");a.hornet.HijaxDataSource=function(l,j,k){var h,n,o;if(k){h=k["domNode"];n=k["columnToFieldName"];o=k["jsFields"];this.xhrparam=k["xhrparam"];}var i=[],p=false;h=a.util.Dom.get(h);if(h){p=true;var m=new a.util.DataSource(h);m.responseType=a.util.DataSource.TYPE_HTMLTABLE;m.responseSchema={fields:n};m.sendRequest(null,{success:function(s,r){i=r.results;if(o){for(var q=i.length-1;q>=0;q--){var t=i[q];for(key in o){t[key]=o[key][q];}}}}});}a.hornet.HijaxDataSource.superclass.constructor.call(this,l,j);this.domData=i;this.firstrequest=p;};g.extend(a.hornet.HijaxDataSource,e,{domData:null,firstrequest:true,firstresponse:true,makeConnection:function(k,i,j){if(this.firstrequest){this.firstrequest=false;this.firstresponse=true;var l=null;this.fireEvent("requestEvent",{tId:l,request:k,callback:i,caller:j});var h=this.responseType;this.responseType=d.TYPE_JSARRAY;this.handleResponse(k,this.domData,i,j,l);this.responseType=h;}else{this.firstresponse=false;a.hornet.HijaxDataSource.superclass.makeConnection.call(this,k,i,j);}},sendRequest:function(j,h,i){if(this.xhrparam){if(!this.connMethodPost){j=(j?(j+(j.indexOf("?")==-1)?"?":"&"):"?")+this.xhrparam;}else{j=j?(this.xhrparam+"&"+j):this.xhrparam;}}a.hornet.HijaxDataSource.superclass.sendRequest.call(this,j,h,i);}});g.augmentObject(a.hornet.HijaxDataSource,e);})();a.register("hornet-hijaxdatasource",a.hornet.HijaxDataSource,{version:"3.3.0",build:"1389976324000"});},"3.3.0",{requires:["yui2-dom","yui2-datasource","yui2-connection"],skinnable:false});
