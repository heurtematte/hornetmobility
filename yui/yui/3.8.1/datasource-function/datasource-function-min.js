/* YUI 3.8.1 (build 5795) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("datasource-function",function(e,t){var n=e.Lang,r=function(){r.superclass.constructor.apply(this,arguments)};e.mix(r,{NAME:"dataSourceFunction",ATTRS:{source:{validator:n.isFunction}}}),e.extend(r,e.DataSource.Local,{_defRequestFn:function(e){var t=this.get("source"),n=e.details[0];if(t)try{n.data=t(e.request,this,e)}catch(r){n.error=r}else n.error=new Error("Function data failure");return this.fire("data",n),e.tId}}),e.DataSource.Function=r},"3.8.1",{requires:["datasource-local"]});
