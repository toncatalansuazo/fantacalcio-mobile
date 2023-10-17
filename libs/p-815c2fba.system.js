var __spreadArray=this&&this.__spreadArray||function(e,r,a){if(a||arguments.length===2)for(var i=0,n=r.length,t;i<n;i++){if(t||!(i in r)){if(!t)t=Array.prototype.slice.call(r,0,i);t[i]=r[i]}}return e.concat(t||Array.prototype.slice.call(r))};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */System.register([],(function(e){"use strict";return{execute:function(){var r=e("t",(function(e,r){if(r===void 0){r=0}return new Promise((function(i){a(e,r,i)}))}));var a=function(e,r,a){if(r===void 0){r=0}var i;var n;var t={passive:true};var o=500;var u=function(){if(i){i()}};var l=function(r){if(r===undefined||e===r.target){u();a(r)}};if(e){e.addEventListener("webkitTransitionEnd",l,t);e.addEventListener("transitionend",l,t);n=setTimeout(l,r+o);i=function(){if(n){clearTimeout(n);n=undefined}e.removeEventListener("webkitTransitionEnd",l,t);e.removeEventListener("transitionend",l,t)}}return u};var i=e("c",(function(e,r){if(e.componentOnReady){e.componentOnReady().then((function(e){return r(e)}))}else{f((function(){return r(e)}))}}));var n=e("m",(function(e){return e.componentOnReady!==undefined}));var t=e("k",(function(e,r){if(r===void 0){r=[]}var a={};r.forEach((function(r){if(e.hasAttribute(r)){var i=e.getAttribute(r);if(i!==null){a[r]=e.getAttribute(r)}e.removeAttribute(r)}}));return a}));var o=["role","aria-activedescendant","aria-atomic","aria-autocomplete","aria-braillelabel","aria-brailleroledescription","aria-busy","aria-checked","aria-colcount","aria-colindex","aria-colindextext","aria-colspan","aria-controls","aria-current","aria-describedby","aria-description","aria-details","aria-disabled","aria-errormessage","aria-expanded","aria-flowto","aria-haspopup","aria-hidden","aria-invalid","aria-keyshortcuts","aria-label","aria-labelledby","aria-level","aria-live","aria-multiline","aria-multiselectable","aria-orientation","aria-owns","aria-placeholder","aria-posinset","aria-pressed","aria-readonly","aria-relevant","aria-required","aria-roledescription","aria-rowcount","aria-rowindex","aria-rowindextext","aria-rowspan","aria-selected","aria-setsize","aria-sort","aria-valuemax","aria-valuemin","aria-valuenow","aria-valuetext"];var u=e("i",(function(e,r){var a=o;if(r&&r.length>0){a=a.filter((function(e){return!r.includes(e)}))}return t(e,a)}));var l=e("a",(function(e,r,a,i){var n;if(typeof window!=="undefined"){var t=window;var o=(n=t===null||t===void 0?void 0:t.Ionic)===null||n===void 0?void 0:n.config;if(o){var u=o.get("_ael");if(u){return u(e,r,a,i)}else if(o._ael){return o._ael(e,r,a,i)}}}return e.addEventListener(r,a,i)}));var c=e("b",(function(e,r,a,i){var n;if(typeof window!=="undefined"){var t=window;var o=(n=t===null||t===void 0?void 0:t.Ionic)===null||n===void 0?void 0:n.config;if(o){var u=o.get("_rel");if(u){return u(e,r,a,i)}else if(o._rel){return o._rel(e,r,a,i)}}}return e.removeEventListener(r,a,i)}));var d=e("g",(function(e,r){if(r===void 0){r=e}return e.shadowRoot||r}));var f=e("r",(function(e){if(typeof __zone_symbol__requestAnimationFrame==="function"){return __zone_symbol__requestAnimationFrame(e)}if(typeof requestAnimationFrame==="function"){return requestAnimationFrame(e)}return setTimeout(e)}));var s=e("n",(function(e){return!!e.shadowRoot&&!!e.attachShadow}));var v=e("h",(function(e){var r=e.closest("ion-item");if(r){return r.querySelector("ion-label")}return null}));var m=e("f",(function(e){e.focus();if(e.classList.contains("ion-focusable")){var r=e.closest("ion-app");if(r){r.setFocus([e])}}}));var p=e("e",(function(e,r){var a;var i=e.getAttribute("aria-labelledby");var n=e.id;var t=i!==null&&i.trim()!==""?i:r+"-lbl";var o=i!==null&&i.trim()!==""?document.getElementById(i):v(e);if(o){if(i===null){o.id=t}a=o.textContent;o.setAttribute("aria-hidden","true")}else if(n.trim()!==""){o=document.querySelector('label[for="'.concat(n,'"]'));if(o){if(o.id!==""){t=o.id}else{o.id=t="".concat(n,"-lbl")}a=o.textContent}}return{label:o,labelId:t,labelText:a}}));var b=e("d",(function(e,r,a,i,n){if(e||s(r)){var t=r.querySelector("input.aux-input");if(!t){t=r.ownerDocument.createElement("input");t.type="hidden";t.classList.add("aux-input");r.appendChild(t)}t.disabled=n;t.name=a;t.value=i||""}}));var y=e("l",(function(e,r,a){return Math.max(e,Math.min(r,a))}));var h=e("o",(function(e,r){if(!e){var a="ASSERT: "+r;console.error(a);debugger;throw new Error(a)}}));var g=e("u",(function(e){return e.timeStamp||Date.now()}));var w=e("v",(function(e){if(e){var r=e.changedTouches;if(r&&r.length>0){var a=r[0];return{x:a.clientX,y:a.clientY}}if(e.pageX!==undefined){return{x:e.pageX,y:e.pageY}}}return{x:0,y:0}}));var _=e("p",(function(e){var r=document.dir==="rtl";switch(e){case"start":return r;case"end":return!r;default:throw new Error('"'.concat(e,'" is not a valid value for [side]. Use "start" or "end" instead.'))}}));var x=e("j",(function(e,r){var a=e._original||e;return{_original:e,emit:A(a.emit.bind(a),r)}}));var A=e("q",(function(e,r){if(r===void 0){r=0}var a;return function(){var i=[];for(var n=0;n<arguments.length;n++){i[n]=arguments[n]}clearTimeout(a);a=setTimeout.apply(void 0,__spreadArray([e,r],i,false))}}));var E=e("s",(function(e,r){e!==null&&e!==void 0?e:e={};r!==null&&r!==void 0?r:r={};if(e===r){return true}var a=Object.keys(e);if(a.length!==Object.keys(r).length){return false}for(var i=0,n=a;i<n.length;i++){var t=n[i];if(!(t in r)){return false}if(e[t]!==r[t]){return false}}return true}))}}}));