/* YUI 3.8.1 (build 5795) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("file-flash",function(e,t){var n=function(e){n.superclass.constructor.apply(this,arguments)};e.extend(n,e.Base,{initializer:function(t){this.get("id")||this._set("id",e.guid("file"))},_swfEventHandler:function(e){if(e.id===this.get("id"))switch(e.type){case"uploadstart":this.fire("uploadstart",{uploader:this.get("uploader")});break;case"uploadprogress":this.fire("uploadprogress",{originEvent:e,bytesLoaded:e.bytesLoaded,bytesTotal:e.bytesTotal,percentLoaded:Math.min(100,Math.round(1e4*e.bytesLoaded/e.bytesTotal)/100)}),this._set("bytesUploaded",e.bytesLoaded);break;case"uploadcomplete":this.fire("uploadfinished",{originEvent:e});break;case"uploadcompletedata":this.fire("uploadcomplete",{originEvent:e,data:e.data});break;case"uploadcancel":this.fire("uploadcancel",{originEvent:e});break;case"uploaderror":this.fire("uploaderror",{originEvent:e,status:e.status,statusText:e.message,source:e.source})}},startUpload:function(e,t,n){if(this.get("uploader")){var r=this.get("uploader"),i=n||"Filedata",s=this.get("id"),o=t||null;this._set("bytesUploaded",0),r.on("uploadstart",this._swfEventHandler,this),r.on("uploadprogress",this._swfEventHandler,this),r.on("uploadcomplete",this._swfEventHandler,this),r.on("uploadcompletedata",this._swfEventHandler,this),r.on("uploaderror",this._swfEventHandler,this),r.callSWF("upload",[s,e,o,i])}},cancelUpload:function(){this.get("uploader")&&(this.get("uploader").callSWF("cancel",[this.get("id")]),this.fire("uploadcancel"))}},{NAME:"file",TYPE:"flash",ATTRS:{id:{writeOnce:"initOnly",value:null},size:{writeOnce:"initOnly",value:0},name:{writeOnce:"initOnly",value:null},dateCreated:{writeOnce:"initOnly",value:null},dateModified:{writeOnce:"initOnly",value:null},bytesUploaded:{readOnly:!0,value:0},type:{writeOnce:"initOnly",value:null},uploader:{writeOnce:"initOnly",value:null}}}),e.FileFlash=n},"3.8.1",{requires:["base"]});
