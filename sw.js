if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const o=e=>i(e,t),u={module:{uri:t},exports:l,require:o};s[t]=Promise.all(n.map((e=>u[e]||o(e)))).then((e=>(r(...e),l)))}}define(["./workbox-e3490c72"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/file-input-Dm7BAphY.js",revision:null},{url:"assets/home.page-DnqF5eVN.js",revision:null},{url:"assets/index-DJyhtlv3.js",revision:null},{url:"assets/orderAnalytics.page-DntZ4hYe.js",revision:null},{url:"index.html",revision:"fdbd1702a0f17d195205a2d9cc079c52"},{url:"registerSW.js",revision:"35d9293653bdc05e45efd5f18c4f9f86"},{url:"manifest.webmanifest",revision:"994d9be380763d641584923f5642a131"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
