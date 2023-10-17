/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
System.register(["./p-629aa3fd.system.js"],(function(n){"use strict";var t,e,r;return{setters:[function(n){t=n.a;e=n.g;r=n.c}],execute:function(){var i=function(){function n(){this.m=new Map}n.prototype.reset=function(n){this.m=new Map(Object.entries(n))};n.prototype.get=function(n,t){var e=this.m.get(n);return e!==undefined?e:t};n.prototype.getBoolean=function(n,t){if(t===void 0){t=false}var e=this.m.get(n);if(e===undefined){return t}if(typeof e==="string"){return e==="true"}return!!e};n.prototype.getNumber=function(n,t){var e=parseFloat(this.m.get(n));return isNaN(e)?t!==undefined?t:NaN:e};n.prototype.set=function(n,t){this.m.set(n,t)};return n}();var o=n("c",new i);var a=function(n){try{var t=n.sessionStorage.getItem(v);return t!==null?JSON.parse(t):{}}catch(n){return{}}};var u=function(n,t){try{n.sessionStorage.setItem(v,JSON.stringify(t))}catch(n){return}};var c=function(n){var t={};n.location.search.slice(1).split("&").map((function(n){return n.split("=")})).map((function(n){var t=n[0],e=n[1];return[decodeURIComponent(t),decodeURIComponent(e)]})).filter((function(n){var t=n[0];return f(t,s)})).map((function(n){var t=n[0],e=n[1];return[t.slice(s.length),e]})).forEach((function(n){var e=n[0],r=n[1];t[e]=r}));return t};var f=function(n,t){return n.substr(0,t.length)===t};var s="ionic:";var v="ionic-persist-config";var d=n("g",(function(n){return m(n)}));var l=n("a",(function(n,t){if(typeof n==="string"){t=n;n=undefined}return d(n).includes(t)}));var m=function(n){if(n===void 0){n=window}if(typeof n==="undefined"){return[]}n.Ionic=n.Ionic||{};var t=n.Ionic.platforms;if(t==null){t=n.Ionic.platforms=p(n);t.forEach((function(t){return n.document.documentElement.classList.add("plt-".concat(t))}))}return t};var p=function(n){var t=o.get("platform");return Object.keys(k).filter((function(e){var r=t===null||t===void 0?void 0:t[e];return typeof r==="function"?r(n):k[e](n)}))};var g=function(n){return M(n)&&!E(n)};var h=function(n){if(x(n,/iPad/i)){return true}if(x(n,/Macintosh/i)&&M(n)){return true}return false};var b=function(n){return x(n,/iPhone/i)};var y=function(n){return x(n,/iPhone|iPod/i)||h(n)};var w=function(n){return x(n,/android|sink/i)};var I=function(n){return w(n)&&!x(n,/mobile/i)};var N=function(n){var t=n.innerWidth;var e=n.innerHeight;var r=Math.min(t,e);var i=Math.max(t,e);return r>390&&r<520&&i>620&&i<800};var O=function(n){var t=n.innerWidth;var e=n.innerHeight;var r=Math.min(t,e);var i=Math.max(t,e);return h(n)||I(n)||r>460&&r<820&&i>780&&i<1400};var M=function(n){return A(n,"(any-pointer:coarse)")};var j=function(n){return!M(n)};var E=function(n){return _(n)||C(n)};var _=function(n){return!!(n["cordova"]||n["phonegap"]||n["PhoneGap"])};var C=function(n){var t=n["Capacitor"];return!!(t===null||t===void 0?void 0:t.isNative)};var P=function(n){return x(n,/electron/i)};var S=function(n){var t;return!!(((t=n.matchMedia)===null||t===void 0?void 0:t.call(n,"(display-mode: standalone)").matches)||n.navigator.standalone)};var x=function(n,t){return t.test(n.navigator.userAgent)};var A=function(n,t){var e;return(e=n.matchMedia)===null||e===void 0?void 0:e.call(n,t).matches};var k={ipad:h,iphone:b,ios:y,android:w,phablet:N,tablet:O,cordova:_,capacitor:C,electron:P,pwa:S,mobile:M,mobileweb:g,desktop:j,hybrid:E};var B;var W=n("b",(function(n){return n&&e(n)||B}));var H=n("i",(function(n){if(n===void 0){n={}}if(typeof window==="undefined"){return}var e=window.document;var i=window;var f=i.Ionic=i.Ionic||{};var s={};if(n._ael){s.ael=n._ael}if(n._rel){s.rel=n._rel}if(n._ce){s.ce=n._ce}t(s);var v=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},a(i)),{persistConfig:false}),f.config),c(i)),n);o.reset(v);if(o.getBoolean("persistConfig")){u(i,v)}m(i);f.config=o;f.mode=B=o.get("mode",e.documentElement.getAttribute("mode")||(l(i,"ios")?"ios":"md"));o.set("mode",B);e.documentElement.setAttribute("mode",B);e.documentElement.classList.add(B);if(o.getBoolean("_testing")){o.set("animated",false)}var d=function(n){var t;return(t=n.tagName)===null||t===void 0?void 0:t.startsWith("ION-")};var p=function(n){return["ios","md"].includes(n)};r((function(n){while(n){var t=n.mode||n.getAttribute("mode");if(t){if(p(t)){return t}else if(d(n)){console.warn('Invalid ionic mode: "'+t+'", expected: "ios" or "md"')}}n=n.parentElement}return B}))}))}}}));