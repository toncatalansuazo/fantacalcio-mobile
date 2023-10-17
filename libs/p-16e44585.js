/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{c as t}from"./p-446230d7.js";import{g as o}from"./p-e2bb634f.js";import"./p-b347cfd1.js";import"./p-63eb0acd.js";import"./p-06ac429a.js";const n=t=>document.querySelector(`${t}.ion-cloned-element`),a=t=>t.shadowRoot||t,e=t=>{const o="ION-TABS"===t.tagName?t:t.querySelector("ion-tabs"),n="ion-content ion-header:not(.header-collapse-condense-inactive) ion-title.title-large";if(null!=o){const t=o.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");return null!=t?t.querySelector(n):null}return t.querySelector(n)},s=(t,o)=>{const n="ION-TABS"===t.tagName?t:t.querySelector("ion-tabs");let a=[];if(null!=n){const t=n.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");null!=t&&(a=t.querySelectorAll("ion-buttons"))}else a=t.querySelectorAll("ion-buttons");for(const t of a){const n=t.closest("ion-header"),a=n&&!n.classList.contains("header-collapse-condense-inactive"),e=t.querySelector("ion-back-button"),s=t.classList.contains("buttons-collapse");if(null!==e&&("start"===t.slot||""===t.slot)&&(s&&a&&o||!s))return e}return null},r=(o,e,s,r,i,l)=>{const c=e?`calc(100% - ${l.right+4}px)`:l.left-4+"px",p=e?"7px":"-7px",f=e?"-4px":"4px",d=e?"-4px":"4px",$=e?"right":"left",b=e?"left":"right",u=s?[{offset:0,opacity:1,transform:`translate3d(${f}, ${l.top-46}px, 0) scale(1)`},{offset:.6,opacity:0},{offset:1,opacity:0,transform:`translate3d(${p}, ${i.top-40}px, 0) scale(2.1)`}]:[{offset:0,opacity:0,transform:`translate3d(${p}, ${i.top-40}px, 0) scale(2.1)`},{offset:1,opacity:1,transform:`translate3d(${f}, ${l.top-46}px, 0) scale(1)`}],m=s?[{offset:0,opacity:1,transform:`translate3d(${d}, ${l.top-46}px, 0) scale(1)`},{offset:.2,opacity:0,transform:`translate3d(${d}, ${l.top-41}px, 0) scale(0.6)`},{offset:1,opacity:0,transform:`translate3d(${d}, ${l.top-41}px, 0) scale(0.6)`}]:[{offset:0,opacity:0,transform:`translate3d(${d}, ${l.top-41}px, 0) scale(0.6)`},{offset:1,opacity:1,transform:`translate3d(${d}, ${l.top-46}px, 0) scale(1)`}],y=t(),X=t(),x=n("ion-back-button"),h=a(x).querySelector(".button-text"),g=a(x).querySelector("ion-icon");x.text=r.text,x.mode=r.mode,x.icon=r.icon,x.color=r.color,x.disabled=r.disabled,x.style.setProperty("display","block"),x.style.setProperty("position","fixed"),X.addElement(g),y.addElement(h),y.beforeStyles({"transform-origin":`${$} center`}).beforeAddWrite((()=>{r.style.setProperty("display","none"),x.style.setProperty($,c)})).afterAddWrite((()=>{r.style.setProperty("display",""),x.style.setProperty("display","none"),x.style.removeProperty($)})).keyframes(u),X.beforeStyles({"transform-origin":`${b} center`}).keyframes(m),o.addAnimation([y,X])},i=(o,a,e,s,r,i)=>{const l=a?`calc(100% - ${r.right}px)`:`${r.left}px`,c=a?"-18px":"18px",p=a?"right":"left",f=e?[{offset:0,opacity:0,transform:`translate3d(${c}, ${i.top-4}px, 0) scale(0.49)`},{offset:.1,opacity:0},{offset:1,opacity:1,transform:`translate3d(0, ${r.top+2}px, 0) scale(1)`}]:[{offset:0,opacity:.99,transform:`translate3d(0, ${r.top+2}px, 0) scale(1)`},{offset:.6,opacity:0},{offset:1,opacity:0,transform:`translate3d(${c}, ${i.top-4}px, 0) scale(0.5)`}],d=n("ion-title"),$=t();d.innerText=s.innerText,d.size=s.size,d.color=s.color,$.addElement(d),$.beforeStyles({"transform-origin":`${p} center`,height:"46px",display:"",position:"relative",[p]:l}).beforeAddWrite((()=>{s.style.setProperty("opacity","0")})).afterAddWrite((()=>{s.style.setProperty("opacity",""),d.style.setProperty("display","none")})).keyframes(f),o.addAnimation($)},l=(n,l)=>{var c;try{const p="cubic-bezier(0.32,0.72,0,1)",f="opacity",d="transform",$="0%",b=.8,u="rtl"===n.ownerDocument.dir,m=u?"-99.5%":"99.5%",y=u?"33%":"-33%",X=l.enteringEl,x=l.leavingEl,h="back"===l.direction,g=X.querySelector(":scope > ion-content"),v=X.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),k=X.querySelectorAll(":scope > ion-header > ion-toolbar"),w=t(),T=t();if(w.addElement(X).duration((null!==(c=l.duration)&&void 0!==c?c:0)||540).easing(l.easing||p).fill("both").beforeRemoveClass("ion-page-invisible"),x&&null!=n){const o=t();o.addElement(n),w.addAnimation(o)}if(g||0!==k.length||0!==v.length?(T.addElement(g),T.addElement(v)):T.addElement(X.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),w.addAnimation(T),h?T.beforeClearStyles([f]).fromTo("transform",`translateX(${y})`,`translateX(${$})`).fromTo(f,b,1):T.beforeClearStyles([f]).fromTo("transform",`translateX(${m})`,`translateX(${$})`),g){const o=a(g).querySelector(".transition-effect");if(o){const n=o.querySelector(".transition-cover"),a=o.querySelector(".transition-shadow"),e=t(),s=t(),r=t();e.addElement(o).beforeStyles({opacity:"1",display:"block"}).afterStyles({opacity:"",display:""}),s.addElement(n).beforeClearStyles([f]).fromTo(f,0,.1),r.addElement(a).beforeClearStyles([f]).fromTo(f,.03,.7),e.addAnimation([s,r]),T.addAnimation([e])}}const j=X.querySelector("ion-header.header-collapse-condense"),{forward:A,backward:B}=((t,o,n,a,l)=>{const c=s(a,n),p=e(l),f=e(a),d=s(l,n),$=null!==c&&null!==p&&!n,b=null!==f&&null!==d&&n;if($){const a=p.getBoundingClientRect(),e=c.getBoundingClientRect();i(t,o,n,p,a,e),r(t,o,n,c,a,e)}else if(b){const a=f.getBoundingClientRect(),e=d.getBoundingClientRect();i(t,o,n,f,a,e),r(t,o,n,d,a,e)}return{forward:$,backward:b}})(w,u,h,X,x);if(k.forEach((o=>{const n=t();n.addElement(o),w.addAnimation(n);const e=t();e.addElement(o.querySelector("ion-title"));const s=t(),r=Array.from(o.querySelectorAll("ion-buttons,[menuToggle]")),i=o.closest("ion-header"),l=null==i?void 0:i.classList.contains("header-collapse-condense-inactive");let c;c=r.filter(h?t=>{const o=t.classList.contains("buttons-collapse");return o&&!l||!o}:t=>!t.classList.contains("buttons-collapse")),s.addElement(c);const p=t();p.addElement(o.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));const d=t();d.addElement(a(o).querySelector(".toolbar-background"));const b=t(),X=o.querySelector("ion-back-button");if(X&&b.addElement(X),n.addAnimation([e,s,p,d,b]),s.fromTo(f,.01,1),p.fromTo(f,.01,1),h)l||e.fromTo("transform",`translateX(${y})`,`translateX(${$})`).fromTo(f,.01,1),p.fromTo("transform",`translateX(${y})`,`translateX(${$})`),b.fromTo(f,.01,1);else if(j||e.fromTo("transform",`translateX(${m})`,`translateX(${$})`).fromTo(f,.01,1),p.fromTo("transform",`translateX(${m})`,`translateX(${$})`),d.beforeClearStyles([f,"transform"]),(null==i?void 0:i.translucent)?d.fromTo("transform",u?"translateX(-100%)":"translateX(100%)","translateX(0px)"):d.fromTo(f,.01,"var(--opacity)"),A||b.fromTo(f,.01,1),X&&!A){const o=t();o.addElement(a(X).querySelector(".button-text")).fromTo("transform",u?"translateX(-100px)":"translateX(100px)","translateX(0px)"),n.addAnimation(o)}})),x){const n=t(),e=x.querySelector(":scope > ion-content"),s=x.querySelectorAll(":scope > ion-header > ion-toolbar"),r=x.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *");if(e||0!==s.length||0!==r.length?(n.addElement(e),n.addElement(r)):n.addElement(x.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),w.addAnimation(n),h){n.beforeClearStyles([f]).fromTo("transform",`translateX(${$})`,u?"translateX(-100%)":"translateX(100%)");const t=o(x);w.afterAddWrite((()=>{"normal"===w.getDirection()&&t.style.setProperty("display","none")}))}else n.fromTo("transform",`translateX(${$})`,`translateX(${y})`).fromTo(f,1,b);if(e){const o=a(e).querySelector(".transition-effect");if(o){const a=o.querySelector(".transition-cover"),e=o.querySelector(".transition-shadow"),s=t(),r=t(),i=t();s.addElement(o).beforeStyles({opacity:"1",display:"block"}).afterStyles({opacity:"",display:""}),r.addElement(a).beforeClearStyles([f]).fromTo(f,.1,0),i.addElement(e).beforeClearStyles([f]).fromTo(f,.7,.03),s.addAnimation([r,i]),n.addAnimation([s])}}s.forEach((o=>{const n=t();n.addElement(o);const e=t();e.addElement(o.querySelector("ion-title"));const s=t(),r=o.querySelectorAll("ion-buttons,[menuToggle]"),i=o.closest("ion-header"),l=null==i?void 0:i.classList.contains("header-collapse-condense-inactive"),c=Array.from(r).filter((t=>{const o=t.classList.contains("buttons-collapse");return o&&!l||!o}));s.addElement(c);const p=t(),b=o.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");b.length>0&&p.addElement(b);const m=t();m.addElement(a(o).querySelector(".toolbar-background"));const X=t(),x=o.querySelector("ion-back-button");if(x&&X.addElement(x),n.addAnimation([e,s,p,X,m]),w.addAnimation(n),X.fromTo(f,.99,0),s.fromTo(f,.99,0),p.fromTo(f,.99,0),h){if(l||e.fromTo("transform",`translateX(${$})`,u?"translateX(-100%)":"translateX(100%)").fromTo(f,.99,0),p.fromTo("transform",`translateX(${$})`,u?"translateX(-100%)":"translateX(100%)"),m.beforeClearStyles([f,"transform"]),(null==i?void 0:i.translucent)?m.fromTo("transform","translateX(0px)",u?"translateX(-100%)":"translateX(100%)"):m.fromTo(f,"var(--opacity)",0),x&&!B){const o=t();o.addElement(a(x).querySelector(".button-text")).fromTo("transform",`translateX(${$})`,`translateX(${(u?-124:124)+"px"})`),n.addAnimation(o)}}else l||e.fromTo("transform",`translateX(${$})`,`translateX(${y})`).fromTo(f,.99,0).afterClearStyles([d,f]),p.fromTo("transform",`translateX(${$})`,`translateX(${y})`).afterClearStyles([d,f]),X.afterClearStyles([f]),e.afterClearStyles([f]),s.afterClearStyles([f])}))}return w}catch(t){throw t}};export{l as iosTransitionAnimation,a as shadow}