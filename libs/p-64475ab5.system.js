var __awaiter=this&&this.__awaiter||function(r,e,t,n){function o(r){return r instanceof t?r:new t((function(e){e(r)}))}return new(t||(t=Promise))((function(t,a){function i(r){try{c(n.next(r))}catch(r){a(r)}}function u(r){try{c(n["throw"](r))}catch(r){a(r)}}function c(r){r.done?t(r.value):o(r.value).then(i,u)}c((n=n.apply(r,e||[])).next())}))};var __generator=this&&this.__generator||function(r,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},n,o,a,i;return i={next:u(0),throw:u(1),return:u(2)},typeof Symbol==="function"&&(i[Symbol.iterator]=function(){return this}),i;function u(r){return function(e){return c([r,e])}}function c(u){if(n)throw new TypeError("Generator is already executing.");while(i&&(i=0,u[0]&&(t=0)),t)try{if(n=1,o&&(a=u[0]&2?o["return"]:u[0]?o["throw"]||((a=o["return"])&&a.call(o),0):o.next)&&!(a=a.call(o,u[1])).done)return a;if(o=0,a)u=[u[0]&2,a.value];switch(u[0]){case 0:case 1:a=u;break;case 4:t.label++;return{value:u[1],done:false};case 5:t.label++;o=u[1];u=[0];continue;case 7:u=t.ops.pop();t.trys.pop();continue;default:if(!(a=t.trys,a=a.length>0&&a[a.length-1])&&(u[0]===6||u[0]===2)){t=0;continue}if(u[0]===3&&(!a||u[1]>a[0]&&u[1]<a[3])){t.label=u[1];break}if(u[0]===6&&t.label<a[1]){t.label=a[1];a=u;break}if(a&&t.label<a[2]){t.label=a[2];t.ops.push(u);break}if(a[2])t.ops.pop();t.trys.pop();continue}u=e.call(r,t)}catch(r){u=[6,r];o=0}finally{n=a=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:true}}};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */System.register(["./p-815c2fba.system.js","./p-479cdbf8.system.js"],(function(r){"use strict";var e,t;return{setters:[function(r){e=r.c},function(r){t=r.b}],execute:function(){var n=this;var o="ION-CONTENT";var a=r("b","ion-content");var i=r("I",".ion-content-scroll-host");var u="".concat(a,", ").concat(i);var c=r("i",(function(r){return r.tagName===o}));var l=r("g",(function(r){return __awaiter(n,void 0,void 0,(function(){return __generator(this,(function(t){switch(t.label){case 0:if(!c(r))return[3,2];return[4,new Promise((function(t){return e(r,t)}))];case 1:t.sent();return[2,r.getScrollElement()];case 2:return[2,r]}}))}))}));var s=r("a",(function(r){var e=r.querySelector(i);if(e){return e}return r.querySelector(u)}));var f=r("f",(function(r){return r.closest(u)}));var v=r("s",(function(r,e){if(c(r)){var t=r;return t.scrollToTop(e)}return Promise.resolve(r.scrollTo({top:0,left:0,behavior:e>0?"smooth":"auto"}))}));var h=r("c",(function(r,e,t,n){if(c(r)){var o=r;return o.scrollByPoint(e,t,n)}return Promise.resolve(r.scrollBy({top:t,left:e,behavior:n>0?"smooth":"auto"}))}));var p=r("p",(function(r){return t(r,a)}));var y=r("d",(function(r){if(c(r)){var e=r;var t=e.scrollY;e.scrollY=false;return t}else{r.style.setProperty("overflow","hidden");return true}}));var b=r("r",(function(r,e){if(c(r)){r.scrollY=e}else{r.style.removeProperty("overflow")}}))}}}));