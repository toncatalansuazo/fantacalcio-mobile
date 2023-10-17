var __awaiter=this&&this.__awaiter||function(e,n,r,t){function i(e){return e instanceof r?e:new r((function(n){n(e)}))}return new(r||(r=Promise))((function(r,a){function o(e){try{u(t.next(e))}catch(e){a(e)}}function s(e){try{u(t["throw"](e))}catch(e){a(e)}}function u(e){e.done?r(e.value):i(e.value).then(o,s)}u((t=t.apply(e,n||[])).next())}))};var __generator=this&&this.__generator||function(e,n){var r={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},t,i,a,o;return o={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function s(e){return function(n){return u([e,n])}}function u(s){if(t)throw new TypeError("Generator is already executing.");while(o&&(o=0,s[0]&&(r=0)),r)try{if(t=1,i&&(a=s[0]&2?i["return"]:s[0]?i["throw"]||((a=i["return"])&&a.call(i),0):i.next)&&!(a=a.call(i,s[1])).done)return a;if(i=0,a)s=[s[0]&2,a.value];switch(s[0]){case 0:case 1:a=s;break;case 4:r.label++;return{value:s[1],done:false};case 5:r.label++;i=s[1];s=[0];continue;case 7:s=r.ops.pop();r.trys.pop();continue;default:if(!(a=r.trys,a=a.length>0&&a[a.length-1])&&(s[0]===6||s[0]===2)){r=0;continue}if(s[0]===3&&(!a||s[1]>a[0]&&s[1]<a[3])){r.label=s[1];break}if(s[0]===6&&r.label<a[1]){r.label=a[1];a=s;break}if(a&&r.label<a[2]){r.label=a[2];r.ops.push(s);break}if(a[2])r.ops.pop();r.trys.pop();continue}s=n.call(e,r)}catch(e){s=[6,e];i=0}finally{t=a=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */System.register(["./p-629aa3fd.system.js","./p-815c2fba.system.js"],(function(e,n){"use strict";var r,t,i;return{setters:[function(e){r=e.w;t=e.B},function(e){i=e.r}],execute:function(){var a=this;var o=e("L","ionViewWillEnter");var s=e("a","ionViewDidEnter");var u=e("b","ionViewWillLeave");var c=e("c","ionViewDidLeave");var l=e("d","ionViewWillUnload");var f=function(){return n.import("./p-b9047b05.system.js")};var v=function(){return n.import("./p-c994fff0.system.js")};var d=e("t",(function(e){return new Promise((function(n,t){r((function(){p(e);h(e).then((function(r){if(r.animation){r.animation.destroy()}b(e);n(r)}),(function(n){b(e);t(n)}))}))}))}));var p=function(e){var n=e.enteringEl;var r=e.leavingEl;B(n,r,e.direction);if(e.showGoBack){n.classList.add("can-go-back")}else{n.classList.remove("can-go-back")}A(n,false);n.style.setProperty("pointer-events","none");if(r){A(r,false);r.style.setProperty("pointer-events","none")}};var h=function(e){return __awaiter(a,void 0,void 0,(function(){var n,r;return __generator(this,(function(i){switch(i.label){case 0:return[4,w(e)];case 1:n=i.sent();r=n&&t.isBrowser?g(n,e):m(e);return[2,r]}}))}))};var b=function(e){var n=e.enteringEl;var r=e.leavingEl;n.classList.remove("ion-page-invisible");n.style.removeProperty("pointer-events");if(r!==undefined){r.classList.remove("ion-page-invisible");r.style.removeProperty("pointer-events")}};var w=function(e){return __awaiter(a,void 0,void 0,(function(){var n,r;return __generator(this,(function(t){switch(t.label){case 0:if(!e.leavingEl||!e.animated||e.duration===0){return[2,undefined]}if(e.animationBuilder){return[2,e.animationBuilder]}if(!(e.mode==="ios"))return[3,2];return[4,f()];case 1:r=t.sent().iosTransitionAnimation;return[3,4];case 2:return[4,v()];case 3:r=t.sent().mdTransitionAnimation;t.label=4;case 4:n=r;return[2,n]}}))}))};var g=function(e,n){return __awaiter(a,void 0,void 0,(function(){var r,t;return __generator(this,(function(i){switch(i.label){case 0:return[4,_(n,true)];case 1:i.sent();r=e(n.baseEl,n);k(n.enteringEl,n.leavingEl);return[4,E(r,n)];case 2:t=i.sent();if(n.progressCallback){n.progressCallback(undefined)}if(t){P(n.enteringEl,n.leavingEl)}return[2,{hasCompleted:t,animation:r}]}}))}))};var m=function(e){return __awaiter(a,void 0,void 0,(function(){var n,r;return __generator(this,(function(t){switch(t.label){case 0:n=e.enteringEl;r=e.leavingEl;return[4,_(e,false)];case 1:t.sent();k(n,r);P(n,r);return[2,{hasCompleted:true}]}}))}))};var _=function(e,n){return __awaiter(a,void 0,void 0,(function(){var r;return __generator(this,(function(t){switch(t.label){case 0:r=e.deepWait!==undefined?e.deepWait:n;if(!r)return[3,2];return[4,Promise.all([C(e.enteringEl),C(e.leavingEl)])];case 1:t.sent();t.label=2;case 2:return[4,y(e.viewIsReady,e.enteringEl)];case 3:t.sent();return[2]}}))}))};var y=function(e,n){return __awaiter(a,void 0,void 0,(function(){return __generator(this,(function(r){switch(r.label){case 0:if(!e)return[3,2];return[4,e(n)];case 1:r.sent();r.label=2;case 2:return[2]}}))}))};var E=function(e,n){var r=n.progressCallback;var t=new Promise((function(n){e.onFinish((function(e){return n(e===1)}))}));if(r){e.progressStart(true);r(e)}else{e.play()}return t};var k=function(e,n){L(n,u);L(e,o)};var P=function(e,n){L(e,s);L(n,c)};var L=e("l",(function(e,n){if(e){var r=new CustomEvent(n,{bubbles:false,cancelable:false});e.dispatchEvent(r)}}));var x=e("w",(function(){return new Promise((function(e){return i((function(){return i((function(){return e()}))}))}))}));var C=e("e",(function(e){return __awaiter(a,void 0,void 0,(function(){var n,r,t;return __generator(this,(function(a){switch(a.label){case 0:n=e;if(!n)return[3,6];if(!(n.componentOnReady!=null))return[3,2];return[4,n.componentOnReady()];case 1:r=a.sent();if(r!=null){return[2]}return[3,4];case 2:if(!(n.__registerHost!=null))return[3,4];t=new Promise((function(e){return i(e)}));return[4,t];case 3:a.sent();return[2];case 4:return[4,Promise.all(Array.from(n.children).map(C))];case 5:a.sent();a.label=6;case 6:return[2]}}))}))}));var A=e("s",(function(e,n){if(n){e.setAttribute("aria-hidden","true");e.classList.add("ion-page-hidden")}else{e.hidden=false;e.removeAttribute("aria-hidden");e.classList.remove("ion-page-hidden")}}));var B=function(e,n,r){if(e!==undefined){e.style.zIndex=r==="back"?"99":"101"}if(n!==undefined){n.style.zIndex="100"}};var S=e("g",(function(e){if(e.classList.contains("ion-page")){return e}var n=e.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs");if(n){return n}return e}))}}}));