/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{w as t}from"./p-70ab8b73.js";import{h as o,a as e,b as n}from"./p-bb6f38ed.js";import{createGesture as r}from"./p-8b1be026.js";const s=(s,a)=>{let i,c;const d=(t,o,e)=>{if("undefined"==typeof document)return;const n=document.elementFromPoint(t,o);n&&a(n)?n!==i&&(b(),m(n,e)):b()},m=(o,e)=>{i=o,c||(c=i);const n=i;t((()=>n.classList.add("ion-activated"))),e()},b=(o=!1)=>{if(!i)return;const e=i;t((()=>e.classList.remove("ion-activated"))),o&&c!==i&&i.click(),i=void 0};return r({el:s,gestureName:"buttonActiveDrag",threshold:0,onStart:t=>d(t.currentX,t.currentY,e),onMove:t=>d(t.currentX,t.currentY,n),onEnd:()=>{b(!0),o(),c=void 0}})};export{s as c}