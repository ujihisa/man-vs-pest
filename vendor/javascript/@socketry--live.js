import e from"morphdom";class Live{#e;#t;#i;#s;#r;#n;static start(e={}){let t=e.window||globalThis;let i=e.path||"live";let s=e.base||t.location.href;let r=new URL(i,s);r.protocol=r.protocol.replace("http","ws");return new this(t,r)}constructor(e,t){this.#e=e;this.#t=e.document;this.url=t;this.#i=null;this.#s=[];this.#r=0;this.#n=null;this.#t.addEventListener("visibilitychange",(()=>this.#o()));this.#o();const i=this.#e.Node.ELEMENT_NODE;this.observer=new this.#e.MutationObserver(((e,t)=>{for(let t of e)if(t.type==="childList"){for(let e of t.removedNodes)if(e.nodeType===i){e.classList?.contains("live")&&this.#l(e);for(let t of e.getElementsByClassName("live"))this.#l(t)}for(let e of t.addedNodes)if(e.nodeType===i){e.classList.contains("live")&&this.#h(e);for(let t of e.getElementsByClassName("live"))this.#h(t)}}}));this.observer.observe(this.#t.body,{childList:true,subtree:true})}connect(){if(this.#i)return this.#i;let e=this.#i=new this.#e.WebSocket(this.url);if(this.#n){clearTimeout(this.#n);this.#n=null}e.onopen=()=>{this.#r=0;this.#c();this.#a()};e.onmessage=e=>{const[t,...i]=JSON.parse(e.data);this[t](...i)};e.addEventListener("error",(()=>{this.#r+=1}));e.addEventListener("close",(()=>{if(this.#i&&!this.#n){const e=Math.min(100*this.#r**2,6e4);this.#n=setTimeout((()=>{this.#n=null;this.connect()}),e)}this.#i===e&&(this.#i=null)}));return e}disconnect(){if(this.#i){const e=this.#i;this.#i=null;e.close()}if(this.#n){clearTimeout(this.#n);this.#n=null}}#d(e){if(this.#i)try{return this.#i.send(e)}catch(e){}this.#s.push(e)}#c(){if(this.#s.length===0)return;let e=this.#s;this.#s=[];for(var t of e)this.#d(t)}#o(){this.#t.hidden?this.disconnect():this.connect()}#h(e){console.log("bind",e.id,e.dataset);this.#d(JSON.stringify(["bind",e.id,e.dataset]))}#l(e){console.log("unbind",e.id,e.dataset);this.#i&&this.#d(JSON.stringify(["unbind",e.id]))}#a(){for(let e of this.#t.getElementsByClassName("live"))this.#h(e)}#u(e){return this.#t.createRange().createContextualFragment(e)}#m(e,...t){e?.reply&&this.#d(JSON.stringify(["reply",e.reply,...t]))}script(e,t,i){let s=this.#t.getElementById(e);try{let e=this.#e.Function(t).call(s);this.#m(i,e)}catch(e){this.#m(i,null,{name:e.name,message:e.message,stack:e.stack})}}update(t,i,s){let r=this.#t.getElementById(t);let n=this.#u(i);e(r,n);this.#m(s)}replace(t,i,s){let r=this.#t.querySelectorAll(t);let n=this.#u(i);r.forEach((t=>e(t,n.cloneNode(true))));this.#m(s)}prepend(e,t,i){let s=this.#t.querySelectorAll(e);let r=this.#u(t);s.forEach((e=>e.prepend(r.cloneNode(true))));this.#m(i)}append(e,t,i){let s=this.#t.querySelectorAll(e);let r=this.#u(t);s.forEach((e=>e.append(r.cloneNode(true))));this.#m(i)}remove(e,t){let i=this.#t.querySelectorAll(e);i.forEach((e=>e.remove()));this.#m(t)}dispatchEvent(e,t,i){let s=this.#t.querySelectorAll(e);s.forEach((e=>e.dispatchEvent(new this.#e.CustomEvent(t,i))));this.#m(i)}error(e){console.error("Live.error",...arguments)}forward(e,t){this.connect();this.#d(JSON.stringify(["event",e,t]))}forwardEvent(e,t,i,s=false){s&&t.preventDefault();this.forward(e,{type:t.type,detail:i})}forwardFormEvent(e,t,i,s=true){s&&t.preventDefault();let r=t.form;let n=new FormData(r);this.forward(e,{type:t.type,detail:i,formData:[...n]})}}export{Live};

