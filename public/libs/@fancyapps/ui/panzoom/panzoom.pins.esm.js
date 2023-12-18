const t=(e,...s)=>{const n=s.length;for(let r=0;r<n;r++){const n=s[r]||{};Object.entries(n).forEach((([s,n])=>{const r=Array.isArray(n)?[]:{};var i;e[s]||Object.assign(e,{[s]:r}),"object"==typeof(i=n)&&null!==i&&i.constructor===Object&&"[object Object]"===Object.prototype.toString.call(i)?Object.assign(e[s],t(r,n)):Array.isArray(n)?Object.assign(e,{[s]:[...n]}):Object.assign(e,{[s]:n})}))}return e},e=function(t,e){return t.split(".").reduce(((t,e)=>"object"==typeof t?t[e]:void 0),e)};class s{constructor(t={}){Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.setOptions(t);for(const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))t.startsWith("on")&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}setOptions(e){this.options=e?t({},this.constructor.defaults,e):{};for(const[t,e]of Object.entries(this.option("on")||{}))this.on(t,e)}option(t,...s){let n=e(t,this.options);return n&&"function"==typeof n&&(n=n.call(this,this,...s)),n}optionFor(t,s,n,...r){let i=e(s,t);var o;"string"!=typeof(o=i)||isNaN(o)||isNaN(parseFloat(o))||(i=parseFloat(i)),"true"===i&&(i=!0),"false"===i&&(i=!1),i&&"function"==typeof i&&(i=i.call(this,this,t,...r));let a=e(s,this.options);return a&&"function"==typeof a?i=a.call(this,this,t,...r,i):void 0===i&&(i=a),void 0===i?n:i}cn(t){const e=this.options.classes;return e&&e[t]||""}localize(t,e=[]){t=String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,e,s)=>{let n="";return s?n=this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${s}`):e&&(n=this.option(`l10n.${e}`)),n||(n=t),n}));for(let s=0;s<e.length;s++)t=t.split(e[s][0]).join(e[s][1]);return t=t.replace(/\{\{(.*?)\}\}/g,((t,e)=>e))}on(t,e){let s=[];"string"==typeof t?s=t.split(" "):Array.isArray(t)&&(s=t),this.events||(this.events=new Map),s.forEach((t=>{let s=this.events.get(t);s||(this.events.set(t,[]),s=[]),s.includes(e)||s.push(e),this.events.set(t,s)}))}off(t,e){let s=[];"string"==typeof t?s=t.split(" "):Array.isArray(t)&&(s=t),s.forEach((t=>{const s=this.events.get(t);if(Array.isArray(s)){const t=s.indexOf(e);t>-1&&s.splice(t,1)}}))}emit(t,...e){[...this.events.get(t)||[]].forEach((t=>t(this,...e))),"*"!==t&&this.emit("*",t,...e)}}Object.defineProperty(s,"version",{enumerable:!0,configurable:!0,writable:!0,value:"5.0.31"}),Object.defineProperty(s,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{}});class n extends s{constructor(t,e){super(e),Object.defineProperty(this,"instance",{enumerable:!0,configurable:!0,writable:!0,value:t})}attach(){}detach(){}}class r extends n{constructor(){super(...arguments),Object.defineProperty(this,"container",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"pins",{enumerable:!0,configurable:!0,writable:!0,value:[]})}onTransform(t){for(const s of this.pins){if(!((e=s)&&null!==e&&e instanceof Element&&"nodeType"in e))continue;const{fitWidth:n,fitHeight:r,fullWidth:i,fullHeight:o}=t.contentRect,a=s.dataset.x||"",l=s.dataset.y||"";let c=0,f=0;c=a.includes("%")?n*(parseFloat(a)/100):parseFloat(a)/i*n,c-=.5*n,f=l.includes("%")?r*(parseFloat(l)/100):parseFloat(l)/o*r,f-=.5*r;const h=new DOMPoint(c,f).matrixTransform(t.getMatrix());s.style.transform=`translate3d(${h.x||0}px, ${h.y||0}px, 0)`}var e}attach(){const t=this.instance;this.pins=Array.from(t.container.querySelectorAll("[data-panzoom-pin]")),this.pins.length&&(t.container.classList.add("has-pins"),t.on(["afterTransform","refresh"],this.onTransform))}detach(){const t=this.instance;this.pins=[],t.container.classList.remove("has-pins"),t.off(["afterTransform","refresh"],this.onTransform)}}Object.defineProperty(r,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{}});export{r as Pins};
