/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{w as t}from"./p-06ac429a.js";import{h as o,a as e,b as n}from"./p-b923f3d7.js";import{createGesture as r}from"./p-8b1be026.js";const a=(a,s)=>{let i,c;const d=(t,o,e)=>{if("undefined"==typeof document)return;const n=document.elementFromPoint(t,o);n&&s(n)?n!==i&&(f(),m(n,e)):f()},m=(o,e)=>{i=o,c||(c=i);const n=i;t((()=>n.classList.add("ion-activated"))),e()},f=(o=!1)=>{if(!i)return;const e=i;t((()=>e.classList.remove("ion-activated"))),o&&c!==i&&i.click(),i=void 0};return r({el:a,gestureName:"buttonActiveDrag",threshold:0,onStart:t=>d(t.currentX,t.currentY,e),onMove:t=>d(t.currentX,t.currentY,n),onEnd:()=>{f(!0),o(),c=void 0}})};export{a as c}