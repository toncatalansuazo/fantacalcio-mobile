var __awaiter=this&&this.__awaiter||function(e,t,r,o){function n(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,i){function a(e){try{p(o.next(e))}catch(e){i(e)}}function s(e){try{p(o["throw"](e))}catch(e){i(e)}}function p(e){e.done?r(e.value):n(e.value).then(a,s)}p((o=o.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},o,n,i,a;return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(e){return function(t){return p([e,t])}}function p(s){if(o)throw new TypeError("Generator is already executing.");while(a&&(a=0,s[0]&&(r=0)),r)try{if(o=1,n&&(i=s[0]&2?n["return"]:s[0]?n["throw"]||((i=n["return"])&&i.call(n),0):n.next)&&!(i=i.call(n,s[1])).done)return i;if(n=0,i)s=[s[0]&2,i.value];switch(s[0]){case 0:case 1:i=s;break;case 4:r.label++;return{value:s[1],done:false};case 5:r.label++;n=s[1];s=[0];continue;case 7:s=r.ops.pop();r.trys.pop();continue;default:if(!(i=r.trys,i=i.length>0&&i[i.length-1])&&(s[0]===6||s[0]===2)){r=0;continue}if(s[0]===3&&(!i||s[1]>i[0]&&s[1]<i[3])){r.label=s[1];break}if(s[0]===6&&r.label<i[1]){r.label=i[1];i=s;break}if(i&&r.label<i[2]){r.label=i[2];r.ops.push(s);break}if(i[2])r.ops.pop();r.trys.pop();continue}s=t.call(e,r)}catch(e){s=[6,e];n=0}finally{o=i=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */System.register(["./p-629aa3fd.system.js","./p-613d4042.system.js","./p-815c2fba.system.js","./p-772f6c84.system.js","./p-479cdbf8.system.js","./p-8f01a9a2.system.js","./p-939e0fa1.system.js","./p-44bc8b45.system.js","./p-128a98e8.system.js","./p-015187e5.system.js","./p-0e94957a.system.js","./p-8c15eda7.system.js"],(function(e){"use strict";var t,r,o,n,i,a,s,p,c,d,l,f,v,u,h,g,m,w,b,y,x,k,P,D,T,E,S;return{setters:[function(e){t=e.r;r=e.d;o=e.h;n=e.H;i=e.f},function(e){a=e.C;s=e.a;p=e.d},function(e){c=e.r;d=e.g;l=e.a;f=e.m},function(e){v=e.c},function(e){u=e.p},function(e){h=e.B;g=e.j;m=e.k;w=e.f;b=e.o;y=e.g;x=e.h},function(e){k=e.b;P=e.a},function(e){D=e.g},function(e){T=e.e;E=e.w},function(e){S=e.c},function(){},function(){}],execute:function(){var I=this;var A=function(e){if(!e){return{arrowWidth:0,arrowHeight:0}}var t=e.getBoundingClientRect(),r=t.width,o=t.height;return{arrowWidth:r,arrowHeight:o}};var _=function(e,t,r){var o=t.getBoundingClientRect();var n=o.height;var i=o.width;if(e==="cover"&&r){var a=r.getBoundingClientRect();i=a.width}return{contentWidth:i,contentHeight:n}};var C=function(e,t,r,o){var n=[];var i=d(o);var a=i.querySelector(".popover-content");switch(t){case"hover":n=[{eventName:"mouseenter",callback:function(t){var o=document.elementFromPoint(t.clientX,t.clientY);if(o===e){return}r.dismiss(undefined,undefined,false)}}];break;case"context-menu":case"click":default:n=[{eventName:"click",callback:function(t){var o=t.target;var n=o.closest("[data-ion-popover-trigger]");if(n===e){t.stopPropagation();return}r.dismiss(undefined,undefined,false)}}];break}n.forEach((function(e){var t=e.eventName,r=e.callback;return a.addEventListener(t,r)}));return function(){n.forEach((function(e){var t=e.eventName,r=e.callback;return a.removeEventListener(t,r)}))}};var L=function(e,t,r){var o=[];switch(t){case"hover":var n;o=[{eventName:"mouseenter",callback:function(e){return __awaiter(I,void 0,void 0,(function(){return __generator(this,(function(t){e.stopPropagation();if(n){clearTimeout(n)}n=setTimeout((function(){c((function(){r.presentFromTrigger(e);n=undefined}))}),100);return[2]}))}))}},{eventName:"mouseleave",callback:function(e){if(n){clearTimeout(n)}var t=e.relatedTarget;if(!t){return}if(t.closest("ion-popover")!==r){r.dismiss(undefined,undefined,false)}}},{eventName:"click",callback:function(e){return e.stopPropagation()}},{eventName:"ionPopoverActivateTrigger",callback:function(e){return r.presentFromTrigger(e,true)}}];break;case"context-menu":o=[{eventName:"contextmenu",callback:function(e){e.preventDefault();r.presentFromTrigger(e)}},{eventName:"click",callback:function(e){return e.stopPropagation()}},{eventName:"ionPopoverActivateTrigger",callback:function(e){return r.presentFromTrigger(e,true)}}];break;case"click":default:o=[{eventName:"click",callback:function(e){return r.presentFromTrigger(e)}},{eventName:"ionPopoverActivateTrigger",callback:function(e){return r.presentFromTrigger(e,true)}}];break}o.forEach((function(t){var r=t.eventName,o=t.callback;return e.addEventListener(r,o)}));e.setAttribute("data-ion-popover-trigger","true");return function(){o.forEach((function(t){var r=t.eventName,o=t.callback;return e.removeEventListener(r,o)}));e.removeAttribute("data-ion-popover-trigger")}};var W=function(e,t){if(!t||t.tagName!=="ION-ITEM"){return-1}return e.findIndex((function(e){return e===t}))};var O=function(e,t){var r=W(e,t);return e[r+1]};var N=function(e,t){var r=W(e,t);return e[r-1]};var j=function(e){var t=d(e);var r=t.querySelector("button");if(r){c((function(){return r.focus()}))}};var q=function(e){return e.hasAttribute("data-ion-popover-trigger")};var X=function(e){var t=function(t){return __awaiter(I,void 0,void 0,(function(){var r,o,n,i,a,s,p,c,d,l,f;return __generator(this,(function(v){switch(v.label){case 0:o=document.activeElement;n=[];i=(r=t.target)===null||r===void 0?void 0:r.tagName;if(i!=="ION-POPOVER"&&i!=="ION-ITEM"){return[2]}try{n=Array.from(e.querySelectorAll("ion-item:not(ion-popover ion-popover *):not([disabled])"))}catch(e){}a=t.key;switch(a){case"ArrowLeft":return[3,1];case"ArrowDown":return[3,3];case"ArrowUp":return[3,4];case"Home":return[3,5];case"End":return[3,6];case"ArrowRight":return[3,7];case" ":return[3,7];case"Enter":return[3,7]}return[3,8];case 1:return[4,e.getParentPopover()];case 2:s=v.sent();if(s){e.dismiss(undefined,undefined,false)}return[3,8];case 3:t.preventDefault();p=O(n,o);if(p!==undefined){j(p)}return[3,8];case 4:t.preventDefault();c=N(n,o);if(c!==undefined){j(c)}return[3,8];case 5:t.preventDefault();d=n[0];if(d!==undefined){j(d)}return[3,8];case 6:t.preventDefault();l=n[n.length-1];if(l!==undefined){j(l)}return[3,8];case 7:if(o&&q(o)){f=new CustomEvent("ionPopoverActivateTrigger");o.dispatchEvent(f)}return[3,8];case 8:return[2]}}))}))};e.addEventListener("keydown",t);return function(){return e.removeEventListener("keydown",t)}};var Y=function(e,t,r,o,n,i,a,s,p,c,d){var l;var f={top:0,left:0,width:0,height:0};switch(i){case"event":if(!d){return p}var v=d;f={top:v.clientY,left:v.clientX,width:1,height:1};break;case"trigger":default:var u=d;var h=c||((l=u===null||u===void 0?void 0:u.detail)===null||l===void 0?void 0:l.ionShadowTarget)||(u===null||u===void 0?void 0:u.target);if(!h){return p}var g=h.getBoundingClientRect();f={top:g.top,left:g.left,width:g.width,height:g.height};break}var m=V(a,f,t,r,o,n,e);var w=F(s,a,f,t,r);var b=m.top+w.top;var y=m.left+w.left;var x=M(a,o,n,b,y,t,r,e),k=x.arrowTop,P=x.arrowLeft;var D=z(a,s,e),T=D.originX,E=D.originY;return{top:b,left:y,referenceCoordinates:f,arrowTop:k,arrowLeft:P,originX:T,originY:E}};var z=function(e,t,r){switch(e){case"top":return{originX:B(t),originY:"bottom"};case"bottom":return{originX:B(t),originY:"top"};case"left":return{originX:"right",originY:H(t)};case"right":return{originX:"left",originY:H(t)};case"start":return{originX:r?"left":"right",originY:H(t)};case"end":return{originX:r?"right":"left",originY:H(t)}}};var B=function(e){switch(e){case"start":return"left";case"center":return"center";case"end":return"right"}};var H=function(e){switch(e){case"start":return"top";case"center":return"center";case"end":return"bottom"}};var M=function(e,t,r,o,n,i,a,s){var p={arrowTop:o+a/2-t/2,arrowLeft:n+i-t/2};var c={arrowTop:o+a/2-t/2,arrowLeft:n-t*1.5};switch(e){case"top":return{arrowTop:o+a,arrowLeft:n+i/2-t/2};case"bottom":return{arrowTop:o-r,arrowLeft:n+i/2-t/2};case"left":return p;case"right":return c;case"start":return s?c:p;case"end":return s?p:c;default:return{arrowTop:0,arrowLeft:0}}};var V=function(e,t,r,o,n,i,a){var s={top:t.top,left:t.left-r-n};var p={top:t.top,left:t.left+t.width+n};switch(e){case"top":return{top:t.top-o-i,left:t.left};case"right":return p;case"bottom":return{top:t.top+t.height+i,left:t.left};case"left":return s;case"start":return a?p:s;case"end":return a?s:p}};var F=function(e,t,r,o,n){switch(e){case"center":return K(t,r,o,n);case"end":return R(t,r,o,n);case"start":default:return{top:0,left:0}}};var R=function(e,t,r,o){switch(e){case"start":case"end":case"left":case"right":return{top:-(o-t.height),left:0};case"top":case"bottom":default:return{top:0,left:-(r-t.width)}}};var K=function(e,t,r,o){switch(e){case"start":case"end":case"left":case"right":return{top:-(o/2-t.height/2),left:0};case"top":case"bottom":default:return{top:0,left:-(r/2-t.width/2)}}};var G=function(e,t,r,o,n,i,a,s,p,c,d,l,f,v,u){if(f===void 0){f=0}if(v===void 0){v=0}if(u===void 0){u=0}var h=f;var g=v;var m=r;var w=t;var b;var y=c;var x=d;var k=false;var P=false;var D=l?l.top+l.height:i/2-s/2;var T=l?l.height:0;var E=false;if(m<o+p){m=o;k=true;y="left"}else if(a+o+m+p>n){P=true;m=n-a-o;y="right"}if(D+T+s>i&&(e==="top"||e==="bottom")){if(D-s>0){w=Math.max(12,D-s-T-(u-1));h=w+s;x="bottom";E=true}else{b=o}}return{top:w,left:m,bottom:b,originX:y,originY:x,checkSafeAreaLeft:k,checkSafeAreaRight:P,arrowTop:h,arrowLeft:g,addPopoverBottomClass:E}};var U=function(e,t,r,o){if(t===void 0){t=false}if(!r&&!o){return false}if(e!=="top"&&e!=="bottom"&&t){return false}return true};var J=5;var Q=function(e,t){var r;var o=t.event,n=t.size,i=t.trigger,a=t.reference,s=t.side,p=t.align;var c=e.ownerDocument;var l=c.dir==="rtl";var f=c.defaultView.innerWidth;var v=c.defaultView.innerHeight;var u=d(e);var h=u.querySelector(".popover-content");var g=u.querySelector(".popover-arrow");var m=i||((r=o===null||o===void 0?void 0:o.detail)===null||r===void 0?void 0:r.ionShadowTarget)||(o===null||o===void 0?void 0:o.target);var w=_(n,h,m),b=w.contentWidth,y=w.contentHeight;var x=A(g),k=x.arrowWidth,P=x.arrowHeight;var D={top:v/2-y/2,left:f/2-b/2,originX:l?"right":"left",originY:"top"};var T=Y(l,b,y,k,P,a,s,p,D,i,o);var E=n==="cover"?0:J;var I=n==="cover"?0:25;var C=G(s,T.top,T.left,E,f,v,b,y,I,T.originX,T.originY,T.referenceCoordinates,T.arrowTop,T.arrowLeft,P),L=C.originX,W=C.originY,O=C.top,N=C.left,j=C.bottom,q=C.checkSafeAreaLeft,X=C.checkSafeAreaRight,z=C.arrowTop,B=C.arrowLeft,H=C.addPopoverBottomClass;var M=S();var V=S();var F=S();V.addElement(u.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]);F.addElement(u.querySelector(".popover-arrow")).addElement(u.querySelector(".popover-content")).fromTo("opacity",.01,1);return M.easing("ease").duration(100).beforeAddWrite((function(){if(n==="cover"){e.style.setProperty("--width","".concat(b,"px"))}if(H){e.classList.add("popover-bottom")}if(j!==undefined){h.style.setProperty("bottom","".concat(j,"px"))}var t=" + var(--ion-safe-area-left, 0)";var r=" - var(--ion-safe-area-right, 0)";var a="".concat(N,"px");if(q){a="".concat(N,"px").concat(t)}if(X){a="".concat(N,"px").concat(r)}h.style.setProperty("top","calc(".concat(O,"px + var(--offset-y, 0))"));h.style.setProperty("left","calc(".concat(a," + var(--offset-x, 0))"));h.style.setProperty("transform-origin","".concat(W," ").concat(L));if(g!==null){var p=T.top!==O||T.left!==N;var c=U(s,p,o,i);if(c){g.style.setProperty("top","calc(".concat(z,"px + var(--offset-y, 0))"));g.style.setProperty("left","calc(".concat(B,"px + var(--offset-x, 0))"))}else{g.style.setProperty("display","none")}}})).addAnimation([V,F])};var Z=function(e){var t=d(e);var r=t.querySelector(".popover-content");var o=t.querySelector(".popover-arrow");var n=S();var i=S();var a=S();i.addElement(t.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0);a.addElement(t.querySelector(".popover-arrow")).addElement(t.querySelector(".popover-content")).fromTo("opacity",.99,0);return n.easing("ease").afterAddWrite((function(){e.style.removeProperty("--width");e.classList.remove("popover-bottom");r.style.removeProperty("top");r.style.removeProperty("left");r.style.removeProperty("bottom");r.style.removeProperty("transform-origin");if(o){o.style.removeProperty("top");o.style.removeProperty("left");o.style.removeProperty("display")}})).duration(300).addAnimation([i,a])};var $=12;var ee=function(e,t){var r;var o=t.event,n=t.size,i=t.trigger,a=t.reference,s=t.side,p=t.align;var c=e.ownerDocument;var l=c.dir==="rtl";var f=c.defaultView.innerWidth;var v=c.defaultView.innerHeight;var u=d(e);var h=u.querySelector(".popover-content");var g=i||((r=o===null||o===void 0?void 0:o.detail)===null||r===void 0?void 0:r.ionShadowTarget)||(o===null||o===void 0?void 0:o.target);var m=_(n,h,g),w=m.contentWidth,b=m.contentHeight;var y={top:v/2-b/2,left:f/2-w/2,originX:l?"right":"left",originY:"top"};var x=Y(l,w,b,0,0,a,s,p,y,i,o);var k=n==="cover"?0:$;var P=G(s,x.top,x.left,k,f,v,w,b,0,x.originX,x.originY,x.referenceCoordinates),D=P.originX,T=P.originY,E=P.top,I=P.left,A=P.bottom;var C=S();var L=S();var W=S();var O=S();var N=S();L.addElement(u.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]);W.addElement(u.querySelector(".popover-wrapper")).duration(150).fromTo("opacity",.01,1);O.addElement(h).beforeStyles({top:"calc(".concat(E,"px + var(--offset-y, 0px))"),left:"calc(".concat(I,"px + var(--offset-x, 0px))"),"transform-origin":"".concat(T," ").concat(D)}).beforeAddWrite((function(){if(A!==undefined){h.style.setProperty("bottom","".concat(A,"px"))}})).fromTo("transform","scale(0.8)","scale(1)");N.addElement(u.querySelector(".popover-viewport")).fromTo("opacity",.01,1);return C.easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).beforeAddWrite((function(){if(n==="cover"){e.style.setProperty("--width","".concat(w,"px"))}if(T==="bottom"){e.classList.add("popover-bottom")}})).addAnimation([L,W,O,N])};var te=function(e){var t=d(e);var r=t.querySelector(".popover-content");var o=S();var n=S();var i=S();n.addElement(t.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0);i.addElement(t.querySelector(".popover-wrapper")).fromTo("opacity",.99,0);return o.easing("ease").afterAddWrite((function(){e.style.removeProperty("--width");e.classList.remove("popover-bottom");r.style.removeProperty("top");r.style.removeProperty("left");r.style.removeProperty("bottom");r.style.removeProperty("transform-origin")})).duration(150).addAnimation([n,i])};var re=':host{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;--offset-x:0px;--offset-y:0px;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}:host(.popover-nested){pointer-events:none}:host(.popover-nested) .popover-wrapper{pointer-events:auto}:host(.overlay-hidden){display:none}.popover-wrapper{z-index:10}.popover-content{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden}:host(.popover-nested.popover-side-left){--offset-x:5px}:host(.popover-nested.popover-side-right){--offset-x:-5px}:host(.popover-nested.popover-side-start){--offset-x:5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-start),:host-context([dir=rtl]).popover-nested.popover-side-start{--offset-x:-5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-start):dir(rtl){--offset-x:-5px}}:host(.popover-nested.popover-side-end){--offset-x:-5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-end),:host-context([dir=rtl]).popover-nested.popover-side-end{--offset-x:5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-end):dir(rtl){--offset-x:5px}}:host{--width:200px;--max-height:90%;--box-shadow:none;--backdrop-opacity:var(--ion-backdrop-opacity, 0.08)}:host(.popover-desktop){--box-shadow:0px 4px 16px 0px rgba(0, 0, 0, 0.12)}.popover-content{border-radius:10px}:host(.popover-desktop) .popover-content{border:0.5px solid var(--ion-color-step-100, #e6e6e6)}.popover-arrow{display:block;position:absolute;width:20px;height:10px;overflow:hidden}.popover-arrow::after{top:3px;border-radius:3px;position:absolute;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--background);content:"";z-index:10}@supports (inset-inline-start: 0){.popover-arrow::after{inset-inline-start:3px}}@supports not (inset-inline-start: 0){.popover-arrow::after{left:3px}:host-context([dir=rtl]) .popover-arrow::after{left:unset;right:unset;right:3px}[dir=rtl] .popover-arrow::after{left:unset;right:unset;right:3px}@supports selector(:dir(rtl)){.popover-arrow::after:dir(rtl){left:unset;right:unset;right:3px}}}:host(.popover-bottom) .popover-arrow{top:auto;bottom:-10px}:host(.popover-bottom) .popover-arrow::after{top:-6px}:host(.popover-side-left) .popover-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host(.popover-side-right) .popover-arrow{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}:host(.popover-side-top) .popover-arrow{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host(.popover-side-start) .popover-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host-context([dir=rtl]):host(.popover-side-start) .popover-arrow,:host-context([dir=rtl]).popover-side-start .popover-arrow{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}@supports selector(:dir(rtl)){:host(.popover-side-start) .popover-arrow:dir(rtl){-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}}:host(.popover-side-end) .popover-arrow{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}:host-context([dir=rtl]):host(.popover-side-end) .popover-arrow,:host-context([dir=rtl]).popover-side-end .popover-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}@supports selector(:dir(rtl)){:host(.popover-side-end) .popover-arrow:dir(rtl){-webkit-transform:rotate(90deg);transform:rotate(90deg)}}.popover-arrow,.popover-content{opacity:0}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){:host(.popover-translucent) .popover-content,:host(.popover-translucent) .popover-arrow::after{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}';var oe=":host{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;--offset-x:0px;--offset-y:0px;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}:host(.popover-nested){pointer-events:none}:host(.popover-nested) .popover-wrapper{pointer-events:auto}:host(.overlay-hidden){display:none}.popover-wrapper{z-index:10}.popover-content{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden}:host(.popover-nested.popover-side-left){--offset-x:5px}:host(.popover-nested.popover-side-right){--offset-x:-5px}:host(.popover-nested.popover-side-start){--offset-x:5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-start),:host-context([dir=rtl]).popover-nested.popover-side-start{--offset-x:-5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-start):dir(rtl){--offset-x:-5px}}:host(.popover-nested.popover-side-end){--offset-x:-5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-end),:host-context([dir=rtl]).popover-nested.popover-side-end{--offset-x:5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-end):dir(rtl){--offset-x:5px}}:host{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}.popover-content{border-radius:4px;-webkit-transform-origin:left top;transform-origin:left top}:host-context([dir=rtl]) .popover-content{-webkit-transform-origin:right top;transform-origin:right top}[dir=rtl] .popover-content{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){.popover-content:dir(rtl){-webkit-transform-origin:right top;transform-origin:right top}}.popover-viewport{-webkit-transition-delay:100ms;transition-delay:100ms}.popover-wrapper{opacity:0}";var ne=e("ion_popover",function(){function e(e){var o=this;t(this,e);this.didPresent=r(this,"ionPopoverDidPresent",7);this.willPresent=r(this,"ionPopoverWillPresent",7);this.willDismiss=r(this,"ionPopoverWillDismiss",7);this.didDismiss=r(this,"ionPopoverDidDismiss",7);this.didPresentShorthand=r(this,"didPresent",7);this.willPresentShorthand=r(this,"willPresent",7);this.willDismissShorthand=r(this,"willDismiss",7);this.didDismissShorthand=r(this,"didDismiss",7);this.ionMount=r(this,"ionMount",7);this.parentPopover=null;this.coreDelegate=a();this.lockController=v();this.inline=false;this.focusDescendantOnPresent=false;this.onBackdropTap=function(){o.dismiss(undefined,h)};this.onLifecycle=function(e){var t=o.usersElement;var r=ie[e.type];if(t&&r){var n=new CustomEvent(r,{bubbles:false,cancelable:false,detail:e.detail});t.dispatchEvent(n)}};this.configureTriggerInteraction=function(){var e=o,t=e.trigger,r=e.triggerAction,n=e.el,i=e.destroyTriggerInteraction;if(i){i()}if(t===undefined){return}var a=o.triggerEl=t!==undefined?document.getElementById(t):null;if(!a){u('A trigger element with the ID "'.concat(t,'" was not found in the DOM. The trigger element must be in the DOM when the "trigger" property is set on ion-popover.'),o.el);return}o.destroyTriggerInteraction=L(a,r,n)};this.configureKeyboardInteraction=function(){var e=o,t=e.destroyKeyboardInteraction,r=e.el;if(t){t()}o.destroyKeyboardInteraction=X(r)};this.configureDismissInteraction=function(){var e=o,t=e.destroyDismissInteraction,r=e.parentPopover,n=e.triggerAction,i=e.triggerEl,a=e.el;if(!r||!i){return}if(t){t()}o.destroyDismissInteraction=C(i,n,a,r)};this.presented=false;this.hasController=false;this.delegate=undefined;this.overlayIndex=undefined;this.enterAnimation=undefined;this.leaveAnimation=undefined;this.component=undefined;this.componentProps=undefined;this.keyboardClose=true;this.cssClass=undefined;this.backdropDismiss=true;this.event=undefined;this.showBackdrop=true;this.translucent=false;this.animated=true;this.htmlAttributes=undefined;this.triggerAction="click";this.trigger=undefined;this.size="auto";this.dismissOnSelect=false;this.reference="trigger";this.side="bottom";this.alignment=undefined;this.arrow=true;this.isOpen=false;this.keyboardEvents=false;this.keepContentsMounted=false}e.prototype.onTriggerChange=function(){this.configureTriggerInteraction()};e.prototype.onIsOpenChange=function(e,t){if(e===true&&t===false){this.present()}else if(e===false&&t===true){this.dismiss()}};e.prototype.connectedCallback=function(){var e=this,t=e.configureTriggerInteraction,r=e.el;g(r);t()};e.prototype.disconnectedCallback=function(){var e=this.destroyTriggerInteraction;if(e){e()}};e.prototype.componentWillLoad=function(){var e=this.el;var t=m(e);this.parentPopover=e.closest("ion-popover:not(#".concat(t,")"));if(this.alignment===undefined){this.alignment=k(this)==="ios"?"center":"start"}};e.prototype.componentDidLoad=function(){var e=this;var t=this,r=t.parentPopover,o=t.isOpen;if(o===true){c((function(){return e.present()}))}if(r){l(r,"ionPopoverWillDismiss",(function(){e.dismiss(undefined,undefined,false)}))}};e.prototype.presentFromTrigger=function(e,t){if(t===void 0){t=false}return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(r){switch(r.label){case 0:this.focusDescendantOnPresent=t;return[4,this.present(e)];case 1:r.sent();this.focusDescendantOnPresent=false;return[2]}}))}))};e.prototype.getDelegate=function(e){if(e===void 0){e=false}if(this.workingDelegate&&!e){return{delegate:this.workingDelegate,inline:this.inline}}var t=this.el.parentNode;var r=this.inline=t!==null&&!this.hasController;var o=this.workingDelegate=r?this.delegate||this.coreDelegate:this.delegate;return{inline:r,delegate:o}};e.prototype.present=function(e){return __awaiter(this,void 0,void 0,(function(){var t,r,o,n,i,a;return __generator(this,(function(p){switch(p.label){case 0:return[4,this.lockController.lock()];case 1:t=p.sent();if(this.presented){t();return[2]}r=this.el;o=this.getDelegate(true),n=o.inline,i=o.delegate;this.ionMount.emit();a=this;return[4,s(i,r,this.component,["popover-viewport"],this.componentProps,n)];case 2:a.usersElement=p.sent();if(!this.keyboardEvents){this.configureKeyboardInteraction()}this.configureDismissInteraction();if(!f(r))return[3,4];return[4,T(this.usersElement)];case 3:p.sent();return[3,6];case 4:if(!!this.keepContentsMounted)return[3,6];return[4,E()];case 5:p.sent();p.label=6;case 6:return[4,w(this,"popoverEnter",Q,ee,{event:e||this.event,size:this.size,trigger:this.triggerEl,reference:this.reference,side:this.side,align:this.alignment})];case 7:p.sent();if(this.focusDescendantOnPresent){b(this.el,this.el)}t();return[2]}}))}))};e.prototype.dismiss=function(e,t,r){if(r===void 0){r=true}return __awaiter(this,void 0,void 0,(function(){var o,n,i,a,s,c;return __generator(this,(function(d){switch(d.label){case 0:return[4,this.lockController.lock()];case 1:o=d.sent();n=this,i=n.destroyKeyboardInteraction,a=n.destroyDismissInteraction;if(r&&this.parentPopover){this.parentPopover.dismiss(e,t,r)}return[4,y(this,e,t,"popoverLeave",Z,te,this.event)];case 2:s=d.sent();if(!s)return[3,4];if(i){i();this.destroyKeyboardInteraction=undefined}if(a){a();this.destroyDismissInteraction=undefined}c=this.getDelegate().delegate;return[4,p(c,this.usersElement)];case 3:d.sent();d.label=4;case 4:o();return[2,s]}}))}))};e.prototype.getParentPopover=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){return[2,this.parentPopover]}))}))};e.prototype.onDidDismiss=function(){return x(this.el,"ionPopoverDidDismiss")};e.prototype.onWillDismiss=function(){return x(this.el,"ionPopoverWillDismiss")};e.prototype.render=function(){var e;var t=this;var r=k(this);var i=this,a=i.onLifecycle,s=i.parentPopover,p=i.dismissOnSelect,c=i.side,d=i.arrow,l=i.htmlAttributes;var f=P("desktop");var v=d&&!s;return o(n,Object.assign({"aria-modal":"true","no-router":true,tabindex:"-1"},l,{style:{zIndex:"".concat(2e4+this.overlayIndex)},class:Object.assign(Object.assign({},D(this.cssClass)),(e={},e[r]=true,e["popover-translucent"]=this.translucent,e["overlay-hidden"]=true,e["popover-desktop"]=f,e["popover-side-".concat(c)]=true,e["popover-nested"]=!!s,e)),onIonPopoverDidPresent:a,onIonPopoverWillPresent:a,onIonPopoverWillDismiss:a,onIonPopoverDidDismiss:a,onIonBackdropTap:this.onBackdropTap}),!s&&o("ion-backdrop",{tappable:this.backdropDismiss,visible:this.showBackdrop,part:"backdrop"}),o("div",{class:"popover-wrapper ion-overlay-wrapper",onClick:p?function(){return t.dismiss()}:undefined},v&&o("div",{class:"popover-arrow",part:"arrow"}),o("div",{class:"popover-content",part:"content"},o("slot",null))))};Object.defineProperty(e.prototype,"el",{get:function(){return i(this)},enumerable:false,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{trigger:["onTriggerChange"],triggerAction:["onTriggerChange"],isOpen:["onIsOpenChange"]}},enumerable:false,configurable:true});return e}());var ie={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillLeave",ionPopoverDidDismiss:"ionViewDidLeave"};ne.style={ios:re,md:oe}}}}));