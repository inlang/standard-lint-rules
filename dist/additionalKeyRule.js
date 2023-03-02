var h=(e,t)=>{let[r,n]=e||[];return{level:r===void 0||r===!0?t:r,settings:n}};function W(){throw new Error("setTimeout has not been defined")}function $(){throw new Error("clearTimeout has not been defined")}var U=W,B=$;typeof globalThis.setTimeout=="function"&&(U=setTimeout);typeof globalThis.clearTimeout=="function"&&(B=clearTimeout);function I(e,t){this.fun=e,this.array=t}I.prototype.run=function(){this.fun.apply(null,this.array)};var p=globalThis.performance||{},ne=p.now||p.mozNow||p.msNow||p.oNow||p.webkitNow||function(){return new Date().getTime()};var S;typeof Object.create=="function"?S=function(t,r){t.super_=r,t.prototype=Object.create(r.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:S=function(t,r){t.super_=r;var n=function(){};n.prototype=r.prototype,t.prototype=new n,t.prototype.constructor=t};function f(e,t){var r={seen:[],stylize:k};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),T(t)?r.showHidden=t:t&&Q(r,t),l(r.showHidden)&&(r.showHidden=!1),l(r.depth)&&(r.depth=2),l(r.colors)&&(r.colors=!1),l(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=_),d(r,e,r.depth)}f.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]};f.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"};function _(e,t){var r=f.styles[t];return r?"\x1B["+f.colors[r][0]+"m"+e+"\x1B["+f.colors[r][1]+"m":e}function k(e,t){return e}function H(e){var t={};return e.forEach(function(r,n){t[r]=!0}),t}function d(e,t,r){if(e.customInspect&&t&&x(t.inspect)&&t.inspect!==f&&!(t.constructor&&t.constructor.prototype===t)){var n=t.inspect(r,e);return z(n)||(n=d(e,n,r)),n}var u=J(e,t);if(u)return u;var i=Object.keys(t),o=H(i);if(e.showHidden&&(i=Object.getOwnPropertyNames(t)),v(t)&&(i.indexOf("message")>=0||i.indexOf("description")>=0))return w(t);if(i.length===0){if(x(t)){var s=t.name?": "+t.name:"";return e.stylize("[Function"+s+"]","special")}if(b(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(O(t))return e.stylize(Date.prototype.toString.call(t),"date");if(v(t))return w(t)}var a="",c=!1,g=["{","}"];if(q(t)&&(c=!0,g=["[","]"]),x(t)){var P=t.name?": "+t.name:"";a=" [Function"+P+"]"}if(b(t)&&(a=" "+RegExp.prototype.toString.call(t)),O(t)&&(a=" "+Date.prototype.toUTCString.call(t)),v(t)&&(a=" "+w(t)),i.length===0&&(!c||t.length==0))return g[0]+a+g[1];if(r<0)return b(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special");e.seen.push(t);var y;return c?y=G(e,t,r,o,i):y=i.map(function(F){return L(e,t,r,o,F,c)}),e.seen.pop(),V(y,a,g)}function J(e,t){if(l(t))return e.stylize("undefined","undefined");if(z(t)){var r="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(r,"string")}if(K(t))return e.stylize(""+t,"number");if(T(t))return e.stylize(""+t,"boolean");if(j(t))return e.stylize("null","null")}function w(e){return"["+Error.prototype.toString.call(e)+"]"}function G(e,t,r,n,u){for(var i=[],o=0,s=t.length;o<s;++o)N(t,String(o))?i.push(L(e,t,r,n,String(o),!0)):i.push("");return u.forEach(function(a){a.match(/^\d+$/)||i.push(L(e,t,r,n,a,!0))}),i}function L(e,t,r,n,u,i){var o,s,a;if(a=Object.getOwnPropertyDescriptor(t,u)||{value:t[u]},a.get?a.set?s=e.stylize("[Getter/Setter]","special"):s=e.stylize("[Getter]","special"):a.set&&(s=e.stylize("[Setter]","special")),N(n,u)||(o="["+u+"]"),s||(e.seen.indexOf(a.value)<0?(j(r)?s=d(e,a.value,null):s=d(e,a.value,r-1),s.indexOf(`
`)>-1&&(i?s=s.split(`
`).map(function(c){return"  "+c}).join(`
`).substr(2):s=`
`+s.split(`
`).map(function(c){return"   "+c}).join(`
`))):s=e.stylize("[Circular]","special")),l(o)){if(i&&u.match(/^\d+$/))return s;o=JSON.stringify(""+u),o.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.substr(1,o.length-2),o=e.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),o=e.stylize(o,"string"))}return o+": "+s}function V(e,t,r){var n=0,u=e.reduce(function(i,o){return n++,o.indexOf(`
`)>=0&&n++,i+o.replace(/\u001b\[\d\d?m/g,"").length+1},0);return u>60?r[0]+(t===""?"":t+`
 `)+" "+e.join(`,
  `)+" "+r[1]:r[0]+t+" "+e.join(", ")+" "+r[1]}function q(e){return Array.isArray(e)}function T(e){return typeof e=="boolean"}function j(e){return e===null}function K(e){return typeof e=="number"}function z(e){return typeof e=="string"}function l(e){return e===void 0}function b(e){return m(e)&&R(e)==="[object RegExp]"}function m(e){return typeof e=="object"&&e!==null}function O(e){return m(e)&&R(e)==="[object Date]"}function v(e){return m(e)&&(R(e)==="[object Error]"||e instanceof Error)}function x(e){return typeof e=="function"}function R(e){return Object.prototype.toString.call(e)}function Q(e,t){if(!t||!m(t))return e;for(var r=Object.keys(t),n=r.length;n--;)e[r[n]]=t[r[n]];return e}function N(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var C=(e,t)=>{throw new Error(`unhandled case: '${e}'${t?` for ${f(t)}`:""}`)};var Z=(e,t=!0)=>{let{type:r}=e;switch(r){case"Resource":return X(e,t);case"Message":return M(e,t);case"Pattern":return A(e);default:return C(r,e)}},X=({lint:e,body:t},r)=>[...e||[],...r?t.flatMap(n=>M(n,r)):[]],M=({lint:e,pattern:t},r)=>[...e||[],...r?A(t):[]],A=({lint:e})=>e||[],D=(e,t,r=!0)=>Z(t,r).filter(n=>n.level===e),de=D.bind(void 0,"error"),me=D.bind(void 0,"warn");var E=(e,t,r)=>(...n)=>{let{level:u,settings:i}=h(n,t);return{...r(i),id:e,level:u}};var ze=E("inlang.additionalKey","warn",()=>{let e,t;return{setup:r=>{e=r.context,t=r.referenceLanguage},visitors:{Resource:({target:r})=>{if(r&&r.languageTag.name===t)return"skip"},Message:({target:r,reference:n})=>{!n&&r&&e.report({node:r,message:`Message with id '${r.id.name}' is specified, but missing in the reference`})}}}});export{ze as additionalKeyRule};