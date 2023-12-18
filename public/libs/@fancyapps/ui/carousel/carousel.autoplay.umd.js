!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).window=e.window||{})}(this,(function(e){"use strict";const t=(e,...s)=>{const n=s.length;for(let i=0;i<n;i++){const n=s[i]||{};Object.entries(n).forEach((([s,n])=>{const i=Array.isArray(n)?[]:{};var o;e[s]||Object.assign(e,{[s]:i}),"object"==typeof(o=n)&&null!==o&&o.constructor===Object&&"[object Object]"===Object.prototype.toString.call(o)?Object.assign(e[s],t(i,n)):Array.isArray(n)?Object.assign(e,{[s]:[...n]}):Object.assign(e,{[s]:n})}))}return e},s=function(e,t){return e.split(".").reduce(((e,t)=>"object"==typeof e?e[t]:void 0),t)};class n{constructor(e={}){Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:e}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.setOptions(e);for(const e of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))e.startsWith("on")&&"function"==typeof this[e]&&(this[e]=this[e].bind(this))}setOptions(e){this.options=e?t({},this.constructor.defaults,e):{};for(const[e,t]of Object.entries(this.option("on")||{}))this.on(e,t)}option(e,...t){let n=s(e,this.options);return n&&"function"==typeof n&&(n=n.call(this,this,...t)),n}optionFor(e,t,n,...i){let o=s(t,e);var r;"string"!=typeof(r=o)||isNaN(r)||isNaN(parseFloat(r))||(o=parseFloat(o)),"true"===o&&(o=!0),"false"===o&&(o=!1),o&&"function"==typeof o&&(o=o.call(this,this,e,...i));let a=s(t,this.options);return a&&"function"==typeof a?o=a.call(this,this,e,...i,o):void 0===o&&(o=a),void 0===o?n:o}cn(e){const t=this.options.classes;return t&&t[e]||""}localize(e,t=[]){e=String(e).replace(/\{\{(\w+).?(\w+)?\}\}/g,((e,t,s)=>{let n="";return s?n=this.option(`${t[0]+t.toLowerCase().substring(1)}.l10n.${s}`):t&&(n=this.option(`l10n.${t}`)),n||(n=e),n}));for(let s=0;s<t.length;s++)e=e.split(t[s][0]).join(t[s][1]);return e=e.replace(/\{\{(.*?)\}\}/g,((e,t)=>t))}on(e,t){let s=[];"string"==typeof e?s=e.split(" "):Array.isArray(e)&&(s=e),this.events||(this.events=new Map),s.forEach((e=>{let s=this.events.get(e);s||(this.events.set(e,[]),s=[]),s.includes(t)||s.push(t),this.events.set(e,s)}))}off(e,t){let s=[];"string"==typeof e?s=e.split(" "):Array.isArray(e)&&(s=e),s.forEach((e=>{const s=this.events.get(e);if(Array.isArray(s)){const e=s.indexOf(t);e>-1&&s.splice(e,1)}}))}emit(e,...t){[...this.events.get(e)||[]].forEach((e=>e(this,...t))),"*"!==e&&this.emit("*",e,...t)}}Object.defineProperty(n,"version",{enumerable:!0,configurable:!0,writable:!0,value:"5.0.31"}),Object.defineProperty(n,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{}});class i extends n{constructor(e,t){super(t),Object.defineProperty(this,"instance",{enumerable:!0,configurable:!0,writable:!0,value:e})}attach(){}detach(){}}const o=e=>`${e||""}`.split(" ").filter((e=>!!e)),r=(e,t)=>{e&&o(t).forEach((t=>{e.classList.add(t)}))},a="play",l="pause",c="ready";class u extends i{constructor(){super(...arguments),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:c}),Object.defineProperty(this,"inHover",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"timer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"progressBar",{enumerable:!0,configurable:!0,writable:!0,value:null})}get isActive(){return this.state!==c}onReady(e){this.option("autoStart")&&(e.isInfinite||e.page<e.pages.length-1)&&this.start()}onChange(){this.removeProgressBar(),this.pause()}onSettle(){this.resume()}onVisibilityChange(){"visible"===document.visibilityState?this.resume():this.pause()}onMouseEnter(){this.inHover=!0,this.pause()}onMouseLeave(){var e;this.inHover=!1,(null===(e=this.instance.panzoom)||void 0===e?void 0:e.isResting)&&this.resume()}onTimerEnd(){const e=this.instance;"play"===this.state&&(e.isInfinite||e.page!==e.pages.length-1?e.slideNext():e.slideTo(0))}removeProgressBar(){this.progressBar&&(this.progressBar.remove(),this.progressBar=null)}createProgressBar(){var e;if(!this.option("showProgress"))return null;this.removeProgressBar();const t=this.instance,s=(null===(e=t.pages[t.page])||void 0===e?void 0:e.slides)||[];let n=this.option("progressParentEl");if(n||(n=(1===s.length?s[0].el:null)||t.viewport),!n)return null;const i=document.createElement("div");return r(i,"f-progress"),n.prepend(i),this.progressBar=i,i.offsetHeight,i}set(){const e=this,t=e.instance;if(t.pages.length<2)return;if(e.timer)return;const s=e.option("timeout");e.state=a,r(t.container,"has-autoplay");let n=e.createProgressBar();n&&(n.style.transitionDuration=`${s}ms`,n.style.transform="scaleX(1)"),e.timer=setTimeout((()=>{e.timer=null,e.inHover||e.onTimerEnd()}),s),e.emit("set")}clear(){const e=this;e.timer&&(clearTimeout(e.timer),e.timer=null),e.removeProgressBar()}start(){const e=this;if(e.set(),e.state!==c){if(e.option("pauseOnHover")){const t=e.instance.container;t.addEventListener("mouseenter",e.onMouseEnter,!1),t.addEventListener("mouseleave",e.onMouseLeave,!1)}document.addEventListener("visibilitychange",e.onVisibilityChange,!1),e.emit("start")}}stop(){const e=this,t=e.state,s=e.instance.container;var n,i;e.clear(),e.state=c,s.removeEventListener("mouseenter",e.onMouseEnter,!1),s.removeEventListener("mouseleave",e.onMouseLeave,!1),document.removeEventListener("visibilitychange",e.onVisibilityChange,!1),i="has-autoplay",(n=s)&&o(i).forEach((e=>{n.classList.remove(e)})),t!==c&&e.emit("stop")}pause(){const e=this;e.state===a&&(e.state=l,e.clear(),e.emit(l))}resume(){const e=this,t=e.instance;if(t.isInfinite||t.page!==t.pages.length-1)if(e.state!==a){if(e.state===l&&!e.inHover){const t=new Event("resume",{bubbles:!0,cancelable:!0});e.emit("resume",t),t.defaultPrevented||e.set()}}else e.set();else e.stop()}toggle(){this.state===a||this.state===l?this.stop():this.start()}attach(){const e=this,t=e.instance;t.on("ready",e.onReady),t.on("Panzoom.startAnimation",e.onChange),t.on("Panzoom.endAnimation",e.onSettle),t.on("Panzoom.touchMove",e.onChange)}detach(){const e=this,t=e.instance;t.off("ready",e.onReady),t.off("Panzoom.startAnimation",e.onChange),t.off("Panzoom.endAnimation",e.onSettle),t.off("Panzoom.touchMove",e.onChange),e.stop()}}Object.defineProperty(u,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{autoStart:!0,pauseOnHover:!0,progressParentEl:null,showProgress:!0,timeout:3e3}}),e.Autoplay=u}));
