/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{g as o,c as n,f as t}from"./p-b24aa895.js";import{a as i,b as a,r,c as e}from"./p-63eb0acd.js";import{a as s,K as d}from"./p-419eb426.js";import{w as c}from"./p-b347cfd1.js";import"./p-1b8e1d03.js";import"./p-cc196b34.js";const l=new WeakMap,u=(o,n,t,i=0,a=!1)=>{l.has(o)!==t&&(t?f(o,n,i,a):w(o,n))},f=(o,n,t,i=!1)=>{const a=n.parentNode,r=n.cloneNode(!1);r.classList.add("cloned-input"),r.tabIndex=-1,i&&(r.disabled=!0),a.appendChild(r),l.set(o,r);const e="rtl"===o.ownerDocument.dir?9999:-9999;o.style.pointerEvents="none",n.style.transform=`translate3d(${e}px,${t}px,0) scale(0)`},w=(o,n)=>{const t=l.get(o);t&&(l.delete(o),t.remove()),o.style.pointerEvents="",n.style.transform=""},p="input, textarea, [no-blur], [contenteditable]",m="$ionPaddingTimer",b=(o,n,t)=>{const i=o[m];i&&clearTimeout(i),n>0?o.style.setProperty("--keyboard-offset",`${n}px`):o[m]=setTimeout((()=>{o.style.setProperty("--keyboard-offset","0px"),t&&t()}),120)},h=(o,n,t)=>{o.addEventListener("focusout",(()=>{n&&b(n,0,t)}),{once:!0})};let y=0;const S="data-ionic-skip-scroll-assist",D=o=>{document.activeElement!==o&&(o.setAttribute(S,"true"),o.focus())},K=async(t,i,a,e,s,d,c=!1,l=0,f=!0)=>{if(!a&&!e)return;const w=((o,n,t,i)=>{var a;return((o,n,t,i)=>{const a=o.top,r=o.bottom,e=n.top,s=e+15,d=Math.min(n.bottom,i-t)-50-r,c=s-a,l=Math.round(d<0?-d:c>0?-c:0),u=Math.min(l,a-e),f=Math.abs(u);return{scrollAmount:u,scrollDuration:Math.min(400,Math.max(150,f/.3)),scrollPadding:t,inputSafeY:4-(a-s)}})((null!==(a=o.closest("ion-item,[ion-item]"))&&void 0!==a?a:o).getBoundingClientRect(),n.getBoundingClientRect(),t,i)})(t,a||e,s,l);if(a&&Math.abs(w.scrollAmount)<4)return D(i),void(d&&null!==a&&(b(a,y),h(i,a,(()=>y=0))));if(u(t,i,!0,w.inputSafeY,c),D(i),r((()=>t.click())),d&&a&&(y=w.scrollPadding,b(a,y)),"undefined"!=typeof window){let r;const e=async()=>{void 0!==r&&clearTimeout(r),window.removeEventListener("ionKeyboardDidShow",s),window.removeEventListener("ionKeyboardDidShow",e),a&&await n(a,0,w.scrollAmount,w.scrollDuration),u(t,i,!1,w.inputSafeY),D(i),d&&h(i,a,(()=>y=0))},s=()=>{window.removeEventListener("ionKeyboardDidShow",s),window.addEventListener("ionKeyboardDidShow",e)};if(a){const n=await o(a);if(f&&w.scrollAmount>n.scrollHeight-n.clientHeight-n.scrollTop)return"password"===i.type?(w.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",s)):window.addEventListener("ionKeyboardDidShow",e),void(r=setTimeout(e,1e3))}e()}},M=async(o,n)=>{const r=document,l="ios"===n,f="android"===n,w=o.getNumber("keyboardHeight",290),m=o.getBoolean("scrollAssist",!0),b=o.getBoolean("hideCaretOnScroll",l),h=o.getBoolean("inputBlurring",l),y=o.getBoolean("scrollPadding",!0),D=Array.from(r.querySelectorAll("ion-input, ion-textarea")),M=new WeakMap,v=new WeakMap,x=await d.getResizeMode(),k=async o=>{await new Promise((n=>e(o,n)));const n=o.shadowRoot||o,r=n.querySelector("input")||n.querySelector("textarea"),d=t(o),l=d?null:o.closest("ion-footer");if(r){if(d&&b&&!M.has(o)){const n=((o,n,t)=>{if(!t||!n)return()=>{};const r=t=>{var i;(i=n)===i.getRootNode().activeElement&&u(o,n,t)},e=()=>u(o,n,!1),s=()=>r(!0),d=()=>r(!1);return i(t,"ionScrollStart",s),i(t,"ionScrollEnd",d),n.addEventListener("blur",e),()=>{a(t,"ionScrollStart",s),a(t,"ionScrollEnd",d),n.removeEventListener("blur",e)}})(o,r,d);M.set(o,n)}if("date"!==r.type&&"datetime-local"!==r.type&&(d||l)&&m&&!v.has(o)){const n=((o,n,t,i,a,r,e,d=!1)=>{const l=r&&(void 0===e||e.mode===s.None);let u=!1;const f=void 0!==c?c.innerHeight:0,w=a=>{!1!==u?K(o,n,t,i,a.detail.keyboardHeight,l,d,f,!1):u=!0},p=()=>{u=!1,null==c||c.removeEventListener("ionKeyboardDidShow",w),o.removeEventListener("focusout",p,!0)},m=async()=>{n.hasAttribute(S)?n.removeAttribute(S):(K(o,n,t,i,a,l,d,f),null==c||c.addEventListener("ionKeyboardDidShow",w),o.addEventListener("focusout",p,!0))};return o.addEventListener("focusin",m,!0),()=>{o.removeEventListener("focusin",m,!0),null==c||c.removeEventListener("ionKeyboardDidShow",w),o.removeEventListener("focusout",p,!0)}})(o,r,d,l,w,y,x,f);v.set(o,n)}}};h&&(()=>{let o=!0,n=!1;const t=document;i(t,"ionScrollStart",(()=>{n=!0})),t.addEventListener("focusin",(()=>{o=!0}),!0),t.addEventListener("touchend",(i=>{if(n)return void(n=!1);const a=t.activeElement;if(!a)return;if(a.matches(p))return;const r=i.target;r!==a&&(r.matches(p)||r.closest(p)||(o=!1,setTimeout((()=>{o||a.blur()}),50)))}),!1)})();for(const o of D)k(o);r.addEventListener("ionInputDidLoad",(o=>{k(o.detail)})),r.addEventListener("ionInputDidUnload",(o=>{(o=>{if(b){const n=M.get(o);n&&n(),M.delete(o)}if(m){const n=v.get(o);n&&n(),v.delete(o)}})(o.detail)}))};export{M as startInputShims}