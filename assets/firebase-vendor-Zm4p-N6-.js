const wm=()=>{};var Nu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Am=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){const s=r[t++];e[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=r[t++],a=r[t++],c=r[t++],u=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const s=r[t++],a=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},Dh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const s=r[i],a=i+1<r.length,c=a?r[i+1]:0,u=i+2<r.length,h=u?r[i+2]:0,f=s>>2,m=(s&3)<<4|c>>4;let I=(c&15)<<2|h>>6,P=h&63;u||(P=64,a||(I=64)),n.push(t[f],t[m],t[I],t[P])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Vh(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Am(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const s=t[r.charAt(i++)],c=i<r.length?t[r.charAt(i)]:0;++i;const h=i<r.length?t[r.charAt(i)]:64;++i;const m=i<r.length?t[r.charAt(i)]:64;if(++i,s==null||c==null||h==null||m==null)throw new Rm;const I=s<<2|c>>4;if(n.push(I),h!==64){const P=c<<4&240|h>>2;if(n.push(P),m!==64){const C=h<<6&192|m;n.push(C)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Rm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const bm=function(r){const e=Vh(r);return Dh.encodeByteArray(e,!0)},kh=function(r){return bm(r).replace(/\./g,"")},Nh=function(r){try{return Dh.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pm=()=>xh().__FIREBASE_DEFAULTS__,Sm=()=>{if(typeof process>"u"||typeof Nu>"u")return;const r=Nu.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Cm=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Nh(r[1]);return e&&JSON.parse(e)},Us=()=>{try{return wm()||Pm()||Sm()||Cm()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Vm=r=>{var e,t;return(t=(e=Us())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},Oh=()=>{var r;return(r=Us())===null||r===void 0?void 0:r.config},Mh=r=>{var e;return(e=Us())===null||e===void 0?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function km(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(pe())}function Nm(){var r;const e=(r=Us())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function xm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Om(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Mm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Lm(){const r=pe();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Lh(){return!Nm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Fh(){try{return typeof indexedDB=="object"}catch{return!1}}function Fm(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}function $T(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Um="FirebaseError";class ht extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Um,Object.setPrototypeOf(this,ht.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ai.prototype.create)}}class ai{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?Bm(s,n):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new ht(i,c,n)}}function Bm(r,e){return r.replace(qm,(t,n)=>{const i=e[n];return i!=null?String(i):`<${n}?>`})}const qm=/\{\$([^}]+)}/g;function jm(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function on(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const i of t){if(!n.includes(i))return!1;const s=r[i],a=e[i];if(xu(s)&&xu(a)){if(!on(s,a))return!1}else if(s!==a)return!1}for(const i of n)if(!t.includes(i))return!1;return!0}function xu(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ci(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Vr(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[i,s]=n.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Dr(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function zm(r,e){const t=new $m(r,e);return t.subscribe.bind(t)}class $m{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");Gm(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:n},i.next===void 0&&(i.next=Mo),i.error===void 0&&(i.error=Mo),i.complete===void 0&&(i.complete=Mo);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Gm(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Mo(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function le(r){return r&&r._delegate?r._delegate:r}class an{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Dm;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Hm(e))try{this.getOrInitializeService({instanceIdentifier:Ht})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(e=Ht){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ht){return this.instances.has(e)}getOptions(e=Ht){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);n===c&&a.resolve(i)}return i}onInit(e,t){var n;const i=this.normalizeInstanceIdentifier(t),s=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Wm(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Ht){return this.component?this.component.multipleInstances?e:Ht:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Wm(r){return r===Ht?void 0:r}function Hm(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Km(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(W||(W={}));const Ym={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},Jm=W.INFO,Xm={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Zm=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),i=Xm[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Va{constructor(e){this.name=e,this._logLevel=Jm,this._logHandler=Zm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ym[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}}const eg=(r,e)=>e.some(t=>r instanceof t);let Ou,Mu;function tg(){return Ou||(Ou=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ng(){return Mu||(Mu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Uh=new WeakMap,Yo=new WeakMap,Bh=new WeakMap,Lo=new WeakMap,Da=new WeakMap;function rg(r){const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("success",s),r.removeEventListener("error",a)},s=()=>{t(st(r.result)),i()},a=()=>{n(r.error),i()};r.addEventListener("success",s),r.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Uh.set(t,r)}).catch(()=>{}),Da.set(e,r),e}function ig(r){if(Yo.has(r))return;const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("complete",s),r.removeEventListener("error",a),r.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",s),r.addEventListener("error",a),r.addEventListener("abort",a)});Yo.set(r,e)}let Jo={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Yo.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Bh.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return st(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function sg(r){Jo=r(Jo)}function og(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(Fo(this),e,...t);return Bh.set(n,e.sort?e.sort():[e]),st(n)}:ng().includes(r)?function(...e){return r.apply(Fo(this),e),st(Uh.get(this))}:function(...e){return st(r.apply(Fo(this),e))}}function ag(r){return typeof r=="function"?og(r):(r instanceof IDBTransaction&&ig(r),eg(r,tg())?new Proxy(r,Jo):r)}function st(r){if(r instanceof IDBRequest)return rg(r);if(Lo.has(r))return Lo.get(r);const e=ag(r);return e!==r&&(Lo.set(r,e),Da.set(e,r)),e}const Fo=r=>Da.get(r);function cg(r,e,{blocked:t,upgrade:n,blocking:i,terminated:s}={}){const a=indexedDB.open(r,e),c=st(a);return n&&a.addEventListener("upgradeneeded",u=>{n(st(a.result),u.oldVersion,u.newVersion,st(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}function GT(r,{blocked:e}={}){const t=indexedDB.deleteDatabase(r);return e&&t.addEventListener("blocked",n=>e(n.oldVersion,n)),st(t).then(()=>{})}const ug=["get","getKey","getAll","getAllKeys","count"],lg=["put","add","delete","clear"],Uo=new Map;function Lu(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Uo.get(e))return Uo.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=lg.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||ug.includes(t)))return;const s=async function(a,...c){const u=this.transaction(a,i?"readwrite":"readonly");let h=u.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),i&&u.done]))[0]};return Uo.set(e,s),s}sg(r=>({...r,get:(e,t,n)=>Lu(e,t)||r.get(e,t,n),has:(e,t)=>!!Lu(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(dg(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function dg(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Xo="@firebase/app",Fu="0.11.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at=new Va("@firebase/app"),fg="@firebase/app-compat",pg="@firebase/analytics-compat",mg="@firebase/analytics",gg="@firebase/app-check-compat",_g="@firebase/app-check",yg="@firebase/auth",Ig="@firebase/auth-compat",Eg="@firebase/database",vg="@firebase/data-connect",Tg="@firebase/database-compat",wg="@firebase/functions",Ag="@firebase/functions-compat",Rg="@firebase/installations",bg="@firebase/installations-compat",Pg="@firebase/messaging",Sg="@firebase/messaging-compat",Cg="@firebase/performance",Vg="@firebase/performance-compat",Dg="@firebase/remote-config",kg="@firebase/remote-config-compat",Ng="@firebase/storage",xg="@firebase/storage-compat",Og="@firebase/firestore",Mg="@firebase/vertexai",Lg="@firebase/firestore-compat",Fg="firebase",Ug="11.6.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zo="[DEFAULT]",Bg={[Xo]:"fire-core",[fg]:"fire-core-compat",[mg]:"fire-analytics",[pg]:"fire-analytics-compat",[_g]:"fire-app-check",[gg]:"fire-app-check-compat",[yg]:"fire-auth",[Ig]:"fire-auth-compat",[Eg]:"fire-rtdb",[vg]:"fire-data-connect",[Tg]:"fire-rtdb-compat",[wg]:"fire-fn",[Ag]:"fire-fn-compat",[Rg]:"fire-iid",[bg]:"fire-iid-compat",[Pg]:"fire-fcm",[Sg]:"fire-fcm-compat",[Cg]:"fire-perf",[Vg]:"fire-perf-compat",[Dg]:"fire-rc",[kg]:"fire-rc-compat",[Ng]:"fire-gcs",[xg]:"fire-gcs-compat",[Og]:"fire-fst",[Lg]:"fire-fst-compat",[Mg]:"fire-vertex","fire-js":"fire-js",[Fg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fs=new Map,qg=new Map,ea=new Map;function Uu(r,e){try{r.container.addComponent(e)}catch(t){at.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Bn(r){const e=r.name;if(ea.has(e))return at.debug(`There were multiple attempts to register component ${e}.`),!1;ea.set(e,r);for(const t of fs.values())Uu(t,r);for(const t of qg.values())Uu(t,r);return!0}function ka(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Fe(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Dt=new ai("app","Firebase",jg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new an("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Dt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr=Ug;function $g(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:Zo,automaticDataCollectionEnabled:!1},e),i=n.name;if(typeof i!="string"||!i)throw Dt.create("bad-app-name",{appName:String(i)});if(t||(t=Oh()),!t)throw Dt.create("no-options");const s=fs.get(i);if(s){if(on(t,s.options)&&on(n,s.config))return s;throw Dt.create("duplicate-app",{appName:i})}const a=new Qm(i);for(const u of ea.values())a.addComponent(u);const c=new zg(t,n,a);return fs.set(i,c),c}function Gg(r=Zo){const e=fs.get(r);if(!e&&r===Zo&&Oh())return $g();if(!e)throw Dt.create("no-app",{appName:r});return e}function kt(r,e,t){var n;let i=(n=Bg[r])!==null&&n!==void 0?n:r;t&&(i+=`-${t}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),at.warn(c.join(" "));return}Bn(new an(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg="firebase-heartbeat-database",Wg=1,$r="firebase-heartbeat-store";let Bo=null;function qh(){return Bo||(Bo=cg(Kg,Wg,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore($r)}catch(t){console.warn(t)}}}}).catch(r=>{throw Dt.create("idb-open",{originalErrorMessage:r.message})})),Bo}async function Hg(r){try{const t=(await qh()).transaction($r),n=await t.objectStore($r).get(jh(r));return await t.done,n}catch(e){if(e instanceof ht)at.warn(e.message);else{const t=Dt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});at.warn(t.message)}}}async function Bu(r,e){try{const n=(await qh()).transaction($r,"readwrite");await n.objectStore($r).put(e,jh(r)),await n.done}catch(t){if(t instanceof ht)at.warn(t.message);else{const n=Dt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});at.warn(n.message)}}}function jh(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qg=1024,Yg=30;class Jg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Zg(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=qu();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>Yg){const a=e_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){at.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=qu(),{heartbeatsToSend:n,unsentEntries:i}=Xg(this._heartbeatsCache.heartbeats),s=kh(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return at.warn(t),""}}}function qu(){return new Date().toISOString().substring(0,10)}function Xg(r,e=Qg){const t=[];let n=r.slice();for(const i of r){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),ju(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ju(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class Zg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Fh()?Fm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Hg(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Bu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Bu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ju(r){return kh(JSON.stringify({version:2,heartbeats:r})).length}function e_(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function t_(r){Bn(new an("platform-logger",e=>new hg(e),"PRIVATE")),Bn(new an("heartbeat",e=>new Jg(e),"PRIVATE")),kt(Xo,Fu,r),kt(Xo,Fu,"esm2017"),kt("fire-js","")}t_("");var zu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Nt,zh;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,g){function y(){}y.prototype=g.prototype,E.D=g.prototype,E.prototype=new y,E.prototype.constructor=E,E.C=function(v,T,R){for(var _=Array(arguments.length-2),Ze=2;Ze<arguments.length;Ze++)_[Ze-2]=arguments[Ze];return g.prototype[T].apply(v,_)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,g,y){y||(y=0);var v=Array(16);if(typeof g=="string")for(var T=0;16>T;++T)v[T]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(T=0;16>T;++T)v[T]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=E.g[0],y=E.g[1],T=E.g[2];var R=E.g[3],_=g+(R^y&(T^R))+v[0]+3614090360&4294967295;g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[1]+3905402710&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[2]+606105819&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+v[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[5]+1200080426&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[6]+2821735955&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+v[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[9]+2336552879&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[10]+4294925233&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+v[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[13]+4254626195&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[14]+2792965006&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(T^R&(y^T))+v[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[6]+3225465664&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[11]+643717713&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+v[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[10]+38016083&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[15]+3634488961&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+v[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[14]+3275163606&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[3]+4107603335&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+v[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[2]+4243563512&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[7]+1735328473&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(y^T^R)+v[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[8]+2272392833&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[11]+1839030562&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+v[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[4]+1272893353&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[7]+4139469664&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+v[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[0]+3936430074&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[3]+3572445317&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+v[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[12]+3873151461&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[15]+530742520&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(T^(y|~R))+v[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[7]+1126891415&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[14]+2878612391&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+v[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[3]+2399980690&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[10]+4293915773&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+v[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[15]+4264355552&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[6]+2734768916&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+v[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[11]+3174756917&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[2]+718787259&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+R&4294967295}n.prototype.u=function(E,g){g===void 0&&(g=E.length);for(var y=g-this.blockSize,v=this.B,T=this.h,R=0;R<g;){if(T==0)for(;R<=y;)i(this,E,R),R+=this.blockSize;if(typeof E=="string"){for(;R<g;)if(v[T++]=E.charCodeAt(R++),T==this.blockSize){i(this,v),T=0;break}}else for(;R<g;)if(v[T++]=E[R++],T==this.blockSize){i(this,v),T=0;break}}this.h=T,this.o+=g},n.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;var y=8*this.o;for(g=E.length-8;g<E.length;++g)E[g]=y&255,y/=256;for(this.u(E),E=Array(16),g=y=0;4>g;++g)for(var v=0;32>v;v+=8)E[y++]=this.g[g]>>>v&255;return E};function s(E,g){var y=c;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=g(E)}function a(E,g){this.h=g;for(var y=[],v=!0,T=E.length-1;0<=T;T--){var R=E[T]|0;v&&R==g||(y[T]=R,v=!1)}this.g=y}var c={};function u(E){return-128<=E&&128>E?s(E,function(g){return new a([g|0],0>g?-1:0)}):new a([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return m;if(0>E)return D(h(-E));for(var g=[],y=1,v=0;E>=y;v++)g[v]=E/y|0,y*=4294967296;return new a(g,0)}function f(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return D(f(E.substring(1),g));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(g,8)),v=m,T=0;T<E.length;T+=8){var R=Math.min(8,E.length-T),_=parseInt(E.substring(T,T+R),g);8>R?(R=h(Math.pow(g,R)),v=v.j(R).add(h(_))):(v=v.j(y),v=v.add(h(_)))}return v}var m=u(0),I=u(1),P=u(16777216);r=a.prototype,r.m=function(){if(x(this))return-D(this).m();for(var E=0,g=1,y=0;y<this.g.length;y++){var v=this.i(y);E+=(0<=v?v:4294967296+v)*g,g*=4294967296}return E},r.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(C(this))return"0";if(x(this))return"-"+D(this).toString(E);for(var g=h(Math.pow(E,6)),y=this,v="";;){var T=Q(y,g).g;y=$(y,T.j(g));var R=((0<y.g.length?y.g[0]:y.h)>>>0).toString(E);if(y=T,C(y))return R+v;for(;6>R.length;)R="0"+R;v=R+v}},r.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function C(E){if(E.h!=0)return!1;for(var g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function x(E){return E.h==-1}r.l=function(E){return E=$(this,E),x(E)?-1:C(E)?0:1};function D(E){for(var g=E.g.length,y=[],v=0;v<g;v++)y[v]=~E.g[v];return new a(y,~E.h).add(I)}r.abs=function(){return x(this)?D(this):this},r.add=function(E){for(var g=Math.max(this.g.length,E.g.length),y=[],v=0,T=0;T<=g;T++){var R=v+(this.i(T)&65535)+(E.i(T)&65535),_=(R>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);v=_>>>16,R&=65535,_&=65535,y[T]=_<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function $(E,g){return E.add(D(g))}r.j=function(E){if(C(this)||C(E))return m;if(x(this))return x(E)?D(this).j(D(E)):D(D(this).j(E));if(x(E))return D(this.j(D(E)));if(0>this.l(P)&&0>E.l(P))return h(this.m()*E.m());for(var g=this.g.length+E.g.length,y=[],v=0;v<2*g;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(var T=0;T<E.g.length;T++){var R=this.i(v)>>>16,_=this.i(v)&65535,Ze=E.i(T)>>>16,cr=E.i(T)&65535;y[2*v+2*T]+=_*cr,j(y,2*v+2*T),y[2*v+2*T+1]+=R*cr,j(y,2*v+2*T+1),y[2*v+2*T+1]+=_*Ze,j(y,2*v+2*T+1),y[2*v+2*T+2]+=R*Ze,j(y,2*v+2*T+2)}for(v=0;v<g;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=g;v<2*g;v++)y[v]=0;return new a(y,0)};function j(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function F(E,g){this.g=E,this.h=g}function Q(E,g){if(C(g))throw Error("division by zero");if(C(E))return new F(m,m);if(x(E))return g=Q(D(E),g),new F(D(g.g),D(g.h));if(x(g))return g=Q(E,D(g)),new F(D(g.g),g.h);if(30<E.g.length){if(x(E)||x(g))throw Error("slowDivide_ only works with positive integers.");for(var y=I,v=g;0>=v.l(E);)y=Z(y),v=Z(v);var T=K(y,1),R=K(v,1);for(v=K(v,2),y=K(y,2);!C(v);){var _=R.add(v);0>=_.l(E)&&(T=T.add(y),R=_),v=K(v,1),y=K(y,1)}return g=$(E,T.j(g)),new F(T,g)}for(T=m;0<=E.l(g);){for(y=Math.max(1,Math.floor(E.m()/g.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),R=h(y),_=R.j(g);x(_)||0<_.l(E);)y-=v,R=h(y),_=R.j(g);C(R)&&(R=I),T=T.add(R),E=$(E,_)}return new F(T,E)}r.A=function(E){return Q(this,E).h},r.and=function(E){for(var g=Math.max(this.g.length,E.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)&E.i(v);return new a(y,this.h&E.h)},r.or=function(E){for(var g=Math.max(this.g.length,E.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)|E.i(v);return new a(y,this.h|E.h)},r.xor=function(E){for(var g=Math.max(this.g.length,E.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)^E.i(v);return new a(y,this.h^E.h)};function Z(E){for(var g=E.g.length+1,y=[],v=0;v<g;v++)y[v]=E.i(v)<<1|E.i(v-1)>>>31;return new a(y,E.h)}function K(E,g){var y=g>>5;g%=32;for(var v=E.g.length-y,T=[],R=0;R<v;R++)T[R]=0<g?E.i(R+y)>>>g|E.i(R+y+1)<<32-g:E.i(R+y);return new a(T,E.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,zh=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Nt=a}).apply(typeof zu<"u"?zu:typeof self<"u"?self:typeof window<"u"?window:{});var $i=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var $h,kr,Gh,Xi,ta,Kh,Wh,Hh;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,d){return o==Array.prototype||o==Object.prototype||(o[l]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof $i=="object"&&$i];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function i(o,l){if(l)e:{var d=n;o=o.split(".");for(var p=0;p<o.length-1;p++){var A=o[p];if(!(A in d))break e;d=d[A]}o=o[o.length-1],p=d[o],l=l(p),l!=p&&l!=null&&e(d,o,{configurable:!0,writable:!0,value:l})}}function s(o,l){o instanceof String&&(o+="");var d=0,p=!1,A={next:function(){if(!p&&d<o.length){var b=d++;return{value:l(b,o[b]),done:!1}}return p=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}i("Array.prototype.values",function(o){return o||function(){return s(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function h(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function f(o,l,d){return o.call.apply(o.bind,arguments)}function m(o,l,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,p),o.apply(l,A)}}return function(){return o.apply(l,arguments)}}function I(o,l,d){return I=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,I.apply(null,arguments)}function P(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function C(o,l){function d(){}d.prototype=l.prototype,o.aa=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,A,b){for(var N=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)N[ne-2]=arguments[ne];return l.prototype[A].apply(p,N)}}function x(o){const l=o.length;if(0<l){const d=Array(l);for(let p=0;p<l;p++)d[p]=o[p];return d}return[]}function D(o,l){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const A=o.length||0,b=p.length||0;o.length=A+b;for(let N=0;N<b;N++)o[A+N]=p[N]}else o.push(p)}}class ${constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function j(o){return/^[\s\xa0]*$/.test(o)}function F(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function Q(o){return Q[" "](o),o}Q[" "]=function(){};var Z=F().indexOf("Gecko")!=-1&&!(F().toLowerCase().indexOf("webkit")!=-1&&F().indexOf("Edge")==-1)&&!(F().indexOf("Trident")!=-1||F().indexOf("MSIE")!=-1)&&F().indexOf("Edge")==-1;function K(o,l,d){for(const p in o)l.call(d,o[p],p,o)}function E(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function g(o){const l={};for(const d in o)l[d]=o[d];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(o,l){let d,p;for(let A=1;A<arguments.length;A++){p=arguments[A];for(d in p)o[d]=p[d];for(let b=0;b<y.length;b++)d=y[b],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function T(o){var l=1;o=o.split(":");const d=[];for(;0<l&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function R(o){c.setTimeout(()=>{throw o},0)}function _(){var o=ho;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class Ze{constructor(){this.h=this.g=null}add(l,d){const p=cr.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var cr=new $(()=>new jp,o=>o.reset());class jp{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let ur,lr=!1,ho=new Ze,Nc=()=>{const o=c.Promise.resolve(void 0);ur=()=>{o.then(zp)}};var zp=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(d){R(d)}var l=cr;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}lr=!1};function _t(){this.s=this.s,this.C=this.C}_t.prototype.s=!1,_t.prototype.ma=function(){this.s||(this.s=!0,this.N())},_t.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ie(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}Ie.prototype.h=function(){this.defaultPrevented=!0};var $p=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};c.addEventListener("test",d,l),c.removeEventListener("test",d,l)}catch{}return o}();function hr(o,l){if(Ie.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(Z){e:{try{Q(l.nodeName);var A=!0;break e}catch{}A=!1}A||(l=null)}}else d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Gp[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&hr.aa.h.call(this)}}C(hr,Ie);var Gp={2:"touch",3:"pen",4:"mouse"};hr.prototype.h=function(){hr.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Ri="closure_listenable_"+(1e6*Math.random()|0),Kp=0;function Wp(o,l,d,p,A){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=A,this.key=++Kp,this.da=this.fa=!1}function bi(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Pi(o){this.src=o,this.g={},this.h=0}Pi.prototype.add=function(o,l,d,p,A){var b=o.toString();o=this.g[b],o||(o=this.g[b]=[],this.h++);var N=po(o,l,p,A);return-1<N?(l=o[N],d||(l.fa=!1)):(l=new Wp(l,this.src,b,!!p,A),l.fa=d,o.push(l)),l};function fo(o,l){var d=l.type;if(d in o.g){var p=o.g[d],A=Array.prototype.indexOf.call(p,l,void 0),b;(b=0<=A)&&Array.prototype.splice.call(p,A,1),b&&(bi(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function po(o,l,d,p){for(var A=0;A<o.length;++A){var b=o[A];if(!b.da&&b.listener==l&&b.capture==!!d&&b.ha==p)return A}return-1}var mo="closure_lm_"+(1e6*Math.random()|0),go={};function xc(o,l,d,p,A){if(Array.isArray(l)){for(var b=0;b<l.length;b++)xc(o,l[b],d,p,A);return null}return d=Lc(d),o&&o[Ri]?o.K(l,d,h(p)?!!p.capture:!1,A):Hp(o,l,d,!1,p,A)}function Hp(o,l,d,p,A,b){if(!l)throw Error("Invalid event type");var N=h(A)?!!A.capture:!!A,ne=yo(o);if(ne||(o[mo]=ne=new Pi(o)),d=ne.add(l,d,p,N,b),d.proxy)return d;if(p=Qp(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)$p||(A=N),A===void 0&&(A=!1),o.addEventListener(l.toString(),p,A);else if(o.attachEvent)o.attachEvent(Mc(l.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Qp(){function o(d){return l.call(o.src,o.listener,d)}const l=Yp;return o}function Oc(o,l,d,p,A){if(Array.isArray(l))for(var b=0;b<l.length;b++)Oc(o,l[b],d,p,A);else p=h(p)?!!p.capture:!!p,d=Lc(d),o&&o[Ri]?(o=o.i,l=String(l).toString(),l in o.g&&(b=o.g[l],d=po(b,d,p,A),-1<d&&(bi(b[d]),Array.prototype.splice.call(b,d,1),b.length==0&&(delete o.g[l],o.h--)))):o&&(o=yo(o))&&(l=o.g[l.toString()],o=-1,l&&(o=po(l,d,p,A)),(d=-1<o?l[o]:null)&&_o(d))}function _o(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[Ri])fo(l.i,o);else{var d=o.type,p=o.proxy;l.removeEventListener?l.removeEventListener(d,p,o.capture):l.detachEvent?l.detachEvent(Mc(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=yo(l))?(fo(d,o),d.h==0&&(d.src=null,l[mo]=null)):bi(o)}}}function Mc(o){return o in go?go[o]:go[o]="on"+o}function Yp(o,l){if(o.da)o=!0;else{l=new hr(l,this);var d=o.listener,p=o.ha||o.src;o.fa&&_o(o),o=d.call(p,l)}return o}function yo(o){return o=o[mo],o instanceof Pi?o:null}var Io="__closure_events_fn_"+(1e9*Math.random()>>>0);function Lc(o){return typeof o=="function"?o:(o[Io]||(o[Io]=function(l){return o.handleEvent(l)}),o[Io])}function Ee(){_t.call(this),this.i=new Pi(this),this.M=this,this.F=null}C(Ee,_t),Ee.prototype[Ri]=!0,Ee.prototype.removeEventListener=function(o,l,d,p){Oc(this,o,l,d,p)};function Pe(o,l){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=l.type||l,typeof l=="string")l=new Ie(l,o);else if(l instanceof Ie)l.target=l.target||o;else{var A=l;l=new Ie(p,o),v(l,A)}if(A=!0,d)for(var b=d.length-1;0<=b;b--){var N=l.g=d[b];A=Si(N,p,!0,l)&&A}if(N=l.g=o,A=Si(N,p,!0,l)&&A,A=Si(N,p,!1,l)&&A,d)for(b=0;b<d.length;b++)N=l.g=d[b],A=Si(N,p,!1,l)&&A}Ee.prototype.N=function(){if(Ee.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var d=o.g[l],p=0;p<d.length;p++)bi(d[p]);delete o.g[l],o.h--}}this.F=null},Ee.prototype.K=function(o,l,d,p){return this.i.add(String(o),l,!1,d,p)},Ee.prototype.L=function(o,l,d,p){return this.i.add(String(o),l,!0,d,p)};function Si(o,l,d,p){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var A=!0,b=0;b<l.length;++b){var N=l[b];if(N&&!N.da&&N.capture==d){var ne=N.listener,_e=N.ha||N.src;N.fa&&fo(o.i,N),A=ne.call(_e,p)!==!1&&A}}return A&&!p.defaultPrevented}function Fc(o,l,d){if(typeof o=="function")d&&(o=I(o,d));else if(o&&typeof o.handleEvent=="function")o=I(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(o,l||0)}function Uc(o){o.g=Fc(()=>{o.g=null,o.i&&(o.i=!1,Uc(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class Jp extends _t{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Uc(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function dr(o){_t.call(this),this.h=o,this.g={}}C(dr,_t);var Bc=[];function qc(o){K(o.g,function(l,d){this.g.hasOwnProperty(d)&&_o(l)},o),o.g={}}dr.prototype.N=function(){dr.aa.N.call(this),qc(this)},dr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Eo=c.JSON.stringify,Xp=c.JSON.parse,Zp=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function vo(){}vo.prototype.h=null;function jc(o){return o.h||(o.h=o.i())}function zc(){}var fr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function To(){Ie.call(this,"d")}C(To,Ie);function wo(){Ie.call(this,"c")}C(wo,Ie);var zt={},$c=null;function Ci(){return $c=$c||new Ee}zt.La="serverreachability";function Gc(o){Ie.call(this,zt.La,o)}C(Gc,Ie);function pr(o){const l=Ci();Pe(l,new Gc(l))}zt.STAT_EVENT="statevent";function Kc(o,l){Ie.call(this,zt.STAT_EVENT,o),this.stat=l}C(Kc,Ie);function Se(o){const l=Ci();Pe(l,new Kc(l,o))}zt.Ma="timingevent";function Wc(o,l){Ie.call(this,zt.Ma,o),this.size=l}C(Wc,Ie);function mr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},l)}function gr(){this.g=!0}gr.prototype.xa=function(){this.g=!1};function em(o,l,d,p,A,b){o.info(function(){if(o.g)if(b)for(var N="",ne=b.split("&"),_e=0;_e<ne.length;_e++){var J=ne[_e].split("=");if(1<J.length){var ve=J[0];J=J[1];var Te=ve.split("_");N=2<=Te.length&&Te[1]=="type"?N+(ve+"="+J+"&"):N+(ve+"=redacted&")}}else N=null;else N=b;return"XMLHTTP REQ ("+p+") [attempt "+A+"]: "+l+`
`+d+`
`+N})}function tm(o,l,d,p,A,b,N){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+A+"]: "+l+`
`+d+`
`+b+" "+N})}function En(o,l,d,p){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+rm(o,d)+(p?" "+p:"")})}function nm(o,l){o.info(function(){return"TIMEOUT: "+l})}gr.prototype.info=function(){};function rm(o,l){if(!o.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var A=p[1];if(Array.isArray(A)&&!(1>A.length)){var b=A[0];if(b!="noop"&&b!="stop"&&b!="close")for(var N=1;N<A.length;N++)A[N]=""}}}}return Eo(d)}catch{return l}}var Vi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Hc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ao;function Di(){}C(Di,vo),Di.prototype.g=function(){return new XMLHttpRequest},Di.prototype.i=function(){return{}},Ao=new Di;function yt(o,l,d,p){this.j=o,this.i=l,this.l=d,this.R=p||1,this.U=new dr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Qc}function Qc(){this.i=null,this.g="",this.h=!1}var Yc={},Ro={};function bo(o,l,d){o.L=1,o.v=Oi(et(l)),o.m=d,o.P=!0,Jc(o,null)}function Jc(o,l){o.F=Date.now(),ki(o),o.A=et(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),hu(d.i,"t",p),o.C=0,d=o.j.J,o.h=new Qc,o.g=Cu(o.j,d?l:null,!o.m),0<o.O&&(o.M=new Jp(I(o.Y,o,o.g),o.O)),l=o.U,d=o.g,p=o.ca;var A="readystatechange";Array.isArray(A)||(A&&(Bc[0]=A.toString()),A=Bc);for(var b=0;b<A.length;b++){var N=xc(d,A[b],p||l.handleEvent,!1,l.h||l);if(!N)break;l.g[N.key]=N}l=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),pr(),em(o.i,o.u,o.A,o.l,o.R,o.m)}yt.prototype.ca=function(o){o=o.target;const l=this.M;l&&tt(o)==3?l.j():this.Y(o)},yt.prototype.Y=function(o){try{if(o==this.g)e:{const Te=tt(this.g);var l=this.g.Ba();const wn=this.g.Z();if(!(3>Te)&&(Te!=3||this.g&&(this.h.h||this.g.oa()||yu(this.g)))){this.J||Te!=4||l==7||(l==8||0>=wn?pr(3):pr(2)),Po(this);var d=this.g.Z();this.X=d;t:if(Xc(this)){var p=yu(this.g);o="";var A=p.length,b=tt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){$t(this),_r(this);var N="";break t}this.h.i=new c.TextDecoder}for(l=0;l<A;l++)this.h.h=!0,o+=this.h.i.decode(p[l],{stream:!(b&&l==A-1)});p.length=0,this.h.g+=o,this.C=0,N=this.h.g}else N=this.g.oa();if(this.o=d==200,tm(this.i,this.u,this.A,this.l,this.R,Te,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,_e=this.g;if((ne=_e.g?_e.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(ne)){var J=ne;break t}}J=null}if(d=J)En(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,So(this,d);else{this.o=!1,this.s=3,Se(12),$t(this),_r(this);break e}}if(this.P){d=!0;let je;for(;!this.J&&this.C<N.length;)if(je=im(this,N),je==Ro){Te==4&&(this.s=4,Se(14),d=!1),En(this.i,this.l,null,"[Incomplete Response]");break}else if(je==Yc){this.s=4,Se(15),En(this.i,this.l,N,"[Invalid Chunk]"),d=!1;break}else En(this.i,this.l,je,null),So(this,je);if(Xc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Te!=4||N.length!=0||this.h.h||(this.s=1,Se(16),d=!1),this.o=this.o&&d,!d)En(this.i,this.l,N,"[Invalid Chunked Response]"),$t(this),_r(this);else if(0<N.length&&!this.W){this.W=!0;var ve=this.j;ve.g==this&&ve.ba&&!ve.M&&(ve.j.info("Great, no buffering proxy detected. Bytes received: "+N.length),xo(ve),ve.M=!0,Se(11))}}else En(this.i,this.l,N,null),So(this,N);Te==4&&$t(this),this.o&&!this.J&&(Te==4?Ru(this.j,this):(this.o=!1,ki(this)))}else vm(this.g),d==400&&0<N.indexOf("Unknown SID")?(this.s=3,Se(12)):(this.s=0,Se(13)),$t(this),_r(this)}}}catch{}finally{}};function Xc(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function im(o,l){var d=o.C,p=l.indexOf(`
`,d);return p==-1?Ro:(d=Number(l.substring(d,p)),isNaN(d)?Yc:(p+=1,p+d>l.length?Ro:(l=l.slice(p,p+d),o.C=p+d,l)))}yt.prototype.cancel=function(){this.J=!0,$t(this)};function ki(o){o.S=Date.now()+o.I,Zc(o,o.I)}function Zc(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=mr(I(o.ba,o),l)}function Po(o){o.B&&(c.clearTimeout(o.B),o.B=null)}yt.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(nm(this.i,this.A),this.L!=2&&(pr(),Se(17)),$t(this),this.s=2,_r(this)):Zc(this,this.S-o)};function _r(o){o.j.G==0||o.J||Ru(o.j,o)}function $t(o){Po(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,qc(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function So(o,l){try{var d=o.j;if(d.G!=0&&(d.g==o||Co(d.h,o))){if(!o.K&&Co(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var A=p;if(A[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)qi(d),Ui(d);else break e;No(d),Se(18)}}else d.za=A[1],0<d.za-d.T&&37500>A[2]&&d.F&&d.v==0&&!d.C&&(d.C=mr(I(d.Za,d),6e3));if(1>=nu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Kt(d,11)}else if((o.K||d.g==o)&&qi(d),!j(l))for(A=d.Da.g.parse(l),l=0;l<A.length;l++){let J=A[l];if(d.T=J[0],J=J[1],d.G==2)if(J[0]=="c"){d.K=J[1],d.ia=J[2];const ve=J[3];ve!=null&&(d.la=ve,d.j.info("VER="+d.la));const Te=J[4];Te!=null&&(d.Aa=Te,d.j.info("SVER="+d.Aa));const wn=J[5];wn!=null&&typeof wn=="number"&&0<wn&&(p=1.5*wn,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const je=o.g;if(je){const zi=je.g?je.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(zi){var b=p.h;b.g||zi.indexOf("spdy")==-1&&zi.indexOf("quic")==-1&&zi.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Vo(b,b.h),b.h=null))}if(p.D){const Oo=je.g?je.g.getResponseHeader("X-HTTP-Session-Id"):null;Oo&&(p.ya=Oo,re(p.I,p.D,Oo))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var N=o;if(p.qa=Su(p,p.J?p.ia:null,p.W),N.K){ru(p.h,N);var ne=N,_e=p.L;_e&&(ne.I=_e),ne.B&&(Po(ne),ki(ne)),p.g=N}else wu(p);0<d.i.length&&Bi(d)}else J[0]!="stop"&&J[0]!="close"||Kt(d,7);else d.G==3&&(J[0]=="stop"||J[0]=="close"?J[0]=="stop"?Kt(d,7):ko(d):J[0]!="noop"&&d.l&&d.l.ta(J),d.v=0)}}pr(4)}catch{}}var sm=class{constructor(o,l){this.g=o,this.map=l}};function eu(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function tu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function nu(o){return o.h?1:o.g?o.g.size:0}function Co(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Vo(o,l){o.g?o.g.add(l):o.h=l}function ru(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}eu.prototype.cancel=function(){if(this.i=iu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function iu(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.D);return l}return x(o.i)}function om(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var l=[],d=o.length,p=0;p<d;p++)l.push(o[p]);return l}l=[],d=0;for(p in o)l[d++]=o[p];return l}function am(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var l=[];o=o.length;for(var d=0;d<o;d++)l.push(d);return l}l=[],d=0;for(const p in o)l[d++]=p;return l}}}function su(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var d=am(o),p=om(o),A=p.length,b=0;b<A;b++)l.call(void 0,p[b],d&&d[b],o)}var ou=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function cm(o,l){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),A=null;if(0<=p){var b=o[d].substring(0,p);A=o[d].substring(p+1)}else b=o[d];l(b,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Gt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Gt){this.h=o.h,Ni(this,o.j),this.o=o.o,this.g=o.g,xi(this,o.s),this.l=o.l;var l=o.i,d=new Er;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),au(this,d),this.m=o.m}else o&&(l=String(o).match(ou))?(this.h=!1,Ni(this,l[1]||"",!0),this.o=yr(l[2]||""),this.g=yr(l[3]||"",!0),xi(this,l[4]),this.l=yr(l[5]||"",!0),au(this,l[6]||"",!0),this.m=yr(l[7]||"")):(this.h=!1,this.i=new Er(null,this.h))}Gt.prototype.toString=function(){var o=[],l=this.j;l&&o.push(Ir(l,cu,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Ir(l,cu,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Ir(d,d.charAt(0)=="/"?hm:lm,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Ir(d,fm)),o.join("")};function et(o){return new Gt(o)}function Ni(o,l,d){o.j=d?yr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function xi(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function au(o,l,d){l instanceof Er?(o.i=l,pm(o.i,o.h)):(d||(l=Ir(l,dm)),o.i=new Er(l,o.h))}function re(o,l,d){o.i.set(l,d)}function Oi(o){return re(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function yr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ir(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,um),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function um(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var cu=/[#\/\?@]/g,lm=/[#\?:]/g,hm=/[#\?]/g,dm=/[#\?@]/g,fm=/#/g;function Er(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function It(o){o.g||(o.g=new Map,o.h=0,o.i&&cm(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Er.prototype,r.add=function(o,l){It(this),this.i=null,o=vn(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function uu(o,l){It(o),l=vn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function lu(o,l){return It(o),l=vn(o,l),o.g.has(l)}r.forEach=function(o,l){It(this),this.g.forEach(function(d,p){d.forEach(function(A){o.call(l,A,p,this)},this)},this)},r.na=function(){It(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){const A=o[p];for(let b=0;b<A.length;b++)d.push(l[p])}return d},r.V=function(o){It(this);let l=[];if(typeof o=="string")lu(this,o)&&(l=l.concat(this.g.get(vn(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)l=l.concat(o[d])}return l},r.set=function(o,l){return It(this),this.i=null,o=vn(this,o),lu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},r.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function hu(o,l,d){uu(o,l),0<d.length&&(o.i=null,o.g.set(vn(o,l),x(d)),o.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];const b=encodeURIComponent(String(p)),N=this.V(p);for(p=0;p<N.length;p++){var A=b;N[p]!==""&&(A+="="+encodeURIComponent(String(N[p]))),o.push(A)}}return this.i=o.join("&")};function vn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function pm(o,l){l&&!o.j&&(It(o),o.i=null,o.g.forEach(function(d,p){var A=p.toLowerCase();p!=A&&(uu(this,p),hu(this,A,d))},o)),o.j=l}function mm(o,l){const d=new gr;if(c.Image){const p=new Image;p.onload=P(Et,d,"TestLoadImage: loaded",!0,l,p),p.onerror=P(Et,d,"TestLoadImage: error",!1,l,p),p.onabort=P(Et,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=P(Et,d,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else l(!1)}function gm(o,l){const d=new gr,p=new AbortController,A=setTimeout(()=>{p.abort(),Et(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:p.signal}).then(b=>{clearTimeout(A),b.ok?Et(d,"TestPingServer: ok",!0,l):Et(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),Et(d,"TestPingServer: error",!1,l)})}function Et(o,l,d,p,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),p(d)}catch{}}function _m(){this.g=new Zp}function ym(o,l,d){const p=d||"";try{su(o,function(A,b){let N=A;h(A)&&(N=Eo(A)),l.push(p+b+"="+encodeURIComponent(N))})}catch(A){throw l.push(p+"type="+encodeURIComponent("_badmap")),A}}function Mi(o){this.l=o.Ub||null,this.j=o.eb||!1}C(Mi,vo),Mi.prototype.g=function(){return new Li(this.l,this.j)},Mi.prototype.i=function(o){return function(){return o}}({});function Li(o,l){Ee.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Li,Ee),r=Li.prototype,r.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,Tr(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,vr(this)),this.readyState=0},r.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Tr(this)),this.g&&(this.readyState=3,Tr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;du(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function du(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}r.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?vr(this):Tr(this),this.readyState==3&&du(this)}},r.Ra=function(o){this.g&&(this.response=this.responseText=o,vr(this))},r.Qa=function(o){this.g&&(this.response=o,vr(this))},r.ga=function(){this.g&&vr(this)};function vr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Tr(o)}r.setRequestHeader=function(o,l){this.u.append(o,l)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function Tr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Li.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function fu(o){let l="";return K(o,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function Do(o,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=fu(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):re(o,l,d))}function ce(o){Ee.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(ce,Ee);var Im=/^https?$/i,Em=["POST","PUT"];r=ce.prototype,r.Ha=function(o){this.J=o},r.ea=function(o,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ao.g(),this.v=this.o?jc(this.o):jc(Ao),this.g.onreadystatechange=I(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(b){pu(this,b);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var A in p)d.set(A,p[A]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const b of p.keys())d.set(b,p.get(b));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(b=>b.toLowerCase()=="content-type"),A=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Em,l,void 0))||p||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,N]of d)this.g.setRequestHeader(b,N);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{_u(this),this.u=!0,this.g.send(o),this.u=!1}catch(b){pu(this,b)}};function pu(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,mu(o),Fi(o)}function mu(o){o.A||(o.A=!0,Pe(o,"complete"),Pe(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Pe(this,"complete"),Pe(this,"abort"),Fi(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Fi(this,!0)),ce.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?gu(this):this.bb())},r.bb=function(){gu(this)};function gu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||tt(o)!=4||o.Z()!=2)){if(o.u&&tt(o)==4)Fc(o.Ea,0,o);else if(Pe(o,"readystatechange"),tt(o)==4){o.h=!1;try{const N=o.Z();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=N===0){var A=String(o.D).match(ou)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),p=!Im.test(A?A.toLowerCase():"")}d=p}if(d)Pe(o,"complete"),Pe(o,"success");else{o.m=6;try{var b=2<tt(o)?o.g.statusText:""}catch{b=""}o.l=b+" ["+o.Z()+"]",mu(o)}}finally{Fi(o)}}}}function Fi(o,l){if(o.g){_u(o);const d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Pe(o,"ready");try{d.onreadystatechange=p}catch{}}}function _u(o){o.I&&(c.clearTimeout(o.I),o.I=null)}r.isActive=function(){return!!this.g};function tt(o){return o.g?o.g.readyState:0}r.Z=function(){try{return 2<tt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),Xp(l)}};function yu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function vm(o){const l={};o=(o.g&&2<=tt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(j(o[p]))continue;var d=T(o[p]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const b=l[A]||[];l[A]=b,b.push(d)}E(l,function(p){return p.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function wr(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function Iu(o){this.Aa=0,this.i=[],this.j=new gr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=wr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=wr("baseRetryDelayMs",5e3,o),this.cb=wr("retryDelaySeedMs",1e4,o),this.Wa=wr("forwardChannelMaxRetries",2,o),this.wa=wr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new eu(o&&o.concurrentRequestLimit),this.Da=new _m,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Iu.prototype,r.la=8,r.G=1,r.connect=function(o,l,d,p){Se(0),this.W=o,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=Su(this,null,this.W),Bi(this)};function ko(o){if(Eu(o),o.G==3){var l=o.U++,d=et(o.I);if(re(d,"SID",o.K),re(d,"RID",l),re(d,"TYPE","terminate"),Ar(o,d),l=new yt(o,o.j,l),l.L=2,l.v=Oi(et(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=l.v,d=!0),d||(l.g=Cu(l.j,null),l.g.ea(l.v)),l.F=Date.now(),ki(l)}Pu(o)}function Ui(o){o.g&&(xo(o),o.g.cancel(),o.g=null)}function Eu(o){Ui(o),o.u&&(c.clearTimeout(o.u),o.u=null),qi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Bi(o){if(!tu(o.h)&&!o.s){o.s=!0;var l=o.Ga;ur||Nc(),lr||(ur(),lr=!0),ho.add(l,o),o.B=0}}function Tm(o,l){return nu(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=mr(I(o.Ga,o,l),bu(o,o.B)),o.B++,!0)}r.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const A=new yt(this,this.j,o);let b=this.o;if(this.S&&(b?(b=g(b),v(b,this.S)):b=this.S),this.m!==null||this.O||(A.H=b,b=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Tu(this,A,l),d=et(this.I),re(d,"RID",o),re(d,"CVER",22),this.D&&re(d,"X-HTTP-Session-Id",this.D),Ar(this,d),b&&(this.O?l="headers="+encodeURIComponent(String(fu(b)))+"&"+l:this.m&&Do(d,this.m,b)),Vo(this.h,A),this.Ua&&re(d,"TYPE","init"),this.P?(re(d,"$req",l),re(d,"SID","null"),A.T=!0,bo(A,d,null)):bo(A,d,l),this.G=2}}else this.G==3&&(o?vu(this,o):this.i.length==0||tu(this.h)||vu(this))};function vu(o,l){var d;l?d=l.l:d=o.U++;const p=et(o.I);re(p,"SID",o.K),re(p,"RID",d),re(p,"AID",o.T),Ar(o,p),o.m&&o.o&&Do(p,o.m,o.o),d=new yt(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),l&&(o.i=l.D.concat(o.i)),l=Tu(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Vo(o.h,d),bo(d,p,l)}function Ar(o,l){o.H&&K(o.H,function(d,p){re(l,p,d)}),o.l&&su({},function(d,p){re(l,p,d)})}function Tu(o,l,d){d=Math.min(o.i.length,d);var p=o.l?I(o.l.Na,o.l,o):null;e:{var A=o.i;let b=-1;for(;;){const N=["count="+d];b==-1?0<d?(b=A[0].g,N.push("ofs="+b)):b=0:N.push("ofs="+b);let ne=!0;for(let _e=0;_e<d;_e++){let J=A[_e].g;const ve=A[_e].map;if(J-=b,0>J)b=Math.max(0,A[_e].g-100),ne=!1;else try{ym(ve,N,"req"+J+"_")}catch{p&&p(ve)}}if(ne){p=N.join("&");break e}}}return o=o.i.splice(0,d),l.D=o,p}function wu(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;ur||Nc(),lr||(ur(),lr=!0),ho.add(l,o),o.v=0}}function No(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=mr(I(o.Fa,o),bu(o,o.v)),o.v++,!0)}r.Fa=function(){if(this.u=null,Au(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=mr(I(this.ab,this),o)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Se(10),Ui(this),Au(this))};function xo(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Au(o){o.g=new yt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=et(o.qa);re(l,"RID","rpc"),re(l,"SID",o.K),re(l,"AID",o.T),re(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&re(l,"TO",o.ja),re(l,"TYPE","xmlhttp"),Ar(o,l),o.m&&o.o&&Do(l,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Oi(et(l)),d.m=null,d.P=!0,Jc(d,o)}r.Za=function(){this.C!=null&&(this.C=null,Ui(this),No(this),Se(19))};function qi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Ru(o,l){var d=null;if(o.g==l){qi(o),xo(o),o.g=null;var p=2}else if(Co(o.h,l))d=l.D,ru(o.h,l),p=1;else return;if(o.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var A=o.B;p=Ci(),Pe(p,new Wc(p,d)),Bi(o)}else wu(o);else if(A=l.s,A==3||A==0&&0<l.X||!(p==1&&Tm(o,l)||p==2&&No(o)))switch(d&&0<d.length&&(l=o.h,l.i=l.i.concat(d)),A){case 1:Kt(o,5);break;case 4:Kt(o,10);break;case 3:Kt(o,6);break;default:Kt(o,2)}}}function bu(o,l){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*l}function Kt(o,l){if(o.j.info("Error code "+l),l==2){var d=I(o.fb,o),p=o.Xa;const A=!p;p=new Gt(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Ni(p,"https"),Oi(p),A?mm(p.toString(),d):gm(p.toString(),d)}else Se(2);o.G=0,o.l&&o.l.sa(l),Pu(o),Eu(o)}r.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Se(2)):(this.j.info("Failed to ping google.com"),Se(1))};function Pu(o){if(o.G=0,o.ka=[],o.l){const l=iu(o.h);(l.length!=0||o.i.length!=0)&&(D(o.ka,l),D(o.ka,o.i),o.h.i.length=0,x(o.i),o.i.length=0),o.l.ra()}}function Su(o,l,d){var p=d instanceof Gt?et(d):new Gt(d);if(p.g!="")l&&(p.g=l+"."+p.g),xi(p,p.s);else{var A=c.location;p=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;var b=new Gt(null);p&&Ni(b,p),l&&(b.g=l),A&&xi(b,A),d&&(b.l=d),p=b}return d=o.D,l=o.ya,d&&l&&re(p,d,l),re(p,"VER",o.la),Ar(o,p),p}function Cu(o,l,d){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new ce(new Mi({eb:d})):new ce(o.pa),l.Ha(o.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Vu(){}r=Vu.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function ji(){}ji.prototype.g=function(o,l){return new xe(o,l)};function xe(o,l){Ee.call(this),this.g=new Iu(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!j(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!j(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new Tn(this)}C(xe,Ee),xe.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},xe.prototype.close=function(){ko(this.g)},xe.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=Eo(o),o=d);l.i.push(new sm(l.Ya++,o)),l.G==3&&Bi(l)},xe.prototype.N=function(){this.g.l=null,delete this.j,ko(this.g),delete this.g,xe.aa.N.call(this)};function Du(o){To.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const d in l){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}C(Du,To);function ku(){wo.call(this),this.status=1}C(ku,wo);function Tn(o){this.g=o}C(Tn,Vu),Tn.prototype.ua=function(){Pe(this.g,"a")},Tn.prototype.ta=function(o){Pe(this.g,new Du(o))},Tn.prototype.sa=function(o){Pe(this.g,new ku)},Tn.prototype.ra=function(){Pe(this.g,"b")},ji.prototype.createWebChannel=ji.prototype.g,xe.prototype.send=xe.prototype.o,xe.prototype.open=xe.prototype.m,xe.prototype.close=xe.prototype.close,Hh=function(){return new ji},Wh=function(){return Ci()},Kh=zt,ta={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Vi.NO_ERROR=0,Vi.TIMEOUT=8,Vi.HTTP_ERROR=6,Xi=Vi,Hc.COMPLETE="complete",Gh=Hc,zc.EventType=fr,fr.OPEN="a",fr.CLOSE="b",fr.ERROR="c",fr.MESSAGE="d",Ee.prototype.listen=Ee.prototype.K,kr=zc,ce.prototype.listenOnce=ce.prototype.L,ce.prototype.getLastError=ce.prototype.Ka,ce.prototype.getLastErrorCode=ce.prototype.Ba,ce.prototype.getStatus=ce.prototype.Z,ce.prototype.getResponseJson=ce.prototype.Oa,ce.prototype.getResponseText=ce.prototype.oa,ce.prototype.send=ce.prototype.ea,ce.prototype.setWithCredentials=ce.prototype.Ha,$h=ce}).apply(typeof $i<"u"?$i:typeof self<"u"?self:typeof window<"u"?window:{});const $u="@firebase/firestore",Gu="4.7.11";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ce.UNAUTHENTICATED=new Ce(null),Ce.GOOGLE_CREDENTIALS=new Ce("google-credentials-uid"),Ce.FIRST_PARTY=new Ce("first-party-uid"),Ce.MOCK_USER=new Ce("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rr="11.6.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn=new Va("@firebase/firestore");function Vn(){return cn.logLevel}function V(r,...e){if(cn.logLevel<=W.DEBUG){const t=e.map(Na);cn.debug(`Firestore (${rr}): ${r}`,...t)}}function Ve(r,...e){if(cn.logLevel<=W.ERROR){const t=e.map(Na);cn.error(`Firestore (${rr}): ${r}`,...t)}}function qn(r,...e){if(cn.logLevel<=W.WARN){const t=e.map(Na);cn.warn(`Firestore (${rr}): ${r}`,...t)}}function Na(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,Qh(r,n,t)}function Qh(r,e,t){let n=`FIRESTORE (${rr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw Ve(n),new Error(n)}function L(r,e,t,n){let i="Unexpected state";typeof t=="string"?i=t:n=t,r||Qh(e,i,n)}function z(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends ht{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class r_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ce.UNAUTHENTICATED))}shutdown(){}}class i_{constructor(e){this.t=e,this.currentUser=Ce.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){L(this.o===void 0,42304);let n=this.i;const i=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let s=new Qe;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Qe,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Qe)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(L(typeof n.accessToken=="string",31837,{l:n}),new n_(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return L(e===null||typeof e=="string",2055,{h:e}),new Ce(e)}}class s_{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Ce.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class o_{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new s_(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Ce.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ku{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class a_{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Fe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){L(this.o===void 0,3512);const n=s=>{s.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>n(s))};const i=s=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ku(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(L(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Ku(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c_(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yh(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jh{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const i=c_(40);for(let s=0;s<i.length;++s)n.length<20&&i[s]<t&&(n+=e.charAt(i[s]%62))}return n}}function q(r,e){return r<e?-1:r>e?1:0}function na(r,e){let t=0;for(;t<r.length&&t<e.length;){const n=r.codePointAt(t),i=e.codePointAt(t);if(n!==i){if(n<128&&i<128)return q(n,i);{const s=Yh(),a=u_(s.encode(Wu(r,t)),s.encode(Wu(e,t)));return a!==0?a:q(n,i)}}t+=n>65535?2:1}return q(r.length,e.length)}function Wu(r,e){return r.codePointAt(e)>65535?r.substring(e,e+2):r.substring(e,e+1)}function u_(r,e){for(let t=0;t<r.length&&t<e.length;++t)if(r[t]!==e[t])return q(r[t],e[t]);return q(r.length,e.length)}function jn(r,e,t){return r.length===e.length&&r.every((n,i)=>t(n,e[i]))}function Xh(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu=-62135596800,Qu=1e6;class ae{static now(){return ae.fromMillis(Date.now())}static fromDate(e){return ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Qu);return new ae(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Hu)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Qu}_compareTo(e){return this.seconds===e.seconds?q(this.nanoseconds,e.nanoseconds):q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-Hu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{static fromTimestamp(e){return new U(e)}static min(){return new U(new ae(0,0))}static max(){return new U(new ae(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yu="__name__";class Ke{constructor(e,t,n){t===void 0?t=0:t>e.length&&M(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&M(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return Ke.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ke?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const s=Ke.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return q(e.length,t.length)}static compareSegments(e,t){const n=Ke.isNumericId(e),i=Ke.isNumericId(t);return n&&!i?-1:!n&&i?1:n&&i?Ke.extractNumericId(e).compare(Ke.extractNumericId(t)):na(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Nt.fromString(e.substring(4,e.length-2))}}class X extends Ke{construct(e,t,n){return new X(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new k(S.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(i=>i.length>0))}return new X(t)}static emptyPath(){return new X([])}}const l_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class oe extends Ke{construct(e,t,n){return new oe(e,t,n)}static isValidIdentifier(e){return l_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),oe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Yu}static keyField(){return new oe([Yu])}static fromServerFormat(e){const t=[];let n="",i=0;const s=()=>{if(n.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let a=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new k(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new k(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(n+=c,i++):(s(),i++)}if(s(),a)throw new k(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new oe(t)}static emptyPath(){return new oe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(X.fromString(e))}static fromName(e){return new O(X.fromString(e).popFirst(5))}static empty(){return new O(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new X(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gr=-1;class ps{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}}function ra(r){return r.fields.find(e=>e.kind===2)}function Qt(r){return r.fields.filter(e=>e.kind!==2)}ps.UNKNOWN_ID=-1;class Zi{constructor(e,t){this.fieldPath=e,this.kind=t}}class Kr{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Kr(0,Le.min())}}function h_(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=U.fromTimestamp(n===1e9?new ae(t+1,0):new ae(t,n));return new Le(i,O.empty(),e)}function Zh(r){return new Le(r.readTime,r.key,Gr)}class Le{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Le(U.min(),O.empty(),Gr)}static max(){return new Le(U.max(),O.empty(),Gr)}}function xa(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(r.documentKey,e.documentKey),t!==0?t:q(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class td{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _n(r){if(r.code!==S.FAILED_PRECONDITION||r.message!==ed)throw r;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new w((n,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(n,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(n,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof w?t:w.resolve(t)}catch(t){return w.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):w.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):w.reject(t)}static resolve(e){return new w((t,n)=>{t(e)})}static reject(e){return new w((t,n)=>{n(e)})}static waitFor(e){return new w((t,n)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&t()},u=>n(u))}),a=!0,s===i&&t()})}static or(e){let t=w.resolve(!1);for(const n of e)t=t.next(i=>i?w.resolve(i):n());return t}static forEach(e,t){const n=[];return e.forEach((i,s)=>{n.push(t.call(this,i,s))}),this.waitFor(n)}static mapArray(e,t){return new w((n,i)=>{const s=e.length,a=new Array(s);let c=0;for(let u=0;u<s;u++){const h=u;t(e[h]).next(f=>{a[h]=f,++c,c===s&&n(a)},f=>i(f))}})}static doWhile(e,t){return new w((n,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):n()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oe="SimpleDb";class Bs{static open(e,t,n,i){try{return new Bs(t,e.transaction(i,n))}catch(s){throw new Lr(t,s)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Qe,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Lr(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const i=Oa(n.target.error);this.S.reject(new Lr(e,i))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(V(Oe,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}v(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new f_(t)}}class xt{static delete(e){return V(Oe,"Removing database:",e),Jt(xh().indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!Fh())return!1;if(xt.F())return!0;const e=pe(),t=xt.M(e),n=0<t&&t<10,i=nd(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||s)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.O)==="YES"}static N(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.B=n,this.L=null,xt.M(pe())===12.2&&Ve("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async k(e){return this.db||(V(Oe,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const a=s.target.result;t(a)},i.onblocked=()=>{n(new Lr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const a=s.target.error;a.name==="VersionError"?n(new k(S.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new k(S.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new Lr(e,a))},i.onupgradeneeded=s=>{V(Oe,'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const a=s.target.result;if(this.L!==null&&this.L!==s.oldVersion)throw new Error(`refusing to open IndexedDB database due to potential corruption of the IndexedDB database data; this corruption could be caused by clicking the "clear site data" button in a web browser; try reloading the web page to re-initialize the IndexedDB database: lastClosedDbVersion=${this.L}, event.oldVersion=${s.oldVersion}, event.newVersion=${s.newVersion}, db.version=${a.version}`);this.B.q(a,i.transaction,s.oldVersion,this.version).next(()=>{V(Oe,"Database upgrade to version "+this.version+" complete")})}}),this.db.addEventListener("close",t=>{const n=t.target;this.L=n.version},{passive:!0})),this.$&&(this.db.onversionchange=t=>this.$(t)),this.db}U(e){this.$=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,i){const s=t==="readonly";let a=0;for(;;){++a;try{this.db=await this.k(e);const c=Bs.open(this.db,e,s?"readonly":"readwrite",n),u=i(c).next(h=>(c.v(),h)).catch(h=>(c.abort(h),w.reject(h))).toPromise();return u.catch(()=>{}),await c.D,u}catch(c){const u=c,h=u.name!=="FirebaseError"&&a<3;if(V(Oe,"Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function nd(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class d_{constructor(e){this.K=e,this.W=!1,this.G=null}get isDone(){return this.W}get j(){return this.G}set cursor(e){this.K=e}done(){this.W=!0}H(e){this.G=e}delete(){return Jt(this.K.delete())}}class Lr extends k{constructor(e,t){super(S.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Bt(r){return r.name==="IndexedDbTransactionError"}class f_{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(V(Oe,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(V(Oe,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),Jt(n)}add(e){return V(Oe,"ADD",this.store.name,e,e),Jt(this.store.add(e))}get(e){return Jt(this.store.get(e)).next(t=>(t===void 0&&(t=null),V(Oe,"GET",this.store.name,e,t),t))}delete(e){return V(Oe,"DELETE",this.store.name,e),Jt(this.store.delete(e))}count(){return V(Oe,"COUNT",this.store.name),Jt(this.store.count())}J(e,t){const n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(n.range);return new w((a,c)=>{s.onerror=u=>{c(u.target.error)},s.onsuccess=u=>{a(u.target.result)}})}{const s=this.cursor(n),a=[];return this.Y(s,(c,u)=>{a.push(u)}).next(()=>a)}}Z(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new w((i,s)=>{n.onerror=a=>{s(a.target.error)},n.onsuccess=a=>{i(a.target.result)}})}X(e,t){V(Oe,"DELETE ALL",this.store.name);const n=this.options(e,t);n.ee=!1;const i=this.cursor(n);return this.Y(i,(s,a,c)=>c.delete())}te(e,t){let n;t?n=e:(n={},t=e);const i=this.cursor(n);return this.Y(i,t)}ne(e){const t=this.cursor({});return new w((n,i)=>{t.onerror=s=>{const a=Oa(s.target.error);i(a)},t.onsuccess=s=>{const a=s.target.result;a?e(a.primaryKey,a.value).next(c=>{c?a.continue():n()}):n()}})}Y(e,t){const n=[];return new w((i,s)=>{e.onerror=a=>{s(a.target.error)},e.onsuccess=a=>{const c=a.target.result;if(!c)return void i();const u=new d_(c),h=t(c.primaryKey,c.value,u);if(h instanceof w){const f=h.catch(m=>(u.done(),w.reject(m)));n.push(f)}u.isDone?i():u.j===null?c.continue():c.continue(u.j)}}).next(()=>w.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.ee?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Jt(r){return new w((e,t)=>{r.onsuccess=n=>{const i=n.target.result;e(i)},r.onerror=n=>{const i=Oa(n.target.error);t(i)}})}let Ju=!1;function Oa(r){const e=xt.M(pe());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new k("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Ju||(Ju=!0,setTimeout(()=>{throw n},0)),n}}return r}const Fr="IndexBackfiller";class p_{constructor(e,t){this.asyncQueue=e,this.re=t,this.task=null}start(){this.ie(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}ie(e){V(Fr,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.re.se();V(Fr,`Documents written: ${t}`)}catch(t){Bt(t)?V(Fr,"Ignoring IndexedDB error during index backfill: ",t):await _n(t)}await this.ie(6e4)})}}class m_{constructor(e,t){this.localStore=e,this.persistence=t}async se(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.oe(t,e))}oe(e,t){const n=new Set;let i=t,s=!0;return w.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(a=>{if(a!==null&&!n.has(a))return V(Fr,`Processing collection: ${a}`),this._e(e,a,i).next(c=>{i-=c,n.add(a)});s=!1})).next(()=>t-i)}_e(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next(s=>{const a=s.changes;return this.localStore.indexManager.updateIndexEntries(e,a).next(()=>this.ae(i,s)).next(c=>(V(Fr,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>a.size)}))}ae(e,t){let n=e;return t.changes.forEach((i,s)=>{const a=Zh(s);xa(a,n)>0&&(n=a)}),new Le(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ue(n),this.ce=n=>t.writeSequenceNumber(n))}ue(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ce&&this.ce(e),e}}Ue.le=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nn=-1;function qs(r){return r==null}function Wr(r){return r===0&&1/r==-1/0}function g_(r){return typeof r=="number"&&Number.isInteger(r)&&!Wr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms="";function be(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Xu(e)),e=__(r.get(t),e);return Xu(e)}function __(r,e){let t=e;const n=r.length;for(let i=0;i<n;i++){const s=r.charAt(i);switch(s){case"\0":t+="";break;case ms:t+="";break;default:t+=s}}return t}function Xu(r){return r+ms+""}function We(r){const e=r.length;if(L(e>=2,64408,{path:r}),e===2)return L(r.charAt(0)===ms&&r.charAt(1)==="",56145,{path:r}),X.emptyPath();const t=e-2,n=[];let i="";for(let s=0;s<e;){const a=r.indexOf(ms,s);switch((a<0||a>t)&&M(50515,{path:r}),r.charAt(a+1)){case"":const c=r.substring(s,a);let u;i.length===0?u=c:(i+=c,u=i,i=""),n.push(u);break;case"":i+=r.substring(s,a),i+="\0";break;case"":i+=r.substring(s,a+1);break;default:M(61167,{path:r})}s=a+2}return new X(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt="remoteDocuments",ui="owner",An="owner",Hr="mutationQueues",y_="userId",ze="mutations",Zu="batchId",tn="userMutationsIndex",el=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function es(r,e){return[r,be(e)]}function rd(r,e,t){return[r,be(e),t]}const I_={},zn="documentMutations",gs="remoteDocumentsV14",E_=["prefixPath","collectionGroup","readTime","documentId"],ts="documentKeyIndex",v_=["prefixPath","collectionGroup","documentId"],id="collectionGroupIndex",T_=["collectionGroup","readTime","prefixPath","documentId"],Qr="remoteDocumentGlobal",ia="remoteDocumentGlobalKey",$n="targets",sd="queryTargetsIndex",w_=["canonicalId","targetId"],Gn="targetDocuments",A_=["targetId","path"],Ma="documentTargetsIndex",R_=["path","targetId"],_s="targetGlobalKey",rn="targetGlobal",Yr="collectionParents",b_=["collectionId","parent"],Kn="clientMetadata",P_="clientId",js="bundles",S_="bundleId",zs="namedQueries",C_="name",La="indexConfiguration",V_="indexId",sa="collectionGroupIndex",D_="collectionGroup",ys="indexState",k_=["indexId","uid"],od="sequenceNumberIndex",N_=["uid","sequenceNumber"],Is="indexEntries",x_=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],ad="documentKeyIndex",O_=["indexId","uid","orderedDocumentKey"],$s="documentOverlays",M_=["userId","collectionPath","documentId"],oa="collectionPathOverlayIndex",L_=["userId","collectionPath","largestBatchId"],cd="collectionGroupOverlayIndex",F_=["userId","collectionGroup","largestBatchId"],Fa="globals",U_="name",ud=[Hr,ze,zn,Yt,$n,ui,rn,Gn,Kn,Qr,Yr,js,zs],B_=[...ud,$s],ld=[Hr,ze,zn,gs,$n,ui,rn,Gn,Kn,Qr,Yr,js,zs,$s],hd=ld,Ua=[...hd,La,ys,Is],q_=Ua,j_=[...Ua,Fa];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa extends td{constructor(e,t){super(),this.he=e,this.currentSequenceNumber=t}}function me(r,e){const t=z(r);return xt.N(t.he,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function qt(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function dd(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||ye.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ye.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ye.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Gi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Gi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Gi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Gi(this.root,e,this.comparator,!0)}}class Gi{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ye{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=n??ye.RED,this.left=i??ye.EMPTY,this.right=s??ye.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,s){return new ye(e??this.key,t??this.value,n??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ye.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return ye.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ye.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ye.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw M(27949);return e+(this.isRed()?0:1)}}ye.EMPTY=null,ye.RED=!0,ye.BLACK=!1;ye.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(e,t,n,i,s){return this}insert(e,t,n){return new ye(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new nl(this.data.getIterator())}getIteratorFrom(e){return new nl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof te)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new te(this.comparator);return t.data=e,t}}class nl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Rn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e){this.fields=e,e.sort(oe.comparator)}static empty(){return new Ne([])}unionWith(e){let t=new te(oe.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Ne(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return jn(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new fd("Invalid base64 string: "+s):s}}(e);return new de(t)}static fromUint8Array(e){const t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new de(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}de.EMPTY_BYTE_STRING=new de("");const z_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ct(r){if(L(!!r,39018),typeof r=="string"){let e=0;const t=z_.exec(r);if(L(!!t,46558,{timestamp:r}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:ie(r.seconds),nanos:ie(r.nanos)}}function ie(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ut(r){return typeof r=="string"?de.fromBase64String(r):de.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd="server_timestamp",md="__type__",gd="__previous_value__",_d="__local_write_time__";function Ba(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{})[md])===null||t===void 0?void 0:t.stringValue)===pd}function Gs(r){const e=r.mapValue.fields[gd];return Ba(e)?Gs(e):e}function Jr(r){const e=ct(r.mapValue.fields[_d].timestampValue);return new ae(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $_{constructor(e,t,n,i,s,a,c,u,h){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h}}const Es="(default)";class un{constructor(e,t){this.projectId=e,this.database=t||Es}static empty(){return new un("","")}get isDefaultDatabase(){return this.database===Es}isEqual(e){return e instanceof un&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa="__type__",yd="__max__",Vt={mapValue:{fields:{__type__:{stringValue:yd}}}},ja="__vector__",Wn="value",ns={nullValue:"NULL_VALUE"};function Mt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Ba(r)?4:Id(r)?9007199254740991:Ks(r)?10:11:M(28295,{value:r})}function Xe(r,e){if(r===e)return!0;const t=Mt(r);if(t!==Mt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return Jr(r).isEqual(Jr(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=ct(i.timestampValue),c=ct(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(i,s){return ut(i.bytesValue).isEqual(ut(s.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(i,s){return ie(i.geoPointValue.latitude)===ie(s.geoPointValue.latitude)&&ie(i.geoPointValue.longitude)===ie(s.geoPointValue.longitude)}(r,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ie(i.integerValue)===ie(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=ie(i.doubleValue),c=ie(s.doubleValue);return a===c?Wr(a)===Wr(c):isNaN(a)&&isNaN(c)}return!1}(r,e);case 9:return jn(r.arrayValue.values||[],e.arrayValue.values||[],Xe);case 10:case 11:return function(i,s){const a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(tl(a)!==tl(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!Xe(a[u],c[u])))return!1;return!0}(r,e);default:return M(52216,{left:r})}}function Xr(r,e){return(r.values||[]).find(t=>Xe(t,e))!==void 0}function Lt(r,e){if(r===e)return 0;const t=Mt(r),n=Mt(e);if(t!==n)return q(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return q(r.booleanValue,e.booleanValue);case 2:return function(s,a){const c=ie(s.integerValue||s.doubleValue),u=ie(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(r,e);case 3:return rl(r.timestampValue,e.timestampValue);case 4:return rl(Jr(r),Jr(e));case 5:return na(r.stringValue,e.stringValue);case 6:return function(s,a){const c=ut(s),u=ut(a);return c.compareTo(u)}(r.bytesValue,e.bytesValue);case 7:return function(s,a){const c=s.split("/"),u=a.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=q(c[h],u[h]);if(f!==0)return f}return q(c.length,u.length)}(r.referenceValue,e.referenceValue);case 8:return function(s,a){const c=q(ie(s.latitude),ie(a.latitude));return c!==0?c:q(ie(s.longitude),ie(a.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return il(r.arrayValue,e.arrayValue);case 10:return function(s,a){var c,u,h,f;const m=s.fields||{},I=a.fields||{},P=(c=m[Wn])===null||c===void 0?void 0:c.arrayValue,C=(u=I[Wn])===null||u===void 0?void 0:u.arrayValue,x=q(((h=P==null?void 0:P.values)===null||h===void 0?void 0:h.length)||0,((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0);return x!==0?x:il(P,C)}(r.mapValue,e.mapValue);case 11:return function(s,a){if(s===Vt.mapValue&&a===Vt.mapValue)return 0;if(s===Vt.mapValue)return 1;if(a===Vt.mapValue)return-1;const c=s.fields||{},u=Object.keys(c),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const I=na(u[m],f[m]);if(I!==0)return I;const P=Lt(c[u[m]],h[f[m]]);if(P!==0)return P}return q(u.length,f.length)}(r.mapValue,e.mapValue);default:throw M(23264,{Pe:t})}}function rl(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return q(r,e);const t=ct(r),n=ct(e),i=q(t.seconds,n.seconds);return i!==0?i:q(t.nanos,n.nanos)}function il(r,e){const t=r.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){const s=Lt(t[i],n[i]);if(s)return s}return q(t.length,n.length)}function Hn(r){return ca(r)}function ca(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const n=ct(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return ut(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return O.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",i=!0;for(const s of t.values||[])i?i=!1:n+=",",n+=ca(s);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){const n=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of n)s?s=!1:i+=",",i+=`${a}:${ca(t.fields[a])}`;return i+"}"}(r.mapValue):M(61005,{value:r})}function rs(r){switch(Mt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Gs(r);return e?16+rs(e):16;case 5:return 2*r.stringValue.length;case 6:return ut(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((i,s)=>i+rs(s),0)}(r.arrayValue);case 10:case 11:return function(n){let i=0;return qt(n.fields,(s,a)=>{i+=s.length+rs(a)}),i}(r.mapValue);default:throw M(13486,{value:r})}}function Zr(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function ua(r){return!!r&&"integerValue"in r}function ei(r){return!!r&&"arrayValue"in r}function sl(r){return!!r&&"nullValue"in r}function ol(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function is(r){return!!r&&"mapValue"in r}function Ks(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{})[qa])===null||t===void 0?void 0:t.stringValue)===ja}function Ur(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return qt(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=Ur(n)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ur(r.arrayValue.values[t]);return e}return Object.assign({},r)}function Id(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===yd}const Ed={mapValue:{fields:{[qa]:{stringValue:ja},[Wn]:{arrayValue:{}}}}};function G_(r){return"nullValue"in r?ns:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?Zr(un.empty(),O.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Ks(r)?Ed:{mapValue:{}}:M(35942,{value:r})}function K_(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?Zr(un.empty(),O.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Ed:"mapValue"in r?Ks(r)?{mapValue:{}}:Vt:M(61959,{value:r})}function al(r,e){const t=Lt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function cl(r,e){const t=Lt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.value=e}static empty(){return new Re({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!is(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ur(t)}setAll(e){let t=oe.emptyPath(),n={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,i),n={},i=[],t=c.popLast()}a?n[c.lastSegment()]=Ur(a):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,i)}delete(e){const t=this.field(e.popLast());is(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Xe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];is(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){qt(t,(i,s)=>e[i]=s);for(const i of n)delete e[i]}clone(){return new Re(Ur(this.value))}}function vd(r){const e=[];return qt(r.fields,(t,n)=>{const i=new oe([t]);if(is(n)){const s=vd(n.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)}),new Ne(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e,t,n,i,s,a,c){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new ue(e,0,U.min(),U.min(),U.min(),Re.empty(),0)}static newFoundDocument(e,t,n,i){return new ue(e,1,t,U.min(),n,i,0)}static newNoDocument(e,t){return new ue(e,2,t,U.min(),U.min(),Re.empty(),0)}static newUnknownDocument(e,t){return new ue(e,3,t,U.min(),U.min(),Re.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Re.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Re.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ue&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ue(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e,t){this.position=e,this.inclusive=t}}function ul(r,e,t){let n=0;for(let i=0;i<r.position.length;i++){const s=e[i],a=r.position[i];if(s.field.isKeyField()?n=O.comparator(O.fromName(a.referenceValue),t.key):n=Lt(a,t.data.field(s.field)),s.dir==="desc"&&(n*=-1),n!==0)break}return n}function ll(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!Xe(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(e,t="asc"){this.field=e,this.dir=t}}function W_(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{}class H extends Td{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new H_(e,t,n):t==="array-contains"?new J_(e,n):t==="in"?new Sd(e,n):t==="not-in"?new X_(e,n):t==="array-contains-any"?new Z_(e,n):new H(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new Q_(e,n):new Y_(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Lt(t,this.value)):t!==null&&Mt(this.value)===Mt(t)&&this.matchesComparison(Lt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ee extends Td{constructor(e,t){super(),this.filters=e,this.op=t,this.Te=null}static create(e,t){return new ee(e,t)}matches(e){return Yn(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Te!==null||(this.Te=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function Yn(r){return r.op==="and"}function la(r){return r.op==="or"}function za(r){return wd(r)&&Yn(r)}function wd(r){for(const e of r.filters)if(e instanceof ee)return!1;return!0}function ha(r){if(r instanceof H)return r.field.canonicalString()+r.op.toString()+Hn(r.value);if(za(r))return r.filters.map(e=>ha(e)).join(",");{const e=r.filters.map(t=>ha(t)).join(",");return`${r.op}(${e})`}}function Ad(r,e){return r instanceof H?function(n,i){return i instanceof H&&n.op===i.op&&n.field.isEqual(i.field)&&Xe(n.value,i.value)}(r,e):r instanceof ee?function(n,i){return i instanceof ee&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((s,a,c)=>s&&Ad(a,i.filters[c]),!0):!1}(r,e):void M(19439)}function Rd(r,e){const t=r.filters.concat(e);return ee.create(t,r.op)}function bd(r){return r instanceof H?function(t){return`${t.field.canonicalString()} ${t.op} ${Hn(t.value)}`}(r):r instanceof ee?function(t){return t.op.toString()+" {"+t.getFilters().map(bd).join(" ,")+"}"}(r):"Filter"}class H_ extends H{constructor(e,t,n){super(e,t,n),this.key=O.fromName(n.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class Q_ extends H{constructor(e,t){super(e,"in",t),this.keys=Pd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Y_ extends H{constructor(e,t){super(e,"not-in",t),this.keys=Pd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Pd(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(n=>O.fromName(n.referenceValue))}class J_ extends H{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ei(t)&&Xr(t.arrayValue,this.value)}}class Sd extends H{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Xr(this.value.arrayValue,t)}}class X_ extends H{constructor(e,t){super(e,"not-in",t)}matches(e){if(Xr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Xr(this.value.arrayValue,t)}}class Z_ extends H{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ei(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>Xr(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e,t=null,n=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.Ie=null}}function da(r,e=null,t=[],n=[],i=null,s=null,a=null){return new ey(r,e,t,n,i,s,a)}function ln(r){const e=z(r);if(e.Ie===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>ha(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(s){return s.field.canonicalString()+s.dir}(n)).join(","),qs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>Hn(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>Hn(n)).join(",")),e.Ie=t}return e.Ie}function li(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!W_(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Ad(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!ll(r.startAt,e.startAt)&&ll(r.endAt,e.endAt)}function vs(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Ts(r,e){return r.filters.filter(t=>t instanceof H&&t.field.isEqual(e))}function hl(r,e,t){let n=ns,i=!0;for(const s of Ts(r,e)){let a=ns,c=!0;switch(s.op){case"<":case"<=":a=G_(s.value);break;case"==":case"in":case">=":a=s.value;break;case">":a=s.value,c=!1;break;case"!=":case"not-in":a=ns}al({value:n,inclusive:i},{value:a,inclusive:c})<0&&(n=a,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const a=t.position[s];al({value:n,inclusive:i},{value:a,inclusive:t.inclusive})<0&&(n=a,i=t.inclusive);break}}return{value:n,inclusive:i}}function dl(r,e,t){let n=Vt,i=!0;for(const s of Ts(r,e)){let a=Vt,c=!0;switch(s.op){case">=":case">":a=K_(s.value),c=!1;break;case"==":case"in":case"<=":a=s.value;break;case"<":a=s.value,c=!1;break;case"!=":case"not-in":a=Vt}cl({value:n,inclusive:i},{value:a,inclusive:c})>0&&(n=a,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const a=t.position[s];cl({value:n,inclusive:i},{value:a,inclusive:t.inclusive})>0&&(n=a,i=t.inclusive);break}}return{value:n,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e,t=null,n=[],i=[],s=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=u,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function ty(r,e,t,n,i,s,a,c){return new ir(r,e,t,n,i,s,a,c)}function Ws(r){return new ir(r)}function fl(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Cd(r){return r.collectionGroup!==null}function Br(r){const e=z(r);if(e.Ee===null){e.Ee=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ee.push(s),t.add(s.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new te(oe.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ee.push(new ti(s,n))}),t.has(oe.keyField().canonicalString())||e.Ee.push(new ti(oe.keyField(),n))}return e.Ee}function Be(r){const e=z(r);return e.de||(e.de=ny(e,Br(r))),e.de}function ny(r,e){if(r.limitType==="F")return da(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new ti(i.field,s)});const t=r.endAt?new Qn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Qn(r.startAt.position,r.startAt.inclusive):null;return da(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function fa(r,e){const t=r.filters.concat([e]);return new ir(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function pa(r,e,t){return new ir(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function Hs(r,e){return li(Be(r),Be(e))&&r.limitType===e.limitType}function Vd(r){return`${ln(Be(r))}|lt:${r.limitType}`}function Dn(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(i=>bd(i)).join(", ")}]`),qs(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(i=>Hn(i)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(i=>Hn(i)).join(",")),`Target(${n})`}(Be(r))}; limitType=${r.limitType})`}function hi(r,e){return e.isFoundDocument()&&function(n,i){const s=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):O.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(r,e)&&function(n,i){for(const s of Br(n))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(r,e)&&function(n,i){for(const s of n.filters)if(!s.matches(i))return!1;return!0}(r,e)&&function(n,i){return!(n.startAt&&!function(a,c,u){const h=ul(a,c,u);return a.inclusive?h<=0:h<0}(n.startAt,Br(n),i)||n.endAt&&!function(a,c,u){const h=ul(a,c,u);return a.inclusive?h>=0:h>0}(n.endAt,Br(n),i))}(r,e)}function ry(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Dd(r){return(e,t)=>{let n=!1;for(const i of Br(r)){const s=iy(i,e,t);if(s!==0)return s;n=n||i.field.isKeyField()}return 0}}function iy(r,e,t){const n=r.field.isKeyField()?O.comparator(e.key,t.key):function(s,a,c){const u=a.data.field(s),h=c.data.field(s);return u!==null&&h!==null?Lt(u,h):M(42886)}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[i,s]of n)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){qt(this.inner,(t,n)=>{for(const[i,s]of n)e(i,s)})}isEmpty(){return dd(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sy=new se(O.comparator);function Me(){return sy}const kd=new se(O.comparator);function Nr(...r){let e=kd;for(const t of r)e=e.insert(t.key,t);return e}function Nd(r){let e=kd;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function He(){return qr()}function xd(){return qr()}function qr(){return new dt(r=>r.toString(),(r,e)=>r.isEqual(e))}const oy=new se(O.comparator),ay=new te(O.comparator);function G(...r){let e=ay;for(const t of r)e=e.add(t);return e}const cy=new te(q);function uy(){return cy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $a(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Wr(e)?"-0":e}}function Od(r){return{integerValue:""+r}}function ly(r,e){return g_(e)?Od(e):$a(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(){this._=void 0}}function hy(r,e,t){return r instanceof ni?function(i,s){const a={fields:{[md]:{stringValue:pd},[_d]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Ba(s)&&(s=Gs(s)),s&&(a.fields[gd]=s),{mapValue:a}}(t,e):r instanceof Jn?Ld(r,e):r instanceof Xn?Fd(r,e):function(i,s){const a=Md(i,s),c=pl(a)+pl(i.Re);return ua(a)&&ua(i.Re)?Od(c):$a(i.serializer,c)}(r,e)}function dy(r,e,t){return r instanceof Jn?Ld(r,e):r instanceof Xn?Fd(r,e):t}function Md(r,e){return r instanceof ri?function(n){return ua(n)||function(s){return!!s&&"doubleValue"in s}(n)}(e)?e:{integerValue:0}:null}class ni extends Qs{}class Jn extends Qs{constructor(e){super(),this.elements=e}}function Ld(r,e){const t=Ud(e);for(const n of r.elements)t.some(i=>Xe(i,n))||t.push(n);return{arrayValue:{values:t}}}class Xn extends Qs{constructor(e){super(),this.elements=e}}function Fd(r,e){let t=Ud(e);for(const n of r.elements)t=t.filter(i=>!Xe(i,n));return{arrayValue:{values:t}}}class ri extends Qs{constructor(e,t){super(),this.serializer=e,this.Re=t}}function pl(r){return ie(r.integerValue||r.doubleValue)}function Ud(r){return ei(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e,t){this.field=e,this.transform=t}}function py(r,e){return r.field.isEqual(e.field)&&function(n,i){return n instanceof Jn&&i instanceof Jn||n instanceof Xn&&i instanceof Xn?jn(n.elements,i.elements,Xe):n instanceof ri&&i instanceof ri?Xe(n.Re,i.Re):n instanceof ni&&i instanceof ni}(r.transform,e.transform)}class my{constructor(e,t){this.version=e,this.transformResults=t}}class fe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new fe}static exists(e){return new fe(void 0,e)}static updateTime(e){return new fe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ss(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class Ys{}function Bd(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new di(r.key,fe.none()):new sr(r.key,r.data,fe.none());{const t=r.data,n=Re.empty();let i=new te(oe.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?n.delete(s):n.set(s,a),i=i.add(s)}return new ft(r.key,n,new Ne(i.toArray()),fe.none())}}function gy(r,e,t){r instanceof sr?function(i,s,a){const c=i.value.clone(),u=gl(i.fieldTransforms,s,a.transformResults);c.setAll(u),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(r,e,t):r instanceof ft?function(i,s,a){if(!ss(i.precondition,s))return void s.convertToUnknownDocument(a.version);const c=gl(i.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(qd(i)),u.setAll(c),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(r,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function jr(r,e,t,n){return r instanceof sr?function(s,a,c,u){if(!ss(s.precondition,a))return c;const h=s.value.clone(),f=_l(s.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(r,e,t,n):r instanceof ft?function(s,a,c,u){if(!ss(s.precondition,a))return c;const h=_l(s.fieldTransforms,u,a),f=a.data;return f.setAll(qd(s)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(r,e,t,n):function(s,a,c){return ss(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(r,e,t)}function _y(r,e){let t=null;for(const n of r.fieldTransforms){const i=e.data.field(n.field),s=Md(n.transform,i||null);s!=null&&(t===null&&(t=Re.empty()),t.set(n.field,s))}return t||null}function ml(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&jn(n,i,(s,a)=>py(s,a))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class sr extends Ys{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class ft extends Ys{constructor(e,t,n,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function qd(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}}),e}function gl(r,e,t){const n=new Map;L(r.length===t.length,32656,{Ve:t.length,me:r.length});for(let i=0;i<t.length;i++){const s=r[i],a=s.transform,c=e.data.field(s.field);n.set(s.field,dy(a,c,t[i]))}return n}function _l(r,e,t){const n=new Map;for(const i of r){const s=i.transform,a=t.data.field(i.field);n.set(i.field,hy(s,a,e))}return n}class di extends Ys{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class jd extends Ys{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&gy(s,e,n[i])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=jr(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=jr(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=xd();return this.mutations.forEach(i=>{const s=e.get(i.key),a=s.overlayedDocument;let c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;const u=Bd(a,c);u!==null&&n.set(i.key,u),a.isValidDocument()||a.convertToNoDocument(U.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),G())}isEqual(e){return this.batchId===e.batchId&&jn(this.mutations,e.mutations,(t,n)=>ml(t,n))&&jn(this.baseMutations,e.baseMutations,(t,n)=>ml(t,n))}}class Ka{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){L(e.mutations.length===n.length,58842,{fe:e.mutations.length,ge:n.length});let i=function(){return oy}();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,n[a].version);return new Ka(e,t,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var he,Y;function Iy(r){switch(r){case S.OK:return M(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return M(15467,{code:r})}}function zd(r){if(r===void 0)return Ve("GRPC error has no .code"),S.UNKNOWN;switch(r){case he.OK:return S.OK;case he.CANCELLED:return S.CANCELLED;case he.UNKNOWN:return S.UNKNOWN;case he.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case he.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case he.INTERNAL:return S.INTERNAL;case he.UNAVAILABLE:return S.UNAVAILABLE;case he.UNAUTHENTICATED:return S.UNAUTHENTICATED;case he.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case he.NOT_FOUND:return S.NOT_FOUND;case he.ALREADY_EXISTS:return S.ALREADY_EXISTS;case he.PERMISSION_DENIED:return S.PERMISSION_DENIED;case he.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case he.ABORTED:return S.ABORTED;case he.OUT_OF_RANGE:return S.OUT_OF_RANGE;case he.UNIMPLEMENTED:return S.UNIMPLEMENTED;case he.DATA_LOSS:return S.DATA_LOSS;default:return M(39323,{code:r})}}(Y=he||(he={}))[Y.OK=0]="OK",Y[Y.CANCELLED=1]="CANCELLED",Y[Y.UNKNOWN=2]="UNKNOWN",Y[Y.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Y[Y.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Y[Y.NOT_FOUND=5]="NOT_FOUND",Y[Y.ALREADY_EXISTS=6]="ALREADY_EXISTS",Y[Y.PERMISSION_DENIED=7]="PERMISSION_DENIED",Y[Y.UNAUTHENTICATED=16]="UNAUTHENTICATED",Y[Y.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Y[Y.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Y[Y.ABORTED=10]="ABORTED",Y[Y.OUT_OF_RANGE=11]="OUT_OF_RANGE",Y[Y.UNIMPLEMENTED=12]="UNIMPLEMENTED",Y[Y.INTERNAL=13]="INTERNAL",Y[Y.UNAVAILABLE=14]="UNAVAILABLE",Y[Y.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey=new Nt([4294967295,4294967295],0);function yl(r){const e=Yh().encode(r),t=new zh;return t.update(e),new Uint8Array(t.digest())}function Il(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Nt([t,n],0),new Nt([i,s],0)]}class Ha{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new xr(`Invalid padding: ${t}`);if(n<0)throw new xr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new xr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new xr(`Invalid padding when bitmap length is 0: ${t}`);this.pe=8*e.length-t,this.ye=Nt.fromNumber(this.pe)}we(e,t,n){let i=e.add(t.multiply(Nt.fromNumber(n)));return i.compare(Ey)===1&&(i=new Nt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.pe===0)return!1;const t=yl(e),[n,i]=Il(t);for(let s=0;s<this.hashCount;s++){const a=this.we(n,i,s);if(!this.be(a))return!1}return!0}static create(e,t,n){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new Ha(s,i,t);return n.forEach(c=>a.insert(c)),a}insert(e){if(this.pe===0)return;const t=yl(e),[n,i]=Il(t);for(let s=0;s<this.hashCount;s++){const a=this.we(n,i,s);this.Se(a)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class xr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e,t,n,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const i=new Map;return i.set(e,fi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Js(U.min(),i,new se(q),Me(),G())}}class fi{constructor(e,t,n,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new fi(n,t,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e,t,n,i){this.De=e,this.removedTargetIds=t,this.key=n,this.ve=i}}class $d{constructor(e,t){this.targetId=e,this.Ce=t}}class Gd{constructor(e,t,n=de.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}}class El{constructor(){this.Fe=0,this.Me=vl(),this.xe=de.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return this.Fe!==0}get Le(){return this.Ne}ke(e){e.approximateByteSize()>0&&(this.Ne=!0,this.xe=e)}qe(){let e=G(),t=G(),n=G();return this.Me.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:M(38017,{changeType:s})}}),new fi(this.xe,this.Oe,e,t,n)}Qe(){this.Ne=!1,this.Me=vl()}$e(e,t){this.Ne=!0,this.Me=this.Me.insert(e,t)}Ue(e){this.Ne=!0,this.Me=this.Me.remove(e)}Ke(){this.Fe+=1}We(){this.Fe-=1,L(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class vy{constructor(e){this.ze=e,this.je=new Map,this.He=Me(),this.Je=Ki(),this.Ye=Ki(),this.Ze=new se(q)}Xe(e){for(const t of e.De)e.ve&&e.ve.isFoundDocument()?this.et(t,e.ve):this.tt(t,e.key,e.ve);for(const t of e.removedTargetIds)this.tt(t,e.key,e.ve)}nt(e){this.forEachTarget(e,t=>{const n=this.rt(t);switch(e.state){case 0:this.it(t)&&n.ke(e.resumeToken);break;case 1:n.We(),n.Be||n.Qe(),n.ke(e.resumeToken);break;case 2:n.We(),n.Be||this.removeTarget(t);break;case 3:this.it(t)&&(n.Ge(),n.ke(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),n.ke(e.resumeToken));break;default:M(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach((n,i)=>{this.it(i)&&t(i)})}ot(e){const t=e.targetId,n=e.Ce.count,i=this._t(t);if(i){const s=i.target;if(vs(s))if(n===0){const a=new O(s.path);this.tt(t,a,ue.newNoDocument(a,U.min()))}else L(n===1,20013,{expectedCount:n});else{const a=this.ut(t);if(a!==n){const c=this.ct(e),u=c?this.lt(c,e,a):1;if(u!==0){this.st(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}ct(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:s=0}=t;let a,c;try{a=ut(n).toUint8Array()}catch(u){if(u instanceof fd)return qn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Ha(a,i,s)}catch(u){return qn(u instanceof xr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.pe===0?null:c}lt(e,t,n){return t.Ce.count===n-this.Tt(e,t.targetId)?0:2}Tt(e,t){const n=this.ze.getRemoteKeysForTarget(t);let i=0;return n.forEach(s=>{const a=this.ze.Pt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.tt(t,s,null),i++)}),i}It(e){const t=new Map;this.je.forEach((s,a)=>{const c=this._t(a);if(c){if(s.current&&vs(c.target)){const u=new O(c.target.path);this.Et(u).has(a)||this.dt(a,u)||this.tt(a,u,ue.newNoDocument(u,e))}s.Le&&(t.set(a,s.qe()),s.Qe())}});let n=G();this.Ye.forEach((s,a)=>{let c=!0;a.forEachWhile(u=>{const h=this._t(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(s))}),this.He.forEach((s,a)=>a.setReadTime(e));const i=new Js(e,t,this.Ze,this.He,n);return this.He=Me(),this.Je=Ki(),this.Ye=Ki(),this.Ze=new se(q),i}et(e,t){if(!this.it(e))return;const n=this.dt(e,t.key)?2:0;this.rt(e).$e(t.key,n),this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.Ye=this.Ye.insert(t.key,this.At(t.key).add(e))}tt(e,t,n){if(!this.it(e))return;const i=this.rt(e);this.dt(e,t)?i.$e(t,1):i.Ue(t),this.Ye=this.Ye.insert(t,this.At(t).delete(e)),this.Ye=this.Ye.insert(t,this.At(t).add(e)),n&&(this.He=this.He.insert(t,n))}removeTarget(e){this.je.delete(e)}ut(e){const t=this.rt(e).qe();return this.ze.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ke(e){this.rt(e).Ke()}rt(e){let t=this.je.get(e);return t||(t=new El,this.je.set(e,t)),t}At(e){let t=this.Ye.get(e);return t||(t=new te(q),this.Ye=this.Ye.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new te(q),this.Je=this.Je.insert(e,t)),t}it(e){const t=this._t(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}_t(e){const t=this.je.get(e);return t&&t.Be?null:this.ze.Rt(e)}st(e){this.je.set(e,new El),this.ze.getRemoteKeysForTarget(e).forEach(t=>{this.tt(e,t,null)})}dt(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function Ki(){return new se(O.comparator)}function vl(){return new se(O.comparator)}const Ty={asc:"ASCENDING",desc:"DESCENDING"},wy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Ay={and:"AND",or:"OR"};class Ry{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ma(r,e){return r.useProto3Json||qs(e)?e:{value:e}}function Zn(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Kd(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function by(r,e){return Zn(r,e.toTimestamp())}function De(r){return L(!!r,49232),U.fromTimestamp(function(t){const n=ct(t);return new ae(n.seconds,n.nanos)}(r))}function Qa(r,e){return ga(r,e).canonicalString()}function ga(r,e){const t=function(i){return new X(["projects",i.projectId,"databases",i.database])}(r).child("documents");return e===void 0?t:t.child(e)}function Wd(r){const e=X.fromString(r);return L(nf(e),10190,{key:e.toString()}),e}function ws(r,e){return Qa(r.databaseId,e.path)}function sn(r,e){const t=Wd(e);if(t.get(1)!==r.databaseId.projectId)throw new k(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new k(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new O(Yd(t))}function Hd(r,e){return Qa(r.databaseId,e)}function Qd(r){const e=Wd(r);return e.length===4?X.emptyPath():Yd(e)}function _a(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Yd(r){return L(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Tl(r,e,t){return{name:ws(r,e),fields:t.value.mapValue.fields}}function Py(r,e,t){const n=sn(r,e.name),i=De(e.updateTime),s=e.createTime?De(e.createTime):U.min(),a=new Re({mapValue:{fields:e.fields}}),c=ue.newFoundDocument(n,i,s,a);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function Sy(r,e){let t;if("targetChange"in e){e.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:M(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(L(f===void 0||typeof f=="string",58123),de.fromBase64String(f||"")):(L(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),de.fromUint8Array(f||new Uint8Array))}(r,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(h){const f=h.code===void 0?S.UNKNOWN:zd(h.code);return new k(f,h.message||"")}(a);t=new Gd(n,i,s,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const i=sn(r,n.document.name),s=De(n.document.updateTime),a=n.document.createTime?De(n.document.createTime):U.min(),c=new Re({mapValue:{fields:n.document.fields}}),u=ue.newFoundDocument(i,s,a,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new os(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const i=sn(r,n.document),s=n.readTime?De(n.readTime):U.min(),a=ue.newNoDocument(i,s),c=n.removedTargetIds||[];t=new os([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const i=sn(r,n.document),s=n.removedTargetIds||[];t=new os([],s,i,null)}else{if(!("filter"in e))return M(11601,{Vt:e});{e.filter;const n=e.filter;n.targetId;const{count:i=0,unchangedNames:s}=n,a=new yy(i,s),c=n.targetId;t=new $d(c,a)}}return t}function As(r,e){let t;if(e instanceof sr)t={update:Tl(r,e.key,e.value)};else if(e instanceof di)t={delete:ws(r,e.key)};else if(e instanceof ft)t={update:Tl(r,e.key,e.data),updateMask:xy(e.fieldMask)};else{if(!(e instanceof jd))return M(16599,{ft:e.type});t={verify:ws(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(s,a){const c=a.transform;if(c instanceof ni)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Jn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Xn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ri)return{fieldPath:a.field.canonicalString(),increment:c.Re};throw M(20930,{transform:a.transform})}(0,n))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:by(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:M(27497)}(r,e.precondition)),t}function ya(r,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?fe.updateTime(De(s.updateTime)):s.exists!==void 0?fe.exists(s.exists):fe.none()}(e.currentDocument):fe.none(),n=e.updateTransforms?e.updateTransforms.map(i=>function(a,c){let u=null;if("setToServerValue"in c)L(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new ni;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new Jn(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new Xn(f)}else"increment"in c?u=new ri(a,c.increment):M(16584,{proto:c});const h=oe.fromServerFormat(c.fieldPath);return new fy(h,u)}(r,i)):[];if(e.update){e.update.name;const i=sn(r,e.update.name),s=new Re({mapValue:{fields:e.update.fields}});if(e.updateMask){const a=function(u){const h=u.fieldPaths||[];return new Ne(h.map(f=>oe.fromServerFormat(f)))}(e.updateMask);return new ft(i,s,a,t,n)}return new sr(i,s,t,n)}if(e.delete){const i=sn(r,e.delete);return new di(i,t)}if(e.verify){const i=sn(r,e.verify);return new jd(i,t)}return M(1463,{proto:e})}function Cy(r,e){return r&&r.length>0?(L(e!==void 0,14353),r.map(t=>function(i,s){let a=i.updateTime?De(i.updateTime):De(s);return a.isEqual(U.min())&&(a=De(s)),new my(a,i.transformResults||[])}(t,e))):[]}function Jd(r,e){return{documents:[Hd(r,e.path)]}}function Xd(r,e){const t={structuredQuery:{}},n=e.path;let i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Hd(r,i);const s=function(h){if(h.length!==0)return tf(ee.create(h,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const a=function(h){if(h.length!==0)return h.map(f=>function(I){return{field:kn(I.field),direction:Dy(I.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=ma(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{gt:t,parent:i}}function Zd(r){let e=Qd(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let i=null;if(n>0){L(n===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(m){const I=ef(m);return I instanceof ee&&za(I)?I.getFilters():[I]}(t.where));let a=[];t.orderBy&&(a=function(m){return m.map(I=>function(C){return new ti(Nn(C.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(I))}(t.orderBy));let c=null;t.limit&&(c=function(m){let I;return I=typeof m=="object"?m.value:m,qs(I)?null:I}(t.limit));let u=null;t.startAt&&(u=function(m){const I=!!m.before,P=m.values||[];return new Qn(P,I)}(t.startAt));let h=null;return t.endAt&&(h=function(m){const I=!m.before,P=m.values||[];return new Qn(P,I)}(t.endAt)),ty(e,i,a,s,c,"F",u,h)}function Vy(r,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ef(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Nn(t.unaryFilter.field);return H.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=Nn(t.unaryFilter.field);return H.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Nn(t.unaryFilter.field);return H.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Nn(t.unaryFilter.field);return H.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(r):r.fieldFilter!==void 0?function(t){return H.create(Nn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return ee.create(t.compositeFilter.filters.map(n=>ef(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(t.compositeFilter.op))}(r):M(30097,{filter:r})}function Dy(r){return Ty[r]}function ky(r){return wy[r]}function Ny(r){return Ay[r]}function kn(r){return{fieldPath:r.canonicalString()}}function Nn(r){return oe.fromServerFormat(r.fieldPath)}function tf(r){return r instanceof H?function(t){if(t.op==="=="){if(ol(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NAN"}};if(sl(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ol(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NAN"}};if(sl(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:kn(t.field),op:ky(t.op),value:t.value}}}(r):r instanceof ee?function(t){const n=t.getFilters().map(i=>tf(i));return n.length===1?n[0]:{compositeFilter:{op:Ny(t.op),filters:n}}}(r):M(54877,{filter:r})}function xy(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function nf(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,t,n,i,s=U.min(),a=U.min(),c=de.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new nt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new nt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new nt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new nt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(e){this.wt=e}}function Oy(r,e){let t;if(e.document)t=Py(r.wt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=O.fromSegments(e.noDocument.path),i=dn(e.noDocument.readTime);t=ue.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return M(56709);{const n=O.fromSegments(e.unknownDocument.path),i=dn(e.unknownDocument.version);t=ue.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime(function(i){const s=new ae(i[0],i[1]);return U.fromTimestamp(s)}(e.readTime)),t}function wl(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Rs(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(s,a){return{name:ws(s,a.key),fields:a.data.value.mapValue.fields,updateTime:Zn(s,a.version.toTimestamp()),createTime:Zn(s,a.createTime.toTimestamp())}}(r.wt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:hn(e.version)};else{if(!e.isUnknownDocument())return M(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:hn(e.version)}}return n}function Rs(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function hn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function dn(r){const e=new ae(r.seconds,r.nanoseconds);return U.fromTimestamp(e)}function Xt(r,e){const t=(e.baseMutations||[]).map(s=>ya(r.wt,s));for(let s=0;s<e.mutations.length-1;++s){const a=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const c=e.mutations[s+1];a.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const n=e.mutations.map(s=>ya(r.wt,s)),i=ae.fromMillis(e.localWriteTimeMs);return new Ga(e.batchId,i,t,n)}function Or(r){const e=dn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?dn(r.lastLimboFreeSnapshotVersion):U.min();let n;return n=function(s){return s.documents!==void 0}(r.query)?function(s){const a=s.documents.length;return L(a===1,1966,{count:a}),Be(Ws(Qd(s.documents[0])))}(r.query):function(s){return Be(Zd(s))}(r.query),new nt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,de.fromBase64String(r.resumeToken))}function sf(r,e){const t=hn(e.snapshotVersion),n=hn(e.lastLimboFreeSnapshotVersion);let i;i=vs(e.target)?Jd(r.wt,e.target):Xd(r.wt,e.target).gt;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:ln(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function of(r){const e=Zd({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?pa(e,e.limit,"L"):e}function qo(r,e){return new Wa(e.largestBatchId,ya(r.wt,e.overlayMutation))}function Al(r,e){const t=e.path.lastSegment();return[r,be(e.path.popLast()),t]}function Rl(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:hn(n.readTime),documentKey:be(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{getBundleMetadata(e,t){return bl(e).get(t).next(n=>{if(n)return function(s){return{id:s.bundleId,createTime:dn(s.createTime),version:s.version}}(n)})}saveBundleMetadata(e,t){return bl(e).put(function(i){return{bundleId:i.id,createTime:hn(De(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return Pl(e).get(t).next(n=>{if(n)return function(s){return{name:s.name,query:of(s.bundledQuery),readTime:dn(s.readTime)}}(n)})}saveNamedQuery(e,t){return Pl(e).put(function(i){return{name:i.name,readTime:hn(De(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function bl(r){return me(r,js)}function Pl(r){return me(r,zs)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t){this.serializer=e,this.userId=t}static bt(e,t){const n=t.uid||"";return new Xs(e,n)}getOverlay(e,t){return Rr(e).get(Al(this.userId,t)).next(n=>n?qo(this.serializer,n):null)}getOverlays(e,t){const n=He();return w.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){const i=[];return n.forEach((s,a)=>{const c=new Wa(t,a);i.push(this.St(e,c))}),w.waitFor(i)}removeOverlaysForBatchId(e,t,n){const i=new Set;t.forEach(a=>i.add(be(a.getCollectionPath())));const s=[];return i.forEach(a=>{const c=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);s.push(Rr(e).X(oa,c))}),w.waitFor(s)}getOverlaysForCollection(e,t,n){const i=He(),s=be(t),a=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Rr(e).J(oa,a).next(c=>{for(const u of c){const h=qo(this.serializer,u);i.set(h.getKey(),h)}return i})}getOverlaysForCollectionGroup(e,t,n,i){const s=He();let a;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Rr(e).te({index:cd,range:c},(u,h,f)=>{const m=qo(this.serializer,h);s.size()<i||m.largestBatchId===a?(s.set(m.getKey(),m),a=m.largestBatchId):f.done()}).next(()=>s)}St(e,t){return Rr(e).put(function(i,s,a){const[c,u,h]=Al(s,a.mutation.key);return{userId:s,collectionPath:u,documentId:h,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:As(i.wt,a.mutation)}}(this.serializer,this.userId,t))}}function Rr(r){return me(r,$s)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ly{Dt(e){return me(e,Fa)}getSessionToken(e){return this.Dt(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?de.fromUint8Array(n):de.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Dt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(){}vt(e,t){this.Ct(e,t),t.Ft()}Ct(e,t){if("nullValue"in e)this.Mt(t,5);else if("booleanValue"in e)this.Mt(t,10),t.xt(e.booleanValue?1:0);else if("integerValue"in e)this.Mt(t,15),t.xt(ie(e.integerValue));else if("doubleValue"in e){const n=ie(e.doubleValue);isNaN(n)?this.Mt(t,13):(this.Mt(t,15),Wr(n)?t.xt(0):t.xt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Mt(t,20),typeof n=="string"&&(n=ct(n)),t.Ot(`${n.seconds||""}`),t.xt(n.nanos||0)}else if("stringValue"in e)this.Nt(e.stringValue,t),this.Bt(t);else if("bytesValue"in e)this.Mt(t,30),t.Lt(ut(e.bytesValue)),this.Bt(t);else if("referenceValue"in e)this.kt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Mt(t,45),t.xt(n.latitude||0),t.xt(n.longitude||0)}else"mapValue"in e?Id(e)?this.Mt(t,Number.MAX_SAFE_INTEGER):Ks(e)?this.qt(e.mapValue,t):(this.Qt(e.mapValue,t),this.Bt(t)):"arrayValue"in e?(this.$t(e.arrayValue,t),this.Bt(t)):M(19022,{Ut:e})}Nt(e,t){this.Mt(t,25),this.Kt(e,t)}Kt(e,t){t.Ot(e)}Qt(e,t){const n=e.fields||{};this.Mt(t,55);for(const i of Object.keys(n))this.Nt(i,t),this.Ct(n[i],t)}qt(e,t){var n,i;const s=e.fields||{};this.Mt(t,53);const a=Wn,c=((i=(n=s[a].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.Mt(t,15),t.xt(ie(c)),this.Nt(a,t),this.Ct(s[a],t)}$t(e,t){const n=e.values||[];this.Mt(t,50);for(const i of n)this.Ct(i,t)}kt(e,t){this.Mt(t,37),O.fromName(e).path.forEach(n=>{this.Mt(t,60),this.Kt(n,t)})}Mt(e,t){e.xt(t)}Bt(e){e.xt(2)}}Zt.Wt=new Zt;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn=255;function Fy(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function Sl(r){const e=64-function(n){let i=0;for(let s=0;s<8;++s){const a=Fy(255&n[s]);if(i+=a,a!==8)break}return i}(r);return Math.ceil(e/8)}class Uy{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Gt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.zt(n.value),n=t.next();this.jt()}Ht(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Yt()}Zt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.zt(n);else if(n<2048)this.zt(960|n>>>6),this.zt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.zt(480|n>>>12),this.zt(128|63&n>>>6),this.zt(128|63&n);else{const i=t.codePointAt(0);this.zt(240|i>>>18),this.zt(128|63&i>>>12),this.zt(128|63&i>>>6),this.zt(128|63&i)}}this.jt()}Xt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const i=t.codePointAt(0);this.Jt(240|i>>>18),this.Jt(128|63&i>>>12),this.Jt(128|63&i>>>6),this.Jt(128|63&i)}}this.Yt()}en(e){const t=this.tn(e),n=Sl(t);this.nn(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}rn(e){const t=this.tn(e),n=Sl(t);this.nn(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}sn(){this._n(bn),this._n(255)}an(){this.un(bn),this.un(255)}reset(){this.position=0}seed(e){this.nn(e.length),this.buffer.set(e,this.position),this.position+=e.length}cn(){return this.buffer.slice(0,this.position)}tn(e){const t=function(s){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,s,!1),new Uint8Array(a.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}zt(e){const t=255&e;t===0?(this._n(0),this._n(255)):t===bn?(this._n(bn),this._n(0)):this._n(t)}Jt(e){const t=255&e;t===0?(this.un(0),this.un(255)):t===bn?(this.un(bn),this.un(0)):this.un(e)}jt(){this._n(0),this._n(1)}Yt(){this.un(0),this.un(1)}_n(e){this.nn(1),this.buffer[this.position++]=e}un(e){this.nn(1),this.buffer[this.position++]=~e}nn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}}class By{constructor(e){this.ln=e}Lt(e){this.ln.Gt(e)}Ot(e){this.ln.Zt(e)}xt(e){this.ln.en(e)}Ft(){this.ln.sn()}}class qy{constructor(e){this.ln=e}Lt(e){this.ln.Ht(e)}Ot(e){this.ln.Xt(e)}xt(e){this.ln.rn(e)}Ft(){this.ln.an()}}class br{constructor(){this.ln=new Uy,this.hn=new By(this.ln),this.Pn=new qy(this.ln)}seed(e){this.ln.seed(e)}Tn(e){return e===0?this.hn:this.Pn}cn(){return this.ln.cn()}reset(){this.ln.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,t,n,i){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=i}In(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new en(this.indexId,this.documentKey,this.arrayValue,n)}}function vt(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=Cl(r.arrayValue,e.arrayValue),t!==0?t:(t=Cl(r.directionalValue,e.directionalValue),t!==0?t:O.comparator(r.documentKey,e.documentKey)))}function Cl(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(e){this.En=new te((t,n)=>oe.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.An=[];for(const t of e.filters){const n=t;n.isInequality()?this.En=this.En.add(n):this.An.push(n)}}get Rn(){return this.En.size>1}Vn(e){if(L(e.collectionGroup===this.collectionId,49279),this.Rn)return!1;const t=ra(e);if(t!==void 0&&!this.mn(t))return!1;const n=Qt(e);let i=new Set,s=0,a=0;for(;s<n.length&&this.mn(n[s]);++s)i=i.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.En.size>0){const c=this.En.getIterator().getNext();if(!i.has(c.field.canonicalString())){const u=n[s];if(!this.fn(c,u)||!this.gn(this.dn[a++],u))return!1}++s}for(;s<n.length;++s){const c=n[s];if(a>=this.dn.length||!this.gn(this.dn[a++],c))return!1}return!0}pn(){if(this.Rn)return null;let e=new te(oe.comparator);const t=[];for(const n of this.An)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new Zi(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Zi(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Zi(n.field,n.dir==="asc"?0:1)));return new ps(ps.UNKNOWN_ID,this.collectionId,t,Kr.empty())}mn(e){for(const t of this.An)if(this.fn(t,e))return!0;return!1}fn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}gn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(r){var e,t;if(L(r instanceof H||r instanceof ee,20012),r instanceof H){if(r instanceof Sd){const i=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>H.create(r.field,"==",s)))||[];return ee.create(i,"or")}return r}const n=r.filters.map(i=>af(i));return ee.create(n,r.op)}function jy(r){if(r.getFilters().length===0)return[];const e=va(af(r));return L(cf(e),7391),Ia(e)||Ea(e)?[e]:e.getFilters()}function Ia(r){return r instanceof H}function Ea(r){return r instanceof ee&&za(r)}function cf(r){return Ia(r)||Ea(r)||function(t){if(t instanceof ee&&la(t)){for(const n of t.getFilters())if(!Ia(n)&&!Ea(n))return!1;return!0}return!1}(r)}function va(r){if(L(r instanceof H||r instanceof ee,34018),r instanceof H)return r;if(r.filters.length===1)return va(r.filters[0]);const e=r.filters.map(n=>va(n));let t=ee.create(e,r.op);return t=bs(t),cf(t)?t:(L(t instanceof ee,64498),L(Yn(t),40251),L(t.filters.length>1,57927),t.filters.reduce((n,i)=>Ya(n,i)))}function Ya(r,e){let t;return L(r instanceof H||r instanceof ee,38388),L(e instanceof H||e instanceof ee,25473),t=r instanceof H?e instanceof H?function(i,s){return ee.create([i,s],"and")}(r,e):Dl(r,e):e instanceof H?Dl(e,r):function(i,s){if(L(i.filters.length>0&&s.filters.length>0,48005),Yn(i)&&Yn(s))return Rd(i,s.getFilters());const a=la(i)?i:s,c=la(i)?s:i,u=a.filters.map(h=>Ya(h,c));return ee.create(u,"or")}(r,e),bs(t)}function Dl(r,e){if(Yn(e))return Rd(e,r.getFilters());{const t=e.filters.map(n=>Ya(r,n));return ee.create(t,"or")}}function bs(r){if(L(r instanceof H||r instanceof ee,11850),r instanceof H)return r;const e=r.getFilters();if(e.length===1)return bs(e[0]);if(wd(r))return r;const t=e.map(i=>bs(i)),n=[];return t.forEach(i=>{i instanceof H?n.push(i):i instanceof ee&&(i.op===r.op?n.push(...i.filters):n.push(i))}),n.length===1?n[0]:ee.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zy{constructor(){this.yn=new Ja}addToCollectionParentIndex(e,t){return this.yn.add(t),w.resolve()}getCollectionParents(e,t){return w.resolve(this.yn.getEntries(t))}addFieldIndex(e,t){return w.resolve()}deleteFieldIndex(e,t){return w.resolve()}deleteAllFieldIndexes(e){return w.resolve()}createTargetIndexes(e,t){return w.resolve()}getDocumentsMatchingTarget(e,t){return w.resolve(null)}getIndexType(e,t){return w.resolve(0)}getFieldIndexes(e,t){return w.resolve([])}getNextCollectionGroupToUpdate(e){return w.resolve(null)}getMinOffset(e,t){return w.resolve(Le.min())}getMinOffsetFromCollectionGroup(e,t){return w.resolve(Le.min())}updateCollectionGroup(e,t,n){return w.resolve()}updateIndexEntries(e,t){return w.resolve()}}class Ja{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new te(X.comparator),s=!i.has(n);return this.index[t]=i.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new te(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kl="IndexedDbIndexManager",Wi=new Uint8Array(0);class $y{constructor(e,t){this.databaseId=t,this.wn=new Ja,this.bn=new dt(n=>ln(n),(n,i)=>li(n,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.wn.has(t)){const n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.wn.add(t)});const s={collectionId:n,parent:be(i)};return Nl(e).put(s)}return w.resolve()}getCollectionParents(e,t){const n=[],i=IDBKeyRange.bound([t,""],[Xh(t),""],!1,!0);return Nl(e).J(i).next(s=>{for(const a of s){if(a.collectionId!==t)break;n.push(We(a.parent))}return n})}addFieldIndex(e,t){const n=Pr(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete i.indexId;const s=n.add(i);if(t.indexState){const a=Sn(e);return s.next(c=>{a.put(Rl(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const n=Pr(e),i=Sn(e),s=Pn(e);return n.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Pr(e),n=Pn(e),i=Sn(e);return t.X().next(()=>n.X()).next(()=>i.X())}createTargetIndexes(e,t){return w.forEach(this.Sn(t),n=>this.getIndexType(e,n).next(i=>{if(i===0||i===1){const s=new Vl(n).pn();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const n=Pn(e);let i=!0;const s=new Map;return w.forEach(this.Sn(t),a=>this.Dn(e,a).next(c=>{i&&(i=!!c),s.set(a,c)})).next(()=>{if(i){let a=G();const c=[];return w.forEach(s,(u,h)=>{V(kl,`Using index ${function(F){return`id=${F.indexId}|cg=${F.collectionGroup}|f=${F.fields.map(Q=>`${Q.fieldPath}:${Q.kind}`).join(",")}`}(u)} to execute ${ln(t)}`);const f=function(F,Q){const Z=ra(Q);if(Z===void 0)return null;for(const K of Ts(F,Z.fieldPath))switch(K.op){case"array-contains-any":return K.value.arrayValue.values||[];case"array-contains":return[K.value]}return null}(h,u),m=function(F,Q){const Z=new Map;for(const K of Qt(Q))for(const E of Ts(F,K.fieldPath))switch(E.op){case"==":case"in":Z.set(K.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return Z.set(K.fieldPath.canonicalString(),E.value),Array.from(Z.values())}return null}(h,u),I=function(F,Q){const Z=[];let K=!0;for(const E of Qt(Q)){const g=E.kind===0?hl(F,E.fieldPath,F.startAt):dl(F,E.fieldPath,F.startAt);Z.push(g.value),K&&(K=g.inclusive)}return new Qn(Z,K)}(h,u),P=function(F,Q){const Z=[];let K=!0;for(const E of Qt(Q)){const g=E.kind===0?dl(F,E.fieldPath,F.endAt):hl(F,E.fieldPath,F.endAt);Z.push(g.value),K&&(K=g.inclusive)}return new Qn(Z,K)}(h,u),C=this.vn(u,h,I),x=this.vn(u,h,P),D=this.Cn(u,h,m),$=this.Fn(u.indexId,f,C,I.inclusive,x,P.inclusive,D);return w.forEach($,j=>n.Z(j,t.limit).next(F=>{F.forEach(Q=>{const Z=O.fromSegments(Q.documentKey);a.has(Z)||(a=a.add(Z),c.push(Z))})}))}).next(()=>c)}return w.resolve(null)})}Sn(e){let t=this.bn.get(e);return t||(e.filters.length===0?t=[e]:t=jy(ee.create(e.filters,"and")).map(n=>da(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.bn.set(e,t),t)}Fn(e,t,n,i,s,a,c){const u=(t!=null?t.length:1)*Math.max(n.length,s.length),h=u/(t!=null?t.length:1),f=[];for(let m=0;m<u;++m){const I=t?this.Mn(t[m/h]):Wi,P=this.xn(e,I,n[m%h],i),C=this.On(e,I,s[m%h],a),x=c.map(D=>this.xn(e,I,D,!0));f.push(...this.createRange(P,C,x))}return f}xn(e,t,n,i){const s=new en(e,O.empty(),t,n);return i?s:s.In()}On(e,t,n,i){const s=new en(e,O.empty(),t,n);return i?s.In():s}Dn(e,t){const n=new Vl(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let a=null;for(const c of s)n.Vn(c)&&(!a||c.fields.length>a.fields.length)&&(a=c);return a})}getIndexType(e,t){let n=2;const i=this.Sn(t);return w.forEach(i,s=>this.Dn(e,s).next(a=>{a?n!==0&&a.fields.length<function(u){let h=new te(oe.comparator),f=!1;for(const m of u.filters)for(const I of m.getFlattenedFilters())I.field.isKeyField()||(I.op==="array-contains"||I.op==="array-contains-any"?f=!0:h=h.add(I.field));for(const m of u.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)}(s)&&(n=1):n=0})).next(()=>function(a){return a.limit!==null}(t)&&i.length>1&&n===2?1:n)}Nn(e,t){const n=new br;for(const i of Qt(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const a=n.Tn(i.kind);Zt.Wt.vt(s,a)}return n.cn()}Mn(e){const t=new br;return Zt.Wt.vt(e,t.Tn(0)),t.cn()}Bn(e,t){const n=new br;return Zt.Wt.vt(Zr(this.databaseId,t),n.Tn(function(s){const a=Qt(s);return a.length===0?0:a[a.length-1].kind}(e))),n.cn()}Cn(e,t,n){if(n===null)return[];let i=[];i.push(new br);let s=0;for(const a of Qt(e)){const c=n[s++];for(const u of i)if(this.Ln(t,a.fieldPath)&&ei(c))i=this.kn(i,a,c);else{const h=u.Tn(a.kind);Zt.Wt.vt(c,h)}}return this.qn(i)}vn(e,t,n){return this.Cn(e,t,n.position)}qn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].cn();return t}kn(e,t,n){const i=[...e],s=[];for(const a of n.arrayValue.values||[])for(const c of i){const u=new br;u.seed(c.cn()),Zt.Wt.vt(a,u.Tn(t.kind)),s.push(u)}return s}Ln(e,t){return!!e.filters.find(n=>n instanceof H&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=Pr(e),i=Sn(e);return(t?n.J(sa,IDBKeyRange.bound(t,t)):n.J()).next(s=>{const a=[];return w.forEach(s,c=>i.get([c.indexId,this.uid]).next(u=>{a.push(function(f,m){const I=m?new Kr(m.sequenceNumber,new Le(dn(m.readTime),new O(We(m.documentKey)),m.largestBatchId)):Kr.empty(),P=f.fields.map(([C,x])=>new Zi(oe.fromServerFormat(C),x));return new ps(f.indexId,f.collectionGroup,P,I)}(c,u))})).next(()=>a)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,i)=>{const s=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:q(n.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const i=Pr(e),s=Sn(e);return this.Qn(e).next(a=>i.J(sa,IDBKeyRange.bound(t,t)).next(c=>w.forEach(c,u=>s.put(Rl(u.indexId,this.uid,a,n)))))}updateIndexEntries(e,t){const n=new Map;return w.forEach(t,(i,s)=>{const a=n.get(i.collectionGroup);return(a?w.resolve(a):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(n.set(i.collectionGroup,c),w.forEach(c,u=>this.$n(e,i,u).next(h=>{const f=this.Un(s,u);return h.isEqual(f)?w.resolve():this.Kn(e,s,u,h,f)}))))})}Wn(e,t,n,i){return Pn(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.Bn(n,t.key),documentKey:t.key.path.toArray()})}Gn(e,t,n,i){return Pn(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.Bn(n,t.key),t.key.path.toArray()])}$n(e,t,n){const i=Pn(e);let s=new te(vt);return i.te({index:ad,range:IDBKeyRange.only([n.indexId,this.uid,this.Bn(n,t)])},(a,c)=>{s=s.add(new en(n.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>s)}Un(e,t){let n=new te(vt);const i=this.Nn(t,e);if(i==null)return n;const s=ra(t);if(s!=null){const a=e.data.field(s.fieldPath);if(ei(a))for(const c of a.arrayValue.values||[])n=n.add(new en(t.indexId,e.key,this.Mn(c),i))}else n=n.add(new en(t.indexId,e.key,Wi,i));return n}Kn(e,t,n,i,s){V(kl,"Updating index entries for document '%s'",t.key);const a=[];return function(u,h,f,m,I){const P=u.getIterator(),C=h.getIterator();let x=Rn(P),D=Rn(C);for(;x||D;){let $=!1,j=!1;if(x&&D){const F=f(x,D);F<0?j=!0:F>0&&($=!0)}else x!=null?j=!0:$=!0;$?(m(D),D=Rn(C)):j?(I(x),x=Rn(P)):(x=Rn(P),D=Rn(C))}}(i,s,vt,c=>{a.push(this.Wn(e,t,n,c))},c=>{a.push(this.Gn(e,t,n,c))}),w.waitFor(a)}Qn(e){let t=1;return Sn(e).te({index:od,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((a,c)=>vt(a,c)).filter((a,c,u)=>!c||vt(a,u[c-1])!==0);const i=[];i.push(e);for(const a of n){const c=vt(a,e),u=vt(a,t);if(c===0)i[0]=e.In();else if(c>0&&u<0)i.push(a),i.push(a.In());else if(u>0)break}i.push(t);const s=[];for(let a=0;a<i.length;a+=2){if(this.zn(i[a],i[a+1]))return[];const c=[i[a].indexId,this.uid,i[a].arrayValue,i[a].directionalValue,Wi,[]],u=[i[a+1].indexId,this.uid,i[a+1].arrayValue,i[a+1].directionalValue,Wi,[]];s.push(IDBKeyRange.bound(c,u))}return s}zn(e,t){return vt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(xl)}getMinOffset(e,t){return w.mapArray(this.Sn(t),n=>this.Dn(e,n).next(i=>i||M(44426))).next(xl)}}function Nl(r){return me(r,Yr)}function Pn(r){return me(r,Is)}function Pr(r){return me(r,La)}function Sn(r){return me(r,ys)}function xl(r){L(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const i=r[n].indexState.offset;xa(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new Le(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},uf=41943040;class Ae{static withCacheSize(e){return new Ae(e,Ae.DEFAULT_COLLECTION_PERCENTILE,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lf(r,e,t){const n=r.store(ze),i=r.store(zn),s=[],a=IDBKeyRange.only(t.batchId);let c=0;const u=n.te({range:a},(f,m,I)=>(c++,I.delete()));s.push(u.next(()=>{L(c===1,47070,{batchId:t.batchId})}));const h=[];for(const f of t.mutations){const m=rd(e,f.key.path,t.batchId);s.push(i.delete(m)),h.push(f.key)}return w.waitFor(s).next(()=>h)}function Ps(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw M(14731);e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ae.DEFAULT_COLLECTION_PERCENTILE=10,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ae.DEFAULT=new Ae(uf,Ae.DEFAULT_COLLECTION_PERCENTILE,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ae.DISABLED=new Ae(-1,0,0);class Zs{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.jn={}}static bt(e,t,n,i){L(e.uid!=="",64387);const s=e.isAuthenticated()?e.uid:"";return new Zs(s,t,n,i)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Tt(e).te({index:tn,range:n},(i,s,a)=>{t=!1,a.done()}).next(()=>t)}addMutationBatch(e,t,n,i){const s=xn(e),a=Tt(e);return a.add({}).next(c=>{L(typeof c=="number",49019);const u=new Ga(c,t,n,i),h=function(P,C,x){const D=x.baseMutations.map(j=>As(P.wt,j)),$=x.mutations.map(j=>As(P.wt,j));return{userId:C,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:D,mutations:$}}(this.serializer,this.userId,u),f=[];let m=new te((I,P)=>q(I.canonicalString(),P.canonicalString()));for(const I of i){const P=rd(this.userId,I.key.path,c);m=m.add(I.key.path.popLast()),f.push(a.put(h)),f.push(s.put(P,I_))}return m.forEach(I=>{f.push(this.indexManager.addToCollectionParentIndex(e,I))}),e.addOnCommittedListener(()=>{this.jn[c]=u.keys()}),w.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return Tt(e).get(t).next(n=>n?(L(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),Xt(this.serializer,n)):null)}Hn(e,t){return this.jn[t]?w.resolve(this.jn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const i=n.keys();return this.jn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return Tt(e).te({index:tn,range:i},(a,c,u)=>{c.userId===this.userId&&(L(c.batchId>=n,47524,{Jn:n}),s=Xt(this.serializer,c)),u.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=nn;return Tt(e).te({index:tn,range:t,reverse:!0},(i,s,a)=>{n=s.batchId,a.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,nn],[this.userId,Number.POSITIVE_INFINITY]);return Tt(e).J(tn,t).next(n=>n.map(i=>Xt(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=es(this.userId,t.path),i=IDBKeyRange.lowerBound(n),s=[];return xn(e).te({range:i},(a,c,u)=>{const[h,f,m]=a,I=We(f);if(h===this.userId&&t.path.isEqual(I))return Tt(e).get(m).next(P=>{if(!P)throw M(61480,{Yn:a,batchId:m});L(P.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:P.userId,batchId:m}),s.push(Xt(this.serializer,P))});u.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(q);const i=[];return t.forEach(s=>{const a=es(this.userId,s.path),c=IDBKeyRange.lowerBound(a),u=xn(e).te({range:c},(h,f,m)=>{const[I,P,C]=h,x=We(P);I===this.userId&&s.path.isEqual(x)?n=n.add(C):m.done()});i.push(u)}),w.waitFor(i).next(()=>this.Zn(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1,s=es(this.userId,n),a=IDBKeyRange.lowerBound(s);let c=new te(q);return xn(e).te({range:a},(u,h,f)=>{const[m,I,P]=u,C=We(I);m===this.userId&&n.isPrefixOf(C)?C.length===i&&(c=c.add(P)):f.done()}).next(()=>this.Zn(e,c))}Zn(e,t){const n=[],i=[];return t.forEach(s=>{i.push(Tt(e).get(s).next(a=>{if(a===null)throw M(35274,{batchId:s});L(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:s}),n.push(Xt(this.serializer,a))}))}),w.waitFor(i).next(()=>n)}removeMutationBatch(e,t){return lf(e.he,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.Xn(t.batchId)}),w.forEach(n,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}Xn(e){delete this.jn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return w.resolve();const n=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),i=[];return xn(e).te({range:n},(s,a,c)=>{if(s[0]===this.userId){const u=We(s[1]);i.push(u)}else c.done()}).next(()=>{L(i.length===0,56720,{er:i.map(s=>s.canonicalString())})})})}containsKey(e,t){return hf(e,this.userId,t)}tr(e){return df(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:nn,lastStreamToken:""})}}function hf(r,e,t){const n=es(e,t.path),i=n[1],s=IDBKeyRange.lowerBound(n);let a=!1;return xn(r).te({range:s,ee:!0},(c,u,h)=>{const[f,m,I]=c;f===e&&m===i&&(a=!0),h.done()}).next(()=>a)}function Tt(r){return me(r,ze)}function xn(r){return me(r,zn)}function df(r){return me(r,Hr)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e){this.nr=e}next(){return this.nr+=2,this.nr}static rr(){return new fn(0)}static ir(){return new fn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.sr(e).next(t=>{const n=new fn(t.highestTargetId);return t.highestTargetId=n.next(),this._r(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.sr(e).next(t=>U.fromTimestamp(new ae(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.sr(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.sr(e).next(i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this._r(e,i)))}addTargetData(e,t){return this.ar(e,t).next(()=>this.sr(e).next(n=>(n.targetCount+=1,this.ur(t,n),this._r(e,n))))}updateTargetData(e,t){return this.ar(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Cn(e).delete(t.targetId)).next(()=>this.sr(e)).next(n=>(L(n.targetCount>0,8065),n.targetCount-=1,this._r(e,n)))}removeTargets(e,t,n){let i=0;const s=[];return Cn(e).te((a,c)=>{const u=Or(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(i++,s.push(this.removeTargetData(e,u)))}).next(()=>w.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Cn(e).te((n,i)=>{const s=Or(i);t(s)})}sr(e){return Ml(e).get(_s).next(t=>(L(t!==null,2888),t))}_r(e,t){return Ml(e).put(_s,t)}ar(e,t){return Cn(e).put(sf(this.serializer,t))}ur(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.sr(e).next(t=>t.targetCount)}getTargetData(e,t){const n=ln(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return Cn(e).te({range:i,index:sd},(a,c,u)=>{const h=Or(c);li(t,h.target)&&(s=h,u.done())}).next(()=>s)}addMatchingKeys(e,t,n){const i=[],s=Rt(e);return t.forEach(a=>{const c=be(a.path);i.push(s.put({targetId:n,path:c})),i.push(this.referenceDelegate.addReference(e,n,a))}),w.waitFor(i)}removeMatchingKeys(e,t,n){const i=Rt(e);return w.forEach(t,s=>{const a=be(s.path);return w.waitFor([i.delete([n,a]),this.referenceDelegate.removeReference(e,n,s)])})}removeMatchingKeysForTargetId(e,t){const n=Rt(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),i=Rt(e);let s=G();return i.te({range:n,ee:!0},(a,c,u)=>{const h=We(a[1]),f=new O(h);s=s.add(f)}).next(()=>s)}containsKey(e,t){const n=be(t.path),i=IDBKeyRange.bound([n],[Xh(n)],!1,!0);let s=0;return Rt(e).te({index:Ma,ee:!0,range:i},([a,c],u,h)=>{a!==0&&(s++,h.done())}).next(()=>s>0)}Rt(e,t){return Cn(e).get(t).next(n=>n?Or(n):null)}}function Cn(r){return me(r,$n)}function Ml(r){return me(r,rn)}function Rt(r){return me(r,Gn)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll="LruGarbageCollector",ff=1048576;function Fl([r,e],[t,n]){const i=q(r,t);return i===0?q(e,n):i}class Ky{constructor(e){this.cr=e,this.buffer=new te(Fl),this.lr=0}hr(){return++this.lr}Pr(e){const t=[e,this.hr()];if(this.buffer.size<this.cr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();Fl(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class pf{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Tr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ir(6e4)}stop(){this.Tr&&(this.Tr.cancel(),this.Tr=null)}get started(){return this.Tr!==null}Ir(e){V(Ll,`Garbage collection scheduled in ${e}ms`),this.Tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Bt(t)?V(Ll,"Ignoring IndexedDB error during garbage collection: ",t):await _n(t)}await this.Ir(3e5)})}}class Wy{constructor(e,t){this.Er=e,this.params=t}calculateTargetCount(e,t){return this.Er.dr(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return w.resolve(Ue.le);const n=new Ky(t);return this.Er.forEachTarget(e,i=>n.Pr(i.sequenceNumber)).next(()=>this.Er.Ar(e,i=>n.Pr(i))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Er.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Er.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),w.resolve(Ol)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ol):this.Rr(e,t))}getCacheSize(e){return this.Er.getCacheSize(e)}Rr(e,t){let n,i,s,a,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,a=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(n=m,c=Date.now(),this.removeTargets(e,n,t))).next(m=>(s=m,u=Date.now(),this.removeOrphanedDocuments(e,n))).next(m=>(h=Date.now(),Vn()<=W.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${i} in `+(c-a)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),w.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m})))}}function mf(r,e){return new Wy(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hy{constructor(e,t){this.db=e,this.garbageCollector=mf(this,t)}dr(e){const t=this.Vr(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}Vr(e){let t=0;return this.Ar(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Ar(e,t){return this.mr(e,(n,i)=>t(i))}addReference(e,t,n){return Hi(e,n)}removeReference(e,t,n){return Hi(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Hi(e,t)}gr(e,t){return function(i,s){let a=!1;return df(i).ne(c=>hf(i,c,s).next(u=>(u&&(a=!0),w.resolve(!u)))).next(()=>a)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.mr(e,(a,c)=>{if(c<=t){const u=this.gr(e,a).next(h=>{if(!h)return s++,n.getEntry(e,a).next(()=>(n.removeEntry(a,U.min()),Rt(e).delete(function(m){return[0,be(m.path)]}(a))))});i.push(u)}}).next(()=>w.waitFor(i)).next(()=>n.apply(e)).next(()=>s)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Hi(e,t)}mr(e,t){const n=Rt(e);let i,s=Ue.le;return n.te({index:Ma},([a,c],{path:u,sequenceNumber:h})=>{a===0?(s!==Ue.le&&t(new O(We(i)),s),s=h,i=u):s=Ue.le}).next(()=>{s!==Ue.le&&t(new O(We(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Hi(r,e){return Rt(r).put(function(n,i){return{targetId:0,path:be(n.path),sequenceNumber:i}}(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{constructor(){this.changes=new dt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ue.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?w.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Wt(e).put(n)}removeEntry(e,t,n){return Wt(e).delete(function(s,a){const c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Rs(a),c[c.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.pr(e,n)))}getEntry(e,t){let n=ue.newInvalidDocument(t);return Wt(e).te({index:ts,range:IDBKeyRange.only(Sr(t))},(i,s)=>{n=this.yr(t,s)}).next(()=>n)}wr(e,t){let n={size:0,document:ue.newInvalidDocument(t)};return Wt(e).te({index:ts,range:IDBKeyRange.only(Sr(t))},(i,s)=>{n={document:this.yr(t,s),size:Ps(s)}}).next(()=>n)}getEntries(e,t){let n=Me();return this.br(e,t,(i,s)=>{const a=this.yr(i,s);n=n.insert(i,a)}).next(()=>n)}Sr(e,t){let n=Me(),i=new se(O.comparator);return this.br(e,t,(s,a)=>{const c=this.yr(s,a);n=n.insert(s,c),i=i.insert(s,Ps(a))}).next(()=>({documents:n,Dr:i}))}br(e,t,n){if(t.isEmpty())return w.resolve();let i=new te(ql);t.forEach(u=>i=i.add(u));const s=IDBKeyRange.bound(Sr(i.first()),Sr(i.last())),a=i.getIterator();let c=a.getNext();return Wt(e).te({index:ts,range:s},(u,h,f)=>{const m=O.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&ql(c,m)<0;)n(c,null),c=a.getNext();c&&c.isEqual(m)&&(n(c,h),c=a.hasNext()?a.getNext():null),c?f.H(Sr(c)):f.done()}).next(()=>{for(;c;)n(c,null),c=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(e,t,n,i,s){const a=t.path,c=[a.popLast().toArray(),a.lastSegment(),Rs(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Wt(e).J(IDBKeyRange.bound(c,u,!0)).next(h=>{s==null||s.incrementDocumentReadCount(h.length);let f=Me();for(const m of h){const I=this.yr(O.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);I.isFoundDocument()&&(hi(t,I)||i.has(I.key))&&(f=f.insert(I.key,I))}return f})}getAllFromCollectionGroup(e,t,n,i){let s=Me();const a=Bl(t,n),c=Bl(t,Le.max());return Wt(e).te({index:id,range:IDBKeyRange.bound(a,c,!0)},(u,h,f)=>{const m=this.yr(O.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);s=s.insert(m.key,m),s.size===i&&f.done()}).next(()=>s)}newChangeBuffer(e){return new Yy(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Ul(e).get(ia).next(t=>(L(!!t,20021),t))}pr(e,t){return Ul(e).put(ia,t)}yr(e,t){if(t){const n=Oy(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(U.min())))return n}return ue.newInvalidDocument(e)}}function _f(r){return new Qy(r)}class Yy extends gf{constructor(e,t){super(),this.vr=e,this.trackRemovals=t,this.Cr=new dt(n=>n.toString(),(n,i)=>n.isEqual(i))}applyChanges(e){const t=[];let n=0,i=new te((s,a)=>q(s.canonicalString(),a.canonicalString()));return this.changes.forEach((s,a)=>{const c=this.Cr.get(s);if(t.push(this.vr.removeEntry(e,s,c.readTime)),a.isValidDocument()){const u=wl(this.vr.serializer,a);i=i.add(s.path.popLast());const h=Ps(u);n+=h-c.size,t.push(this.vr.addEntry(e,s,u))}else if(n-=c.size,this.trackRemovals){const u=wl(this.vr.serializer,a.convertToNoDocument(U.min()));t.push(this.vr.addEntry(e,s,u))}}),i.forEach(s=>{t.push(this.vr.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.vr.updateMetadata(e,n)),w.waitFor(t)}getFromCache(e,t){return this.vr.wr(e,t).next(n=>(this.Cr.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.vr.Sr(e,t).next(({documents:n,Dr:i})=>(i.forEach((s,a)=>{this.Cr.set(s,{size:a,readTime:n.get(s).readTime})}),n))}}function Ul(r){return me(r,Qr)}function Wt(r){return me(r,gs)}function Sr(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Bl(r,e){const t=e.documentKey.path.toArray();return[r,Rs(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function ql(r,e){const t=r.path.toArray(),n=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<n.length-2;++s)if(i=q(t[s],n[s]),i)return i;return i=q(t.length,n.length),i||(i=q(t[t.length-2],n[n.length-2]),i||q(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jy{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(n=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(n!==null&&jr(n.mutation,i,Ne.empty(),ae.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,G()).next(()=>n))}getLocalViewOfDocuments(e,t,n=G()){const i=He();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,n).next(s=>{let a=Nr();return s.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const n=He();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,G()))}populateOverlays(e,t,n){const i=[];return n.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,n,i){let s=Me();const a=qr(),c=function(){return qr()}();return t.forEach((u,h)=>{const f=n.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof ft)?s=s.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),jr(f.mutation,h,f.mutation.getFieldMask(),ae.now())):a.set(h.key,Ne.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var m;return c.set(h,new Jy(f,(m=a.get(h))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){const n=qr();let i=new se((a,c)=>a-c),s=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||Ne.empty();f=c.applyToLocalView(h,f),n.set(u,f);const m=(i.get(c.batchId)||G()).add(u);i=i.insert(c.batchId,m)})}).next(()=>{const a=[],c=i.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,m=xd();f.forEach(I=>{if(!s.has(I)){const P=Bd(t.get(I),n.get(I));P!==null&&m.set(I,P),s=s.add(I)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,m))}return w.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,i){return function(a){return O.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Cd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next(s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-s.size):w.resolve(He());let c=Gr,u=s;return a.next(h=>w.forEach(h,(f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),s.get(f)?w.resolve():this.remoteDocumentCache.getEntry(e,f).next(I=>{u=u.insert(f,I)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,G())).next(f=>({batchId:c,changes:Nd(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next(n=>{let i=Nr();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){const s=t.collectionGroup;let a=Nr();return this.indexManager.getCollectionParents(e,s).next(c=>w.forEach(c,u=>{const h=function(m,I){return new ir(I,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,n,i).next(f=>{f.forEach((m,I)=>{a=a.insert(m,I)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,n,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,i))).next(a=>{s.forEach((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,ue.newInvalidDocument(f)))});let c=Nr();return a.forEach((u,h)=>{const f=s.get(u);f!==void 0&&jr(f.mutation,h,Ne.empty(),ae.now()),hi(t,h)&&(c=c.insert(u,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy{constructor(e){this.serializer=e,this.Fr=new Map,this.Mr=new Map}getBundleMetadata(e,t){return w.resolve(this.Fr.get(t))}saveBundleMetadata(e,t){return this.Fr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:De(i.createTime)}}(t)),w.resolve()}getNamedQuery(e,t){return w.resolve(this.Mr.get(t))}saveNamedQuery(e,t){return this.Mr.set(t.name,function(i){return{name:i.name,query:of(i.bundledQuery),readTime:De(i.readTime)}}(t)),w.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zy{constructor(){this.overlays=new se(O.comparator),this.Or=new Map}getOverlay(e,t){return w.resolve(this.overlays.get(t))}getOverlays(e,t){const n=He();return w.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((i,s)=>{this.St(e,t,s)}),w.resolve()}removeOverlaysForBatchId(e,t,n){const i=this.Or.get(n);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Or.delete(n)),w.resolve()}getOverlaysForCollection(e,t,n){const i=He(),s=t.length+1,a=new O(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>n&&i.set(u.getKey(),u)}return w.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let s=new se((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=s.get(h.largestBatchId);f===null&&(f=He(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=He(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=i)););return w.resolve(c)}St(e,t,n){const i=this.overlays.get(n.key);if(i!==null){const a=this.Or.get(i.largestBatchId).delete(n.key);this.Or.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Wa(t,n));let s=this.Or.get(t);s===void 0&&(s=G(),this.Or.set(t,s)),this.Or.set(t,s.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(){this.sessionToken=de.EMPTY_BYTE_STRING}getSessionToken(e){return w.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,w.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xa{constructor(){this.Nr=new te(ge.Br),this.Lr=new te(ge.kr)}isEmpty(){return this.Nr.isEmpty()}addReference(e,t){const n=new ge(e,t);this.Nr=this.Nr.add(n),this.Lr=this.Lr.add(n)}qr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Qr(new ge(e,t))}$r(e,t){e.forEach(n=>this.removeReference(n,t))}Ur(e){const t=new O(new X([])),n=new ge(t,e),i=new ge(t,e+1),s=[];return this.Lr.forEachInRange([n,i],a=>{this.Qr(a),s.push(a.key)}),s}Kr(){this.Nr.forEach(e=>this.Qr(e))}Qr(e){this.Nr=this.Nr.delete(e),this.Lr=this.Lr.delete(e)}Wr(e){const t=new O(new X([])),n=new ge(t,e),i=new ge(t,e+1);let s=G();return this.Lr.forEachInRange([n,i],a=>{s=s.add(a.key)}),s}containsKey(e){const t=new ge(e,0),n=this.Nr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class ge{constructor(e,t){this.key=e,this.Gr=t}static Br(e,t){return O.comparator(e.key,t.key)||q(e.Gr,t.Gr)}static kr(e,t){return q(e.Gr,t.Gr)||O.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Jn=1,this.zr=new te(ge.Br)}checkEmpty(e){return w.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){const s=this.Jn;this.Jn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Ga(s,t,n,i);this.mutationQueue.push(a);for(const c of i)this.zr=this.zr.add(new ge(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return w.resolve(a)}lookupMutationBatch(e,t){return w.resolve(this.jr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=this.Hr(n),s=i<0?0:i;return w.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return w.resolve(this.mutationQueue.length===0?nn:this.Jn-1)}getAllMutationBatches(e){return w.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new ge(t,0),i=new ge(t,Number.POSITIVE_INFINITY),s=[];return this.zr.forEachInRange([n,i],a=>{const c=this.jr(a.Gr);s.push(c)}),w.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(q);return t.forEach(i=>{const s=new ge(i,0),a=new ge(i,Number.POSITIVE_INFINITY);this.zr.forEachInRange([s,a],c=>{n=n.add(c.Gr)})}),w.resolve(this.Jr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1;let s=n;O.isDocumentKey(s)||(s=s.child(""));const a=new ge(new O(s),0);let c=new te(q);return this.zr.forEachWhile(u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===i&&(c=c.add(u.Gr)),!0)},a),w.resolve(this.Jr(c))}Jr(e){const t=[];return e.forEach(n=>{const i=this.jr(n);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){L(this.Yr(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.zr;return w.forEach(t.mutations,i=>{const s=new ge(i.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.zr=n})}Xn(e){}containsKey(e,t){const n=new ge(t,0),i=this.zr.firstAfterOrEqual(n);return w.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,w.resolve()}Yr(e,t){return this.Hr(e)}Hr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}jr(e){const t=this.Hr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{constructor(e){this.Zr=e,this.docs=function(){return new se(O.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,i=this.docs.get(n),s=i?i.size:0,a=this.Zr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return w.resolve(n?n.document.mutableCopy():ue.newInvalidDocument(t))}getEntries(e,t){let n=Me();return t.forEach(i=>{const s=this.docs.get(i);n=n.insert(i,s?s.document.mutableCopy():ue.newInvalidDocument(i))}),w.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let s=Me();const a=t.path,c=new O(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||xa(Zh(f),n)<=0||(i.has(f.key)||hi(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return w.resolve(s)}getAllFromCollectionGroup(e,t,n,i){M(9500)}Xr(e,t){return w.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new rI(this)}getSize(e){return w.resolve(this.size)}}class rI extends gf{constructor(e){super(),this.vr=e}applyChanges(e){const t=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?t.push(this.vr.addEntry(e,i)):this.vr.removeEntry(n)}),w.waitFor(t)}getFromCache(e,t){return this.vr.getEntry(e,t)}getAllFromCache(e,t){return this.vr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(e){this.persistence=e,this.ei=new dt(t=>ln(t),li),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.ti=0,this.ni=new Xa,this.targetCount=0,this.ri=fn.rr()}forEachTarget(e,t){return this.ei.forEach((n,i)=>t(i)),w.resolve()}getLastRemoteSnapshotVersion(e){return w.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return w.resolve(this.ti)}allocateTargetId(e){return this.highestTargetId=this.ri.next(),w.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ti&&(this.ti=t),w.resolve()}ar(e){this.ei.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ri=new fn(t),this.highestTargetId=t),e.sequenceNumber>this.ti&&(this.ti=e.sequenceNumber)}addTargetData(e,t){return this.ar(t),this.targetCount+=1,w.resolve()}updateTargetData(e,t){return this.ar(t),w.resolve()}removeTargetData(e,t){return this.ei.delete(t.target),this.ni.Ur(t.targetId),this.targetCount-=1,w.resolve()}removeTargets(e,t,n){let i=0;const s=[];return this.ei.forEach((a,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.ei.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),w.waitFor(s).next(()=>i)}getTargetCount(e){return w.resolve(this.targetCount)}getTargetData(e,t){const n=this.ei.get(t)||null;return w.resolve(n)}addMatchingKeys(e,t,n){return this.ni.qr(t,n),w.resolve()}removeMatchingKeys(e,t,n){this.ni.$r(t,n);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),w.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.ni.Ur(t),w.resolve()}getMatchingKeysForTargetId(e,t){const n=this.ni.Wr(t);return w.resolve(n)}containsKey(e,t){return w.resolve(this.ni.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(e,t){this.ii={},this.overlays={},this.si=new Ue(0),this.oi=!1,this.oi=!0,this._i=new eI,this.referenceDelegate=e(this),this.ai=new iI(this),this.indexManager=new zy,this.remoteDocumentCache=function(i){return new nI(i)}(n=>this.referenceDelegate.ui(n)),this.serializer=new rf(t),this.ci=new Xy(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.oi=!1,Promise.resolve()}get started(){return this.oi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Zy,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ii[e.toKey()];return n||(n=new tI(t,this.referenceDelegate),this.ii[e.toKey()]=n),n}getGlobalsCache(){return this._i}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.ci}runTransaction(e,t,n){V("MemoryPersistence","Starting transaction:",e);const i=new sI(this.si.next());return this.referenceDelegate.li(),n(i).next(s=>this.referenceDelegate.hi(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Pi(e,t){return w.or(Object.values(this.ii).map(n=>()=>n.containsKey(e,t)))}}class sI extends td{constructor(e){super(),this.currentSequenceNumber=e}}class eo{constructor(e){this.persistence=e,this.Ti=new Xa,this.Ii=null}static Ei(e){return new eo(e)}get di(){if(this.Ii)return this.Ii;throw M(60996)}addReference(e,t,n){return this.Ti.addReference(n,t),this.di.delete(n.toString()),w.resolve()}removeReference(e,t,n){return this.Ti.removeReference(n,t),this.di.add(n.toString()),w.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),w.resolve()}removeTarget(e,t){this.Ti.Ur(t.targetId).forEach(i=>this.di.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.di.add(s.toString()))}).next(()=>n.removeTargetData(e,t))}li(){this.Ii=new Set}hi(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return w.forEach(this.di,n=>{const i=O.fromPath(n);return this.Ai(e,i).next(s=>{s||t.removeEntry(i,U.min())})}).next(()=>(this.Ii=null,t.apply(e)))}updateLimboDocument(e,t){return this.Ai(e,t).next(n=>{n?this.di.delete(t.toString()):this.di.add(t.toString())})}ui(e){return 0}Ai(e,t){return w.or([()=>w.resolve(this.Ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Pi(e,t)])}}class Ss{constructor(e,t){this.persistence=e,this.Ri=new dt(n=>be(n.path),(n,i)=>n.isEqual(i)),this.garbageCollector=mf(this,t)}static Ei(e,t){return new Ss(e,t)}li(){}hi(e){return w.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.Vr(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}Vr(e){let t=0;return this.Ar(e,n=>{t++}).next(()=>t)}Ar(e,t){return w.forEach(this.Ri,(n,i)=>this.gr(e,n,i).next(s=>s?w.resolve():t(i)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Xr(e,a=>this.gr(e,a,t).next(c=>{c||(n++,s.removeEntry(a,U.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.Ri.set(t,e.currentSequenceNumber),w.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.Ri.set(n,e.currentSequenceNumber),w.resolve()}removeReference(e,t,n){return this.Ri.set(n,e.currentSequenceNumber),w.resolve()}updateLimboDocument(e,t){return this.Ri.set(t,e.currentSequenceNumber),w.resolve()}ui(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=rs(e.data.value)),t}gr(e,t,n){return w.or([()=>this.persistence.Pi(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.Ri.get(t);return w.resolve(i!==void 0&&i>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(e){this.serializer=e}q(e,t,n,i){const s=new Bs("createOrUpgrade",t);n<1&&i>=1&&(function(u){u.createObjectStore(ui)}(e),function(u){u.createObjectStore(Hr,{keyPath:y_}),u.createObjectStore(ze,{keyPath:Zu,autoIncrement:!0}).createIndex(tn,el,{unique:!0}),u.createObjectStore(zn)}(e),jl(e),function(u){u.createObjectStore(Yt)}(e));let a=w.resolve();return n<3&&i>=3&&(n!==0&&(function(u){u.deleteObjectStore(Gn),u.deleteObjectStore($n),u.deleteObjectStore(rn)}(e),jl(e)),a=a.next(()=>function(u){const h=u.store(rn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:U.min().toTimestamp(),targetCount:0};return h.put(_s,f)}(s))),n<4&&i>=4&&(n!==0&&(a=a.next(()=>function(u,h){return h.store(ze).J().next(m=>{u.deleteObjectStore(ze),u.createObjectStore(ze,{keyPath:Zu,autoIncrement:!0}).createIndex(tn,el,{unique:!0});const I=h.store(ze),P=m.map(C=>I.put(C));return w.waitFor(P)})}(e,s))),a=a.next(()=>{(function(u){u.createObjectStore(Kn,{keyPath:P_})})(e)})),n<5&&i>=5&&(a=a.next(()=>this.Vi(s))),n<6&&i>=6&&(a=a.next(()=>(function(u){u.createObjectStore(Qr)}(e),this.mi(s)))),n<7&&i>=7&&(a=a.next(()=>this.fi(s))),n<8&&i>=8&&(a=a.next(()=>this.gi(e,s))),n<9&&i>=9&&(a=a.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&i>=10&&(a=a.next(()=>this.pi(s))),n<11&&i>=11&&(a=a.next(()=>{(function(u){u.createObjectStore(js,{keyPath:S_})})(e),function(u){u.createObjectStore(zs,{keyPath:C_})}(e)})),n<12&&i>=12&&(a=a.next(()=>{(function(u){const h=u.createObjectStore($s,{keyPath:M_});h.createIndex(oa,L_,{unique:!1}),h.createIndex(cd,F_,{unique:!1})})(e)})),n<13&&i>=13&&(a=a.next(()=>function(u){const h=u.createObjectStore(gs,{keyPath:E_});h.createIndex(ts,v_),h.createIndex(id,T_)}(e)).next(()=>this.yi(e,s)).next(()=>e.deleteObjectStore(Yt))),n<14&&i>=14&&(a=a.next(()=>this.wi(e,s))),n<15&&i>=15&&(a=a.next(()=>function(u){u.createObjectStore(La,{keyPath:V_,autoIncrement:!0}).createIndex(sa,D_,{unique:!1}),u.createObjectStore(ys,{keyPath:k_}).createIndex(od,N_,{unique:!1}),u.createObjectStore(Is,{keyPath:x_}).createIndex(ad,O_,{unique:!1})}(e))),n<16&&i>=16&&(a=a.next(()=>{t.objectStore(ys).clear()}).next(()=>{t.objectStore(Is).clear()})),n<17&&i>=17&&(a=a.next(()=>{(function(u){u.createObjectStore(Fa,{keyPath:U_})})(e)})),a}mi(e){let t=0;return e.store(Yt).te((n,i)=>{t+=Ps(i)}).next(()=>{const n={byteSize:t};return e.store(Qr).put(ia,n)})}Vi(e){const t=e.store(Hr),n=e.store(ze);return t.J().next(i=>w.forEach(i,s=>{const a=IDBKeyRange.bound([s.userId,nn],[s.userId,s.lastAcknowledgedBatchId]);return n.J(tn,a).next(c=>w.forEach(c,u=>{L(u.userId===s.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const h=Xt(this.serializer,u);return lf(e,s.userId,h).next(()=>{})}))}))}fi(e){const t=e.store(Gn),n=e.store(Yt);return e.store(rn).get(_s).next(i=>{const s=[];return n.te((a,c)=>{const u=new X(a),h=function(m){return[0,be(m)]}(u);s.push(t.get(h).next(f=>f?w.resolve():(m=>t.put({targetId:0,path:be(m),sequenceNumber:i.highestListenSequenceNumber}))(u)))}).next(()=>w.waitFor(s))})}gi(e,t){e.createObjectStore(Yr,{keyPath:b_});const n=t.store(Yr),i=new Ja,s=a=>{if(i.add(a)){const c=a.lastSegment(),u=a.popLast();return n.put({collectionId:c,parent:be(u)})}};return t.store(Yt).te({ee:!0},(a,c)=>{const u=new X(a);return s(u.popLast())}).next(()=>t.store(zn).te({ee:!0},([a,c,u],h)=>{const f=We(c);return s(f.popLast())}))}pi(e){const t=e.store($n);return t.te((n,i)=>{const s=Or(i),a=sf(this.serializer,s);return t.put(a)})}yi(e,t){const n=t.store(Yt),i=[];return n.te((s,a)=>{const c=t.store(gs),u=function(m){return m.document?new O(X.fromString(m.document.name).popFirst(5)):m.noDocument?O.fromSegments(m.noDocument.path):m.unknownDocument?O.fromSegments(m.unknownDocument.path):M(36783)}(a).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};i.push(c.put(h))}).next(()=>w.waitFor(i))}wi(e,t){const n=t.store(ze),i=_f(this.serializer),s=new Za(eo.Ei,this.serializer.wt);return n.J().next(a=>{const c=new Map;return a.forEach(u=>{var h;let f=(h=c.get(u.userId))!==null&&h!==void 0?h:G();Xt(this.serializer,u).keys().forEach(m=>f=f.add(m)),c.set(u.userId,f)}),w.forEach(c,(u,h)=>{const f=new Ce(h),m=Xs.bt(this.serializer,f),I=s.getIndexManager(f),P=Zs.bt(f,this.serializer,I,s.referenceDelegate);return new yf(i,P,m,I).recalculateAndSaveOverlaysForDocumentKeys(new aa(t,Ue.le),u).next()})})}}function jl(r){r.createObjectStore(Gn,{keyPath:A_}).createIndex(Ma,R_,{unique:!0}),r.createObjectStore($n,{keyPath:"targetId"}).createIndex(sd,w_,{unique:!0}),r.createObjectStore(rn)}const wt="IndexedDbPersistence",jo=18e5,zo=5e3,$o="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",aI="main";class ec{constructor(e,t,n,i,s,a,c,u,h,f,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.bi=s,this.window=a,this.document=c,this.Si=h,this.Di=f,this.Ci=m,this.si=null,this.oi=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Fi=null,this.inForeground=!1,this.Mi=null,this.xi=null,this.Oi=Number.NEGATIVE_INFINITY,this.Ni=I=>Promise.resolve(),!ec.C())throw new k(S.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Hy(this,i),this.Bi=t+aI,this.serializer=new rf(u),this.Li=new xt(this.Bi,this.Ci,new oI(this.serializer)),this._i=new Ly,this.ai=new Gy(this.referenceDelegate,this.serializer),this.remoteDocumentCache=_f(this.serializer),this.ci=new My,this.window&&this.window.localStorage?this.ki=this.window.localStorage:(this.ki=null,f===!1&&Ve(wt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.qi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new k(S.FAILED_PRECONDITION,$o);return this.Qi(),this.$i(),this.Ui(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.ai.getHighestSequenceNumber(e))}).then(e=>{this.si=new Ue(e,this.Si)}).then(()=>{this.oi=!0}).catch(e=>(this.Li&&this.Li.close(),Promise.reject(e)))}Ki(e){return this.Ni=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Li.U(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.bi.enqueueAndForget(async()=>{this.started&&await this.qi()}))}qi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Qi(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Wi(e).next(t=>{t||(this.isPrimary=!1,this.bi.enqueueRetryable(()=>this.Ni(!1)))})}).next(()=>this.Gi(e)).next(t=>this.isPrimary&&!t?this.zi(e).next(()=>!1):!!t&&this.ji(e).next(()=>!0))).catch(e=>{if(Bt(e))return V(wt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return V(wt,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.bi.enqueueRetryable(()=>this.Ni(e)),this.isPrimary=e})}Wi(e){return Cr(e).get(An).next(t=>w.resolve(this.Hi(t)))}Ji(e){return Qi(e).delete(this.clientId)}async Yi(){if(this.isPrimary&&!this.Zi(this.Oi,jo)){this.Oi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=me(t,Kn);return n.J().next(i=>{const s=this.Xi(i,jo),a=i.filter(c=>s.indexOf(c)===-1);return w.forEach(a,c=>n.delete(c.clientId)).next(()=>a)})}).catch(()=>[]);if(this.ki)for(const t of e)this.ki.removeItem(this.es(t.clientId))}}Ui(){this.xi=this.bi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.qi().then(()=>this.Yi()).then(()=>this.Ui()))}Hi(e){return!!e&&e.ownerId===this.clientId}Gi(e){return this.Di?w.resolve(!0):Cr(e).get(An).next(t=>{if(t!==null&&this.Zi(t.leaseTimestampMs,zo)&&!this.ts(t.ownerId)){if(this.Hi(t)&&this.networkEnabled)return!0;if(!this.Hi(t)){if(!t.allowTabSynchronization)throw new k(S.FAILED_PRECONDITION,$o);return!1}}return!(!this.networkEnabled||!this.inForeground)||Qi(e).J().next(n=>this.Xi(n,zo).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,a=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||a&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&V(wt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.oi=!1,this.ns(),this.xi&&(this.xi.cancel(),this.xi=null),this.rs(),this.ss(),await this.Li.runTransaction("shutdown","readwrite",[ui,Kn],e=>{const t=new aa(e,Ue.le);return this.zi(t).next(()=>this.Ji(t))}),this.Li.close(),this._s()}Xi(e,t){return e.filter(n=>this.Zi(n.updateTimeMs,t)&&!this.ts(n.clientId))}us(){return this.runTransaction("getActiveClients","readonly",e=>Qi(e).J().next(t=>this.Xi(t,jo).map(n=>n.clientId)))}get started(){return this.oi}getGlobalsCache(){return this._i}getMutationQueue(e,t){return Zs.bt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new $y(e,this.serializer.wt.databaseId)}getDocumentOverlayCache(e){return Xs.bt(this.serializer,e)}getBundleCache(){return this.ci}runTransaction(e,t,n){V(wt,"Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(u){return u===17?j_:u===16?q_:u===15?Ua:u===14?hd:u===13?ld:u===12?B_:u===11?ud:void M(60245)}(this.Ci);let a;return this.Li.runTransaction(e,i,s,c=>(a=new aa(c,this.si?this.si.next():Ue.le),t==="readwrite-primary"?this.Wi(a).next(u=>!!u||this.Gi(a)).next(u=>{if(!u)throw Ve(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.bi.enqueueRetryable(()=>this.Ni(!1)),new k(S.FAILED_PRECONDITION,ed);return n(a)}).next(u=>this.ji(a).next(()=>u)):this.cs(a).next(()=>n(a)))).then(c=>(a.raiseOnCommittedEvent(),c))}cs(e){return Cr(e).get(An).next(t=>{if(t!==null&&this.Zi(t.leaseTimestampMs,zo)&&!this.ts(t.ownerId)&&!this.Hi(t)&&!(this.Di||this.allowTabSynchronization&&t.allowTabSynchronization))throw new k(S.FAILED_PRECONDITION,$o)})}ji(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Cr(e).put(An,t)}static C(){return xt.C()}zi(e){const t=Cr(e);return t.get(An).next(n=>this.Hi(n)?(V(wt,"Releasing primary lease."),t.delete(An)):w.resolve())}Zi(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(Ve(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Qi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Mi=()=>{this.bi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.qi()))},this.document.addEventListener("visibilitychange",this.Mi),this.inForeground=this.document.visibilityState==="visible")}rs(){this.Mi&&(this.document.removeEventListener("visibilitychange",this.Mi),this.Mi=null)}$i(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Fi=()=>{this.ns();const t=/(?:Version|Mobile)\/1[456]/;Lh()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.bi.enterRestrictedMode(!0),this.bi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Fi))}ss(){this.Fi&&(this.window.removeEventListener("pagehide",this.Fi),this.Fi=null)}ts(e){var t;try{const n=((t=this.ki)===null||t===void 0?void 0:t.getItem(this.es(e)))!==null;return V(wt,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return Ve(wt,"Failed to get zombied client id.",n),!1}}ns(){if(this.ki)try{this.ki.setItem(this.es(this.clientId),String(Date.now()))}catch(e){Ve("Failed to set zombie client id.",e)}}_s(){if(this.ki)try{this.ki.removeItem(this.es(this.clientId))}catch{}}es(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Cr(r){return me(r,ui)}function Qi(r){return me(r,Kn)}function cI(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.ls=n,this.hs=i}static Ps(e,t){let n=G(),i=G();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new tc(e,t.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(){this.Ts=!1,this.Is=!1,this.Es=100,this.ds=function(){return Lh()?8:nd(pe())>0?6:4}()}initialize(e,t){this.As=e,this.indexManager=t,this.Ts=!0}getDocumentsMatchingQuery(e,t,n,i){const s={result:null};return this.Rs(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.Vs(e,t,i,n).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new uI;return this.fs(e,t,a).next(c=>{if(s.result=c,this.Is)return this.gs(e,t,a,c.size)})}).next(()=>s.result)}gs(e,t,n,i){return n.documentReadCount<this.Es?(Vn()<=W.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",Dn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Es,"documents"),w.resolve()):(Vn()<=W.DEBUG&&V("QueryEngine","Query:",Dn(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.ds*i?(Vn()<=W.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",Dn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Be(t))):w.resolve())}Rs(e,t){if(fl(t))return w.resolve(null);let n=Be(t);return this.indexManager.getIndexType(e,n).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=pa(t,null,"F"),n=Be(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(s=>{const a=G(...s);return this.As.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,n).next(u=>{const h=this.ps(t,c);return this.ys(t,h,a,u.readTime)?this.Rs(e,pa(t,null,"F")):this.ws(e,h,t,u)}))})))}Vs(e,t,n,i){return fl(t)||i.isEqual(U.min())?w.resolve(null):this.As.getDocuments(e,n).next(s=>{const a=this.ps(t,s);return this.ys(t,a,n,i)?w.resolve(null):(Vn()<=W.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Dn(t)),this.ws(e,a,t,h_(i,Gr)).next(c=>c))})}ps(e,t){let n=new te(Dd(e));return t.forEach((i,s)=>{hi(e,s)&&(n=n.add(s))}),n}ys(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}fs(e,t,n){return Vn()<=W.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",Dn(t)),this.As.getDocumentsMatchingQuery(e,t,Le.min(),n)}ws(e,t,n,i){return this.As.getDocumentsMatchingQuery(e,n,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc="LocalStore",lI=3e8;class hI{constructor(e,t,n,i){this.persistence=e,this.bs=t,this.serializer=i,this.Ss=new se(q),this.Ds=new dt(s=>ln(s),li),this.vs=new Map,this.Cs=e.getRemoteDocumentCache(),this.ai=e.getTargetCache(),this.ci=e.getBundleCache(),this.Fs(n)}Fs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new yf(this.Cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Cs.setIndexManager(this.indexManager),this.bs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ss))}}function Ef(r,e,t,n){return new hI(r,e,t,n)}async function vf(r,e){const t=z(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next(s=>(i=s,t.Fs(e),t.mutationQueue.getAllMutationBatches(n))).next(s=>{const a=[],c=[];let u=G();for(const h of i){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of s){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next(h=>({Ms:h,removedBatchIds:a,addedBatchIds:c}))})})}function dI(r,e){const t=z(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=e.batch.keys(),s=t.Cs.newChangeBuffer({trackRemovals:!0});return function(c,u,h,f){const m=h.batch,I=m.keys();let P=w.resolve();return I.forEach(C=>{P=P.next(()=>f.getEntry(u,C)).next(x=>{const D=h.docVersions.get(C);L(D!==null,48541),x.version.compareTo(D)<0&&(m.applyToRemoteDocument(x,h),x.isValidDocument()&&(x.setReadTime(h.commitVersion),f.addEntry(x)))})}),P.next(()=>c.mutationQueue.removeMutationBatch(u,m))}(t,n,e,s).next(()=>s.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let u=G();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(n,i))})}function Tf(r){const e=z(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.ai.getLastRemoteSnapshotVersion(t))}function fI(r,e){const t=z(r),n=e.snapshotVersion;let i=t.Ss;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=t.Cs.newChangeBuffer({trackRemovals:!0});i=t.Ss;const c=[];e.targetChanges.forEach((f,m)=>{const I=i.get(m);if(!I)return;c.push(t.ai.removeMatchingKeys(s,f.removedDocuments,m).next(()=>t.ai.addMatchingKeys(s,f.addedDocuments,m)));let P=I.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?P=P.withResumeToken(de.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(f.resumeToken,n)),i=i.insert(m,P),function(x,D,$){return x.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=lI?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0}(I,P,f)&&c.push(t.ai.updateTargetData(s,P))});let u=Me(),h=G();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),c.push(pI(s,a,e.documentUpdates).next(f=>{u=f.xs,h=f.Os})),!n.isEqual(U.min())){const f=t.ai.getLastRemoteSnapshotVersion(s).next(m=>t.ai.setTargetsMetadata(s,s.currentSequenceNumber,n));c.push(f)}return w.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,h)).next(()=>u)}).then(s=>(t.Ss=i,s))}function pI(r,e,t){let n=G(),i=G();return t.forEach(s=>n=n.add(s)),e.getEntries(r,n).next(s=>{let a=Me();return t.forEach((c,u)=>{const h=s.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(U.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):V(nc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)}),{xs:a,Os:i}})}function mI(r,e){const t=z(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=nn),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function gI(r,e){const t=z(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return t.ai.getTargetData(n,e).next(s=>s?(i=s,w.resolve(i)):t.ai.allocateTargetId(n).next(a=>(i=new nt(e,a,"TargetPurposeListen",n.currentSequenceNumber),t.ai.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=t.Ss.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Ss=t.Ss.insert(n.targetId,n),t.Ds.set(e,n.targetId)),n})}async function Ta(r,e,t){const n=z(r),i=n.Ss.get(e),s=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",s,a=>n.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!Bt(a))throw a;V(nc,`Failed to update sequence numbers for target ${e}: ${a}`)}n.Ss=n.Ss.remove(e),n.Ds.delete(i.target)}function zl(r,e,t){const n=z(r);let i=U.min(),s=G();return n.persistence.runTransaction("Execute query","readwrite",a=>function(u,h,f){const m=z(u),I=m.Ds.get(f);return I!==void 0?w.resolve(m.Ss.get(I)):m.ai.getTargetData(h,f)}(n,a,Be(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,n.ai.getMatchingKeysForTargetId(a,c.targetId).next(u=>{s=u})}).next(()=>n.bs.getDocumentsMatchingQuery(a,e,t?i:U.min(),t?s:G())).next(c=>(_I(n,ry(e),c),{documents:c,Ns:s})))}function _I(r,e,t){let n=r.vs.get(e)||U.min();t.forEach((i,s)=>{s.readTime.compareTo(n)>0&&(n=s.readTime)}),r.vs.set(e,n)}class $l{constructor(){this.activeTargetIds=uy()}$s(e){this.activeTargetIds=this.activeTargetIds.add(e)}Us(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Qs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class wf{constructor(){this.So=new $l,this.Do={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.So.$s(e),this.Do[e]||"not-current"}updateQueryState(e,t,n){this.Do[e]=t}removeLocalQueryTarget(e){this.So.Us(e)}isLocalQueryTarget(e){return this.So.activeTargetIds.has(e)}clearQueryState(e){delete this.Do[e]}getAllActiveQueryTargets(){return this.So.activeTargetIds}isActiveQueryTarget(e){return this.So.activeTargetIds.has(e)}start(){return this.So=new $l,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yI{vo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gl="ConnectivityMonitor";class Kl{constructor(){this.Co=()=>this.Fo(),this.Mo=()=>this.xo(),this.Oo=[],this.No()}vo(e){this.Oo.push(e)}shutdown(){window.removeEventListener("online",this.Co),window.removeEventListener("offline",this.Mo)}No(){window.addEventListener("online",this.Co),window.addEventListener("offline",this.Mo)}Fo(){V(Gl,"Network connectivity changed: AVAILABLE");for(const e of this.Oo)e(0)}xo(){V(Gl,"Network connectivity changed: UNAVAILABLE");for(const e of this.Oo)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yi=null;function wa(){return Yi===null?Yi=function(){return 268435456+Math.round(2147483648*Math.random())}():Yi++,"0x"+Yi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go="RestConnection",II={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class EI{get Bo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Lo=t+"://"+e.host,this.ko=`projects/${n}/databases/${i}`,this.qo=this.databaseId.database===Es?`project_id=${n}`:`project_id=${n}&database_id=${i}`}Qo(e,t,n,i,s){const a=wa(),c=this.$o(e,t.toUriEncodedString());V(Go,`Sending RPC '${e}' ${a}:`,c,n);const u={"google-cloud-resource-prefix":this.ko,"x-goog-request-params":this.qo};return this.Uo(u,i,s),this.Ko(e,c,u,n).then(h=>(V(Go,`Received RPC '${e}' ${a}: `,h),h),h=>{throw qn(Go,`RPC '${e}' ${a} failed with error: `,h,"url: ",c,"request:",n),h})}Wo(e,t,n,i,s,a){return this.Qo(e,t,n,i,s)}Uo(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+rr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),n&&n.headers.forEach((i,s)=>e[s]=i)}$o(e,t){const n=II[e];return`${this.Lo}/v1/${t}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vI{constructor(e){this.Go=e.Go,this.zo=e.zo}jo(e){this.Ho=e}Jo(e){this.Yo=e}Zo(e){this.Xo=e}onMessage(e){this.e_=e}close(){this.zo()}send(e){this.Go(e)}t_(){this.Ho()}n_(){this.Yo()}r_(e){this.Xo(e)}i_(e){this.e_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we="WebChannelConnection";class TI extends EI{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ko(e,t,n,i){const s=wa();return new Promise((a,c)=>{const u=new $h;u.setWithCredentials(!0),u.listenOnce(Gh.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Xi.NO_ERROR:const f=u.getResponseJson();V(we,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),a(f);break;case Xi.TIMEOUT:V(we,`RPC '${e}' ${s} timed out`),c(new k(S.DEADLINE_EXCEEDED,"Request time out"));break;case Xi.HTTP_ERROR:const m=u.getStatus();if(V(we,`RPC '${e}' ${s} failed with status:`,m,"response text:",u.getResponseText()),m>0){let I=u.getResponseJson();Array.isArray(I)&&(I=I[0]);const P=I==null?void 0:I.error;if(P&&P.status&&P.message){const C=function(D){const $=D.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf($)>=0?$:S.UNKNOWN}(P.status);c(new k(C,P.message))}else c(new k(S.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new k(S.UNAVAILABLE,"Connection failed."));break;default:M(9055,{s_:e,streamId:s,o_:u.getLastErrorCode(),__:u.getLastError()})}}finally{V(we,`RPC '${e}' ${s} completed.`)}});const h=JSON.stringify(i);V(we,`RPC '${e}' ${s} sending request:`,i),u.send(t,"POST",h,n,15)})}a_(e,t,n){const i=wa(),s=[this.Lo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Hh(),c=Wh(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Uo(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;const f=s.join("");V(we,`Creating RPC '${e}' stream ${i}: ${f}`,u);const m=a.createWebChannel(f,u);let I=!1,P=!1;const C=new vI({Go:D=>{P?V(we,`Not sending because RPC '${e}' stream ${i} is closed:`,D):(I||(V(we,`Opening RPC '${e}' stream ${i} transport.`),m.open(),I=!0),V(we,`RPC '${e}' stream ${i} sending:`,D),m.send(D))},zo:()=>m.close()}),x=(D,$,j)=>{D.listen($,F=>{try{j(F)}catch(Q){setTimeout(()=>{throw Q},0)}})};return x(m,kr.EventType.OPEN,()=>{P||(V(we,`RPC '${e}' stream ${i} transport opened.`),C.t_())}),x(m,kr.EventType.CLOSE,()=>{P||(P=!0,V(we,`RPC '${e}' stream ${i} transport closed`),C.r_())}),x(m,kr.EventType.ERROR,D=>{P||(P=!0,qn(we,`RPC '${e}' stream ${i} transport errored. Name:`,D.name,"Message:",D.message),C.r_(new k(S.UNAVAILABLE,"The operation could not be completed")))}),x(m,kr.EventType.MESSAGE,D=>{var $;if(!P){const j=D.data[0];L(!!j,16349);const F=j,Q=(F==null?void 0:F.error)||(($=F[0])===null||$===void 0?void 0:$.error);if(Q){V(we,`RPC '${e}' stream ${i} received error:`,Q);const Z=Q.status;let K=function(y){const v=he[y];if(v!==void 0)return zd(v)}(Z),E=Q.message;K===void 0&&(K=S.INTERNAL,E="Unknown error status: "+Z+" with message "+Q.message),P=!0,C.r_(new k(K,E)),m.close()}else V(we,`RPC '${e}' stream ${i} received:`,j),C.i_(j)}}),x(c,Kh.STAT_EVENT,D=>{D.stat===ta.PROXY?V(we,`RPC '${e}' stream ${i} detected buffering proxy`):D.stat===ta.NOPROXY&&V(we,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.n_()},0),C}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wI(){return typeof window<"u"?window:null}function as(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(r){return new Ry(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(e,t,n=1e3,i=1.5,s=6e4){this.bi=e,this.timerId=t,this.u_=n,this.c_=i,this.l_=s,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(e){this.cancel();const t=Math.floor(this.h_+this.d_()),n=Math.max(0,Date.now()-this.T_),i=Math.max(0,t-n);i>0&&V("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.h_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,i,()=>(this.T_=Date.now(),e())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){this.P_!==null&&(this.P_.skipDelay(),this.P_=null)}cancel(){this.P_!==null&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wl="PersistentStream";class Rf{constructor(e,t,n,i,s,a,c,u){this.bi=e,this.R_=n,this.V_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.m_=0,this.f_=null,this.g_=null,this.stream=null,this.p_=0,this.y_=new Af(e,t)}w_(){return this.state===1||this.state===5||this.b_()}b_(){return this.state===2||this.state===3}start(){this.p_=0,this.state!==4?this.auth():this.S_()}async stop(){this.w_()&&await this.close(0)}D_(){this.state=0,this.y_.reset()}v_(){this.b_()&&this.f_===null&&(this.f_=this.bi.enqueueAfterDelay(this.R_,6e4,()=>this.C_()))}F_(e){this.M_(),this.stream.send(e)}async C_(){if(this.b_())return this.close(0)}M_(){this.f_&&(this.f_.cancel(),this.f_=null)}x_(){this.g_&&(this.g_.cancel(),this.g_=null)}async close(e,t){this.M_(),this.x_(),this.y_.cancel(),this.m_++,e!==4?this.y_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(Ve(t.toString()),Ve("Using maximum backoff delay to prevent overloading the backend."),this.y_.I_()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.O_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zo(t)}O_(){}auth(){this.state=1;const e=this.N_(this.m_),t=this.m_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.m_===t&&this.B_(n,i)},n=>{e(()=>{const i=new k(S.UNKNOWN,"Fetching auth token failed: "+n.message);return this.L_(i)})})}B_(e,t){const n=this.N_(this.m_);this.stream=this.k_(e,t),this.stream.jo(()=>{n(()=>this.listener.jo())}),this.stream.Jo(()=>{n(()=>(this.state=2,this.g_=this.bi.enqueueAfterDelay(this.V_,1e4,()=>(this.b_()&&(this.state=3),Promise.resolve())),this.listener.Jo()))}),this.stream.Zo(i=>{n(()=>this.L_(i))}),this.stream.onMessage(i=>{n(()=>++this.p_==1?this.q_(i):this.onNext(i))})}S_(){this.state=5,this.y_.E_(async()=>{this.state=0,this.start()})}L_(e){return V(Wl,`close with error: ${e}`),this.stream=null,this.close(4,e)}N_(e){return t=>{this.bi.enqueueAndForget(()=>this.m_===e?t():(V(Wl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class AI extends Rf{constructor(e,t,n,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,a),this.serializer=s}k_(e,t){return this.connection.a_("Listen",e,t)}q_(e){return this.onNext(e)}onNext(e){this.y_.reset();const t=Sy(this.serializer,e),n=function(s){if(!("targetChange"in s))return U.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?De(a.readTime):U.min()}(e);return this.listener.Q_(t,n)}U_(e){const t={};t.database=_a(this.serializer),t.addTarget=function(s,a){let c;const u=a.target;if(c=vs(u)?{documents:Jd(s,u)}:{query:Xd(s,u).gt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Kd(s,a.resumeToken);const h=ma(s,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(U.min())>0){c.readTime=Zn(s,a.snapshotVersion.toTimestamp());const h=ma(s,a.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const n=Vy(this.serializer,e);n&&(t.labels=n),this.F_(t)}K_(e){const t={};t.database=_a(this.serializer),t.removeTarget=e,this.F_(t)}}class RI extends Rf{constructor(e,t,n,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,a),this.serializer=s}get W_(){return this.p_>0}start(){this.lastStreamToken=void 0,super.start()}O_(){this.W_&&this.G_([])}k_(e,t){return this.connection.a_("Write",e,t)}q_(e){return L(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,L(!e.writeResults||e.writeResults.length===0,55816),this.listener.z_()}onNext(e){L(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.y_.reset();const t=Cy(e.writeResults,e.commitTime),n=De(e.commitTime);return this.listener.j_(n,t)}H_(){const e={};e.database=_a(this.serializer),this.F_(e)}G_(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>As(this.serializer,n))};this.F_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bI{}class PI extends bI{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.J_=!1}Y_(){if(this.J_)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.")}Qo(e,t,n,i){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Qo(e,ga(t,n),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new k(S.UNKNOWN,s.toString())})}Wo(e,t,n,i,s){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Wo(e,ga(t,n),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new k(S.UNKNOWN,a.toString())})}terminate(){this.J_=!0,this.connection.terminate()}}class SI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Z_=0,this.X_=null,this.ea=!0}ta(){this.Z_===0&&(this.na("Unknown"),this.X_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.X_=null,this.ra("Backend didn't respond within 10 seconds."),this.na("Offline"),Promise.resolve())))}ia(e){this.state==="Online"?this.na("Unknown"):(this.Z_++,this.Z_>=1&&(this.sa(),this.ra(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.na("Offline")))}set(e){this.sa(),this.Z_=0,e==="Online"&&(this.ea=!1),this.na(e)}na(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ra(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ea?(Ve(t),this.ea=!1):V("OnlineStateTracker",t)}sa(){this.X_!==null&&(this.X_.cancel(),this.X_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn="RemoteStore";class CI{constructor(e,t,n,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.oa=[],this._a=new Map,this.aa=new Set,this.ua=[],this.ca=s,this.ca.vo(a=>{n.enqueueAndForget(async()=>{yn(this)&&(V(pn,"Restarting streams for network reachability change."),await async function(u){const h=z(u);h.aa.add(4),await pi(h),h.la.set("Unknown"),h.aa.delete(4),await no(h)}(this))})}),this.la=new SI(n,i)}}async function no(r){if(yn(r))for(const e of r.ua)await e(!0)}async function pi(r){for(const e of r.ua)await e(!1)}function bf(r,e){const t=z(r);t._a.has(e.targetId)||(t._a.set(e.targetId,e),oc(t)?sc(t):or(t).b_()&&ic(t,e))}function rc(r,e){const t=z(r),n=or(t);t._a.delete(e),n.b_()&&Pf(t,e),t._a.size===0&&(n.b_()?n.v_():yn(t)&&t.la.set("Unknown"))}function ic(r,e){if(r.ha.Ke(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}or(r).U_(e)}function Pf(r,e){r.ha.Ke(e),or(r).K_(e)}function sc(r){r.ha=new vy({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),Rt:e=>r._a.get(e)||null,Pt:()=>r.datastore.serializer.databaseId}),or(r).start(),r.la.ta()}function oc(r){return yn(r)&&!or(r).w_()&&r._a.size>0}function yn(r){return z(r).aa.size===0}function Sf(r){r.ha=void 0}async function VI(r){r.la.set("Online")}async function DI(r){r._a.forEach((e,t)=>{ic(r,e)})}async function kI(r,e){Sf(r),oc(r)?(r.la.ia(e),sc(r)):r.la.set("Unknown")}async function NI(r,e,t){if(r.la.set("Online"),e instanceof Gd&&e.state===2&&e.cause)try{await async function(i,s){const a=s.cause;for(const c of s.targetIds)i._a.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i._a.delete(c),i.ha.removeTarget(c))}(r,e)}catch(n){V(pn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Cs(r,n)}else if(e instanceof os?r.ha.Xe(e):e instanceof $d?r.ha.ot(e):r.ha.nt(e),!t.isEqual(U.min()))try{const n=await Tf(r.localStore);t.compareTo(n)>=0&&await function(s,a){const c=s.ha.It(a);return c.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=s._a.get(h);f&&s._a.set(h,f.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,h)=>{const f=s._a.get(u);if(!f)return;s._a.set(u,f.withResumeToken(de.EMPTY_BYTE_STRING,f.snapshotVersion)),Pf(s,u);const m=new nt(f.target,u,h,f.sequenceNumber);ic(s,m)}),s.remoteSyncer.applyRemoteEvent(c)}(r,t)}catch(n){V(pn,"Failed to raise snapshot:",n),await Cs(r,n)}}async function Cs(r,e,t){if(!Bt(e))throw e;r.aa.add(1),await pi(r),r.la.set("Offline"),t||(t=()=>Tf(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{V(pn,"Retrying IndexedDB access"),await t(),r.aa.delete(1),await no(r)})}function Cf(r,e){return e().catch(t=>Cs(r,t,e))}async function mi(r){const e=z(r),t=Ft(e);let n=e.oa.length>0?e.oa[e.oa.length-1].batchId:nn;for(;xI(e);)try{const i=await mI(e.localStore,n);if(i===null){e.oa.length===0&&t.v_();break}n=i.batchId,OI(e,i)}catch(i){await Cs(e,i)}Vf(e)&&Df(e)}function xI(r){return yn(r)&&r.oa.length<10}function OI(r,e){r.oa.push(e);const t=Ft(r);t.b_()&&t.W_&&t.G_(e.mutations)}function Vf(r){return yn(r)&&!Ft(r).w_()&&r.oa.length>0}function Df(r){Ft(r).start()}async function MI(r){Ft(r).H_()}async function LI(r){const e=Ft(r);for(const t of r.oa)e.G_(t.mutations)}async function FI(r,e,t){const n=r.oa.shift(),i=Ka.from(n,e,t);await Cf(r,()=>r.remoteSyncer.applySuccessfulWrite(i)),await mi(r)}async function UI(r,e){e&&Ft(r).W_&&await async function(n,i){if(function(a){return Iy(a)&&a!==S.ABORTED}(i.code)){const s=n.oa.shift();Ft(n).D_(),await Cf(n,()=>n.remoteSyncer.rejectFailedWrite(s.batchId,i)),await mi(n)}}(r,e),Vf(r)&&Df(r)}async function Hl(r,e){const t=z(r);t.asyncQueue.verifyOperationInProgress(),V(pn,"RemoteStore received new credentials");const n=yn(t);t.aa.add(3),await pi(t),n&&t.la.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.aa.delete(3),await no(t)}async function BI(r,e){const t=z(r);e?(t.aa.delete(2),await no(t)):e||(t.aa.add(2),await pi(t),t.la.set("Unknown"))}function or(r){return r.Pa||(r.Pa=function(t,n,i){const s=z(t);return s.Y_(),new AI(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{jo:VI.bind(null,r),Jo:DI.bind(null,r),Zo:kI.bind(null,r),Q_:NI.bind(null,r)}),r.ua.push(async e=>{e?(r.Pa.D_(),oc(r)?sc(r):r.la.set("Unknown")):(await r.Pa.stop(),Sf(r))})),r.Pa}function Ft(r){return r.Ta||(r.Ta=function(t,n,i){const s=z(t);return s.Y_(),new RI(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{jo:()=>Promise.resolve(),Jo:MI.bind(null,r),Zo:UI.bind(null,r),z_:LI.bind(null,r),j_:FI.bind(null,r)}),r.ua.push(async e=>{e?(r.Ta.D_(),await mi(r)):(await r.Ta.stop(),r.oa.length>0&&(V(pn,`Stopping write stream with ${r.oa.length} pending writes`),r.oa=[]))})),r.Ta}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e,t,n,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=s,this.deferred=new Qe,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,s){const a=Date.now()+n,c=new ac(e,t,a,i,s);return c.start(n),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function cc(r,e){if(Ve("AsyncQueue",`${e}: ${r}`),Bt(r))return new k(S.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{static emptySet(e){return new Mn(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||O.comparator(t.key,n.key):(t,n)=>O.comparator(t.key,n.key),this.keyedMap=Nr(),this.sortedSet=new se(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Mn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new Mn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(){this.Ia=new se(O.comparator)}track(e){const t=e.doc.key,n=this.Ia.get(t);n?e.type!==0&&n.type===3?this.Ia=this.Ia.insert(t,e):e.type===3&&n.type!==1?this.Ia=this.Ia.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.Ia=this.Ia.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.Ia=this.Ia.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.Ia=this.Ia.remove(t):e.type===1&&n.type===2?this.Ia=this.Ia.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.Ia=this.Ia.insert(t,{type:2,doc:e.doc}):M(63341,{Vt:e,Ea:n}):this.Ia=this.Ia.insert(t,e)}da(){const e=[];return this.Ia.inorderTraversal((t,n)=>{e.push(n)}),e}}class er{constructor(e,t,n,i,s,a,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,i,s){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new er(e,t,Mn.emptySet(t),a,n,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Hs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qI{constructor(){this.Aa=void 0,this.Ra=[]}Va(){return this.Ra.some(e=>e.ma())}}class jI{constructor(){this.queries=Yl(),this.onlineState="Unknown",this.fa=new Set}terminate(){(function(t,n){const i=z(t),s=i.queries;i.queries=Yl(),s.forEach((a,c)=>{for(const u of c.Ra)u.onError(n)})})(this,new k(S.ABORTED,"Firestore shutting down"))}}function Yl(){return new dt(r=>Vd(r),Hs)}async function kf(r,e){const t=z(r);let n=3;const i=e.query;let s=t.queries.get(i);s?!s.Va()&&e.ma()&&(n=2):(s=new qI,n=e.ma()?0:1);try{switch(n){case 0:s.Aa=await t.onListen(i,!0);break;case 1:s.Aa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const c=cc(a,`Initialization of query '${Dn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.Ra.push(e),e.ga(t.onlineState),s.Aa&&e.pa(s.Aa)&&uc(t)}async function Nf(r,e){const t=z(r),n=e.query;let i=3;const s=t.queries.get(n);if(s){const a=s.Ra.indexOf(e);a>=0&&(s.Ra.splice(a,1),s.Ra.length===0?i=e.ma()?0:1:!s.Va()&&e.ma()&&(i=2))}switch(i){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function zI(r,e){const t=z(r);let n=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const c of a.Ra)c.pa(i)&&(n=!0);a.Aa=i}}n&&uc(t)}function $I(r,e,t){const n=z(r),i=n.queries.get(e);if(i)for(const s of i.Ra)s.onError(t);n.queries.delete(e)}function uc(r){r.fa.forEach(e=>{e.next()})}var Aa,Jl;(Jl=Aa||(Aa={})).ya="default",Jl.Cache="cache";class xf{constructor(e,t,n){this.query=e,this.wa=t,this.ba=!1,this.Sa=null,this.onlineState="Unknown",this.options=n||{}}pa(e){if(!this.options.includeMetadataChanges){const n=[];for(const i of e.docChanges)i.type!==3&&n.push(i);e=new er(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ba?this.Da(e)&&(this.wa.next(e),t=!0):this.va(e,this.onlineState)&&(this.Ca(e),t=!0),this.Sa=e,t}onError(e){this.wa.error(e)}ga(e){this.onlineState=e;let t=!1;return this.Sa&&!this.ba&&this.va(this.Sa,e)&&(this.Ca(this.Sa),t=!0),t}va(e,t){if(!e.fromCache||!this.ma())return!0;const n=t!=="Offline";return(!this.options.Fa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Da(e){if(e.docChanges.length>0)return!0;const t=this.Sa&&this.Sa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Ca(e){e=er.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ba=!0,this.wa.next(e)}ma(){return this.options.source!==Aa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Of{constructor(e){this.key=e}}class Mf{constructor(e){this.key=e}}class GI{constructor(e,t){this.query=e,this.qa=t,this.Qa=null,this.hasCachedResults=!1,this.current=!1,this.$a=G(),this.mutatedKeys=G(),this.Ua=Dd(e),this.Ka=new Mn(this.Ua)}get Wa(){return this.qa}Ga(e,t){const n=t?t.za:new Ql,i=t?t.Ka:this.Ka;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,m)=>{const I=i.get(f),P=hi(this.query,m)?m:null,C=!!I&&this.mutatedKeys.has(I.key),x=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let D=!1;I&&P?I.data.isEqual(P.data)?C!==x&&(n.track({type:3,doc:P}),D=!0):this.ja(I,P)||(n.track({type:2,doc:P}),D=!0,(u&&this.Ua(P,u)>0||h&&this.Ua(P,h)<0)&&(c=!0)):!I&&P?(n.track({type:0,doc:P}),D=!0):I&&!P&&(n.track({type:1,doc:I}),D=!0,(u||h)&&(c=!0)),D&&(P?(a=a.add(P),s=x?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),n.track({type:1,doc:f})}return{Ka:a,za:n,ys:c,mutatedKeys:s}}ja(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){const s=this.Ka;this.Ka=e.Ka,this.mutatedKeys=e.mutatedKeys;const a=e.za.da();a.sort((f,m)=>function(P,C){const x=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Vt:D})}};return x(P)-x(C)}(f.type,m.type)||this.Ua(f.doc,m.doc)),this.Ha(n),i=i!=null&&i;const c=t&&!i?this.Ja():[],u=this.$a.size===0&&this.current&&!i?1:0,h=u!==this.Qa;return this.Qa=u,a.length!==0||h?{snapshot:new er(this.query,e.Ka,s,a,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),Ya:c}:{Ya:c}}ga(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ka:this.Ka,za:new Ql,mutatedKeys:this.mutatedKeys,ys:!1},!1)):{Ya:[]}}Za(e){return!this.qa.has(e)&&!!this.Ka.has(e)&&!this.Ka.get(e).hasLocalMutations}Ha(e){e&&(e.addedDocuments.forEach(t=>this.qa=this.qa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.qa=this.qa.delete(t)),this.current=e.current)}Ja(){if(!this.current)return[];const e=this.$a;this.$a=G(),this.Ka.forEach(n=>{this.Za(n.key)&&(this.$a=this.$a.add(n.key))});const t=[];return e.forEach(n=>{this.$a.has(n)||t.push(new Mf(n))}),this.$a.forEach(n=>{e.has(n)||t.push(new Of(n))}),t}Xa(e){this.qa=e.Ns,this.$a=G();const t=this.Ga(e.documents);return this.applyChanges(t,!0)}eu(){return er.fromInitialDocuments(this.query,this.Ka,this.mutatedKeys,this.Qa===0,this.hasCachedResults)}}const lc="SyncEngine";class KI{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class WI{constructor(e){this.key=e,this.tu=!1}}class HI{constructor(e,t,n,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.nu={},this.ru=new dt(c=>Vd(c),Hs),this.iu=new Map,this.su=new Set,this.ou=new se(O.comparator),this._u=new Map,this.au=new Xa,this.uu={},this.cu=new Map,this.lu=fn.ir(),this.onlineState="Unknown",this.hu=void 0}get isPrimaryClient(){return this.hu===!0}}async function QI(r,e,t=!0){const n=jf(r);let i;const s=n.ru.get(e);return s?(n.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.eu()):i=await Lf(n,e,t,!0),i}async function YI(r,e){const t=jf(r);await Lf(t,e,!0,!1)}async function Lf(r,e,t,n){const i=await gI(r.localStore,Be(e)),s=i.targetId,a=r.sharedClientState.addLocalQueryTarget(s,t);let c;return n&&(c=await JI(r,e,s,a==="current",i.resumeToken)),r.isPrimaryClient&&t&&bf(r.remoteStore,i),c}async function JI(r,e,t,n,i){r.Pu=(m,I,P)=>async function(x,D,$,j){let F=D.view.Ga($);F.ys&&(F=await zl(x.localStore,D.query,!1).then(({documents:E})=>D.view.Ga(E,F)));const Q=j&&j.targetChanges.get(D.targetId),Z=j&&j.targetMismatches.get(D.targetId)!=null,K=D.view.applyChanges(F,x.isPrimaryClient,Q,Z);return Zl(x,D.targetId,K.Ya),K.snapshot}(r,m,I,P);const s=await zl(r.localStore,e,!0),a=new GI(e,s.Ns),c=a.Ga(s.documents),u=fi.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",i),h=a.applyChanges(c,r.isPrimaryClient,u);Zl(r,t,h.Ya);const f=new KI(e,t,a);return r.ru.set(e,f),r.iu.has(t)?r.iu.get(t).push(e):r.iu.set(t,[e]),h.snapshot}async function XI(r,e,t){const n=z(r),i=n.ru.get(e),s=n.iu.get(i.targetId);if(s.length>1)return n.iu.set(i.targetId,s.filter(a=>!Hs(a,e))),void n.ru.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await Ta(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),t&&rc(n.remoteStore,i.targetId),Ra(n,i.targetId)}).catch(_n)):(Ra(n,i.targetId),await Ta(n.localStore,i.targetId,!0))}async function ZI(r,e){const t=z(r),n=t.ru.get(e),i=t.iu.get(n.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),rc(t.remoteStore,n.targetId))}async function eE(r,e,t){const n=zf(r);try{const i=await function(a,c){const u=z(a),h=ae.now(),f=c.reduce((P,C)=>P.add(C.key),G());let m,I;return u.persistence.runTransaction("Locally write mutations","readwrite",P=>{let C=Me(),x=G();return u.Cs.getEntries(P,f).next(D=>{C=D,C.forEach(($,j)=>{j.isValidDocument()||(x=x.add($))})}).next(()=>u.localDocuments.getOverlayedDocuments(P,C)).next(D=>{m=D;const $=[];for(const j of c){const F=_y(j,m.get(j.key).overlayedDocument);F!=null&&$.push(new ft(j.key,F,vd(F.value.mapValue),fe.exists(!0)))}return u.mutationQueue.addMutationBatch(P,h,$,c)}).next(D=>{I=D;const $=D.applyToLocalDocumentSet(m,x);return u.documentOverlayCache.saveOverlays(P,D.batchId,$)})}).then(()=>({batchId:I.batchId,changes:Nd(m)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),function(a,c,u){let h=a.uu[a.currentUser.toKey()];h||(h=new se(q)),h=h.insert(c,u),a.uu[a.currentUser.toKey()]=h}(n,i.batchId,t),await gi(n,i.changes),await mi(n.remoteStore)}catch(i){const s=cc(i,"Failed to persist write");t.reject(s)}}async function Ff(r,e){const t=z(r);try{const n=await fI(t.localStore,e);e.targetChanges.forEach((i,s)=>{const a=t._u.get(s);a&&(L(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.tu=!0:i.modifiedDocuments.size>0?L(a.tu,14607):i.removedDocuments.size>0&&(L(a.tu,42227),a.tu=!1))}),await gi(t,n,e)}catch(n){await _n(n)}}function Xl(r,e,t){const n=z(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const i=[];n.ru.forEach((s,a)=>{const c=a.view.ga(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){const u=z(a);u.onlineState=c;let h=!1;u.queries.forEach((f,m)=>{for(const I of m.Ra)I.ga(c)&&(h=!0)}),h&&uc(u)}(n.eventManager,e),i.length&&n.nu.Q_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function tE(r,e,t){const n=z(r);n.sharedClientState.updateQueryState(e,"rejected",t);const i=n._u.get(e),s=i&&i.key;if(s){let a=new se(O.comparator);a=a.insert(s,ue.newNoDocument(s,U.min()));const c=G().add(s),u=new Js(U.min(),new Map,new se(q),a,c);await Ff(n,u),n.ou=n.ou.remove(s),n._u.delete(e),hc(n)}else await Ta(n.localStore,e,!1).then(()=>Ra(n,e,t)).catch(_n)}async function nE(r,e){const t=z(r),n=e.batch.batchId;try{const i=await dI(t.localStore,e);Bf(t,n,null),Uf(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await gi(t,i)}catch(i){await _n(i)}}async function rE(r,e,t){const n=z(r);try{const i=await function(a,c){const u=z(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next(m=>(L(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(n.localStore,e);Bf(n,e,t),Uf(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await gi(n,i)}catch(i){await _n(i)}}function Uf(r,e){(r.cu.get(e)||[]).forEach(t=>{t.resolve()}),r.cu.delete(e)}function Bf(r,e,t){const n=z(r);let i=n.uu[n.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),n.uu[n.currentUser.toKey()]=i}}function Ra(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.iu.get(e))r.ru.delete(n),t&&r.nu.Tu(n,t);r.iu.delete(e),r.isPrimaryClient&&r.au.Ur(e).forEach(n=>{r.au.containsKey(n)||qf(r,n)})}function qf(r,e){r.su.delete(e.path.canonicalString());const t=r.ou.get(e);t!==null&&(rc(r.remoteStore,t),r.ou=r.ou.remove(e),r._u.delete(t),hc(r))}function Zl(r,e,t){for(const n of t)n instanceof Of?(r.au.addReference(n.key,e),iE(r,n)):n instanceof Mf?(V(lc,"Document no longer in limbo: "+n.key),r.au.removeReference(n.key,e),r.au.containsKey(n.key)||qf(r,n.key)):M(19791,{Iu:n})}function iE(r,e){const t=e.key,n=t.path.canonicalString();r.ou.get(t)||r.su.has(n)||(V(lc,"New document in limbo: "+t),r.su.add(n),hc(r))}function hc(r){for(;r.su.size>0&&r.ou.size<r.maxConcurrentLimboResolutions;){const e=r.su.values().next().value;r.su.delete(e);const t=new O(X.fromString(e)),n=r.lu.next();r._u.set(n,new WI(t)),r.ou=r.ou.insert(t,n),bf(r.remoteStore,new nt(Be(Ws(t.path)),n,"TargetPurposeLimboResolution",Ue.le))}}async function gi(r,e,t){const n=z(r),i=[],s=[],a=[];n.ru.isEmpty()||(n.ru.forEach((c,u)=>{a.push(n.Pu(u,e,t).then(h=>{var f;if((h||t)&&n.isPrimaryClient){const m=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){i.push(h);const m=tc.Ps(u.targetId,h);s.push(m)}}))}),await Promise.all(a),n.nu.Q_(i),await async function(u,h){const f=z(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>w.forEach(h,I=>w.forEach(I.ls,P=>f.persistence.referenceDelegate.addReference(m,I.targetId,P)).next(()=>w.forEach(I.hs,P=>f.persistence.referenceDelegate.removeReference(m,I.targetId,P)))))}catch(m){if(!Bt(m))throw m;V(nc,"Failed to update sequence numbers: "+m)}for(const m of h){const I=m.targetId;if(!m.fromCache){const P=f.Ss.get(I),C=P.snapshotVersion,x=P.withLastLimboFreeSnapshotVersion(C);f.Ss=f.Ss.insert(I,x)}}}(n.localStore,s))}async function sE(r,e){const t=z(r);if(!t.currentUser.isEqual(e)){V(lc,"User change. New user:",e.toKey());const n=await vf(t.localStore,e);t.currentUser=e,function(s,a){s.cu.forEach(c=>{c.forEach(u=>{u.reject(new k(S.CANCELLED,a))})}),s.cu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await gi(t,n.Ms)}}function oE(r,e){const t=z(r),n=t._u.get(e);if(n&&n.tu)return G().add(n.key);{let i=G();const s=t.iu.get(e);if(!s)return i;for(const a of s){const c=t.ru.get(a);i=i.unionWith(c.view.Wa)}return i}}function jf(r){const e=z(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ff.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=oE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=tE.bind(null,e),e.nu.Q_=zI.bind(null,e.eventManager),e.nu.Tu=$I.bind(null,e.eventManager),e}function zf(r){const e=z(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=nE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=rE.bind(null,e),e}class ii{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=to(e.databaseInfo.databaseId),this.sharedClientState=this.Au(e),this.persistence=this.Ru(e),await this.persistence.start(),this.localStore=this.Vu(e),this.gcScheduler=this.mu(e,this.localStore),this.indexBackfillerScheduler=this.fu(e,this.localStore)}mu(e,t){return null}fu(e,t){return null}Vu(e){return Ef(this.persistence,new If,e.initialUser,this.serializer)}Ru(e){return new Za(eo.Ei,this.serializer)}Au(e){return new wf}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ii.provider={build:()=>new ii};class aE extends ii{constructor(e){super(),this.cacheSizeBytes=e}mu(e,t){L(this.persistence.referenceDelegate instanceof Ss,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new pf(n,e.asyncQueue,t)}Ru(e){const t=this.cacheSizeBytes!==void 0?Ae.withCacheSize(this.cacheSizeBytes):Ae.DEFAULT;return new Za(n=>Ss.Ei(n,t),this.serializer)}}class cE extends ii{constructor(e,t,n){super(),this.gu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.gu.initialize(this,e),await zf(this.gu.syncEngine),await mi(this.gu.remoteStore),await this.persistence.Ki(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}Vu(e){return Ef(this.persistence,new If,e.initialUser,this.serializer)}mu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new pf(n,e.asyncQueue,t)}fu(e,t){const n=new m_(t,this.persistence);return new p_(e.asyncQueue,n)}Ru(e){const t=cI(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Ae.withCacheSize(this.cacheSizeBytes):Ae.DEFAULT;return new ec(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,wI(),as(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Au(e){return new wf}}class Vs{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Xl(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=sE.bind(null,this.syncEngine),await BI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new jI}()}createDatastore(e){const t=to(e.databaseInfo.databaseId),n=function(s){return new TI(s)}(e.databaseInfo);return function(s,a,c,u){return new PI(s,a,c,u)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,i,s,a,c){return new CI(n,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Xl(this.syncEngine,t,0),function(){return Kl.C()?new Kl:new yI}())}createSyncEngine(e,t){return function(i,s,a,c,u,h,f){const m=new HI(i,s,a,c,u,h);return f&&(m.hu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=z(i);V(pn,"RemoteStore shutting down."),s.aa.add(5),await pi(s),s.ca.shutdown(),s.la.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Vs.provider={build:()=>new Vs};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.pu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.pu(this.observer.error,e):Ve("Uncaught Error in snapshot listener:",e.toString()))}yu(){this.muted=!0}pu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut="FirestoreClient";class uE{constructor(e,t,n,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=Ce.UNAUTHENTICATED,this.clientId=Jh.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async a=>{V(Ut,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(V(Ut,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Qe;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=cc(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Ko(r,e){r.asyncQueue.verifyOperationInProgress(),V(Ut,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async i=>{n.isEqual(i)||(await vf(e.localStore,i),n=i)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function eh(r,e){r.asyncQueue.verifyOperationInProgress();const t=await lE(r);V(Ut,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>Hl(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,i)=>Hl(e.remoteStore,i)),r._onlineComponents=e}async function lE(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){V(Ut,"Using user provided OfflineComponentProvider");try{await Ko(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===S.FAILED_PRECONDITION||i.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;qn("Error using user provided cache. Falling back to memory cache: "+t),await Ko(r,new ii)}}else V(Ut,"Using default OfflineComponentProvider"),await Ko(r,new aE(void 0));return r._offlineComponents}async function Gf(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(V(Ut,"Using user provided OnlineComponentProvider"),await eh(r,r._uninitializedComponentsProvider._online)):(V(Ut,"Using default OnlineComponentProvider"),await eh(r,new Vs))),r._onlineComponents}function hE(r){return Gf(r).then(e=>e.syncEngine)}async function Kf(r){const e=await Gf(r),t=e.eventManager;return t.onListen=QI.bind(null,e.syncEngine),t.onUnlisten=XI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=YI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=ZI.bind(null,e.syncEngine),t}function dE(r,e,t={}){const n=new Qe;return r.asyncQueue.enqueueAndForget(async()=>function(s,a,c,u,h){const f=new $f({next:I=>{f.yu(),a.enqueueAndForget(()=>Nf(s,m));const P=I.docs.has(c);!P&&I.fromCache?h.reject(new k(S.UNAVAILABLE,"Failed to get document because the client is offline.")):P&&I.fromCache&&u&&u.source==="server"?h.reject(new k(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(I)},error:I=>h.reject(I)}),m=new xf(Ws(c.path),f,{includeMetadataChanges:!0,Fa:!0});return kf(s,m)}(await Kf(r),r.asyncQueue,e,t,n)),n.promise}function fE(r,e,t={}){const n=new Qe;return r.asyncQueue.enqueueAndForget(async()=>function(s,a,c,u,h){const f=new $f({next:I=>{f.yu(),a.enqueueAndForget(()=>Nf(s,m)),I.fromCache&&u.source==="server"?h.reject(new k(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(I)},error:I=>h.reject(I)}),m=new xf(c,f,{includeMetadataChanges:!0,Fa:!0});return kf(s,m)}(await Kf(r),r.asyncQueue,e,t,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wf(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hf(r,e,t){if(!t)throw new k(S.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function pE(r,e,t,n){if(e===!0&&n===!0)throw new k(S.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function nh(r){if(!O.isDocumentKey(r))throw new k(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function rh(r){if(O.isDocumentKey(r))throw new k(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function ro(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":M(12329,{type:typeof r})}function qe(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new k(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ro(r);throw new k(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mE="firestore.googleapis.com",ih=!0;class sh{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new k(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=mE,this.ssl=ih}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:ih;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=uf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ff)throw new k(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}pE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Wf((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class dc{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new k(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new r_;switch(n.type){case"firstParty":return new o_(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new k(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=th.get(t);n&&(V("ComponentProvider","Removing Datastore"),th.delete(t),n.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new In(this.firestore,e,this._query)}}class ke{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ot(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ke(this.firestore,e,this._key)}}class Ot extends In{constructor(e,t,n){super(e,t,Ws(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ke(this.firestore,null,new O(e))}withConverter(e){return new Ot(this.firestore,e,this._path)}}function WT(r,e,...t){if(r=le(r),Hf("collection","path",e),r instanceof dc){const n=X.fromString(e,...t);return rh(n),new Ot(r,null,n)}{if(!(r instanceof ke||r instanceof Ot))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return rh(n),new Ot(r.firestore,null,n)}}function gE(r,e,...t){if(r=le(r),arguments.length===1&&(e=Jh.newId()),Hf("doc","path",e),r instanceof dc){const n=X.fromString(e,...t);return nh(n),new ke(r,null,new O(n))}{if(!(r instanceof ke||r instanceof Ot))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return nh(n),new ke(r.firestore,r instanceof Ot?r.converter:null,new O(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oh="AsyncQueue";class ah{constructor(e=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new Af(this,"async_queue_retry"),this.ju=()=>{const n=as();n&&V(oh,"Visibility state changed to "+n.visibilityState),this.y_.A_()},this.Hu=e;const t=as();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Ju(),this.Yu(e)}enterRestrictedMode(e){if(!this.$u){this.$u=!0,this.Gu=e||!1;const t=as();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.ju)}}enqueue(e){if(this.Ju(),this.$u)return new Promise(()=>{});const t=new Qe;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qu.push(e),this.Zu()))}async Zu(){if(this.Qu.length!==0){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(e){if(!Bt(e))throw e;V(oh,"Operation failed with retryable error: "+e)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(e){const t=this.Hu.then(()=>(this.Wu=!0,e().catch(n=>{throw this.Ku=n,this.Wu=!1,Ve("INTERNAL UNHANDLED ERROR: ",ch(n)),n}).then(n=>(this.Wu=!1,n))));return this.Hu=t,t}enqueueAfterDelay(e,t,n){this.Ju(),this.zu.indexOf(e)>-1&&(t=0);const i=ac.createAndSchedule(this,e,t,n,s=>this.Xu(s));return this.Uu.push(i),i}Ju(){this.Ku&&M(47125,{ec:ch(this.Ku)})}verifyOperationInProgress(){}async tc(){let e;do e=this.Hu,await e;while(e!==this.Hu)}nc(e){for(const t of this.Uu)if(t.timerId===e)return!0;return!1}rc(e){return this.tc().then(()=>{this.Uu.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.Uu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.tc()})}sc(e){this.zu.push(e)}Xu(e){const t=this.Uu.indexOf(e);this.Uu.splice(t,1)}}function ch(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HT=-1;class pt extends dc{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new ah,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ah(e),this._firestoreClient=void 0,await e}}}function QT(r,e,t){t||(t=Es);const n=ka(r,"firestore");if(n.isInitialized(t)){const i=n.getImmediate({identifier:t}),s=n.getOptions(t);if(on(s,e))return i;throw new k(S.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new k(S.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ff)throw new k(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:e,instanceIdentifier:t})}function io(r){if(r._terminated)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Qf(r),r._firestoreClient}function Qf(r){var e,t,n;const i=r._freezeSettings(),s=function(c,u,h,f){return new $_(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Wf(f.experimentalLongPollingOptions),f.useFetchStreams)}(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new uE(r._authCredentials,r._appCheckCredentials,r._queue,s,r._componentsProvider&&function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(r._componentsProvider))}function YT(r,e){qn("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return _E(r,Vs.provider,{build:n=>new cE(n,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}function _E(r,e,t){if((r=qe(r,pt))._firestoreClient||r._terminated)throw new k(S.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new k(S.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},Qf(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e){this._byteString=e}static fromBase64String(e){try{return new tr(de.fromBase64String(e))}catch(t){throw new k(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new tr(de.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new k(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new oe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new k(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new k(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return q(this._lat,e._lat)||q(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,i){if(n.length!==i.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yE=/^__.*__$/;class IE{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new ft(e,this.data,this.fieldMask,t,this.fieldTransforms):new sr(e,this.data,t,this.fieldTransforms)}}class Yf{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new ft(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Jf(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{oc:r})}}class gc{constructor(e,t,n,i,s,a){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,s===void 0&&this._c(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get oc(){return this.settings.oc}ac(e){return new gc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}uc(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ac({path:n,cc:!1});return i.lc(e),i}hc(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.ac({path:n,cc:!1});return i._c(),i}Pc(e){return this.ac({path:void 0,cc:!0})}Tc(e){return Ds(e,this.settings.methodName,this.settings.Ic||!1,this.path,this.settings.Ec)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}_c(){if(this.path)for(let e=0;e<this.path.length;e++)this.lc(this.path.get(e))}lc(e){if(e.length===0)throw this.Tc("Document fields must not be empty");if(Jf(this.oc)&&yE.test(e))throw this.Tc('Document fields cannot begin and end with "__"')}}class EE{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||to(e)}dc(e,t,n,i=!1){return new gc({oc:e,methodName:t,Ec:n,path:oe.emptyPath(),cc:!1,Ic:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function yi(r){const e=r._freezeSettings(),t=to(r._databaseId);return new EE(r._databaseId,!!e.ignoreUndefinedProperties,t)}function _c(r,e,t,n,i,s={}){const a=r.dc(s.merge||s.mergeFields?2:0,e,t,i);yc("Data must be an object, but it was:",a,n);const c=ep(n,a);let u,h;if(s.merge)u=new Ne(a.fieldMask),h=a.fieldTransforms;else if(s.mergeFields){const f=[];for(const m of s.mergeFields){const I=ba(e,m,t);if(!a.contains(I))throw new k(S.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);np(f,I)||f.push(I)}u=new Ne(f),h=a.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=a.fieldTransforms;return new IE(new Re(c),u,h)}class so extends fc{_toFieldTransform(e){if(e.oc!==2)throw e.oc===1?e.Tc(`${this._methodName}() can only appear at the top level of your update data`):e.Tc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof so}}function Xf(r,e,t,n){const i=r.dc(1,e,t);yc("Data must be an object, but it was:",i,n);const s=[],a=Re.empty();qt(n,(u,h)=>{const f=Ic(e,u,t);h=le(h);const m=i.hc(f);if(h instanceof so)s.push(f);else{const I=Ii(h,m);I!=null&&(s.push(f),a.set(f,I))}});const c=new Ne(s);return new Yf(a,c,i.fieldTransforms)}function Zf(r,e,t,n,i,s){const a=r.dc(1,e,t),c=[ba(e,n,t)],u=[i];if(s.length%2!=0)throw new k(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let I=0;I<s.length;I+=2)c.push(ba(e,s[I])),u.push(s[I+1]);const h=[],f=Re.empty();for(let I=c.length-1;I>=0;--I)if(!np(h,c[I])){const P=c[I];let C=u[I];C=le(C);const x=a.hc(P);if(C instanceof so)h.push(P);else{const D=Ii(C,x);D!=null&&(h.push(P),f.set(P,D))}}const m=new Ne(h);return new Yf(f,m,a.fieldTransforms)}function vE(r,e,t,n=!1){return Ii(t,r.dc(n?4:3,e))}function Ii(r,e){if(tp(r=le(r)))return yc("Unsupported field value:",e,r),ep(r,e);if(r instanceof fc)return function(n,i){if(!Jf(i.oc))throw i.Tc(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Tc(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.cc&&e.oc!==4)throw e.Tc("Nested arrays are not supported");return function(n,i){const s=[];let a=0;for(const c of n){let u=Ii(c,i.Pc(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}}(r,e)}return function(n,i){if((n=le(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return ly(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=ae.fromDate(n);return{timestampValue:Zn(i.serializer,s)}}if(n instanceof ae){const s=new ae(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Zn(i.serializer,s)}}if(n instanceof pc)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof tr)return{bytesValue:Kd(i.serializer,n._byteString)};if(n instanceof ke){const s=i.databaseId,a=n.firestore._databaseId;if(!a.isEqual(s))throw i.Tc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Qa(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof mc)return function(a,c){return{mapValue:{fields:{[qa]:{stringValue:ja},[Wn]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw c.Tc("VectorValues must only contain numeric values.");return $a(c.serializer,h)})}}}}}}(n,i);throw i.Tc(`Unsupported field value: ${ro(n)}`)}(r,e)}function ep(r,e){const t={};return dd(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):qt(r,(n,i)=>{const s=Ii(i,e.uc(n));s!=null&&(t[n]=s)}),{mapValue:{fields:t}}}function tp(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof ae||r instanceof pc||r instanceof tr||r instanceof ke||r instanceof fc||r instanceof mc)}function yc(r,e,t){if(!tp(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const n=ro(t);throw n==="an object"?e.Tc(r+" a custom object"):e.Tc(r+" "+n)}}function ba(r,e,t){if((e=le(e))instanceof _i)return e._internalPath;if(typeof e=="string")return Ic(r,e);throw Ds("Field path arguments must be of type string or ",r,!1,void 0,t)}const TE=new RegExp("[~\\*/\\[\\]]");function Ic(r,e,t){if(e.search(TE)>=0)throw Ds(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new _i(...e.split("."))._internalPath}catch{throw Ds(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Ds(r,e,t,n,i){const s=n&&!n.isEmpty(),a=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${n}`),a&&(u+=` in document ${i}`),u+=")"),new k(S.INVALID_ARGUMENT,c+r+u)}function np(r,e){return r.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(e,t,n,i,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new wE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(oo("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class wE extends rp{data(){return super.data()}}function oo(r,e){return typeof e=="string"?Ic(r,e):e instanceof _i?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AE(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new k(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ec{}class ip extends Ec{}function JT(r,e,...t){let n=[];e instanceof Ec&&n.push(e),n=n.concat(t),function(s){const a=s.filter(u=>u instanceof vc).length,c=s.filter(u=>u instanceof ao).length;if(a>1||a>0&&c>0)throw new k(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const i of n)r=i._apply(r);return r}class ao extends ip{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new ao(e,t,n)}_apply(e){const t=this._parse(e);return sp(e._query,t),new In(e.firestore,e.converter,fa(e._query,t))}_parse(e){const t=yi(e.firestore);return function(s,a,c,u,h,f,m){let I;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new k(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){lh(m,f);const C=[];for(const x of m)C.push(uh(u,s,x));I={arrayValue:{values:C}}}else I=uh(u,s,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||lh(m,f),I=vE(c,a,m,f==="in"||f==="not-in");return H.create(h,f,I)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function XT(r,e,t){const n=e,i=oo("where",r);return ao._create(i,n,t)}class vc extends Ec{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new vc(e,t)}_parse(e){const t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:ee.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i;const c=s.getFlattenedFilters();for(const u of c)sp(a,u),a=fa(a,u)}(e._query,t),new In(e.firestore,e.converter,fa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Tc extends ip{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Tc(e,t)}_apply(e){const t=function(i,s,a){if(i.startAt!==null)throw new k(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new k(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ti(s,a)}(e._query,this._field,this._direction);return new In(e.firestore,e.converter,function(i,s){const a=i.explicitOrderBy.concat([s]);return new ir(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function ZT(r,e="asc"){const t=e,n=oo("orderBy",r);return Tc._create(n,t)}function uh(r,e,t){if(typeof(t=le(t))=="string"){if(t==="")throw new k(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Cd(e)&&t.indexOf("/")!==-1)throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(X.fromString(t));if(!O.isDocumentKey(n))throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Zr(r,new O(n))}if(t instanceof ke)return Zr(r,t._key);throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ro(t)}.`)}function lh(r,e){if(!Array.isArray(r)||r.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function sp(r,e){const t=function(i,s){for(const a of i)for(const c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(r.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new k(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new k(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class RE{convertValue(e,t="none"){switch(Mt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ie(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ut(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return qt(e,(i,s)=>{n[i]=this.convertValue(s,t)}),n}convertVectorValue(e){var t,n,i;const s=(i=(n=(t=e.fields)===null||t===void 0?void 0:t[Wn].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(a=>ie(a.doubleValue));return new mc(s)}convertGeoPoint(e){return new pc(ie(e.latitude),ie(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Gs(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Jr(e));default:return null}}convertTimestamp(e){const t=ct(e);return new ae(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=X.fromString(e);L(nf(n),9688,{name:e});const i=new un(n.get(1),n.get(3)),s=new O(n.popFirst(5));return i.isEqual(t)||Ve(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wc(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class op extends rp{constructor(e,t,n,i,s,a){super(e,t,n,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new cs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(oo("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class cs extends op{data(e={}){return super.data(e)}}class bE{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Mr(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new cs(this._firestore,this._userDataWriter,n.key,n,new Mr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new k(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{const u=new cs(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Mr(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const u=new cs(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Mr(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:PE(c.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function PE(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ew(r){r=qe(r,ke);const e=qe(r.firestore,pt);return dE(io(e),r._key).then(t=>SE(e,r,t))}class ap extends RE{constructor(e){super(),this.firestore=e}convertBytes(e){return new tr(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ke(this.firestore,null,t)}}function tw(r){r=qe(r,In);const e=qe(r.firestore,pt),t=io(e),n=new ap(e);return AE(r._query),fE(t,r._query).then(i=>new bE(e,n,r,i))}function nw(r,e,t){r=qe(r,ke);const n=qe(r.firestore,pt),i=wc(r.converter,e,t);return Ei(n,[_c(yi(n),"setDoc",r._key,i,r.converter!==null,t).toMutation(r._key,fe.none())])}function rw(r,e,t,...n){r=qe(r,ke);const i=qe(r.firestore,pt),s=yi(i);let a;return a=typeof(e=le(e))=="string"||e instanceof _i?Zf(s,"updateDoc",r._key,e,t,n):Xf(s,"updateDoc",r._key,e),Ei(i,[a.toMutation(r._key,fe.exists(!0))])}function iw(r){return Ei(qe(r.firestore,pt),[new di(r._key,fe.none())])}function sw(r,e){const t=qe(r.firestore,pt),n=gE(r),i=wc(r.converter,e);return Ei(t,[_c(yi(r.firestore),"addDoc",n._key,i,r.converter!==null,{}).toMutation(n._key,fe.exists(!1))]).then(()=>n)}function Ei(r,e){return function(n,i){const s=new Qe;return n.asyncQueue.enqueueAndForget(async()=>eE(await hE(n),i,s)),s.promise}(io(r),e)}function SE(r,e,t){const n=t.docs.get(e._key),i=new ap(r);return new op(r,i,e._key,n,new Mr(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CE{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=yi(e)}set(e,t,n){this._verifyNotCommitted();const i=Wo(e,this._firestore),s=wc(i.converter,t,n),a=_c(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,n);return this._mutations.push(a.toMutation(i._key,fe.none())),this}update(e,t,n,...i){this._verifyNotCommitted();const s=Wo(e,this._firestore);let a;return a=typeof(t=le(t))=="string"||t instanceof _i?Zf(this._dataReader,"WriteBatch.update",s._key,t,n,i):Xf(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(a.toMutation(s._key,fe.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Wo(e,this._firestore);return this._mutations=this._mutations.concat(new di(t._key,fe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new k(S.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Wo(r,e){if((r=le(r)).firestore!==e)throw new k(S.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ow(r){return io(r=qe(r,pt)),new CE(r,e=>Ei(r,e))}(function(e,t=!0){(function(i){rr=i})(nr),Bn(new an("firestore",(n,{instanceIdentifier:i,options:s})=>{const a=n.getProvider("app").getImmediate(),c=new pt(new i_(n.getProvider("auth-internal")),new a_(a,n.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new k(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new un(h.options.projectId,f)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),kt($u,Gu,e),kt($u,Gu,"esm2017")})();var VE="firebase",DE="11.6.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt(VE,DE,"app");function Ac(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(r);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(r,n[i])&&(t[n[i]]=r[n[i]]);return t}function cp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const kE=cp,up=new ai("auth","Firebase",cp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks=new Va("@firebase/auth");function NE(r,...e){ks.logLevel<=W.WARN&&ks.warn(`Auth (${nr}): ${r}`,...e)}function us(r,...e){ks.logLevel<=W.ERROR&&ks.error(`Auth (${nr}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(r,...e){throw Rc(r,...e)}function Ye(r,...e){return Rc(r,...e)}function lp(r,e,t){const n=Object.assign(Object.assign({},kE()),{[e]:t});return new ai("auth","Firebase",n).create(e,{appName:r.name})}function ot(r){return lp(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Rc(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return up.create(r,...e)}function B(r,e,...t){if(!r)throw Rc(e,...t)}function rt(r){const e="INTERNAL ASSERTION FAILED: "+r;throw us(e),new Error(e)}function lt(r,e){r||rt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pa(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function xE(){return hh()==="http:"||hh()==="https:"}function hh(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(xE()||Om()||"connection"in navigator)?navigator.onLine:!0}function ME(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,t){this.shortDelay=e,this.longDelay=t,lt(t>e,"Short delay should be less than long delay!"),this.isMobile=km()||Mm()}get(){return OE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bc(r,e){lt(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;rt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;rt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;rt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LE={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FE=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],UE=new vi(3e4,6e4);function mt(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function gt(r,e,t,n,i={}){return dp(r,i,async()=>{let s={},a={};n&&(e==="GET"?a=n:s={body:JSON.stringify(n)});const c=ci(Object.assign({key:r.config.apiKey},a)).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const h=Object.assign({method:e,headers:u},s);return xm()||(h.referrerPolicy="no-referrer"),hp.fetch()(await fp(r,r.config.apiHost,t,c),h)})}async function dp(r,e,t){r._canInitEmulator=!1;const n=Object.assign(Object.assign({},LE),e);try{const i=new qE(r),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Ji(r,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ji(r,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Ji(r,"email-already-in-use",a);if(u==="USER_DISABLED")throw Ji(r,"user-disabled",a);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw lp(r,f,h);Ge(r,f)}}catch(i){if(i instanceof ht)throw i;Ge(r,"network-request-failed",{message:String(i)})}}async function Ti(r,e,t,n,i={}){const s=await gt(r,e,t,n,i);return"mfaPendingCredential"in s&&Ge(r,"multi-factor-auth-required",{_serverResponse:s}),s}async function fp(r,e,t,n){const i=`${e}${t}?${n}`,s=r,a=s.config.emulator?bc(r.config,i):`${r.config.apiScheme}://${i}`;return FE.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function BE(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class qE{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Ye(this.auth,"network-request-failed")),UE.get())})}}function Ji(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const i=Ye(r,e,n);return i.customData._tokenResponse=t,i}function dh(r){return r!==void 0&&r.enterprise!==void 0}class jE{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return BE(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function zE(r,e){return gt(r,"GET","/v2/recaptchaConfig",mt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $E(r,e){return gt(r,"POST","/v1/accounts:delete",e)}async function Ns(r,e){return gt(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zr(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function GE(r,e=!1){const t=le(r),n=await t.getIdToken(e),i=Pc(n);B(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:n,authTime:zr(Ho(i.auth_time)),issuedAtTime:zr(Ho(i.iat)),expirationTime:zr(Ho(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Ho(r){return Number(r)*1e3}function Pc(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return us("JWT malformed, contained fewer than 3 sections"),null;try{const i=Nh(t);return i?JSON.parse(i):(us("Failed to decode base64 JWT payload"),null)}catch(i){return us("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function fh(r){const e=Pc(r);return B(e,"internal-error"),B(typeof e.exp<"u","internal-error"),B(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function si(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof ht&&KE(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function KE({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WE{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=zr(this.lastLoginAt),this.creationTime=zr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xs(r){var e;const t=r.auth,n=await r.getIdToken(),i=await si(r,Ns(t,{idToken:n}));B(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];r._notifyReloadListener(s);const a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?pp(s.providerUserInfo):[],c=QE(r.providerData,a),u=r.isAnonymous,h=!(r.email&&s.passwordHash)&&!(c!=null&&c.length),f=u?h:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new Sa(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(r,m)}async function HE(r){const e=le(r);await xs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function QE(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function pp(r){return r.map(e=>{var{providerId:t}=e,n=Ac(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YE(r,e){const t=await dp(r,{},async()=>{const n=ci({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=r.config,a=await fp(r,i,"/v1/token",`key=${s}`),c=await r._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",hp.fetch()(a,{method:"POST",headers:c,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function JE(r,e){return gt(r,"POST","/v2/accounts:revokeToken",mt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){B(e.idToken,"internal-error"),B(typeof e.idToken<"u","internal-error"),B(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):fh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){B(e.length!==0,"internal-error");const t=fh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(B(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:s}=await YE(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:s}=t,a=new Ln;return n&&(B(typeof n=="string","internal-error",{appName:e}),a.refreshToken=n),i&&(B(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(B(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ln,this.toJSON())}_performRefresh(){return rt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(r,e){B(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class $e{constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,s=Ac(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new WE(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Sa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await si(this,this.stsTokenManager.getToken(this.auth,e));return B(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return GE(this,e)}reload(){return HE(this)}_assign(e){this!==e&&(B(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new $e(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){B(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await xs(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Fe(this.auth.app))return Promise.reject(ot(this.auth));const e=await this.getIdToken();return await si(this,$E(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,s,a,c,u,h,f;const m=(n=t.displayName)!==null&&n!==void 0?n:void 0,I=(i=t.email)!==null&&i!==void 0?i:void 0,P=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,C=(a=t.photoURL)!==null&&a!==void 0?a:void 0,x=(c=t.tenantId)!==null&&c!==void 0?c:void 0,D=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,$=(h=t.createdAt)!==null&&h!==void 0?h:void 0,j=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:F,emailVerified:Q,isAnonymous:Z,providerData:K,stsTokenManager:E}=t;B(F&&E,e,"internal-error");const g=Ln.fromJSON(this.name,E);B(typeof F=="string",e,"internal-error"),At(m,e.name),At(I,e.name),B(typeof Q=="boolean",e,"internal-error"),B(typeof Z=="boolean",e,"internal-error"),At(P,e.name),At(C,e.name),At(x,e.name),At(D,e.name),At($,e.name),At(j,e.name);const y=new $e({uid:F,auth:e,email:I,emailVerified:Q,displayName:m,isAnonymous:Z,photoURL:C,phoneNumber:P,tenantId:x,stsTokenManager:g,createdAt:$,lastLoginAt:j});return K&&Array.isArray(K)&&(y.providerData=K.map(v=>Object.assign({},v))),D&&(y._redirectEventId=D),y}static async _fromIdTokenResponse(e,t,n=!1){const i=new Ln;i.updateFromServerResponse(t);const s=new $e({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await xs(s),s}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];B(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?pp(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Ln;c.updateFromIdToken(n);const u=new $e({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Sa(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph=new Map;function it(r){lt(r instanceof Function,"Expected a class definition");let e=ph.get(r);return e?(lt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,ph.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}mp.type="NONE";const mh=mp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ls(r,e,t){return`firebase:${r}:${e}:${t}`}class Fn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:s}=this.auth;this.fullUserKey=ls(this.userKey,i.apiKey,s),this.fullPersistenceKey=ls("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ns(this.auth,{idToken:e}).catch(()=>{});return t?$e._fromGetAccountInfoResponse(this.auth,t,e):null}return $e._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Fn(it(mh),e,n);const i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||it(mh);const a=ls(n,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let m;if(typeof f=="string"){const I=await Ns(e,{idToken:f}).catch(()=>{});if(!I)break;m=await $e._fromGetAccountInfoResponse(e,I,f)}else m=$e._fromJSON(e,f);h!==s&&(c=m),s=h;break}}catch{}const u=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Fn(s,e,n):(s=u[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==s)try{await h._remove(a)}catch{}})),new Fn(s,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gh(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ip(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(gp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(vp(e))return"Blackberry";if(Tp(e))return"Webos";if(_p(e))return"Safari";if((e.includes("chrome/")||yp(e))&&!e.includes("edge/"))return"Chrome";if(Ep(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function gp(r=pe()){return/firefox\//i.test(r)}function _p(r=pe()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function yp(r=pe()){return/crios\//i.test(r)}function Ip(r=pe()){return/iemobile/i.test(r)}function Ep(r=pe()){return/android/i.test(r)}function vp(r=pe()){return/blackberry/i.test(r)}function Tp(r=pe()){return/webos/i.test(r)}function Sc(r=pe()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function XE(r=pe()){var e;return Sc(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ZE(){return Lm()&&document.documentMode===10}function wp(r=pe()){return Sc(r)||Ep(r)||Tp(r)||vp(r)||/windows phone/i.test(r)||Ip(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ap(r,e=[]){let t;switch(r){case"Browser":t=gh(pe());break;case"Worker":t=`${gh(pe())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${nr}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ev{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=s=>new Promise((a,c)=>{try{const u=e(s);a(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tv(r,e={}){return gt(r,"GET","/v2/passwordPolicy",mt(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nv=6;class rv{constructor(e){var t,n,i,s;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:nv,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,i,s,a,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(n=u.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new _h(this),this.idTokenSubscription=new _h(this),this.beforeStateQueue=new ev(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=up,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=it(t)),this._initializationPromise=this.queue(async()=>{var n,i,s;if(!this._deleted&&(this.persistenceManager=await Fn.create(this,e),(n=this._resolvePersistenceManagerAvailable)===null||n===void 0||n.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ns(this,{idToken:e}),n=await $e._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Fe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return B(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await xs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ME()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Fe(this.app))return Promise.reject(ot(this));const t=e?le(e):null;return t&&B(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&B(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Fe(this.app)?Promise.reject(ot(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Fe(this.app)?Promise.reject(ot(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(it(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await tv(this),t=new rv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ai("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await JE(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&it(e)||this._popupRedirectResolver;B(t,this,"argument-error"),this.redirectPersistenceManager=await Fn.create(this,[it(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(B(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,i);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return B(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ap(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(Fe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&NE(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function jt(r){return le(r)}class _h{constructor(e){this.auth=e,this.observer=null,this.addObserver=zm(t=>this.observer=t)}get next(){return B(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let co={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function sv(r){co=r}function Rp(r){return co.loadJS(r)}function ov(){return co.recaptchaEnterpriseScript}function av(){return co.gapiScript}function cv(r){return`__${r}${Math.floor(Math.random()*1e6)}`}class uv{constructor(){this.enterprise=new lv}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class lv{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const hv="recaptcha-enterprise",bp="NO_RECAPTCHA";class dv{constructor(e){this.type=hv,this.auth=jt(e)}async verify(e="verify",t=!1){async function n(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{zE(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new jE(u);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,a(h.siteKey)}}).catch(u=>{c(u)})})}function i(s,a,c){const u=window.grecaptcha;dh(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(h=>{a(h)}).catch(()=>{a(bp)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new uv().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{n(this.auth).then(c=>{if(!t&&dh(window.grecaptcha))i(c,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=ov();u.length!==0&&(u+=c),Rp(u).then(()=>{i(c,s,a)}).catch(h=>{a(h)})}}).catch(c=>{a(c)})})}}async function yh(r,e,t,n=!1,i=!1){const s=new dv(r);let a;if(i)a=bp;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}const c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return n?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Os(r,e,t,n,i){var s;if(!((s=r._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await yh(r,e,t,t==="getOobCode");return n(r,a)}else return n(r,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await yh(r,e,t,t==="getOobCode");return n(r,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fv(r,e){const t=ka(r,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(on(s,e??{}))return i;Ge(i,"already-initialized")}return t.initialize({options:e})}function pv(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(it);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function mv(r,e,t){const n=jt(r);B(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const i=!1,s=Pp(e),{host:a,port:c}=gv(e),u=c===null?"":`:${c}`,h={url:`${s}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!n._canInitEmulator){B(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),B(on(h,n.config.emulator)&&on(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,_v()}function Pp(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function gv(r){const e=Pp(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){const s=i[1];return{host:s,port:Ih(n.substr(s.length+1))}}else{const[s,a]=n.split(":");return{host:s,port:Ih(a)}}}function Ih(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function _v(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return rt("not implemented")}_getIdTokenResponse(e){return rt("not implemented")}_linkToIdToken(e,t){return rt("not implemented")}_getReauthenticationResolver(e){return rt("not implemented")}}async function yv(r,e){return gt(r,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iv(r,e){return Ti(r,"POST","/v1/accounts:signInWithPassword",mt(r,e))}async function Ev(r,e){return gt(r,"POST","/v1/accounts:sendOobCode",mt(r,e))}async function vv(r,e){return Ev(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tv(r,e){return Ti(r,"POST","/v1/accounts:signInWithEmailLink",mt(r,e))}async function wv(r,e){return Ti(r,"POST","/v1/accounts:signInWithEmailLink",mt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi extends Cc{constructor(e,t,n,i=null){super("password",n),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new oi(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new oi(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Os(e,t,"signInWithPassword",Iv);case"emailLink":return Tv(e,{email:this._email,oobCode:this._password});default:Ge(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Os(e,n,"signUpPassword",yv);case"emailLink":return wv(e,{idToken:t,email:this._email,oobCode:this._password});default:Ge(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Un(r,e){return Ti(r,"POST","/v1/accounts:signInWithIdp",mt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Av="http://localhost";class mn extends Cc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new mn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ge("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i}=t,s=Ac(t,["providerId","signInMethod"]);if(!n||!i)return null;const a=new mn(n,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Un(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Un(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Un(e,t)}buildRequest(){const e={requestUri:Av,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ci(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rv(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function bv(r){const e=Vr(Dr(r)).link,t=e?Vr(Dr(e)).deep_link_id:null,n=Vr(Dr(r)).deep_link_id;return(n?Vr(Dr(n)).link:null)||n||t||e||r}class Vc{constructor(e){var t,n,i,s,a,c;const u=Vr(Dr(e)),h=(t=u.apiKey)!==null&&t!==void 0?t:null,f=(n=u.oobCode)!==null&&n!==void 0?n:null,m=Rv((i=u.mode)!==null&&i!==void 0?i:null);B(h&&f&&m,"argument-error"),this.apiKey=h,this.operation=m,this.code=f,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=u.lang)!==null&&a!==void 0?a:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=bv(e);try{return new Vc(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(){this.providerId=ar.PROVIDER_ID}static credential(e,t){return oi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Vc.parseLink(t);return B(n,"argument-error"),oi._fromEmailAndCode(e,n.code,n.tenantId)}}ar.PROVIDER_ID="password";ar.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ar.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi extends Sp{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt extends wi{constructor(){super("facebook.com")}static credential(e){return mn._fromParams({providerId:bt.PROVIDER_ID,signInMethod:bt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return bt.credentialFromTaggedObject(e)}static credentialFromError(e){return bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return bt.credential(e.oauthAccessToken)}catch{return null}}}bt.FACEBOOK_SIGN_IN_METHOD="facebook.com";bt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt extends wi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return mn._fromParams({providerId:Pt.PROVIDER_ID,signInMethod:Pt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Pt.credentialFromTaggedObject(e)}static credentialFromError(e){return Pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Pt.credential(t,n)}catch{return null}}}Pt.GOOGLE_SIGN_IN_METHOD="google.com";Pt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends wi{constructor(){super("github.com")}static credential(e){return mn._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.GITHUB_SIGN_IN_METHOD="github.com";St.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct extends wi{constructor(){super("twitter.com")}static credential(e,t){return mn._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Ct.credential(t,n)}catch{return null}}}Ct.TWITTER_SIGN_IN_METHOD="twitter.com";Ct.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pv(r,e){return Ti(r,"POST","/v1/accounts:signUp",mt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const s=await $e._fromIdTokenResponse(e,n,i),a=Eh(n);return new gn({user:s,providerId:a,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=Eh(n);return new gn({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function Eh(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms extends ht{constructor(e,t,n,i){var s;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,Ms.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new Ms(e,t,n,i)}}function Cp(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ms._fromErrorAndOperation(r,s,e,n):s})}async function Sv(r,e,t=!1){const n=await si(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return gn._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cv(r,e,t=!1){const{auth:n}=r;if(Fe(n.app))return Promise.reject(ot(n));const i="reauthenticate";try{const s=await si(r,Cp(n,i,e,r),t);B(s.idToken,n,"internal-error");const a=Pc(s.idToken);B(a,n,"internal-error");const{sub:c}=a;return B(r.uid===c,n,"user-mismatch"),gn._forOperation(r,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Ge(n,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vp(r,e,t=!1){if(Fe(r.app))return Promise.reject(ot(r));const n="signIn",i=await Cp(r,n,e),s=await gn._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(s.user),s}async function Vv(r,e){return Vp(jt(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dp(r){const e=jt(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function aw(r,e,t){const n=jt(r);await Os(n,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",vv)}async function cw(r,e,t){if(Fe(r.app))return Promise.reject(ot(r));const n=jt(r),a=await Os(n,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Pv).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Dp(r),u}),c=await gn._fromIdTokenResponse(n,"signIn",a);return await n._updateCurrentUser(c.user),c}function uw(r,e,t){return Fe(r.app)?Promise.reject(ot(r)):Vv(le(r),ar.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&Dp(r),n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lw(r,e){return le(r).setPersistence(e)}function Dv(r,e,t,n){return le(r).onIdTokenChanged(e,t,n)}function kv(r,e,t){return le(r).beforeAuthStateChanged(e,t)}function hw(r,e,t,n){return le(r).onAuthStateChanged(e,t,n)}function dw(r){return le(r).signOut()}const Ls="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ls,"1"),this.storage.removeItem(Ls),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nv=1e3,xv=10;class Np extends kp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=wp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(n);!t&&this.localCache[n]===a||this.notifyListeners(n,a)},s=this.storage.getItem(n);ZE()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,xv):i()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Nv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Np.type="LOCAL";const Ov=Np;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp extends kp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}xp.type="SESSION";const Op=xp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mv(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const n=new uo(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const c=Array.from(a).map(async h=>h(t.origin,s)),u=await Mv(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}uo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dc(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,u)=>{const h=Dc("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);a={messageChannel:i,onMessage(m){const I=m;if(I.data.eventId===h)switch(I.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(I.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(){return window}function Fv(r){Je().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mp(){return typeof Je().WorkerGlobalScope<"u"&&typeof Je().importScripts=="function"}async function Uv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Bv(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function qv(){return Mp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lp="firebaseLocalStorageDb",jv=1,Fs="firebaseLocalStorage",Fp="fbase_key";class Ai{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function lo(r,e){return r.transaction([Fs],e?"readwrite":"readonly").objectStore(Fs)}function zv(){const r=indexedDB.deleteDatabase(Lp);return new Ai(r).toPromise()}function Ca(){const r=indexedDB.open(Lp,jv);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(Fs,{keyPath:Fp})}catch(i){t(i)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(Fs)?e(n):(n.close(),await zv(),e(await Ca()))})})}async function vh(r,e,t){const n=lo(r,!0).put({[Fp]:e,value:t});return new Ai(n).toPromise()}async function $v(r,e){const t=lo(r,!1).get(e),n=await new Ai(t).toPromise();return n===void 0?null:n.value}function Th(r,e){const t=lo(r,!0).delete(e);return new Ai(t).toPromise()}const Gv=800,Kv=3;class Up{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ca(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>Kv)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Mp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=uo._getInstance(qv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Uv(),!this.activeServiceWorker)return;this.sender=new Lv(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Bv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ca();return await vh(e,Ls,"1"),await Th(e,Ls),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>vh(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>$v(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Th(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=lo(i,!1).getAll();return new Ai(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Gv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Up.type="LOCAL";const Wv=Up;new vi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hv(r,e){return e?it(e):(B(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc extends Cc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Un(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Un(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Un(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Qv(r){return Vp(r.auth,new kc(r),r.bypassAuthState)}function Yv(r){const{auth:e,user:t}=r;return B(t,e,"internal-error"),Cv(t,new kc(r),r.bypassAuthState)}async function Jv(r){const{auth:e,user:t}=r;return B(t,e,"internal-error"),Sv(t,new kc(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(e,t,n,i,s=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Qv;case"linkViaPopup":case"linkViaRedirect":return Jv;case"reauthViaPopup":case"reauthViaRedirect":return Yv;default:Ge(this.auth,"internal-error")}}resolve(e){lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xv=new vi(2e3,1e4);class On extends Bp{constructor(e,t,n,i,s){super(e,t,i,s),this.provider=n,this.authWindow=null,this.pollId=null,On.currentPopupAction&&On.currentPopupAction.cancel(),On.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return B(e,this.auth,"internal-error"),e}async onExecution(){lt(this.filter.length===1,"Popup operations only handle one event");const e=Dc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ye(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ye(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,On.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ye(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Xv.get())};e()}}On.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zv="pendingRedirect",hs=new Map;class eT extends Bp{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=hs.get(this.auth._key());if(!e){try{const n=await tT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}hs.set(this.auth._key(),e)}return this.bypassAuthState||hs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tT(r,e){const t=iT(e),n=rT(r);if(!await n._isAvailable())return!1;const i=await n._get(t)==="true";return await n._remove(t),i}function nT(r,e){hs.set(r._key(),e)}function rT(r){return it(r._redirectPersistence)}function iT(r){return ls(Zv,r.config.apiKey,r.name)}async function sT(r,e,t=!1){if(Fe(r.app))return Promise.reject(ot(r));const n=jt(r),i=Hv(n,e),a=await new eT(n,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await n._persistUserIfCurrent(a.user),await n._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oT=10*60*1e3;class aT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cT(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!qp(e)){const i=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(Ye(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=oT&&this.cachedEventUids.clear(),this.cachedEventUids.has(wh(e))}saveEventToCache(e){this.cachedEventUids.add(wh(e)),this.lastProcessedEventTime=Date.now()}}function wh(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function qp({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cT(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return qp(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uT(r,e={}){return gt(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,hT=/^https?/;async function dT(r){if(r.config.emulator)return;const{authorizedDomains:e}=await uT(r);for(const t of e)try{if(fT(t))return}catch{}Ge(r,"unauthorized-domain")}function fT(r){const e=Pa(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const a=new URL(r);return a.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===n}if(!hT.test(t))return!1;if(lT.test(r))return n===r;const i=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT=new vi(3e4,6e4);function Ah(){const r=Je().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function mT(r){return new Promise((e,t)=>{var n,i,s;function a(){Ah(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ah(),t(Ye(r,"network-request-failed"))},timeout:pT.get()})}if(!((i=(n=Je().gapi)===null||n===void 0?void 0:n.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Je().gapi)===null||s===void 0)&&s.load)a();else{const c=cv("iframefcb");return Je()[c]=()=>{gapi.load?a():t(Ye(r,"network-request-failed"))},Rp(`${av()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw ds=null,e})}let ds=null;function gT(r){return ds=ds||mT(r),ds}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _T=new vi(5e3,15e3),yT="__/auth/iframe",IT="emulator/auth/iframe",ET={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},vT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function TT(r){const e=r.config;B(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?bc(e,IT):`https://${r.config.authDomain}/${yT}`,n={apiKey:e.apiKey,appName:r.name,v:nr},i=vT.get(r.config.apiHost);i&&(n.eid=i);const s=r._getFrameworks();return s.length&&(n.fw=s.join(",")),`${t}?${ci(n).slice(1)}`}async function wT(r){const e=await gT(r),t=Je().gapi;return B(t,r,"internal-error"),e.open({where:document.body,url:TT(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ET,dontclear:!0},n=>new Promise(async(i,s)=>{await n.restyle({setHideOnLeave:!1});const a=Ye(r,"network-request-failed"),c=Je().setTimeout(()=>{s(a)},_T.get());function u(){Je().clearTimeout(c),i(n)}n.ping(u).then(u,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},RT=500,bT=600,PT="_blank",ST="http://localhost";class Rh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function CT(r,e,t,n=RT,i=bT){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u=Object.assign(Object.assign({},AT),{width:n.toString(),height:i.toString(),top:s,left:a}),h=pe().toLowerCase();t&&(c=yp(h)?PT:t),gp(h)&&(e=e||ST,u.scrollbars="yes");const f=Object.entries(u).reduce((I,[P,C])=>`${I}${P}=${C},`,"");if(XE(h)&&c!=="_self")return VT(e||"",c),new Rh(null);const m=window.open(e||"",c,f);B(m,r,"popup-blocked");try{m.focus()}catch{}return new Rh(m)}function VT(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DT="__/auth/handler",kT="emulator/auth/handler",NT=encodeURIComponent("fac");async function bh(r,e,t,n,i,s){B(r.config.authDomain,r,"auth-domain-config-required"),B(r.config.apiKey,r,"invalid-api-key");const a={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:nr,eventId:i};if(e instanceof Sp){e.setDefaultLanguage(r.languageCode),a.providerId=e.providerId||"",jm(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))a[f]=m}if(e instanceof wi){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(a.scopes=f.join(","))}r.tenantId&&(a.tid=r.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await r._getAppCheckToken(),h=u?`#${NT}=${encodeURIComponent(u)}`:"";return`${xT(r)}?${ci(c).slice(1)}${h}`}function xT({config:r}){return r.emulator?bc(r,kT):`https://${r.authDomain}/${DT}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo="webStorageSupport";class OT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Op,this._completeRedirectFn=sT,this._overrideRedirectResult=nT}async _openPopup(e,t,n,i){var s;lt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const a=await bh(e,t,n,Pa(),i);return CT(e,a,Dc())}async _openRedirect(e,t,n,i){await this._originValidation(e);const s=await bh(e,t,n,Pa(),i);return Fv(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(lt(s,"If manager is not set, promise should be"),s)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await wT(e),n=new aT(e);return t.register("authEvent",i=>(B(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:n.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Qo,{type:Qo},i=>{var s;const a=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Qo];a!==void 0&&t(!!a),Ge(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=dT(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return wp()||_p()||Sc()}}const MT=OT;var Ph="@firebase/auth",Sh="1.10.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){B(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FT(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function UT(r){Bn(new an("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=n.options;B(a&&!a.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:a,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ap(r)},h=new iv(n,i,s,u);return pv(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Bn(new an("auth-internal",e=>{const t=jt(e.getProvider("auth").getImmediate());return(n=>new LT(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),kt(Ph,Sh,FT(r)),kt(Ph,Sh,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BT=5*60,qT=Mh("authIdTokenMaxAge")||BT;let Ch=null;const jT=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>qT)return;const i=t==null?void 0:t.token;Ch!==i&&(Ch=i,await fetch(r,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function fw(r=Gg()){const e=ka(r,"auth");if(e.isInitialized())return e.getImmediate();const t=fv(r,{popupRedirectResolver:MT,persistence:[Wv,Ov,Op]}),n=Mh("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(n,location.origin);if(location.origin===s.origin){const a=jT(s.toString());kv(t,a,()=>a(t.currentUser)),Dv(t,c=>a(c))}}const i=Vm("auth");return i&&mv(t,`http://${i}`),t}function zT(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}sv({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=i=>{const s=Ye("internal-error");s.customData=i,t(s)},n.type="text/javascript",n.charset="UTF-8",zT().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});UT("Browser");export{cw as A,lw as B,an as C,Ov as D,ai as E,ht as F,Op as G,uw as H,dw as I,aw as J,hw as K,ae as T,Bn as _,ka as a,$T as b,le as c,GT as d,$g as e,fw as f,Gg as g,QT as h,Fh as i,YT as j,HT as k,WT as l,tw as m,gE as n,cg as o,ew as p,JT as q,kt as r,nw as s,sw as t,rw as u,Fm as v,iw as w,ow as x,XT as y,ZT as z};
