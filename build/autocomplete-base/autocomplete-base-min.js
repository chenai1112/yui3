YUI.add("autocomplete-base",function(f){var g=f.Escape,j=f.Lang,q=f.Array,i=f.Object,d=j.isFunction,r=j.isString,u=j.trim,l=f.Attribute.INVALID_VALUE,o="_functionValidator",x="_sourceSuccess",c="allowBrowserAutocomplete",h="inputNode",w="query",e="queryDelimiter",b="requestTemplate",m="results",n="resultListLocator",k="value",s="valueChange",a="clear",t=w,p=m;function v(){f.before(this._bindUIACBase,this,"bindUI");f.before(this._destructorACBase,this,"destructor");f.before(this._syncUIACBase,this,"syncUI");this.publish(a,{defaultFn:this._defClearFn});this.publish(t,{defaultFn:this._defQueryFn});this.publish(p,{defaultFn:this._defResultsFn});}v.ATTRS={allowBrowserAutocomplete:{value:false},allowTrailingDelimiter:{value:false},enableCache:{lazyAdd:false,setter:"_setEnableCache",value:true},inputNode:{setter:f.one,writeOnce:"initOnly"},maxResults:{value:0},minQueryLength:{value:1},query:{readOnly:true,value:null},queryDelay:{value:100},queryDelimiter:{value:null},requestTemplate:{setter:"_setRequestTemplate",value:null},resultFilters:{setter:"_setResultFilters",value:[]},resultFormatter:{validator:o},resultHighlighter:{setter:"_setResultHighlighter"},resultListLocator:{setter:"_setLocator"},results:{readOnly:true,value:[]},resultTextLocator:{setter:"_setLocator"},source:{setter:"_setSource"},sourceType:{value:null},tokenInput:{readOnly:true},value:{value:""}};v.CSS_PREFIX="ac";v.UI_SRC=(f.Widget&&f.Widget.UI_SRC)||"ui";v.SOURCE_TYPES={array:"_createArraySource","function":"_createFunctionSource",object:"_createObjectSource"};v.prototype={clearCache:function(){this._cache&&(this._cache={});return this;},sendRequest:function(A,B){var y,z=this.get("source");if(A||A===""){this._set(w,A);}else{A=this.get(w)||"";}if(z){if(!B){B=this.get(b);}y=B?B.call(this,A):A;z.sendRequest({query:A,request:y,callback:{success:f.bind(this._onResponse,this,A)}});}return this;},_bindUIACBase:function(){var z=this.get(h),y=z&&z.tokenInput;if(y){z=y.get(h);this._set("tokenInput",y);}if(!z){f.error("No inputNode specified.");return;}this._inputNode=z;this._acBaseEvents=new f.EventHandle([z.on(s,this._onInputValueChange,this),z.on("blur",this._onInputBlur,this),this.after(c+"Change",this._syncBrowserAutocomplete),this.after("sourceTypeChange",this._afterSourceTypeChange),this.after(s,this._afterValueChange)]);},_destructorACBase:function(){this._acBaseEvents.detach();},_syncUIACBase:function(){this._syncBrowserAutocomplete();this.set(k,this.get(h).get(k));},_createArraySource:function(z){var y=this;return{type:"array",sendRequest:function(A){y[x](z.concat(),A);}};},_createFunctionSource:function(z){var y=this;return{type:"function",sendRequest:function(A){var B;function C(D){y[x](D||[],A);}if((B=z(A.query,C))){C(B);}}};},_createObjectSource:function(z){var y=this;return{type:"object",sendRequest:function(A){var B=A.query;y[x](i.owns(z,B)?z[B]:[],A);}};},_functionValidator:function(y){return y===null||d(y);},_getObjectValue:function(B,A){if(!B){return;}for(var z=0,y=A.length;B&&z<y;z++){B=B[A[z]];}return B;},_parseResponse:function(A,y,P){var G={data:P,query:A,results:[]},I=this.get(n),H=[],F=y&&y.results,C,z,J,B,O,K,L,M,D,E,N;if(F&&I){F=I.call(this,F);}if(F&&F.length){C=this.get("resultFilters");N=this.get("resultTextLocator");for(K=0,L=F.length;K<L;++K){D=F[K];E=N?N.call(this,D):D.toString();H.push({display:g.html(E),raw:D,text:E});}for(K=0,L=C.length;K<L;++K){H=C[K].call(this,A,H.concat());if(!H){return;}if(!H.length){break;}}if(H.length){J=this.get("resultFormatter");O=this.get("resultHighlighter");M=this.get("maxResults");if(M&&M>0&&H.length>M){H.length=M;}if(O){B=O.call(this,A,H.concat());if(!B){return;}for(K=0,L=B.length;K<L;++K){D=H[K];D.highlighted=B[K];D.display=D.highlighted;}}if(J){z=J.call(this,A,H.concat());if(!z){return;}for(K=0,L=z.length;K<L;++K){H[K].display=z[K];}}}}G.results=H;this.fire(p,G);},_parseValue:function(y){var z=this.get(e);if(z){y=y.split(z);y=y[y.length-1];}return j.trimLeft(y);},_setEnableCache:function(y){this._cache=y?{}:null;},_setLocator:function(y){if(this[o](y)){return y;}var z=this;y=y.toString().split(".");return function(A){return A&&z._getObjectValue(A,y);};},_setRequestTemplate:function(y){if(this[o](y)){return y;}y=y.toString();return function(z){return j.sub(y,{query:encodeURIComponent(z)});};},_setResultFilters:function(A){var y,z;if(A===null){return[];}y=f.AutoCompleteFilters;z=function(B){if(d(B)){return B;}if(r(B)&&y&&d(y[B])){return y[B];}return false;};if(j.isArray(A)){A=q.map(A,z);return q.every(A,function(B){return !!B;})?A:l;}else{A=z(A);return A?[A]:l;}},_setResultHighlighter:function(y){var z;if(this._functionValidator(y)){return y;}z=f.AutoCompleteHighlighters;if(r(y)&&z&&d(z[y])){return z[y];}return l;},_setSource:function(A){var y=this.get("sourceType")||j.type(A),z;if((A&&d(A.sendRequest))||A===null||y==="datasource"){this._rawSource=A;return A;}if((z=v.SOURCE_TYPES[y])){this._rawSource=A;return j.isString(z)?this[z](A):z(A);}f.error("Unsupported source type '"+y+"'. Maybe autocomplete-sources isn't loaded?");return l;},_sourceSuccess:function(z,y){y.callback.success({data:z,response:{results:z}});},_syncBrowserAutocomplete:function(){var y=this.get(h);if(y.get("nodeName").toLowerCase()==="input"){y.setAttribute("autocomplete",this.get(c)?"on":"off");}},_updateValue:function(z){var B=this.get(e),A,y,C;z=j.trimLeft(z);if(B){A=u(B);C=q.map(u(this.get(k)).split(B),u);y=C.length;if(y>1){C[y-1]=z;z=C.join(A+" ");}z=z+A+" ";}this.set(k,z);},_afterSourceTypeChange:function(y){if(this._rawSource){this.set("source",this._rawSource);}},_afterValueChange:function(F){var B=F.newVal,z=this,E=F.src===v.UI_SRC,A,C,y,D;if(!E){z._inputNode.set(k,B);}y=z.get("minQueryLength");D=z._parseValue(B)||"";if(y>=0&&D.length>=y){if(E){A=z.get("queryDelay");C=function(){z.fire(t,{inputValue:B,query:D,src:F.src});};if(A){clearTimeout(z._delay);z._delay=setTimeout(C,A);}else{C();}}else{z._set(w,D);}}else{clearTimeout(z._delay);z.fire(a,{prevVal:F.prevVal?z._parseValue(F.prevVal):null,src:F.src});
}},_onInputBlur:function(B){var C=this.get(e),y,z,A;if(C&&!this.get("allowTrailingDelimiter")){C=j.trimRight(C);A=z=this._inputNode.get(k);if(C){while((z=j.trimRight(z))&&(y=z.length-C.length)&&z.lastIndexOf(C)===y){z=z.substring(0,y);}}else{z=j.trimRight(z);}if(z!==A){this.set(k,z);}}},_onInputValueChange:function(z){var y=z.newVal;if(y!==this.get(k)){this.set(k,y,{src:v.UI_SRC});}},_onResponse:function(y,z){if(y===(this.get(w)||"")){this._parseResponse(y||"",z.response,z.data);}},_defClearFn:function(){this._set(w,null);this._set(m,[]);},_defQueryFn:function(y){this.sendRequest(y.query);},_defResultsFn:function(y){this._set(m,y[m]);}};f.AutoCompleteBase=v;},"@VERSION@",{requires:["array-extras","base-build","escape","event-valuechange","node-base"],optional:["autocomplete-sources"]});