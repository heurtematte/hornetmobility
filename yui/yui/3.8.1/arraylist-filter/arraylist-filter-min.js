/* YUI 3.8.1 (build 5795) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("arraylist-filter",function(e,t){e.mix(e.ArrayList.prototype,{filter:function(t){var n=[];return e.Array.each(this._items,function(e,r){e=this.item(r),t(e)&&n.push(e)},this),new this.constructor(n)}})},"3.8.1",{requires:["arraylist"]});
