const rf=()=>{};var _u={};/**
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
 */const Wc=function(r){const t=[];let e=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},sf=function(r){const t=[];let e=0,n=0;for(;e<r.length;){const s=r[e++];if(s<128)t[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[e++];t[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[e++],a=r[e++],u=r[e++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;t[n++]=String.fromCharCode(55296+(l>>10)),t[n++]=String.fromCharCode(56320+(l&1023))}else{const i=r[e++],a=r[e++];t[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return t.join("")},Yc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,t){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],a=s+1<r.length,u=a?r[s+1]:0,l=s+2<r.length,d=l?r[s+2]:0,m=i>>2,p=(i&3)<<4|u>>4;let T=(u&15)<<2|d>>6,P=d&63;l||(P=64,a||(T=64)),n.push(e[m],e[p],e[T],e[P])}return n.join("")},encodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(r):this.encodeByteArray(Wc(r),t)},decodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(r):sf(this.decodeStringToByteArray(r,t))},decodeStringToByteArray(r,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=e[r.charAt(s++)],u=s<r.length?e[r.charAt(s)]:0;++s;const d=s<r.length?e[r.charAt(s)]:64;++s;const p=s<r.length?e[r.charAt(s)]:64;if(++s,i==null||u==null||d==null||p==null)throw new of;const T=i<<2|u>>4;if(n.push(T),d!==64){const P=u<<4&240|d>>2;if(n.push(P),p!==64){const C=d<<6&192|p;n.push(C)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class of extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const af=function(r){const t=Wc(r);return Yc.encodeByteArray(t,!0)},Es=function(r){return af(r).replace(/\./g,"")},uf=function(r){try{return Yc.decodeString(r,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function Jc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const cf=()=>Jc().__FIREBASE_DEFAULTS__,lf=()=>{if(typeof process>"u"||typeof _u>"u")return;const r=_u.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},hf=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=r&&uf(r[1]);return t&&JSON.parse(t)},Ro=()=>{try{return rf()||cf()||lf()||hf()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},df=r=>{var t,e;return(e=(t=Ro())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[r]},ff=r=>{const t=df(r);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const n=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),n]:[t.substring(0,e),n]},Xc=()=>{var r;return(r=Ro())===null||r===void 0?void 0:r.config};/**
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
 */class mf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
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
 */function pf(r,t){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},n=t||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},r);return[Es(JSON.stringify(e)),Es(JSON.stringify(a)),""].join(".")}/**
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
 */function Ts(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function gf(){var r;const t=(r=Ro())===null||r===void 0?void 0:r.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Zc(){return!gf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function tl(){try{return typeof indexedDB=="object"}catch{return!1}}function _f(){return new Promise((r,t)=>{try{let e=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(e){t(e)}})}/**
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
 */const yf="FirebaseError";class Pn extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=yf,Object.setPrototypeOf(this,Pn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,el.prototype.create)}}class el{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],a=i?If(i,n):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new Pn(s,u,n)}}function If(r,t){return r.replace(Ef,(e,n)=>{const s=t[n];return s!=null?String(s):`<${n}?>`})}const Ef=/\{\$([^}]+)}/g;function vs(r,t){if(r===t)return!0;const e=Object.keys(r),n=Object.keys(t);for(const s of e){if(!n.includes(s))return!1;const i=r[s],a=t[s];if(yu(i)&&yu(a)){if(!vs(i,a))return!1}else if(i!==a)return!1}for(const s of n)if(!e.includes(s))return!1;return!0}function yu(r){return r!==null&&typeof r=="object"}/**
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
 */function Bt(r){return r&&r._delegate?r._delegate:r}class lr{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const be="[DEFAULT]";/**
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
 */class Tf{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new mf;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(wf(t))try{this.getOrInitializeService({instanceIdentifier:be})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(t=be){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=be){return this.instances.has(t)}getOptions(t=be){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[i,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);n===u&&a.resolve(s)}return s}onInit(t,e){var n;const s=this.normalizeInstanceIdentifier(e),i=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;i.add(t),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&t(a,s),()=>{i.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:vf(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}return n||null}normalizeInstanceIdentifier(t=be){return this.component?this.component.multipleInstances?t:be:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function vf(r){return r===be?void 0:r}function wf(r){return r.instantiationMode==="EAGER"}/**
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
 */class Af{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Tf(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Q;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(Q||(Q={}));const Rf={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},bf=Q.INFO,Pf={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},Vf=(r,t,...e)=>{if(t<r.logLevel)return;const n=new Date().toISOString(),s=Pf[t];if(s)console[s](`[${n}]  ${r.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class nl{constructor(t){this.name=t,this._logLevel=bf,this._logHandler=Vf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in Q))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Rf[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...t),this._logHandler(this,Q.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...t),this._logHandler(this,Q.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...t),this._logHandler(this,Q.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...t),this._logHandler(this,Q.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...t),this._logHandler(this,Q.ERROR,...t)}}const Sf=(r,t)=>t.some(e=>r instanceof e);let Iu,Eu;function Cf(){return Iu||(Iu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Df(){return Eu||(Eu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const rl=new WeakMap,Qi=new WeakMap,sl=new WeakMap,Oi=new WeakMap,bo=new WeakMap;function xf(r){const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",a)},i=()=>{e(le(r.result)),s()},a=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&rl.set(e,r)}).catch(()=>{}),bo.set(t,r),t}function Nf(r){if(Qi.has(r))return;const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",a),r.removeEventListener("abort",a)},i=()=>{e(),s()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",a),r.addEventListener("abort",a)});Qi.set(r,t)}let Hi={get(r,t,e){if(r instanceof IDBTransaction){if(t==="done")return Qi.get(r);if(t==="objectStoreNames")return r.objectStoreNames||sl.get(r);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return le(r[t])},set(r,t,e){return r[t]=e,!0},has(r,t){return r instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in r}};function kf(r){Hi=r(Hi)}function Mf(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const n=r.call(Fi(this),t,...e);return sl.set(n,t.sort?t.sort():[t]),le(n)}:Df().includes(r)?function(...t){return r.apply(Fi(this),t),le(rl.get(this))}:function(...t){return le(r.apply(Fi(this),t))}}function Of(r){return typeof r=="function"?Mf(r):(r instanceof IDBTransaction&&Nf(r),Sf(r,Cf())?new Proxy(r,Hi):r)}function le(r){if(r instanceof IDBRequest)return xf(r);if(Oi.has(r))return Oi.get(r);const t=Of(r);return t!==r&&(Oi.set(r,t),bo.set(t,r)),t}const Fi=r=>bo.get(r);function Ff(r,t,{blocked:e,upgrade:n,blocking:s,terminated:i}={}){const a=indexedDB.open(r,t),u=le(a);return n&&a.addEventListener("upgradeneeded",l=>{n(le(a.result),l.oldVersion,l.newVersion,le(a.transaction),l)}),e&&a.addEventListener("blocked",l=>e(l.oldVersion,l.newVersion,l)),u.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}const Lf=["get","getKey","getAll","getAllKeys","count"],Bf=["put","add","delete","clear"],Li=new Map;function Tu(r,t){if(!(r instanceof IDBDatabase&&!(t in r)&&typeof t=="string"))return;if(Li.get(t))return Li.get(t);const e=t.replace(/FromIndex$/,""),n=t!==e,s=Bf.includes(e);if(!(e in(n?IDBIndex:IDBObjectStore).prototype)||!(s||Lf.includes(e)))return;const i=async function(a,...u){const l=this.transaction(a,s?"readwrite":"readonly");let d=l.store;return n&&(d=d.index(u.shift())),(await Promise.all([d[e](...u),s&&l.done]))[0]};return Li.set(t,i),i}kf(r=>({...r,get:(t,e,n)=>Tu(t,e)||r.get(t,e,n),has:(t,e)=>!!Tu(t,e)||r.has(t,e)}));/**
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
 */class Uf{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(qf(e)){const n=e.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(e=>e).join(" ")}}function qf(r){const t=r.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Wi="@firebase/app",vu="0.11.5";/**
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
 */const Yt=new nl("@firebase/app"),zf="@firebase/app-compat",jf="@firebase/analytics-compat",$f="@firebase/analytics",Gf="@firebase/app-check-compat",Kf="@firebase/app-check",Qf="@firebase/auth",Hf="@firebase/auth-compat",Wf="@firebase/database",Yf="@firebase/data-connect",Jf="@firebase/database-compat",Xf="@firebase/functions",Zf="@firebase/functions-compat",tm="@firebase/installations",em="@firebase/installations-compat",nm="@firebase/messaging",rm="@firebase/messaging-compat",sm="@firebase/performance",im="@firebase/performance-compat",om="@firebase/remote-config",am="@firebase/remote-config-compat",um="@firebase/storage",cm="@firebase/storage-compat",lm="@firebase/firestore",hm="@firebase/vertexai",dm="@firebase/firestore-compat",fm="firebase",mm="11.6.1";/**
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
 */const Yi="[DEFAULT]",pm={[Wi]:"fire-core",[zf]:"fire-core-compat",[$f]:"fire-analytics",[jf]:"fire-analytics-compat",[Kf]:"fire-app-check",[Gf]:"fire-app-check-compat",[Qf]:"fire-auth",[Hf]:"fire-auth-compat",[Wf]:"fire-rtdb",[Yf]:"fire-data-connect",[Jf]:"fire-rtdb-compat",[Xf]:"fire-fn",[Zf]:"fire-fn-compat",[tm]:"fire-iid",[em]:"fire-iid-compat",[nm]:"fire-fcm",[rm]:"fire-fcm-compat",[sm]:"fire-perf",[im]:"fire-perf-compat",[om]:"fire-rc",[am]:"fire-rc-compat",[um]:"fire-gcs",[cm]:"fire-gcs-compat",[lm]:"fire-fst",[dm]:"fire-fst-compat",[hm]:"fire-vertex","fire-js":"fire-js",[fm]:"fire-js-all"};/**
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
 */const ws=new Map,gm=new Map,Ji=new Map;function wu(r,t){try{r.container.addComponent(t)}catch(e){Yt.debug(`Component ${t.name} failed to register with FirebaseApp ${r.name}`,e)}}function As(r){const t=r.name;if(Ji.has(t))return Yt.debug(`There were multiple attempts to register component ${t}.`),!1;Ji.set(t,r);for(const e of ws.values())wu(e,r);for(const e of gm.values())wu(e,r);return!0}function _m(r,t){const e=r.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),r.container.getProvider(t)}function ym(r){return r==null?!1:r.settings!==void 0}/**
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
 */const Im={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},he=new el("app","Firebase",Im);/**
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
 */class Em{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new lr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw he.create("app-deleted",{appName:this._name})}}/**
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
 */const Tm=mm;function il(r,t={}){let e=r;typeof t!="object"&&(t={name:t});const n=Object.assign({name:Yi,automaticDataCollectionEnabled:!1},t),s=n.name;if(typeof s!="string"||!s)throw he.create("bad-app-name",{appName:String(s)});if(e||(e=Xc()),!e)throw he.create("no-options");const i=ws.get(s);if(i){if(vs(e,i.options)&&vs(n,i.config))return i;throw he.create("duplicate-app",{appName:s})}const a=new Af(s);for(const l of Ji.values())a.addComponent(l);const u=new Em(e,n,a);return ws.set(s,u),u}function vm(r=Yi){const t=ws.get(r);if(!t&&r===Yi&&Xc())return il();if(!t)throw he.create("no-app",{appName:r});return t}function hn(r,t,e){var n;let s=(n=pm[r])!==null&&n!==void 0?n:r;e&&(s+=`-${e}`);const i=s.match(/\s|\//),a=t.match(/\s|\//);if(i||a){const u=[`Unable to register library "${s}" with version "${t}":`];i&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&u.push("and"),a&&u.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Yt.warn(u.join(" "));return}As(new lr(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
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
 */const wm="firebase-heartbeat-database",Am=1,hr="firebase-heartbeat-store";let Bi=null;function ol(){return Bi||(Bi=Ff(wm,Am,{upgrade:(r,t)=>{switch(t){case 0:try{r.createObjectStore(hr)}catch(e){console.warn(e)}}}}).catch(r=>{throw he.create("idb-open",{originalErrorMessage:r.message})})),Bi}async function Rm(r){try{const e=(await ol()).transaction(hr),n=await e.objectStore(hr).get(al(r));return await e.done,n}catch(t){if(t instanceof Pn)Yt.warn(t.message);else{const e=he.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Yt.warn(e.message)}}}async function Au(r,t){try{const n=(await ol()).transaction(hr,"readwrite");await n.objectStore(hr).put(t,al(r)),await n.done}catch(e){if(e instanceof Pn)Yt.warn(e.message);else{const n=he.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Yt.warn(n.message)}}}function al(r){return`${r.name}!${r.options.appId}`}/**
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
 */const bm=1024,Pm=30;class Vm{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Cm(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ru();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Pm){const a=Dm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){Yt.warn(n)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ru(),{heartbeatsToSend:n,unsentEntries:s}=Sm(this._heartbeatsCache.heartbeats),i=Es(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Yt.warn(e),""}}}function Ru(){return new Date().toISOString().substring(0,10)}function Sm(r,t=bm){const e=[];let n=r.slice();for(const s of r){const i=e.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),bu(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),bu(e)>t){e.pop();break}n=n.slice(1)}return{heartbeatsToSend:e,unsentEntries:n}}class Cm{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return tl()?_f().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Rm(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return Au(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return Au(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function bu(r){return Es(JSON.stringify({version:2,heartbeats:r})).length}function Dm(r){if(r.length===0)return-1;let t=0,e=r[0].date;for(let n=1;n<r.length;n++)r[n].date<e&&(e=r[n].date,t=n);return t}/**
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
 */function xm(r){As(new lr("platform-logger",t=>new Uf(t),"PRIVATE")),As(new lr("heartbeat",t=>new Vm(t),"PRIVATE")),hn(Wi,vu,r),hn(Wi,vu,"esm2017"),hn("fire-js","")}xm("");var Pu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var de,ul;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(I,g){function y(){}y.prototype=g.prototype,I.D=g.prototype,I.prototype=new y,I.prototype.constructor=I,I.C=function(E,v,R){for(var _=Array(arguments.length-2),Gt=2;Gt<arguments.length;Gt++)_[Gt-2]=arguments[Gt];return g.prototype[v].apply(E,_)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(n,e),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,y){y||(y=0);var E=Array(16);if(typeof g=="string")for(var v=0;16>v;++v)E[v]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(v=0;16>v;++v)E[v]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=I.g[0],y=I.g[1],v=I.g[2];var R=I.g[3],_=g+(R^y&(v^R))+E[0]+3614090360&4294967295;g=y+(_<<7&4294967295|_>>>25),_=R+(v^g&(y^v))+E[1]+3905402710&4294967295,R=g+(_<<12&4294967295|_>>>20),_=v+(y^R&(g^y))+E[2]+606105819&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(g^v&(R^g))+E[3]+3250441966&4294967295,y=v+(_<<22&4294967295|_>>>10),_=g+(R^y&(v^R))+E[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(v^g&(y^v))+E[5]+1200080426&4294967295,R=g+(_<<12&4294967295|_>>>20),_=v+(y^R&(g^y))+E[6]+2821735955&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(g^v&(R^g))+E[7]+4249261313&4294967295,y=v+(_<<22&4294967295|_>>>10),_=g+(R^y&(v^R))+E[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(v^g&(y^v))+E[9]+2336552879&4294967295,R=g+(_<<12&4294967295|_>>>20),_=v+(y^R&(g^y))+E[10]+4294925233&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(g^v&(R^g))+E[11]+2304563134&4294967295,y=v+(_<<22&4294967295|_>>>10),_=g+(R^y&(v^R))+E[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(v^g&(y^v))+E[13]+4254626195&4294967295,R=g+(_<<12&4294967295|_>>>20),_=v+(y^R&(g^y))+E[14]+2792965006&4294967295,v=R+(_<<17&4294967295|_>>>15),_=y+(g^v&(R^g))+E[15]+1236535329&4294967295,y=v+(_<<22&4294967295|_>>>10),_=g+(v^R&(y^v))+E[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(g^y))+E[6]+3225465664&4294967295,R=g+(_<<9&4294967295|_>>>23),_=v+(g^y&(R^g))+E[11]+643717713&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(v^R))+E[0]+3921069994&4294967295,y=v+(_<<20&4294967295|_>>>12),_=g+(v^R&(y^v))+E[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(g^y))+E[10]+38016083&4294967295,R=g+(_<<9&4294967295|_>>>23),_=v+(g^y&(R^g))+E[15]+3634488961&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(v^R))+E[4]+3889429448&4294967295,y=v+(_<<20&4294967295|_>>>12),_=g+(v^R&(y^v))+E[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(g^y))+E[14]+3275163606&4294967295,R=g+(_<<9&4294967295|_>>>23),_=v+(g^y&(R^g))+E[3]+4107603335&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(v^R))+E[8]+1163531501&4294967295,y=v+(_<<20&4294967295|_>>>12),_=g+(v^R&(y^v))+E[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^v&(g^y))+E[2]+4243563512&4294967295,R=g+(_<<9&4294967295|_>>>23),_=v+(g^y&(R^g))+E[7]+1735328473&4294967295,v=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(v^R))+E[12]+2368359562&4294967295,y=v+(_<<20&4294967295|_>>>12),_=g+(y^v^R)+E[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^v)+E[8]+2272392833&4294967295,R=g+(_<<11&4294967295|_>>>21),_=v+(R^g^y)+E[11]+1839030562&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^g)+E[14]+4259657740&4294967295,y=v+(_<<23&4294967295|_>>>9),_=g+(y^v^R)+E[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^v)+E[4]+1272893353&4294967295,R=g+(_<<11&4294967295|_>>>21),_=v+(R^g^y)+E[7]+4139469664&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^g)+E[10]+3200236656&4294967295,y=v+(_<<23&4294967295|_>>>9),_=g+(y^v^R)+E[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^v)+E[0]+3936430074&4294967295,R=g+(_<<11&4294967295|_>>>21),_=v+(R^g^y)+E[3]+3572445317&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^g)+E[6]+76029189&4294967295,y=v+(_<<23&4294967295|_>>>9),_=g+(y^v^R)+E[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^v)+E[12]+3873151461&4294967295,R=g+(_<<11&4294967295|_>>>21),_=v+(R^g^y)+E[15]+530742520&4294967295,v=R+(_<<16&4294967295|_>>>16),_=y+(v^R^g)+E[2]+3299628645&4294967295,y=v+(_<<23&4294967295|_>>>9),_=g+(v^(y|~R))+E[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~v))+E[7]+1126891415&4294967295,R=g+(_<<10&4294967295|_>>>22),_=v+(g^(R|~y))+E[14]+2878612391&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~g))+E[5]+4237533241&4294967295,y=v+(_<<21&4294967295|_>>>11),_=g+(v^(y|~R))+E[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~v))+E[3]+2399980690&4294967295,R=g+(_<<10&4294967295|_>>>22),_=v+(g^(R|~y))+E[10]+4293915773&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~g))+E[1]+2240044497&4294967295,y=v+(_<<21&4294967295|_>>>11),_=g+(v^(y|~R))+E[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~v))+E[15]+4264355552&4294967295,R=g+(_<<10&4294967295|_>>>22),_=v+(g^(R|~y))+E[6]+2734768916&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~g))+E[13]+1309151649&4294967295,y=v+(_<<21&4294967295|_>>>11),_=g+(v^(y|~R))+E[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~v))+E[11]+3174756917&4294967295,R=g+(_<<10&4294967295|_>>>22),_=v+(g^(R|~y))+E[2]+718787259&4294967295,v=R+(_<<15&4294967295|_>>>17),_=y+(R^(v|~g))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(v+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+v&4294967295,I.g[3]=I.g[3]+R&4294967295}n.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var y=g-this.blockSize,E=this.B,v=this.h,R=0;R<g;){if(v==0)for(;R<=y;)s(this,I,R),R+=this.blockSize;if(typeof I=="string"){for(;R<g;)if(E[v++]=I.charCodeAt(R++),v==this.blockSize){s(this,E),v=0;break}}else for(;R<g;)if(E[v++]=I[R++],v==this.blockSize){s(this,E),v=0;break}}this.h=v,this.o+=g},n.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var y=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=y&255,y/=256;for(this.u(I),I=Array(16),g=y=0;4>g;++g)for(var E=0;32>E;E+=8)I[y++]=this.g[g]>>>E&255;return I};function i(I,g){var y=u;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=g(I)}function a(I,g){this.h=g;for(var y=[],E=!0,v=I.length-1;0<=v;v--){var R=I[v]|0;E&&R==g||(y[v]=R,E=!1)}this.g=y}var u={};function l(I){return-128<=I&&128>I?i(I,function(g){return new a([g|0],0>g?-1:0)}):new a([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return p;if(0>I)return D(d(-I));for(var g=[],y=1,E=0;I>=y;E++)g[E]=I/y|0,y*=4294967296;return new a(g,0)}function m(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return D(m(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(g,8)),E=p,v=0;v<I.length;v+=8){var R=Math.min(8,I.length-v),_=parseInt(I.substring(v,v+R),g);8>R?(R=d(Math.pow(g,R)),E=E.j(R).add(d(_))):(E=E.j(y),E=E.add(d(_)))}return E}var p=l(0),T=l(1),P=l(16777216);r=a.prototype,r.m=function(){if(k(this))return-D(this).m();for(var I=0,g=1,y=0;y<this.g.length;y++){var E=this.i(y);I+=(0<=E?E:4294967296+E)*g,g*=4294967296}return I},r.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(C(this))return"0";if(k(this))return"-"+D(this).toString(I);for(var g=d(Math.pow(I,6)),y=this,E="";;){var v=Y(y,g).g;y=$(y,v.j(g));var R=((0<y.g.length?y.g[0]:y.h)>>>0).toString(I);if(y=v,C(y))return R+E;for(;6>R.length;)R="0"+R;E=R+E}},r.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function C(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function k(I){return I.h==-1}r.l=function(I){return I=$(this,I),k(I)?-1:C(I)?0:1};function D(I){for(var g=I.g.length,y=[],E=0;E<g;E++)y[E]=~I.g[E];return new a(y,~I.h).add(T)}r.abs=function(){return k(this)?D(this):this},r.add=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],E=0,v=0;v<=g;v++){var R=E+(this.i(v)&65535)+(I.i(v)&65535),_=(R>>>16)+(this.i(v)>>>16)+(I.i(v)>>>16);E=_>>>16,R&=65535,_&=65535,y[v]=_<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function $(I,g){return I.add(D(g))}r.j=function(I){if(C(this)||C(I))return p;if(k(this))return k(I)?D(this).j(D(I)):D(D(this).j(I));if(k(I))return D(this.j(D(I)));if(0>this.l(P)&&0>I.l(P))return d(this.m()*I.m());for(var g=this.g.length+I.g.length,y=[],E=0;E<2*g;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(var v=0;v<I.g.length;v++){var R=this.i(E)>>>16,_=this.i(E)&65535,Gt=I.i(v)>>>16,xn=I.i(v)&65535;y[2*E+2*v]+=_*xn,z(y,2*E+2*v),y[2*E+2*v+1]+=R*xn,z(y,2*E+2*v+1),y[2*E+2*v+1]+=_*Gt,z(y,2*E+2*v+1),y[2*E+2*v+2]+=R*Gt,z(y,2*E+2*v+2)}for(E=0;E<g;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=g;E<2*g;E++)y[E]=0;return new a(y,0)};function z(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function B(I,g){this.g=I,this.h=g}function Y(I,g){if(C(g))throw Error("division by zero");if(C(I))return new B(p,p);if(k(I))return g=Y(D(I),g),new B(D(g.g),D(g.h));if(k(g))return g=Y(I,D(g)),new B(D(g.g),g.h);if(30<I.g.length){if(k(I)||k(g))throw Error("slowDivide_ only works with positive integers.");for(var y=T,E=g;0>=E.l(I);)y=et(y),E=et(E);var v=H(y,1),R=H(E,1);for(E=H(E,2),y=H(y,2);!C(E);){var _=R.add(E);0>=_.l(I)&&(v=v.add(y),R=_),E=H(E,1),y=H(y,1)}return g=$(I,v.j(g)),new B(v,g)}for(v=p;0<=I.l(g);){for(y=Math.max(1,Math.floor(I.m()/g.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),R=d(y),_=R.j(g);k(_)||0<_.l(I);)y-=E,R=d(y),_=R.j(g);C(R)&&(R=T),v=v.add(R),I=$(I,_)}return new B(v,I)}r.A=function(I){return Y(this,I).h},r.and=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],E=0;E<g;E++)y[E]=this.i(E)&I.i(E);return new a(y,this.h&I.h)},r.or=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],E=0;E<g;E++)y[E]=this.i(E)|I.i(E);return new a(y,this.h|I.h)},r.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],E=0;E<g;E++)y[E]=this.i(E)^I.i(E);return new a(y,this.h^I.h)};function et(I){for(var g=I.g.length+1,y=[],E=0;E<g;E++)y[E]=I.i(E)<<1|I.i(E-1)>>>31;return new a(y,I.h)}function H(I,g){var y=g>>5;g%=32;for(var E=I.g.length-y,v=[],R=0;R<E;R++)v[R]=0<g?I.i(R+y)>>>g|I.i(R+y+1)<<32-g:I.i(R+y);return new a(v,I.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,ul=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,de=a}).apply(typeof Pu<"u"?Pu:typeof self<"u"?self:typeof window<"u"?window:{});var es=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var cl,tr,ll,cs,Xi,hl,dl,fl;(function(){var r,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,h){return o==Array.prototype||o==Object.prototype||(o[c]=h.value),o};function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof es=="object"&&es];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var n=e(this);function s(o,c){if(c)t:{var h=n;o=o.split(".");for(var f=0;f<o.length-1;f++){var A=o[f];if(!(A in h))break t;h=h[A]}o=o[o.length-1],f=h[o],c=c(f),c!=f&&c!=null&&t(h,o,{configurable:!0,writable:!0,value:c})}}function i(o,c){o instanceof String&&(o+="");var h=0,f=!1,A={next:function(){if(!f&&h<o.length){var b=h++;return{value:c(b,o[b]),done:!1}}return f=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(o){return o||function(){return i(this,function(c,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function l(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function d(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function m(o,c,h){return o.call.apply(o.bind,arguments)}function p(o,c,h){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,f),o.apply(c,A)}}return function(){return o.apply(c,arguments)}}function T(o,c,h){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:p,T.apply(null,arguments)}function P(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function C(o,c){function h(){}h.prototype=c.prototype,o.aa=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(f,A,b){for(var x=Array(arguments.length-2),tt=2;tt<arguments.length;tt++)x[tt-2]=arguments[tt];return c.prototype[A].apply(f,x)}}function k(o){const c=o.length;if(0<c){const h=Array(c);for(let f=0;f<c;f++)h[f]=o[f];return h}return[]}function D(o,c){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(l(f)){const A=o.length||0,b=f.length||0;o.length=A+b;for(let x=0;x<b;x++)o[A+x]=f[x]}else o.push(f)}}class ${constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function z(o){return/^[\s\xa0]*$/.test(o)}function B(){var o=u.navigator;return o&&(o=o.userAgent)?o:""}function Y(o){return Y[" "](o),o}Y[" "]=function(){};var et=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function H(o,c,h){for(const f in o)c.call(h,o[f],f,o)}function I(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function g(o){const c={};for(const h in o)c[h]=o[h];return c}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,c){let h,f;for(let A=1;A<arguments.length;A++){f=arguments[A];for(h in f)o[h]=f[h];for(let b=0;b<y.length;b++)h=y[b],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function v(o){var c=1;o=o.split(":");const h=[];for(;0<c&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function R(o){u.setTimeout(()=>{throw o},0)}function _(){var o=di;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class Gt{constructor(){this.h=this.g=null}add(c,h){const f=xn.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var xn=new $(()=>new vd,o=>o.reset());class vd{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Nn,kn=!1,di=new Gt,_a=()=>{const o=u.Promise.resolve(void 0);Nn=()=>{o.then(wd)}};var wd=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(h){R(h)}var c=xn;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}kn=!1};function ee(){this.s=this.s,this.C=this.C}ee.prototype.s=!1,ee.prototype.ma=function(){this.s||(this.s=!0,this.N())},ee.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function _t(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}_t.prototype.h=function(){this.defaultPrevented=!0};var Ad=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};u.addEventListener("test",h,c),u.removeEventListener("test",h,c)}catch{}return o}();function Mn(o,c){if(_t.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(et){t:{try{Y(c.nodeName);var A=!0;break t}catch{}A=!1}A||(c=null)}}else h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement);this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Rd[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Mn.aa.h.call(this)}}C(Mn,_t);var Rd={2:"touch",3:"pen",4:"mouse"};Mn.prototype.h=function(){Mn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Or="closure_listenable_"+(1e6*Math.random()|0),bd=0;function Pd(o,c,h,f,A){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=A,this.key=++bd,this.da=this.fa=!1}function Fr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Lr(o){this.src=o,this.g={},this.h=0}Lr.prototype.add=function(o,c,h,f,A){var b=o.toString();o=this.g[b],o||(o=this.g[b]=[],this.h++);var x=mi(o,c,f,A);return-1<x?(c=o[x],h||(c.fa=!1)):(c=new Pd(c,this.src,b,!!f,A),c.fa=h,o.push(c)),c};function fi(o,c){var h=c.type;if(h in o.g){var f=o.g[h],A=Array.prototype.indexOf.call(f,c,void 0),b;(b=0<=A)&&Array.prototype.splice.call(f,A,1),b&&(Fr(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function mi(o,c,h,f){for(var A=0;A<o.length;++A){var b=o[A];if(!b.da&&b.listener==c&&b.capture==!!h&&b.ha==f)return A}return-1}var pi="closure_lm_"+(1e6*Math.random()|0),gi={};function ya(o,c,h,f,A){if(Array.isArray(c)){for(var b=0;b<c.length;b++)ya(o,c[b],h,f,A);return null}return h=Ta(h),o&&o[Or]?o.K(c,h,d(f)?!!f.capture:!1,A):Vd(o,c,h,!1,f,A)}function Vd(o,c,h,f,A,b){if(!c)throw Error("Invalid event type");var x=d(A)?!!A.capture:!!A,tt=yi(o);if(tt||(o[pi]=tt=new Lr(o)),h=tt.add(c,h,f,x,b),h.proxy)return h;if(f=Sd(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)Ad||(A=x),A===void 0&&(A=!1),o.addEventListener(c.toString(),f,A);else if(o.attachEvent)o.attachEvent(Ea(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Sd(){function o(h){return c.call(o.src,o.listener,h)}const c=Cd;return o}function Ia(o,c,h,f,A){if(Array.isArray(c))for(var b=0;b<c.length;b++)Ia(o,c[b],h,f,A);else f=d(f)?!!f.capture:!!f,h=Ta(h),o&&o[Or]?(o=o.i,c=String(c).toString(),c in o.g&&(b=o.g[c],h=mi(b,h,f,A),-1<h&&(Fr(b[h]),Array.prototype.splice.call(b,h,1),b.length==0&&(delete o.g[c],o.h--)))):o&&(o=yi(o))&&(c=o.g[c.toString()],o=-1,c&&(o=mi(c,h,f,A)),(h=-1<o?c[o]:null)&&_i(h))}function _i(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Or])fi(c.i,o);else{var h=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(h,f,o.capture):c.detachEvent?c.detachEvent(Ea(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=yi(c))?(fi(h,o),h.h==0&&(h.src=null,c[pi]=null)):Fr(o)}}}function Ea(o){return o in gi?gi[o]:gi[o]="on"+o}function Cd(o,c){if(o.da)o=!0;else{c=new Mn(c,this);var h=o.listener,f=o.ha||o.src;o.fa&&_i(o),o=h.call(f,c)}return o}function yi(o){return o=o[pi],o instanceof Lr?o:null}var Ii="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ta(o){return typeof o=="function"?o:(o[Ii]||(o[Ii]=function(c){return o.handleEvent(c)}),o[Ii])}function yt(){ee.call(this),this.i=new Lr(this),this.M=this,this.F=null}C(yt,ee),yt.prototype[Or]=!0,yt.prototype.removeEventListener=function(o,c,h,f){Ia(this,o,c,h,f)};function Rt(o,c){var h,f=o.F;if(f)for(h=[];f;f=f.F)h.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new _t(c,o);else if(c instanceof _t)c.target=c.target||o;else{var A=c;c=new _t(f,o),E(c,A)}if(A=!0,h)for(var b=h.length-1;0<=b;b--){var x=c.g=h[b];A=Br(x,f,!0,c)&&A}if(x=c.g=o,A=Br(x,f,!0,c)&&A,A=Br(x,f,!1,c)&&A,h)for(b=0;b<h.length;b++)x=c.g=h[b],A=Br(x,f,!1,c)&&A}yt.prototype.N=function(){if(yt.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var h=o.g[c],f=0;f<h.length;f++)Fr(h[f]);delete o.g[c],o.h--}}this.F=null},yt.prototype.K=function(o,c,h,f){return this.i.add(String(o),c,!1,h,f)},yt.prototype.L=function(o,c,h,f){return this.i.add(String(o),c,!0,h,f)};function Br(o,c,h,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var A=!0,b=0;b<c.length;++b){var x=c[b];if(x&&!x.da&&x.capture==h){var tt=x.listener,mt=x.ha||x.src;x.fa&&fi(o.i,x),A=tt.call(mt,f)!==!1&&A}}return A&&!f.defaultPrevented}function va(o,c,h){if(typeof o=="function")h&&(o=T(o,h));else if(o&&typeof o.handleEvent=="function")o=T(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:u.setTimeout(o,c||0)}function wa(o){o.g=va(()=>{o.g=null,o.i&&(o.i=!1,wa(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class Dd extends ee{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:wa(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function On(o){ee.call(this),this.h=o,this.g={}}C(On,ee);var Aa=[];function Ra(o){H(o.g,function(c,h){this.g.hasOwnProperty(h)&&_i(c)},o),o.g={}}On.prototype.N=function(){On.aa.N.call(this),Ra(this)},On.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ei=u.JSON.stringify,xd=u.JSON.parse,Nd=class{stringify(o){return u.JSON.stringify(o,void 0)}parse(o){return u.JSON.parse(o,void 0)}};function Ti(){}Ti.prototype.h=null;function ba(o){return o.h||(o.h=o.i())}function Pa(){}var Fn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function vi(){_t.call(this,"d")}C(vi,_t);function wi(){_t.call(this,"c")}C(wi,_t);var Te={},Va=null;function Ur(){return Va=Va||new yt}Te.La="serverreachability";function Sa(o){_t.call(this,Te.La,o)}C(Sa,_t);function Ln(o){const c=Ur();Rt(c,new Sa(c))}Te.STAT_EVENT="statevent";function Ca(o,c){_t.call(this,Te.STAT_EVENT,o),this.stat=c}C(Ca,_t);function bt(o){const c=Ur();Rt(c,new Ca(c,o))}Te.Ma="timingevent";function Da(o,c){_t.call(this,Te.Ma,o),this.size=c}C(Da,_t);function Bn(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){o()},c)}function Un(){this.g=!0}Un.prototype.xa=function(){this.g=!1};function kd(o,c,h,f,A,b){o.info(function(){if(o.g)if(b)for(var x="",tt=b.split("&"),mt=0;mt<tt.length;mt++){var W=tt[mt].split("=");if(1<W.length){var It=W[0];W=W[1];var Et=It.split("_");x=2<=Et.length&&Et[1]=="type"?x+(It+"="+W+"&"):x+(It+"=redacted&")}}else x=null;else x=b;return"XMLHTTP REQ ("+f+") [attempt "+A+"]: "+c+`
`+h+`
`+x})}function Md(o,c,h,f,A,b,x){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+A+"]: "+c+`
`+h+`
`+b+" "+x})}function We(o,c,h,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Fd(o,h)+(f?" "+f:"")})}function Od(o,c){o.info(function(){return"TIMEOUT: "+c})}Un.prototype.info=function(){};function Fd(o,c){if(!o.g)return c;if(!c)return null;try{var h=JSON.parse(c);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var f=h[o];if(!(2>f.length)){var A=f[1];if(Array.isArray(A)&&!(1>A.length)){var b=A[0];if(b!="noop"&&b!="stop"&&b!="close")for(var x=1;x<A.length;x++)A[x]=""}}}}return Ei(h)}catch{return c}}var qr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},xa={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ai;function zr(){}C(zr,Ti),zr.prototype.g=function(){return new XMLHttpRequest},zr.prototype.i=function(){return{}},Ai=new zr;function ne(o,c,h,f){this.j=o,this.i=c,this.l=h,this.R=f||1,this.U=new On(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Na}function Na(){this.i=null,this.g="",this.h=!1}var ka={},Ri={};function bi(o,c,h){o.L=1,o.v=Kr(Kt(c)),o.m=h,o.P=!0,Ma(o,null)}function Ma(o,c){o.F=Date.now(),jr(o),o.A=Kt(o.v);var h=o.A,f=o.R;Array.isArray(f)||(f=[String(f)]),Wa(h.i,"t",f),o.C=0,h=o.j.J,o.h=new Na,o.g=fu(o.j,h?c:null,!o.m),0<o.O&&(o.M=new Dd(T(o.Y,o,o.g),o.O)),c=o.U,h=o.g,f=o.ca;var A="readystatechange";Array.isArray(A)||(A&&(Aa[0]=A.toString()),A=Aa);for(var b=0;b<A.length;b++){var x=ya(h,A[b],f||c.handleEvent,!1,c.h||c);if(!x)break;c.g[x.key]=x}c=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),Ln(),kd(o.i,o.u,o.A,o.l,o.R,o.m)}ne.prototype.ca=function(o){o=o.target;const c=this.M;c&&Qt(o)==3?c.j():this.Y(o)},ne.prototype.Y=function(o){try{if(o==this.g)t:{const Et=Qt(this.g);var c=this.g.Ba();const Xe=this.g.Z();if(!(3>Et)&&(Et!=3||this.g&&(this.h.h||this.g.oa()||nu(this.g)))){this.J||Et!=4||c==7||(c==8||0>=Xe?Ln(3):Ln(2)),Pi(this);var h=this.g.Z();this.X=h;e:if(Oa(this)){var f=nu(this.g);o="";var A=f.length,b=Qt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ve(this),qn(this);var x="";break e}this.h.i=new u.TextDecoder}for(c=0;c<A;c++)this.h.h=!0,o+=this.h.i.decode(f[c],{stream:!(b&&c==A-1)});f.length=0,this.h.g+=o,this.C=0,x=this.h.g}else x=this.g.oa();if(this.o=h==200,Md(this.i,this.u,this.A,this.l,this.R,Et,h),this.o){if(this.T&&!this.K){e:{if(this.g){var tt,mt=this.g;if((tt=mt.g?mt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!z(tt)){var W=tt;break e}}W=null}if(h=W)We(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Vi(this,h);else{this.o=!1,this.s=3,bt(12),ve(this),qn(this);break t}}if(this.P){h=!0;let Ft;for(;!this.J&&this.C<x.length;)if(Ft=Ld(this,x),Ft==Ri){Et==4&&(this.s=4,bt(14),h=!1),We(this.i,this.l,null,"[Incomplete Response]");break}else if(Ft==ka){this.s=4,bt(15),We(this.i,this.l,x,"[Invalid Chunk]"),h=!1;break}else We(this.i,this.l,Ft,null),Vi(this,Ft);if(Oa(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Et!=4||x.length!=0||this.h.h||(this.s=1,bt(16),h=!1),this.o=this.o&&h,!h)We(this.i,this.l,x,"[Invalid Chunked Response]"),ve(this),qn(this);else if(0<x.length&&!this.W){this.W=!0;var It=this.j;It.g==this&&It.ba&&!It.M&&(It.j.info("Great, no buffering proxy detected. Bytes received: "+x.length),ki(It),It.M=!0,bt(11))}}else We(this.i,this.l,x,null),Vi(this,x);Et==4&&ve(this),this.o&&!this.J&&(Et==4?cu(this.j,this):(this.o=!1,jr(this)))}else ef(this.g),h==400&&0<x.indexOf("Unknown SID")?(this.s=3,bt(12)):(this.s=0,bt(13)),ve(this),qn(this)}}}catch{}finally{}};function Oa(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Ld(o,c){var h=o.C,f=c.indexOf(`
`,h);return f==-1?Ri:(h=Number(c.substring(h,f)),isNaN(h)?ka:(f+=1,f+h>c.length?Ri:(c=c.slice(f,f+h),o.C=f+h,c)))}ne.prototype.cancel=function(){this.J=!0,ve(this)};function jr(o){o.S=Date.now()+o.I,Fa(o,o.I)}function Fa(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Bn(T(o.ba,o),c)}function Pi(o){o.B&&(u.clearTimeout(o.B),o.B=null)}ne.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Od(this.i,this.A),this.L!=2&&(Ln(),bt(17)),ve(this),this.s=2,qn(this)):Fa(this,this.S-o)};function qn(o){o.j.G==0||o.J||cu(o.j,o)}function ve(o){Pi(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Ra(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function Vi(o,c){try{var h=o.j;if(h.G!=0&&(h.g==o||Si(h.h,o))){if(!o.K&&Si(h.h,o)&&h.G==3){try{var f=h.Da.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var A=f;if(A[0]==0){t:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Xr(h),Yr(h);else break t;Ni(h),bt(18)}}else h.za=A[1],0<h.za-h.T&&37500>A[2]&&h.F&&h.v==0&&!h.C&&(h.C=Bn(T(h.Za,h),6e3));if(1>=Ua(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Ae(h,11)}else if((o.K||h.g==o)&&Xr(h),!z(c))for(A=h.Da.g.parse(c),c=0;c<A.length;c++){let W=A[c];if(h.T=W[0],W=W[1],h.G==2)if(W[0]=="c"){h.K=W[1],h.ia=W[2];const It=W[3];It!=null&&(h.la=It,h.j.info("VER="+h.la));const Et=W[4];Et!=null&&(h.Aa=Et,h.j.info("SVER="+h.Aa));const Xe=W[5];Xe!=null&&typeof Xe=="number"&&0<Xe&&(f=1.5*Xe,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const Ft=o.g;if(Ft){const ts=Ft.g?Ft.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ts){var b=f.h;b.g||ts.indexOf("spdy")==-1&&ts.indexOf("quic")==-1&&ts.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Ci(b,b.h),b.h=null))}if(f.D){const Mi=Ft.g?Ft.g.getResponseHeader("X-HTTP-Session-Id"):null;Mi&&(f.ya=Mi,nt(f.I,f.D,Mi))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var x=o;if(f.qa=du(f,f.J?f.ia:null,f.W),x.K){qa(f.h,x);var tt=x,mt=f.L;mt&&(tt.I=mt),tt.B&&(Pi(tt),jr(tt)),f.g=x}else au(f);0<h.i.length&&Jr(h)}else W[0]!="stop"&&W[0]!="close"||Ae(h,7);else h.G==3&&(W[0]=="stop"||W[0]=="close"?W[0]=="stop"?Ae(h,7):xi(h):W[0]!="noop"&&h.l&&h.l.ta(W),h.v=0)}}Ln(4)}catch{}}var Bd=class{constructor(o,c){this.g=o,this.map=c}};function La(o){this.l=o||10,u.PerformanceNavigationTiming?(o=u.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ba(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ua(o){return o.h?1:o.g?o.g.size:0}function Si(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Ci(o,c){o.g?o.g.add(c):o.h=c}function qa(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}La.prototype.cancel=function(){if(this.i=za(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function za(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.D);return c}return k(o.i)}function Ud(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var c=[],h=o.length,f=0;f<h;f++)c.push(o[f]);return c}c=[],h=0;for(f in o)c[h++]=o[f];return c}function qd(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var c=[];o=o.length;for(var h=0;h<o;h++)c.push(h);return c}c=[],h=0;for(const f in o)c[h++]=f;return c}}}function ja(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var h=qd(o),f=Ud(o),A=f.length,b=0;b<A;b++)c.call(void 0,f[b],h&&h[b],o)}var $a=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function zd(o,c){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var f=o[h].indexOf("="),A=null;if(0<=f){var b=o[h].substring(0,f);A=o[h].substring(f+1)}else b=o[h];c(b,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function we(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof we){this.h=o.h,$r(this,o.j),this.o=o.o,this.g=o.g,Gr(this,o.s),this.l=o.l;var c=o.i,h=new $n;h.i=c.i,c.g&&(h.g=new Map(c.g),h.h=c.h),Ga(this,h),this.m=o.m}else o&&(c=String(o).match($a))?(this.h=!1,$r(this,c[1]||"",!0),this.o=zn(c[2]||""),this.g=zn(c[3]||"",!0),Gr(this,c[4]),this.l=zn(c[5]||"",!0),Ga(this,c[6]||"",!0),this.m=zn(c[7]||"")):(this.h=!1,this.i=new $n(null,this.h))}we.prototype.toString=function(){var o=[],c=this.j;c&&o.push(jn(c,Ka,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(jn(c,Ka,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(jn(h,h.charAt(0)=="/"?Gd:$d,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",jn(h,Qd)),o.join("")};function Kt(o){return new we(o)}function $r(o,c,h){o.j=h?zn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Gr(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function Ga(o,c,h){c instanceof $n?(o.i=c,Hd(o.i,o.h)):(h||(c=jn(c,Kd)),o.i=new $n(c,o.h))}function nt(o,c,h){o.i.set(c,h)}function Kr(o){return nt(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function zn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function jn(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,jd),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function jd(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Ka=/[#\/\?@]/g,$d=/[#\?:]/g,Gd=/[#\?]/g,Kd=/[#\?@]/g,Qd=/#/g;function $n(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function re(o){o.g||(o.g=new Map,o.h=0,o.i&&zd(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}r=$n.prototype,r.add=function(o,c){re(this),this.i=null,o=Ye(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function Qa(o,c){re(o),c=Ye(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function Ha(o,c){return re(o),c=Ye(o,c),o.g.has(c)}r.forEach=function(o,c){re(this),this.g.forEach(function(h,f){h.forEach(function(A){o.call(c,A,f,this)},this)},this)},r.na=function(){re(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),h=[];for(let f=0;f<c.length;f++){const A=o[f];for(let b=0;b<A.length;b++)h.push(c[f])}return h},r.V=function(o){re(this);let c=[];if(typeof o=="string")Ha(this,o)&&(c=c.concat(this.g.get(Ye(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)c=c.concat(o[h])}return c},r.set=function(o,c){return re(this),this.i=null,o=Ye(this,o),Ha(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},r.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function Wa(o,c,h){Qa(o,c),0<h.length&&(o.i=null,o.g.set(Ye(o,c),k(h)),o.h+=h.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var h=0;h<c.length;h++){var f=c[h];const b=encodeURIComponent(String(f)),x=this.V(f);for(f=0;f<x.length;f++){var A=b;x[f]!==""&&(A+="="+encodeURIComponent(String(x[f]))),o.push(A)}}return this.i=o.join("&")};function Ye(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Hd(o,c){c&&!o.j&&(re(o),o.i=null,o.g.forEach(function(h,f){var A=f.toLowerCase();f!=A&&(Qa(this,f),Wa(this,A,h))},o)),o.j=c}function Wd(o,c){const h=new Un;if(u.Image){const f=new Image;f.onload=P(se,h,"TestLoadImage: loaded",!0,c,f),f.onerror=P(se,h,"TestLoadImage: error",!1,c,f),f.onabort=P(se,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=P(se,h,"TestLoadImage: timeout",!1,c,f),u.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function Yd(o,c){const h=new Un,f=new AbortController,A=setTimeout(()=>{f.abort(),se(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(b=>{clearTimeout(A),b.ok?se(h,"TestPingServer: ok",!0,c):se(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(A),se(h,"TestPingServer: error",!1,c)})}function se(o,c,h,f,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),f(h)}catch{}}function Jd(){this.g=new Nd}function Xd(o,c,h){const f=h||"";try{ja(o,function(A,b){let x=A;d(A)&&(x=Ei(A)),c.push(f+b+"="+encodeURIComponent(x))})}catch(A){throw c.push(f+"type="+encodeURIComponent("_badmap")),A}}function Qr(o){this.l=o.Ub||null,this.j=o.eb||!1}C(Qr,Ti),Qr.prototype.g=function(){return new Hr(this.l,this.j)},Qr.prototype.i=function(o){return function(){return o}}({});function Hr(o,c){yt.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Hr,yt),r=Hr.prototype,r.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,Kn(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||u).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Gn(this)),this.readyState=0},r.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Kn(this)),this.g&&(this.readyState=3,Kn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ya(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ya(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}r.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Gn(this):Kn(this),this.readyState==3&&Ya(this)}},r.Ra=function(o){this.g&&(this.response=this.responseText=o,Gn(this))},r.Qa=function(o){this.g&&(this.response=o,Gn(this))},r.ga=function(){this.g&&Gn(this)};function Gn(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Kn(o)}r.setRequestHeader=function(o,c){this.u.append(o,c)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function Kn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Hr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Ja(o){let c="";return H(o,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function Di(o,c,h){t:{for(f in h){var f=!1;break t}f=!0}f||(h=Ja(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):nt(o,c,h))}function at(o){yt.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(at,yt);var Zd=/^https?$/i,tf=["POST","PUT"];r=at.prototype,r.Ha=function(o){this.J=o},r.ea=function(o,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ai.g(),this.v=this.o?ba(this.o):ba(Ai),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(b){Xa(this,b);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var A in f)h.set(A,f[A]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const b of f.keys())h.set(b,f.get(b));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(b=>b.toLowerCase()=="content-type"),A=u.FormData&&o instanceof u.FormData,!(0<=Array.prototype.indexOf.call(tf,c,void 0))||f||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,x]of h)this.g.setRequestHeader(b,x);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{eu(this),this.u=!0,this.g.send(o),this.u=!1}catch(b){Xa(this,b)}};function Xa(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,Za(o),Wr(o)}function Za(o){o.A||(o.A=!0,Rt(o,"complete"),Rt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Rt(this,"complete"),Rt(this,"abort"),Wr(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Wr(this,!0)),at.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?tu(this):this.bb())},r.bb=function(){tu(this)};function tu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Qt(o)!=4||o.Z()!=2)){if(o.u&&Qt(o)==4)va(o.Ea,0,o);else if(Rt(o,"readystatechange"),Qt(o)==4){o.h=!1;try{const x=o.Z();t:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var h;if(!(h=c)){var f;if(f=x===0){var A=String(o.D).match($a)[1]||null;!A&&u.self&&u.self.location&&(A=u.self.location.protocol.slice(0,-1)),f=!Zd.test(A?A.toLowerCase():"")}h=f}if(h)Rt(o,"complete"),Rt(o,"success");else{o.m=6;try{var b=2<Qt(o)?o.g.statusText:""}catch{b=""}o.l=b+" ["+o.Z()+"]",Za(o)}}finally{Wr(o)}}}}function Wr(o,c){if(o.g){eu(o);const h=o.g,f=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||Rt(o,"ready");try{h.onreadystatechange=f}catch{}}}function eu(o){o.I&&(u.clearTimeout(o.I),o.I=null)}r.isActive=function(){return!!this.g};function Qt(o){return o.g?o.g.readyState:0}r.Z=function(){try{return 2<Qt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),xd(c)}};function nu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function ef(o){const c={};o=(o.g&&2<=Qt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(z(o[f]))continue;var h=v(o[f]);const A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const b=c[A]||[];c[A]=b,b.push(h)}I(c,function(f){return f.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Qn(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function ru(o){this.Aa=0,this.i=[],this.j=new Un,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Qn("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Qn("baseRetryDelayMs",5e3,o),this.cb=Qn("retryDelaySeedMs",1e4,o),this.Wa=Qn("forwardChannelMaxRetries",2,o),this.wa=Qn("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new La(o&&o.concurrentRequestLimit),this.Da=new Jd,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=ru.prototype,r.la=8,r.G=1,r.connect=function(o,c,h,f){bt(0),this.W=o,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=du(this,null,this.W),Jr(this)};function xi(o){if(su(o),o.G==3){var c=o.U++,h=Kt(o.I);if(nt(h,"SID",o.K),nt(h,"RID",c),nt(h,"TYPE","terminate"),Hn(o,h),c=new ne(o,o.j,c),c.L=2,c.v=Kr(Kt(h)),h=!1,u.navigator&&u.navigator.sendBeacon)try{h=u.navigator.sendBeacon(c.v.toString(),"")}catch{}!h&&u.Image&&(new Image().src=c.v,h=!0),h||(c.g=fu(c.j,null),c.g.ea(c.v)),c.F=Date.now(),jr(c)}hu(o)}function Yr(o){o.g&&(ki(o),o.g.cancel(),o.g=null)}function su(o){Yr(o),o.u&&(u.clearTimeout(o.u),o.u=null),Xr(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&u.clearTimeout(o.s),o.s=null)}function Jr(o){if(!Ba(o.h)&&!o.s){o.s=!0;var c=o.Ga;Nn||_a(),kn||(Nn(),kn=!0),di.add(c,o),o.B=0}}function nf(o,c){return Ua(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Bn(T(o.Ga,o,c),lu(o,o.B)),o.B++,!0)}r.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const A=new ne(this,this.j,o);let b=this.o;if(this.S&&(b?(b=g(b),E(b,this.S)):b=this.S),this.m!==null||this.O||(A.H=b,b=null),this.P)t:{for(var c=0,h=0;h<this.i.length;h++){e:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(c+=f,4096<c){c=h;break t}if(c===4096||h===this.i.length-1){c=h+1;break t}}c=1e3}else c=1e3;c=ou(this,A,c),h=Kt(this.I),nt(h,"RID",o),nt(h,"CVER",22),this.D&&nt(h,"X-HTTP-Session-Id",this.D),Hn(this,h),b&&(this.O?c="headers="+encodeURIComponent(String(Ja(b)))+"&"+c:this.m&&Di(h,this.m,b)),Ci(this.h,A),this.Ua&&nt(h,"TYPE","init"),this.P?(nt(h,"$req",c),nt(h,"SID","null"),A.T=!0,bi(A,h,null)):bi(A,h,c),this.G=2}}else this.G==3&&(o?iu(this,o):this.i.length==0||Ba(this.h)||iu(this))};function iu(o,c){var h;c?h=c.l:h=o.U++;const f=Kt(o.I);nt(f,"SID",o.K),nt(f,"RID",h),nt(f,"AID",o.T),Hn(o,f),o.m&&o.o&&Di(f,o.m,o.o),h=new ne(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),c&&(o.i=c.D.concat(o.i)),c=ou(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ci(o.h,h),bi(h,f,c)}function Hn(o,c){o.H&&H(o.H,function(h,f){nt(c,f,h)}),o.l&&ja({},function(h,f){nt(c,f,h)})}function ou(o,c,h){h=Math.min(o.i.length,h);var f=o.l?T(o.l.Na,o.l,o):null;t:{var A=o.i;let b=-1;for(;;){const x=["count="+h];b==-1?0<h?(b=A[0].g,x.push("ofs="+b)):b=0:x.push("ofs="+b);let tt=!0;for(let mt=0;mt<h;mt++){let W=A[mt].g;const It=A[mt].map;if(W-=b,0>W)b=Math.max(0,A[mt].g-100),tt=!1;else try{Xd(It,x,"req"+W+"_")}catch{f&&f(It)}}if(tt){f=x.join("&");break t}}}return o=o.i.splice(0,h),c.D=o,f}function au(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;Nn||_a(),kn||(Nn(),kn=!0),di.add(c,o),o.v=0}}function Ni(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Bn(T(o.Fa,o),lu(o,o.v)),o.v++,!0)}r.Fa=function(){if(this.u=null,uu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Bn(T(this.ab,this),o)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,bt(10),Yr(this),uu(this))};function ki(o){o.A!=null&&(u.clearTimeout(o.A),o.A=null)}function uu(o){o.g=new ne(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=Kt(o.qa);nt(c,"RID","rpc"),nt(c,"SID",o.K),nt(c,"AID",o.T),nt(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&nt(c,"TO",o.ja),nt(c,"TYPE","xmlhttp"),Hn(o,c),o.m&&o.o&&Di(c,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Kr(Kt(c)),h.m=null,h.P=!0,Ma(h,o)}r.Za=function(){this.C!=null&&(this.C=null,Yr(this),Ni(this),bt(19))};function Xr(o){o.C!=null&&(u.clearTimeout(o.C),o.C=null)}function cu(o,c){var h=null;if(o.g==c){Xr(o),ki(o),o.g=null;var f=2}else if(Si(o.h,c))h=c.D,qa(o.h,c),f=1;else return;if(o.G!=0){if(c.o)if(f==1){h=c.m?c.m.length:0,c=Date.now()-c.F;var A=o.B;f=Ur(),Rt(f,new Da(f,h)),Jr(o)}else au(o);else if(A=c.s,A==3||A==0&&0<c.X||!(f==1&&nf(o,c)||f==2&&Ni(o)))switch(h&&0<h.length&&(c=o.h,c.i=c.i.concat(h)),A){case 1:Ae(o,5);break;case 4:Ae(o,10);break;case 3:Ae(o,6);break;default:Ae(o,2)}}}function lu(o,c){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*c}function Ae(o,c){if(o.j.info("Error code "+c),c==2){var h=T(o.fb,o),f=o.Xa;const A=!f;f=new we(f||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||$r(f,"https"),Kr(f),A?Wd(f.toString(),h):Yd(f.toString(),h)}else bt(2);o.G=0,o.l&&o.l.sa(c),hu(o),su(o)}r.fb=function(o){o?(this.j.info("Successfully pinged google.com"),bt(2)):(this.j.info("Failed to ping google.com"),bt(1))};function hu(o){if(o.G=0,o.ka=[],o.l){const c=za(o.h);(c.length!=0||o.i.length!=0)&&(D(o.ka,c),D(o.ka,o.i),o.h.i.length=0,k(o.i),o.i.length=0),o.l.ra()}}function du(o,c,h){var f=h instanceof we?Kt(h):new we(h);if(f.g!="")c&&(f.g=c+"."+f.g),Gr(f,f.s);else{var A=u.location;f=A.protocol,c=c?c+"."+A.hostname:A.hostname,A=+A.port;var b=new we(null);f&&$r(b,f),c&&(b.g=c),A&&Gr(b,A),h&&(b.l=h),f=b}return h=o.D,c=o.ya,h&&c&&nt(f,h,c),nt(f,"VER",o.la),Hn(o,f),f}function fu(o,c,h){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new at(new Qr({eb:h})):new at(o.pa),c.Ha(o.J),c}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function mu(){}r=mu.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Zr(){}Zr.prototype.g=function(o,c){return new Dt(o,c)};function Dt(o,c){yt.call(this),this.g=new ru(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!z(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!z(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new Je(this)}C(Dt,yt),Dt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Dt.prototype.close=function(){xi(this.g)},Dt.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Ei(o),o=h);c.i.push(new Bd(c.Ya++,o)),c.G==3&&Jr(c)},Dt.prototype.N=function(){this.g.l=null,delete this.j,xi(this.g),delete this.g,Dt.aa.N.call(this)};function pu(o){vi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){t:{for(const h in c){o=h;break t}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}C(pu,vi);function gu(){wi.call(this),this.status=1}C(gu,wi);function Je(o){this.g=o}C(Je,mu),Je.prototype.ua=function(){Rt(this.g,"a")},Je.prototype.ta=function(o){Rt(this.g,new pu(o))},Je.prototype.sa=function(o){Rt(this.g,new gu)},Je.prototype.ra=function(){Rt(this.g,"b")},Zr.prototype.createWebChannel=Zr.prototype.g,Dt.prototype.send=Dt.prototype.o,Dt.prototype.open=Dt.prototype.m,Dt.prototype.close=Dt.prototype.close,fl=function(){return new Zr},dl=function(){return Ur()},hl=Te,Xi={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},qr.NO_ERROR=0,qr.TIMEOUT=8,qr.HTTP_ERROR=6,cs=qr,xa.COMPLETE="complete",ll=xa,Pa.EventType=Fn,Fn.OPEN="a",Fn.CLOSE="b",Fn.ERROR="c",Fn.MESSAGE="d",yt.prototype.listen=yt.prototype.K,tr=Pa,at.prototype.listenOnce=at.prototype.L,at.prototype.getLastError=at.prototype.Ka,at.prototype.getLastErrorCode=at.prototype.Ba,at.prototype.getStatus=at.prototype.Z,at.prototype.getResponseJson=at.prototype.Oa,at.prototype.getResponseText=at.prototype.oa,at.prototype.send=at.prototype.ea,at.prototype.setWithCredentials=at.prototype.Ha,cl=at}).apply(typeof es<"u"?es:typeof self<"u"?self:typeof window<"u"?window:{});const Vu="@firebase/firestore",Su="4.7.11";/**
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
 */class pt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}pt.UNAUTHENTICATED=new pt(null),pt.GOOGLE_CREDENTIALS=new pt("google-credentials-uid"),pt.FIRST_PARTY=new pt("first-party-uid"),pt.MOCK_USER=new pt("mock-user");/**
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
 */let Vn="11.6.1";/**
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
 */const Fe=new nl("@firebase/firestore");function on(){return Fe.logLevel}function S(r,...t){if(Fe.logLevel<=Q.DEBUG){const e=t.map(Po);Fe.debug(`Firestore (${Vn}): ${r}`,...e)}}function Pt(r,...t){if(Fe.logLevel<=Q.ERROR){const e=t.map(Po);Fe.error(`Firestore (${Vn}): ${r}`,...e)}}function Le(r,...t){if(Fe.logLevel<=Q.WARN){const e=t.map(Po);Fe.warn(`Firestore (${Vn}): ${r}`,...e)}}function Po(r){if(typeof r=="string")return r;try{/**
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
*/return function(e){return JSON.stringify(e)}(r)}catch{return r}}/**
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
 */function O(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,ml(r,n,e)}function ml(r,t,e){let n=`FIRESTORE (${Vn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw Pt(n),new Error(n)}function F(r,t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,r||ml(t,s,n)}function q(r,t){return r}/**
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
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends Pn{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Wt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
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
 */class pl{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Nm{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(pt.UNAUTHENTICATED))}shutdown(){}}class km{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Mm{constructor(t){this.t=t,this.currentUser=pt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){F(this.o===void 0,42304);let n=this.i;const s=l=>this.i!==n?(n=this.i,e(l)):Promise.resolve();let i=new Wt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Wt,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;t.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},u=l=>{S("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>u(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?u(l):(S("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Wt)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(S("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(F(typeof n.accessToken=="string",31837,{l:n}),new pl(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return F(t===null||typeof t=="string",2055,{h:t}),new pt(t)}}class Om{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=pt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Fm{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new Om(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(pt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Cu{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Lm{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ym(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){F(this.o===void 0,3512);const n=i=>{i.error!=null&&S("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,S("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>n(i))};const s=i=>{S("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):S("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Cu(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(F(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Cu(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Bm(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
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
 */function gl(){return new TextEncoder}/**
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
 */class _l{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=Bm(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%62))}return n}}function U(r,t){return r<t?-1:r>t?1:0}function Zi(r,t){let e=0;for(;e<r.length&&e<t.length;){const n=r.codePointAt(e),s=t.codePointAt(e);if(n!==s){if(n<128&&s<128)return U(n,s);{const i=gl(),a=Um(i.encode(Du(r,e)),i.encode(Du(t,e)));return a!==0?a:U(n,s)}}e+=n>65535?2:1}return U(r.length,t.length)}function Du(r,t){return r.codePointAt(t)>65535?r.substring(t,t+2):r.substring(t,t+1)}function Um(r,t){for(let e=0;e<r.length&&e<t.length;++e)if(r[e]!==t[e])return U(r[e],t[e]);return U(r.length,t.length)}function fn(r,t,e){return r.length===t.length&&r.every((n,s)=>e(n,t[s]))}function yl(r){return r+"\0"}/**
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
 */const xu=-62135596800,Nu=1e6;class ot{static now(){return ot.fromMillis(Date.now())}static fromDate(t){return ot.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Nu);return new ot(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new N(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new N(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<xu)throw new N(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new N(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Nu}_compareTo(t){return this.seconds===t.seconds?U(this.nanoseconds,t.nanoseconds):U(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-xu;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new ot(0,0))}static max(){return new L(new ot(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const ku="__name__";class Ut{constructor(t,e,n){e===void 0?e=0:e>t.length&&O(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&O(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return Ut.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ut?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const i=Ut.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return U(t.length,e.length)}static compareSegments(t,e){const n=Ut.isNumericId(t),s=Ut.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?Ut.extractNumericId(t).compare(Ut.extractNumericId(e)):Zi(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return de.fromString(t.substring(4,t.length-2))}}class J extends Ut{construct(t,e,n){return new J(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new N(V.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(s=>s.length>0))}return new J(e)}static emptyPath(){return new J([])}}const qm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class it extends Ut{construct(t,e,n){return new it(t,e,n)}static isValidIdentifier(t){return qm.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),it.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ku}static keyField(){return new it([ku])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(n.length===0)throw new N(V.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new N(V.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const l=t[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new N(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=l,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(i(),s++)}if(i(),a)throw new N(V.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new it(e)}static emptyPath(){return new it([])}}/**
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
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(J.fromString(t))}static fromName(t){return new M(J.fromString(t).popFirst(5))}static empty(){return new M(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&J.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return J.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new J(t.slice()))}}/**
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
 */const dr=-1;class Rs{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}function to(r){return r.fields.find(t=>t.kind===2)}function Pe(r){return r.fields.filter(t=>t.kind!==2)}Rs.UNKNOWN_ID=-1;class ls{constructor(t,e){this.fieldPath=t,this.kind=e}}class fr{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new fr(0,kt.min())}}function zm(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=L.fromTimestamp(n===1e9?new ot(e+1,0):new ot(e,n));return new kt(s,M.empty(),t)}function Il(r){return new kt(r.readTime,r.key,dr)}class kt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new kt(L.min(),M.empty(),dr)}static max(){return new kt(L.max(),M.empty(),dr)}}function Vo(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(r.documentKey,t.documentKey),e!==0?e:U(r.largestBatchId,t.largestBatchId))}/**
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
 */const El="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Tl{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
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
 */async function Ge(r){if(r.code!==V.FAILED_PRECONDITION||r.message!==El)throw r;S("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class w{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new w((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof w?e:w.resolve(e)}catch(e){return w.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):w.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):w.reject(e)}static resolve(t){return new w((e,n)=>{e(t)})}static reject(t){return new w((e,n)=>{n(t)})}static waitFor(t){return new w((e,n)=>{let s=0,i=0,a=!1;t.forEach(u=>{++s,u.next(()=>{++i,a&&i===s&&e()},l=>n(l))}),a=!0,i===s&&e()})}static or(t){let e=w.resolve(!1);for(const n of t)e=e.next(s=>s?w.resolve(s):n());return e}static forEach(t,e){const n=[];return t.forEach((s,i)=>{n.push(e.call(this,s,i))}),this.waitFor(n)}static mapArray(t,e){return new w((n,s)=>{const i=t.length,a=new Array(i);let u=0;for(let l=0;l<i;l++){const d=l;e(t[d]).next(m=>{a[d]=m,++u,u===i&&n(a)},m=>s(m))}})}static doWhile(t,e){return new w((n,s)=>{const i=()=>{t()===!0?e().next(()=>{i()},s):n()};i()})}}/**
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
 */const xt="SimpleDb";class js{static open(t,e,n,s){try{return new js(e,t.transaction(s,n))}catch(i){throw new sr(e,i)}}constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.S=new Wt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{e.error?this.S.reject(new sr(t,e.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=So(n.target.error);this.S.reject(new sr(t,s))}}get D(){return this.S.promise}abort(t){t&&this.S.reject(t),this.aborted||(S(xt,"Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}v(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new $m(e)}}class fe{static delete(t){return S(xt,"Removing database:",t),Se(Jc().indexedDB.deleteDatabase(t)).toPromise()}static C(){if(!tl())return!1;if(fe.F())return!0;const t=Ts(),e=fe.M(t),n=0<e&&e<10,s=vl(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static F(){var t;return typeof process<"u"&&((t=process.__PRIVATE_env)===null||t===void 0?void 0:t.O)==="YES"}static N(t,e){return t.store(e)}static M(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(t,e,n){this.name=t,this.version=e,this.B=n,this.L=null,fe.M(Ts())===12.2&&Pt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async k(t){return this.db||(S(xt,"Opening database:",this.name),this.db=await new Promise((e,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;e(a)},s.onblocked=()=>{n(new sr(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new N(V.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new N(V.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new sr(t,a))},s.onupgradeneeded=i=>{S(xt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;if(this.L!==null&&this.L!==i.oldVersion)throw new Error(`refusing to open IndexedDB database due to potential corruption of the IndexedDB database data; this corruption could be caused by clicking the "clear site data" button in a web browser; try reloading the web page to re-initialize the IndexedDB database: lastClosedDbVersion=${this.L}, event.oldVersion=${i.oldVersion}, event.newVersion=${i.newVersion}, db.version=${a.version}`);this.B.q(a,s.transaction,i.oldVersion,this.version).next(()=>{S(xt,"Database upgrade to version "+this.version+" complete")})}}),this.db.addEventListener("close",e=>{const n=e.target;this.L=n.version},{passive:!0})),this.$&&(this.db.onversionchange=e=>this.$(e)),this.db}U(t){this.$=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,s){const i=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.k(t);const u=js.open(this.db,t,i?"readonly":"readwrite",n),l=s(u).next(d=>(u.v(),d)).catch(d=>(u.abort(d),w.reject(d))).toPromise();return l.catch(()=>{}),await u.D,l}catch(u){const l=u,d=l.name!=="FirebaseError"&&a<3;if(S(xt,"Transaction failed with error:",l.message,"Retrying:",d),this.close(),!d)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function vl(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class jm{constructor(t){this.K=t,this.W=!1,this.G=null}get isDone(){return this.W}get j(){return this.G}set cursor(t){this.K=t}done(){this.W=!0}H(t){this.G=t}delete(){return Se(this.K.delete())}}class sr extends N{constructor(t,e){super(V.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Ie(r){return r.name==="IndexedDbTransactionError"}class $m{constructor(t){this.store=t}put(t,e){let n;return e!==void 0?(S(xt,"PUT",this.store.name,t,e),n=this.store.put(e,t)):(S(xt,"PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),Se(n)}add(t){return S(xt,"ADD",this.store.name,t,t),Se(this.store.add(t))}get(t){return Se(this.store.get(t)).next(e=>(e===void 0&&(e=null),S(xt,"GET",this.store.name,t,e),e))}delete(t){return S(xt,"DELETE",this.store.name,t),Se(this.store.delete(t))}count(){return S(xt,"COUNT",this.store.name),Se(this.store.count())}J(t,e){const n=this.options(t,e),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new w((a,u)=>{i.onerror=l=>{u(l.target.error)},i.onsuccess=l=>{a(l.target.result)}})}{const i=this.cursor(n),a=[];return this.Y(i,(u,l)=>{a.push(l)}).next(()=>a)}}Z(t,e){const n=this.store.getAll(t,e===null?void 0:e);return new w((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}})}X(t,e){S(xt,"DELETE ALL",this.store.name);const n=this.options(t,e);n.ee=!1;const s=this.cursor(n);return this.Y(s,(i,a,u)=>u.delete())}te(t,e){let n;e?n=t:(n={},e=t);const s=this.cursor(n);return this.Y(s,e)}ne(t){const e=this.cursor({});return new w((n,s)=>{e.onerror=i=>{const a=So(i.target.error);s(a)},e.onsuccess=i=>{const a=i.target.result;a?t(a.primaryKey,a.value).next(u=>{u?a.continue():n()}):n()}})}Y(t,e){const n=[];return new w((s,i)=>{t.onerror=a=>{i(a.target.error)},t.onsuccess=a=>{const u=a.target.result;if(!u)return void s();const l=new jm(u),d=e(u.primaryKey,u.value,l);if(d instanceof w){const m=d.catch(p=>(l.done(),w.reject(p)));n.push(m)}l.isDone?s():l.j===null?u.continue():u.continue(l.j)}}).next(()=>w.waitFor(n))}options(t,e){let n;return t!==void 0&&(typeof t=="string"?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.ee?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function Se(r){return new w((t,e)=>{r.onsuccess=n=>{const s=n.target.result;t(s)},r.onerror=n=>{const s=So(n.target.error);e(s)}})}let Mu=!1;function So(r){const t=fe.M(Ts());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(e)>=0){const n=new N("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Mu||(Mu=!0,setTimeout(()=>{throw n},0)),n}}return r}const ir="IndexBackfiller";class Gm{constructor(t,e){this.asyncQueue=t,this.re=e,this.task=null}start(){this.ie(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}ie(t){S(ir,`Scheduled in ${t}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,async()=>{this.task=null;try{const e=await this.re.se();S(ir,`Documents written: ${e}`)}catch(e){Ie(e)?S(ir,"Ignoring IndexedDB error during index backfill: ",e):await Ge(e)}await this.ie(6e4)})}}class Km{constructor(t,e){this.localStore=t,this.persistence=e}async se(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",e=>this.oe(e,t))}oe(t,e){const n=new Set;let s=e,i=!0;return w.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next(a=>{if(a!==null&&!n.has(a))return S(ir,`Processing collection: ${a}`),this._e(t,a,s).next(u=>{s-=u,n.add(a)});i=!1})).next(()=>e-s)}_e(t,e,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next(s=>this.localStore.localDocuments.getNextDocuments(t,e,s,n).next(i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next(()=>this.ae(s,i)).next(u=>(S(ir,`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(t,e,u))).next(()=>a.size)}))}ae(t,e){let n=t;return e.changes.forEach((s,i)=>{const a=Il(i);Vo(a,n)>0&&(n=a)}),new kt(n.readTime,n.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
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
 */class Mt{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ue(n),this.ce=n=>e.writeSequenceNumber(n))}ue(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ce&&this.ce(t),t}}Mt.le=-1;/**
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
 */const ke=-1;function $s(r){return r==null}function mr(r){return r===0&&1/r==-1/0}function Qm(r){return typeof r=="number"&&Number.isInteger(r)&&!mr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */const bs="";function At(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=Ou(t)),t=Hm(r.get(e),t);return Ou(t)}function Hm(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":e+="";break;case bs:e+="";break;default:e+=i}}return e}function Ou(r){return r+bs+""}function qt(r){const t=r.length;if(F(t>=2,64408,{path:r}),t===2)return F(r.charAt(0)===bs&&r.charAt(1)==="",56145,{path:r}),J.emptyPath();const e=t-2,n=[];let s="";for(let i=0;i<t;){const a=r.indexOf(bs,i);switch((a<0||a>e)&&O(50515,{path:r}),r.charAt(a+1)){case"":const u=r.substring(i,a);let l;s.length===0?l=u:(s+=u,l=s,s=""),n.push(l);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:O(61167,{path:r})}i=a+2}return new J(n)}/**
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
 */const Ve="remoteDocuments",br="owner",Ze="owner",pr="mutationQueues",Wm="userId",Lt="mutations",Fu="batchId",Ne="userMutationsIndex",Lu=["userId","batchId"];/**
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
 */function hs(r,t){return[r,At(t)]}function wl(r,t,e){return[r,At(t),e]}const Ym={},mn="documentMutations",Ps="remoteDocumentsV14",Jm=["prefixPath","collectionGroup","readTime","documentId"],ds="documentKeyIndex",Xm=["prefixPath","collectionGroup","documentId"],Al="collectionGroupIndex",Zm=["collectionGroup","readTime","prefixPath","documentId"],gr="remoteDocumentGlobal",eo="remoteDocumentGlobalKey",pn="targets",Rl="queryTargetsIndex",tp=["canonicalId","targetId"],gn="targetDocuments",ep=["targetId","path"],Co="documentTargetsIndex",np=["path","targetId"],Vs="targetGlobalKey",Me="targetGlobal",_r="collectionParents",rp=["collectionId","parent"],_n="clientMetadata",sp="clientId",Gs="bundles",ip="bundleId",Ks="namedQueries",op="name",Do="indexConfiguration",ap="indexId",no="collectionGroupIndex",up="collectionGroup",Ss="indexState",cp=["indexId","uid"],bl="sequenceNumberIndex",lp=["uid","sequenceNumber"],Cs="indexEntries",hp=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Pl="documentKeyIndex",dp=["indexId","uid","orderedDocumentKey"],Qs="documentOverlays",fp=["userId","collectionPath","documentId"],ro="collectionPathOverlayIndex",mp=["userId","collectionPath","largestBatchId"],Vl="collectionGroupOverlayIndex",pp=["userId","collectionGroup","largestBatchId"],xo="globals",gp="name",Sl=[pr,Lt,mn,Ve,pn,br,Me,gn,_n,gr,_r,Gs,Ks],_p=[...Sl,Qs],Cl=[pr,Lt,mn,Ps,pn,br,Me,gn,_n,gr,_r,Gs,Ks,Qs],Dl=Cl,No=[...Dl,Do,Ss,Cs],yp=No,Ip=[...No,xo];/**
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
 */class so extends Tl{constructor(t,e){super(),this.he=t,this.currentSequenceNumber=e}}function ht(r,t){const e=q(r);return fe.N(e.he,t)}/**
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
 */function Bu(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function Ee(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function xl(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
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
 */class st{constructor(t,e){this.comparator=t,this.root=e||gt.EMPTY}insert(t,e){return new st(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,gt.BLACK,null,null))}remove(t){return new st(this.comparator,this.root.remove(t,this.comparator).copy(null,null,gt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new ns(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new ns(this.root,t,this.comparator,!1)}getReverseIterator(){return new ns(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new ns(this.root,t,this.comparator,!0)}}class ns{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class gt{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=n??gt.RED,this.left=s??gt.EMPTY,this.right=i??gt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new gt(t??this.key,e??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return gt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return gt.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,gt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,gt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw O(27949);return t+(this.isRed()?0:1)}}gt.EMPTY=null,gt.RED=!0,gt.BLACK=!1;gt.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(t,e,n,s,i){return this}insert(t,e,n){return new gt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Z{constructor(t){this.comparator=t,this.data=new st(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Uu(this.data.getIterator())}getIteratorFrom(t){return new Uu(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof Z)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new Z(this.comparator);return e.data=t,e}}class Uu{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function tn(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class St{constructor(t){this.fields=t,t.sort(it.comparator)}static empty(){return new St([])}unionWith(t){let e=new Z(it.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new St(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return fn(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
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
 */class Nl extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class lt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Nl("Invalid base64 string: "+i):i}}(t);return new lt(e)}static fromUint8Array(t){const e=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(t);return new lt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return U(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}lt.EMPTY_BYTE_STRING=new lt("");const Ep=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Jt(r){if(F(!!r,39018),typeof r=="string"){let t=0;const e=Ep.exec(r);if(F(!!e,46558,{timestamp:r}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:rt(r.seconds),nanos:rt(r.nanos)}}function rt(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Xt(r){return typeof r=="string"?lt.fromBase64String(r):lt.fromUint8Array(r)}/**
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
 */const kl="server_timestamp",Ml="__type__",Ol="__previous_value__",Fl="__local_write_time__";function ko(r){var t,e;return((e=(((t=r==null?void 0:r.mapValue)===null||t===void 0?void 0:t.fields)||{})[Ml])===null||e===void 0?void 0:e.stringValue)===kl}function Hs(r){const t=r.mapValue.fields[Ol];return ko(t)?Hs(t):t}function yr(r){const t=Jt(r.mapValue.fields[Fl].timestampValue);return new ot(t.seconds,t.nanos)}/**
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
 */class Tp{constructor(t,e,n,s,i,a,u,l,d){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=l,this.useFetchStreams=d}}const Ds="(default)";class Be{constructor(t,e){this.projectId=t,this.database=e||Ds}static empty(){return new Be("","")}get isDefaultDatabase(){return this.database===Ds}isEqual(t){return t instanceof Be&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const Mo="__type__",Ll="__max__",ce={mapValue:{fields:{__type__:{stringValue:Ll}}}},Oo="__vector__",yn="value",fs={nullValue:"NULL_VALUE"};function pe(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?ko(r)?4:Bl(r)?9007199254740991:Ws(r)?10:11:O(28295,{value:r})}function jt(r,t){if(r===t)return!0;const e=pe(r);if(e!==pe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return yr(r).isEqual(yr(t));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Jt(s.timestampValue),u=Jt(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(s,i){return Xt(s.bytesValue).isEqual(Xt(i.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(s,i){return rt(s.geoPointValue.latitude)===rt(i.geoPointValue.latitude)&&rt(s.geoPointValue.longitude)===rt(i.geoPointValue.longitude)}(r,t);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return rt(s.integerValue)===rt(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=rt(s.doubleValue),u=rt(i.doubleValue);return a===u?mr(a)===mr(u):isNaN(a)&&isNaN(u)}return!1}(r,t);case 9:return fn(r.arrayValue.values||[],t.arrayValue.values||[],jt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(Bu(a)!==Bu(u))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(u[l]===void 0||!jt(a[l],u[l])))return!1;return!0}(r,t);default:return O(52216,{left:r})}}function Ir(r,t){return(r.values||[]).find(e=>jt(e,t))!==void 0}function ge(r,t){if(r===t)return 0;const e=pe(r),n=pe(t);if(e!==n)return U(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return U(r.booleanValue,t.booleanValue);case 2:return function(i,a){const u=rt(i.integerValue||i.doubleValue),l=rt(a.integerValue||a.doubleValue);return u<l?-1:u>l?1:u===l?0:isNaN(u)?isNaN(l)?0:-1:1}(r,t);case 3:return qu(r.timestampValue,t.timestampValue);case 4:return qu(yr(r),yr(t));case 5:return Zi(r.stringValue,t.stringValue);case 6:return function(i,a){const u=Xt(i),l=Xt(a);return u.compareTo(l)}(r.bytesValue,t.bytesValue);case 7:return function(i,a){const u=i.split("/"),l=a.split("/");for(let d=0;d<u.length&&d<l.length;d++){const m=U(u[d],l[d]);if(m!==0)return m}return U(u.length,l.length)}(r.referenceValue,t.referenceValue);case 8:return function(i,a){const u=U(rt(i.latitude),rt(a.latitude));return u!==0?u:U(rt(i.longitude),rt(a.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return zu(r.arrayValue,t.arrayValue);case 10:return function(i,a){var u,l,d,m;const p=i.fields||{},T=a.fields||{},P=(u=p[yn])===null||u===void 0?void 0:u.arrayValue,C=(l=T[yn])===null||l===void 0?void 0:l.arrayValue,k=U(((d=P==null?void 0:P.values)===null||d===void 0?void 0:d.length)||0,((m=C==null?void 0:C.values)===null||m===void 0?void 0:m.length)||0);return k!==0?k:zu(P,C)}(r.mapValue,t.mapValue);case 11:return function(i,a){if(i===ce.mapValue&&a===ce.mapValue)return 0;if(i===ce.mapValue)return 1;if(a===ce.mapValue)return-1;const u=i.fields||{},l=Object.keys(u),d=a.fields||{},m=Object.keys(d);l.sort(),m.sort();for(let p=0;p<l.length&&p<m.length;++p){const T=Zi(l[p],m[p]);if(T!==0)return T;const P=ge(u[l[p]],d[m[p]]);if(P!==0)return P}return U(l.length,m.length)}(r.mapValue,t.mapValue);default:throw O(23264,{Pe:e})}}function qu(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return U(r,t);const e=Jt(r),n=Jt(t),s=U(e.seconds,n.seconds);return s!==0?s:U(e.nanos,n.nanos)}function zu(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const i=ge(e[s],n[s]);if(i)return i}return U(e.length,n.length)}function In(r){return io(r)}function io(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=Jt(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return Xt(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return M.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",s=!0;for(const i of e.values||[])s?s=!1:n+=",",n+=io(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${io(e.fields[a])}`;return s+"}"}(r.mapValue):O(61005,{value:r})}function ms(r){switch(pe(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Hs(r);return t?16+ms(t):16;case 5:return 2*r.stringValue.length;case 6:return Xt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+ms(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return Ee(n.fields,(i,a)=>{s+=i.length+ms(a)}),s}(r.mapValue);default:throw O(13486,{value:r})}}function Er(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function oo(r){return!!r&&"integerValue"in r}function Tr(r){return!!r&&"arrayValue"in r}function ju(r){return!!r&&"nullValue"in r}function $u(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function ps(r){return!!r&&"mapValue"in r}function Ws(r){var t,e;return((e=(((t=r==null?void 0:r.mapValue)===null||t===void 0?void 0:t.fields)||{})[Mo])===null||e===void 0?void 0:e.stringValue)===Oo}function or(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const t={mapValue:{fields:{}}};return Ee(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=or(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=or(r.arrayValue.values[e]);return t}return Object.assign({},r)}function Bl(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===Ll}const Ul={mapValue:{fields:{[Mo]:{stringValue:Oo},[yn]:{arrayValue:{}}}}};function vp(r){return"nullValue"in r?fs:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?Er(Be.empty(),M.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Ws(r)?Ul:{mapValue:{}}:O(35942,{value:r})}function wp(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?Er(Be.empty(),M.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Ul:"mapValue"in r?Ws(r)?{mapValue:{}}:ce:O(61959,{value:r})}function Gu(r,t){const e=ge(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?-1:!r.inclusive&&t.inclusive?1:0}function Ku(r,t){const e=ge(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?1:!r.inclusive&&t.inclusive?-1:0}/**
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
 */class wt{constructor(t){this.value=t}static empty(){return new wt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!ps(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=or(e)}setAll(t){let e=it.emptyPath(),n={},s=[];t.forEach((a,u)=>{if(!e.isImmediateParentOf(u)){const l=this.getFieldsMap(e);this.applyChanges(l,n,s),n={},s=[],e=u.popLast()}a?n[u.lastSegment()]=or(a):s.push(u.lastSegment())});const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());ps(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return jt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];ps(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){Ee(e,(s,i)=>t[s]=i);for(const s of n)delete t[s]}clone(){return new wt(or(this.value))}}function ql(r){const t=[];return Ee(r.fields,(e,n)=>{const s=new it([e]);if(ps(n)){const i=ql(n.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)}),new St(t)}/**
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
 */class ut{constructor(t,e,n,s,i,a,u){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(t){return new ut(t,0,L.min(),L.min(),L.min(),wt.empty(),0)}static newFoundDocument(t,e,n,s){return new ut(t,1,e,L.min(),n,s,0)}static newNoDocument(t,e){return new ut(t,2,e,L.min(),L.min(),wt.empty(),0)}static newUnknownDocument(t,e){return new ut(t,3,e,L.min(),L.min(),wt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=wt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=wt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof ut&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new ut(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class En{constructor(t,e){this.position=t,this.inclusive=e}}function Qu(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const i=t[s],a=r.position[s];if(i.field.isKeyField()?n=M.comparator(M.fromName(a.referenceValue),e.key):n=ge(a,e.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Hu(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!jt(r.position[e],t.position[e]))return!1;return!0}/**
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
 */class vr{constructor(t,e="asc"){this.field=t,this.dir=e}}function Ap(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
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
 */class zl{}class G extends zl{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Rp(t,e,n):e==="array-contains"?new Vp(t,n):e==="in"?new Hl(t,n):e==="not-in"?new Sp(t,n):e==="array-contains-any"?new Cp(t,n):new G(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new bp(t,n):new Pp(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(ge(e,this.value)):e!==null&&pe(this.value)===pe(e)&&this.matchesComparison(ge(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class X extends zl{constructor(t,e){super(),this.filters=t,this.op=e,this.Te=null}static create(t,e){return new X(t,e)}matches(t){return Tn(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Te!==null||(this.Te=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function Tn(r){return r.op==="and"}function ao(r){return r.op==="or"}function Fo(r){return jl(r)&&Tn(r)}function jl(r){for(const t of r.filters)if(t instanceof X)return!1;return!0}function uo(r){if(r instanceof G)return r.field.canonicalString()+r.op.toString()+In(r.value);if(Fo(r))return r.filters.map(t=>uo(t)).join(",");{const t=r.filters.map(e=>uo(e)).join(",");return`${r.op}(${t})`}}function $l(r,t){return r instanceof G?function(n,s){return s instanceof G&&n.op===s.op&&n.field.isEqual(s.field)&&jt(n.value,s.value)}(r,t):r instanceof X?function(n,s){return s instanceof X&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,a,u)=>i&&$l(a,s.filters[u]),!0):!1}(r,t):void O(19439)}function Gl(r,t){const e=r.filters.concat(t);return X.create(e,r.op)}function Kl(r){return r instanceof G?function(e){return`${e.field.canonicalString()} ${e.op} ${In(e.value)}`}(r):r instanceof X?function(e){return e.op.toString()+" {"+e.getFilters().map(Kl).join(" ,")+"}"}(r):"Filter"}class Rp extends G{constructor(t,e,n){super(t,e,n),this.key=M.fromName(n.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class bp extends G{constructor(t,e){super(t,"in",e),this.keys=Ql("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Pp extends G{constructor(t,e){super(t,"not-in",e),this.keys=Ql("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Ql(r,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(n=>M.fromName(n.referenceValue))}class Vp extends G{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Tr(e)&&Ir(e.arrayValue,this.value)}}class Hl extends G{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Ir(this.value.arrayValue,e)}}class Sp extends G{constructor(t,e){super(t,"not-in",e)}matches(t){if(Ir(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Ir(this.value.arrayValue,e)}}class Cp extends G{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Tr(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>Ir(this.value.arrayValue,n))}}/**
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
 */class Dp{constructor(t,e=null,n=[],s=[],i=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Ie=null}}function co(r,t=null,e=[],n=[],s=null,i=null,a=null){return new Dp(r,t,e,n,s,i,a)}function Ue(r){const t=q(r);if(t.Ie===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>uo(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),$s(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>In(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>In(n)).join(",")),t.Ie=e}return t.Ie}function Pr(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!Ap(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!$l(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!Hu(r.startAt,t.startAt)&&Hu(r.endAt,t.endAt)}function xs(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Ns(r,t){return r.filters.filter(e=>e instanceof G&&e.field.isEqual(t))}function Wu(r,t,e){let n=fs,s=!0;for(const i of Ns(r,t)){let a=fs,u=!0;switch(i.op){case"<":case"<=":a=vp(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,u=!1;break;case"!=":case"not-in":a=fs}Gu({value:n,inclusive:s},{value:a,inclusive:u})<0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Gu({value:n,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}function Yu(r,t,e){let n=ce,s=!0;for(const i of Ns(r,t)){let a=ce,u=!0;switch(i.op){case">=":case">":a=wp(i.value),u=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,u=!1;break;case"!=":case"not-in":a=ce}Ku({value:n,inclusive:s},{value:a,inclusive:u})>0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Ku({value:n,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}/**
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
 */class Sn{constructor(t,e=null,n=[],s=[],i=null,a="F",u=null,l=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=l,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function xp(r,t,e,n,s,i,a,u){return new Sn(r,t,e,n,s,i,a,u)}function Lo(r){return new Sn(r)}function Ju(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Wl(r){return r.collectionGroup!==null}function ar(r){const t=q(r);if(t.Ee===null){t.Ee=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ee.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new Z(it.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(u=u.add(d.field))})}),u})(t).forEach(i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ee.push(new vr(i,n))}),e.has(it.keyField().canonicalString())||t.Ee.push(new vr(it.keyField(),n))}return t.Ee}function Ot(r){const t=q(r);return t.de||(t.de=Np(t,ar(r))),t.de}function Np(r,t){if(r.limitType==="F")return co(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new vr(s.field,i)});const e=r.endAt?new En(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new En(r.startAt.position,r.startAt.inclusive):null;return co(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function lo(r,t){const e=r.filters.concat([t]);return new Sn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function ho(r,t,e){return new Sn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function Ys(r,t){return Pr(Ot(r),Ot(t))&&r.limitType===t.limitType}function Yl(r){return`${Ue(Ot(r))}|lt:${r.limitType}`}function an(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(s=>Kl(s)).join(", ")}]`),$s(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>In(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>In(s)).join(",")),`Target(${n})`}(Ot(r))}; limitType=${r.limitType})`}function Vr(r,t){return t.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):M.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,t)&&function(n,s){for(const i of ar(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,t)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,t)&&function(n,s){return!(n.startAt&&!function(a,u,l){const d=Qu(a,u,l);return a.inclusive?d<=0:d<0}(n.startAt,ar(n),s)||n.endAt&&!function(a,u,l){const d=Qu(a,u,l);return a.inclusive?d>=0:d>0}(n.endAt,ar(n),s))}(r,t)}function kp(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Jl(r){return(t,e)=>{let n=!1;for(const s of ar(r)){const i=Mp(s,t,e);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function Mp(r,t,e){const n=r.field.isKeyField()?M.comparator(t.key,e.key):function(i,a,u){const l=a.data.field(i),d=u.data.field(i);return l!==null&&d!==null?ge(l,d):O(42886)}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return O(19790,{direction:r.dir})}}/**
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
 */class Zt{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Ee(this.inner,(e,n)=>{for(const[s,i]of n)t(s,i)})}isEmpty(){return xl(this.inner)}size(){return this.innerSize}}/**
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
 */const Op=new st(M.comparator);function Nt(){return Op}const Xl=new st(M.comparator);function er(...r){let t=Xl;for(const e of r)t=t.insert(e.key,e);return t}function Zl(r){let t=Xl;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function zt(){return ur()}function th(){return ur()}function ur(){return new Zt(r=>r.toString(),(r,t)=>r.isEqual(t))}const Fp=new st(M.comparator),Lp=new Z(M.comparator);function j(...r){let t=Lp;for(const e of r)t=t.add(e);return t}const Bp=new Z(U);function Up(){return Bp}/**
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
 */function Bo(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:mr(t)?"-0":t}}function eh(r){return{integerValue:""+r}}function qp(r,t){return Qm(t)?eh(t):Bo(r,t)}/**
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
 */class Js{constructor(){this._=void 0}}function zp(r,t,e){return r instanceof wr?function(s,i){const a={fields:{[Ml]:{stringValue:kl},[Fl]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ko(i)&&(i=Hs(i)),i&&(a.fields[Ol]=i),{mapValue:a}}(e,t):r instanceof vn?rh(r,t):r instanceof wn?sh(r,t):function(s,i){const a=nh(s,i),u=Xu(a)+Xu(s.Re);return oo(a)&&oo(s.Re)?eh(u):Bo(s.serializer,u)}(r,t)}function jp(r,t,e){return r instanceof vn?rh(r,t):r instanceof wn?sh(r,t):e}function nh(r,t){return r instanceof Ar?function(n){return oo(n)||function(i){return!!i&&"doubleValue"in i}(n)}(t)?t:{integerValue:0}:null}class wr extends Js{}class vn extends Js{constructor(t){super(),this.elements=t}}function rh(r,t){const e=ih(t);for(const n of r.elements)e.some(s=>jt(s,n))||e.push(n);return{arrayValue:{values:e}}}class wn extends Js{constructor(t){super(),this.elements=t}}function sh(r,t){let e=ih(t);for(const n of r.elements)e=e.filter(s=>!jt(s,n));return{arrayValue:{values:e}}}class Ar extends Js{constructor(t,e){super(),this.serializer=t,this.Re=e}}function Xu(r){return rt(r.integerValue||r.doubleValue)}function ih(r){return Tr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class $p{constructor(t,e){this.field=t,this.transform=e}}function Gp(r,t){return r.field.isEqual(t.field)&&function(n,s){return n instanceof vn&&s instanceof vn||n instanceof wn&&s instanceof wn?fn(n.elements,s.elements,jt):n instanceof Ar&&s instanceof Ar?jt(n.Re,s.Re):n instanceof wr&&s instanceof wr}(r.transform,t.transform)}class Kp{constructor(t,e){this.version=t,this.transformResults=e}}class ft{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ft}static exists(t){return new ft(void 0,t)}static updateTime(t){return new ft(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function gs(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class Xs{}function oh(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new Sr(r.key,ft.none()):new Cn(r.key,r.data,ft.none());{const e=r.data,n=wt.empty();let s=new Z(it.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new te(r.key,n,new St(s.toArray()),ft.none())}}function Qp(r,t,e){r instanceof Cn?function(s,i,a){const u=s.value.clone(),l=tc(s.fieldTransforms,i,a.transformResults);u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(r,t,e):r instanceof te?function(s,i,a){if(!gs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=tc(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(ah(s)),l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(r,t,e):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function cr(r,t,e,n){return r instanceof Cn?function(i,a,u,l){if(!gs(i.precondition,a))return u;const d=i.value.clone(),m=ec(i.fieldTransforms,l,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(r,t,e,n):r instanceof te?function(i,a,u,l){if(!gs(i.precondition,a))return u;const d=ec(i.fieldTransforms,l,a),m=a.data;return m.setAll(ah(i)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(r,t,e,n):function(i,a,u){return gs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(r,t,e)}function Hp(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),i=nh(n.transform,s||null);i!=null&&(e===null&&(e=wt.empty()),e.set(n.field,i))}return e||null}function Zu(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&fn(n,s,(i,a)=>Gp(i,a))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class Cn extends Xs{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class te extends Xs{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function ah(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function tc(r,t,e){const n=new Map;F(r.length===e.length,32656,{Ve:e.length,me:r.length});for(let s=0;s<e.length;s++){const i=r[s],a=i.transform,u=t.data.field(i.field);n.set(i.field,jp(a,u,e[s]))}return n}function ec(r,t,e){const n=new Map;for(const s of r){const i=s.transform,a=e.data.field(s.field);n.set(s.field,zp(i,a,t))}return n}class Sr extends Xs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class uh extends Xs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Uo{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Qp(i,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=cr(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=cr(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=th();return this.mutations.forEach(s=>{const i=t.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=e.has(s.key)?null:u;const l=oh(a,u);l!==null&&n.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(L.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),j())}isEqual(t){return this.batchId===t.batchId&&fn(this.mutations,t.mutations,(e,n)=>Zu(e,n))&&fn(this.baseMutations,t.baseMutations,(e,n)=>Zu(e,n))}}class qo{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){F(t.mutations.length===n.length,58842,{fe:t.mutations.length,ge:n.length});let s=function(){return Fp}();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new qo(t,e,n,s)}}/**
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
 */class zo{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class Wp{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var ct,K;function Yp(r){switch(r){case V.OK:return O(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return O(15467,{code:r})}}function ch(r){if(r===void 0)return Pt("GRPC error has no .code"),V.UNKNOWN;switch(r){case ct.OK:return V.OK;case ct.CANCELLED:return V.CANCELLED;case ct.UNKNOWN:return V.UNKNOWN;case ct.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case ct.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case ct.INTERNAL:return V.INTERNAL;case ct.UNAVAILABLE:return V.UNAVAILABLE;case ct.UNAUTHENTICATED:return V.UNAUTHENTICATED;case ct.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case ct.NOT_FOUND:return V.NOT_FOUND;case ct.ALREADY_EXISTS:return V.ALREADY_EXISTS;case ct.PERMISSION_DENIED:return V.PERMISSION_DENIED;case ct.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case ct.ABORTED:return V.ABORTED;case ct.OUT_OF_RANGE:return V.OUT_OF_RANGE;case ct.UNIMPLEMENTED:return V.UNIMPLEMENTED;case ct.DATA_LOSS:return V.DATA_LOSS;default:return O(39323,{code:r})}}(K=ct||(ct={}))[K.OK=0]="OK",K[K.CANCELLED=1]="CANCELLED",K[K.UNKNOWN=2]="UNKNOWN",K[K.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",K[K.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",K[K.NOT_FOUND=5]="NOT_FOUND",K[K.ALREADY_EXISTS=6]="ALREADY_EXISTS",K[K.PERMISSION_DENIED=7]="PERMISSION_DENIED",K[K.UNAUTHENTICATED=16]="UNAUTHENTICATED",K[K.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",K[K.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",K[K.ABORTED=10]="ABORTED",K[K.OUT_OF_RANGE=11]="OUT_OF_RANGE",K[K.UNIMPLEMENTED=12]="UNIMPLEMENTED",K[K.INTERNAL=13]="INTERNAL",K[K.UNAVAILABLE=14]="UNAVAILABLE",K[K.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const Jp=new de([4294967295,4294967295],0);function nc(r){const t=gl().encode(r),e=new ul;return e.update(t),new Uint8Array(e.digest())}function rc(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new de([e,n],0),new de([s,i],0)]}class jo{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new nr(`Invalid padding: ${e}`);if(n<0)throw new nr(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new nr(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new nr(`Invalid padding when bitmap length is 0: ${e}`);this.pe=8*t.length-e,this.ye=de.fromNumber(this.pe)}we(t,e,n){let s=t.add(e.multiply(de.fromNumber(n)));return s.compare(Jp)===1&&(s=new de([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.pe===0)return!1;const e=nc(t),[n,s]=rc(e);for(let i=0;i<this.hashCount;i++){const a=this.we(n,s,i);if(!this.be(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new jo(i,s,e);return n.forEach(u=>a.insert(u)),a}insert(t){if(this.pe===0)return;const e=nc(t),[n,s]=rc(e);for(let i=0;i<this.hashCount;i++){const a=this.we(n,s,i);this.Se(a)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class nr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Zs{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,Cr.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new Zs(L.min(),s,new st(U),Nt(),j())}}class Cr{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Cr(n,e,j(),j(),j())}}/**
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
 */class _s{constructor(t,e,n,s){this.De=t,this.removedTargetIds=e,this.key=n,this.ve=s}}class lh{constructor(t,e){this.targetId=t,this.Ce=e}}class hh{constructor(t,e,n=lt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class sc{constructor(){this.Fe=0,this.Me=ic(),this.xe=lt.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return this.Fe!==0}get Le(){return this.Ne}ke(t){t.approximateByteSize()>0&&(this.Ne=!0,this.xe=t)}qe(){let t=j(),e=j(),n=j();return this.Me.forEach((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:O(38017,{changeType:i})}}),new Cr(this.xe,this.Oe,t,e,n)}Qe(){this.Ne=!1,this.Me=ic()}$e(t,e){this.Ne=!0,this.Me=this.Me.insert(t,e)}Ue(t){this.Ne=!0,this.Me=this.Me.remove(t)}Ke(){this.Fe+=1}We(){this.Fe-=1,F(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class Xp{constructor(t){this.ze=t,this.je=new Map,this.He=Nt(),this.Je=rs(),this.Ye=rs(),this.Ze=new st(U)}Xe(t){for(const e of t.De)t.ve&&t.ve.isFoundDocument()?this.et(e,t.ve):this.tt(e,t.key,t.ve);for(const e of t.removedTargetIds)this.tt(e,t.key,t.ve)}nt(t){this.forEachTarget(t,e=>{const n=this.rt(e);switch(t.state){case 0:this.it(e)&&n.ke(t.resumeToken);break;case 1:n.We(),n.Be||n.Qe(),n.ke(t.resumeToken);break;case 2:n.We(),n.Be||this.removeTarget(e);break;case 3:this.it(e)&&(n.Ge(),n.ke(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),n.ke(t.resumeToken));break;default:O(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach((n,s)=>{this.it(s)&&e(s)})}ot(t){const e=t.targetId,n=t.Ce.count,s=this._t(e);if(s){const i=s.target;if(xs(i))if(n===0){const a=new M(i.path);this.tt(e,a,ut.newNoDocument(a,L.min()))}else F(n===1,20013,{expectedCount:n});else{const a=this.ut(e);if(a!==n){const u=this.ct(t),l=u?this.lt(u,t,a):1;if(l!==0){this.st(e);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,d)}}}}}ct(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=e;let a,u;try{a=Xt(n).toUint8Array()}catch(l){if(l instanceof Nl)return Le("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{u=new jo(a,s,i)}catch(l){return Le(l instanceof nr?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return u.pe===0?null:u}lt(t,e,n){return e.Ce.count===n-this.Tt(t,e.targetId)?0:2}Tt(t,e){const n=this.ze.getRemoteKeysForTarget(e);let s=0;return n.forEach(i=>{const a=this.ze.Pt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(u)||(this.tt(e,i,null),s++)}),s}It(t){const e=new Map;this.je.forEach((i,a)=>{const u=this._t(a);if(u){if(i.current&&xs(u.target)){const l=new M(u.target.path);this.Et(l).has(a)||this.dt(a,l)||this.tt(a,l,ut.newNoDocument(l,t))}i.Le&&(e.set(a,i.qe()),i.Qe())}});let n=j();this.Ye.forEach((i,a)=>{let u=!0;a.forEachWhile(l=>{const d=this._t(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(n=n.add(i))}),this.He.forEach((i,a)=>a.setReadTime(t));const s=new Zs(t,e,this.Ze,this.He,n);return this.He=Nt(),this.Je=rs(),this.Ye=rs(),this.Ze=new st(U),s}et(t,e){if(!this.it(t))return;const n=this.dt(t,e.key)?2:0;this.rt(t).$e(e.key,n),this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.Ye=this.Ye.insert(e.key,this.At(e.key).add(t))}tt(t,e,n){if(!this.it(t))return;const s=this.rt(t);this.dt(t,e)?s.$e(e,1):s.Ue(e),this.Ye=this.Ye.insert(e,this.At(e).delete(t)),this.Ye=this.Ye.insert(e,this.At(e).add(t)),n&&(this.He=this.He.insert(e,n))}removeTarget(t){this.je.delete(t)}ut(t){const e=this.rt(t).qe();return this.ze.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ke(t){this.rt(t).Ke()}rt(t){let e=this.je.get(t);return e||(e=new sc,this.je.set(t,e)),e}At(t){let e=this.Ye.get(t);return e||(e=new Z(U),this.Ye=this.Ye.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new Z(U),this.Je=this.Je.insert(t,e)),e}it(t){const e=this._t(t)!==null;return e||S("WatchChangeAggregator","Detected inactive target",t),e}_t(t){const e=this.je.get(t);return e&&e.Be?null:this.ze.Rt(t)}st(t){this.je.set(t,new sc),this.ze.getRemoteKeysForTarget(t).forEach(e=>{this.tt(t,e,null)})}dt(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function rs(){return new st(M.comparator)}function ic(){return new st(M.comparator)}const Zp={asc:"ASCENDING",desc:"DESCENDING"},tg={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},eg={and:"AND",or:"OR"};class ng{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function fo(r,t){return r.useProto3Json||$s(t)?t:{value:t}}function An(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function dh(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function rg(r,t){return An(r,t.toTimestamp())}function Vt(r){return F(!!r,49232),L.fromTimestamp(function(e){const n=Jt(e);return new ot(n.seconds,n.nanos)}(r))}function $o(r,t){return mo(r,t).canonicalString()}function mo(r,t){const e=function(s){return new J(["projects",s.projectId,"databases",s.database])}(r).child("documents");return t===void 0?e:e.child(t)}function fh(r){const t=J.fromString(r);return F(vh(t),10190,{key:t.toString()}),t}function ks(r,t){return $o(r.databaseId,t.path)}function Oe(r,t){const e=fh(t);if(e.get(1)!==r.databaseId.projectId)throw new N(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new N(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new M(gh(e))}function mh(r,t){return $o(r.databaseId,t)}function ph(r){const t=fh(r);return t.length===4?J.emptyPath():gh(t)}function po(r){return new J(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function gh(r){return F(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function oc(r,t,e){return{name:ks(r,t),fields:e.value.mapValue.fields}}function sg(r,t,e){const n=Oe(r,t.name),s=Vt(t.updateTime),i=t.createTime?Vt(t.createTime):L.min(),a=new wt({mapValue:{fields:t.fields}}),u=ut.newFoundDocument(n,s,i,a);return e&&u.setHasCommittedMutations(),e?u.setHasCommittedMutations():u}function ig(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:O(39313,{state:d})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(d,m){return d.useProto3Json?(F(m===void 0||typeof m=="string",58123),lt.fromBase64String(m||"")):(F(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),lt.fromUint8Array(m||new Uint8Array))}(r,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&function(d){const m=d.code===void 0?V.UNKNOWN:ch(d.code);return new N(m,d.message||"")}(a);e=new hh(n,s,i,u||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=Oe(r,n.document.name),i=Vt(n.document.updateTime),a=n.document.createTime?Vt(n.document.createTime):L.min(),u=new wt({mapValue:{fields:n.document.fields}}),l=ut.newFoundDocument(s,i,a,u),d=n.targetIds||[],m=n.removedTargetIds||[];e=new _s(d,m,l.key,l)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=Oe(r,n.document),i=n.readTime?Vt(n.readTime):L.min(),a=ut.newNoDocument(s,i),u=n.removedTargetIds||[];e=new _s([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=Oe(r,n.document),i=n.removedTargetIds||[];e=new _s([],i,s,null)}else{if(!("filter"in t))return O(11601,{Vt:t});{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new Wp(s,i),u=n.targetId;e=new lh(u,a)}}return e}function Ms(r,t){let e;if(t instanceof Cn)e={update:oc(r,t.key,t.value)};else if(t instanceof Sr)e={delete:ks(r,t.key)};else if(t instanceof te)e={update:oc(r,t.key,t.data),updateMask:hg(t.fieldMask)};else{if(!(t instanceof uh))return O(16599,{ft:t.type});e={verify:ks(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(i,a){const u=a.transform;if(u instanceof wr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof vn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof wn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Ar)return{fieldPath:a.field.canonicalString(),increment:u.Re};throw O(20930,{transform:a.transform})}(0,n))),t.precondition.isNone||(e.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:rg(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:O(27497)}(r,t.precondition)),e}function go(r,t){const e=t.currentDocument?function(i){return i.updateTime!==void 0?ft.updateTime(Vt(i.updateTime)):i.exists!==void 0?ft.exists(i.exists):ft.none()}(t.currentDocument):ft.none(),n=t.updateTransforms?t.updateTransforms.map(s=>function(a,u){let l=null;if("setToServerValue"in u)F(u.setToServerValue==="REQUEST_TIME",16630,{proto:u}),l=new wr;else if("appendMissingElements"in u){const m=u.appendMissingElements.values||[];l=new vn(m)}else if("removeAllFromArray"in u){const m=u.removeAllFromArray.values||[];l=new wn(m)}else"increment"in u?l=new Ar(a,u.increment):O(16584,{proto:u});const d=it.fromServerFormat(u.fieldPath);return new $p(d,l)}(r,s)):[];if(t.update){t.update.name;const s=Oe(r,t.update.name),i=new wt({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=function(l){const d=l.fieldPaths||[];return new St(d.map(m=>it.fromServerFormat(m)))}(t.updateMask);return new te(s,i,a,e,n)}return new Cn(s,i,e,n)}if(t.delete){const s=Oe(r,t.delete);return new Sr(s,e)}if(t.verify){const s=Oe(r,t.verify);return new uh(s,e)}return O(1463,{proto:t})}function og(r,t){return r&&r.length>0?(F(t!==void 0,14353),r.map(e=>function(s,i){let a=s.updateTime?Vt(s.updateTime):Vt(i);return a.isEqual(L.min())&&(a=Vt(i)),new Kp(a,s.transformResults||[])}(e,t))):[]}function _h(r,t){return{documents:[mh(r,t.path)]}}function yh(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=mh(r,s);const i=function(d){if(d.length!==0)return Th(X.create(d,"and"))}(t.filters);i&&(e.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(m=>function(T){return{field:un(T.field),direction:ug(T.dir)}}(m))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=fo(r,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{gt:e,parent:s}}function Ih(r){let t=ph(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){F(n===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let i=[];e.where&&(i=function(p){const T=Eh(p);return T instanceof X&&Fo(T)?T.getFilters():[T]}(e.where));let a=[];e.orderBy&&(a=function(p){return p.map(T=>function(C){return new vr(cn(C.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(T))}(e.orderBy));let u=null;e.limit&&(u=function(p){let T;return T=typeof p=="object"?p.value:p,$s(T)?null:T}(e.limit));let l=null;e.startAt&&(l=function(p){const T=!!p.before,P=p.values||[];return new En(P,T)}(e.startAt));let d=null;return e.endAt&&(d=function(p){const T=!p.before,P=p.values||[];return new En(P,T)}(e.endAt)),xp(t,s,a,i,u,"F",l,d)}function ag(r,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Eh(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=cn(e.unaryFilter.field);return G.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=cn(e.unaryFilter.field);return G.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=cn(e.unaryFilter.field);return G.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=cn(e.unaryFilter.field);return G.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}}(r):r.fieldFilter!==void 0?function(e){return G.create(cn(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return X.create(e.compositeFilter.filters.map(n=>Eh(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return O(1026)}}(e.compositeFilter.op))}(r):O(30097,{filter:r})}function ug(r){return Zp[r]}function cg(r){return tg[r]}function lg(r){return eg[r]}function un(r){return{fieldPath:r.canonicalString()}}function cn(r){return it.fromServerFormat(r.fieldPath)}function Th(r){return r instanceof G?function(e){if(e.op==="=="){if($u(e.value))return{unaryFilter:{field:un(e.field),op:"IS_NAN"}};if(ju(e.value))return{unaryFilter:{field:un(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if($u(e.value))return{unaryFilter:{field:un(e.field),op:"IS_NOT_NAN"}};if(ju(e.value))return{unaryFilter:{field:un(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:un(e.field),op:cg(e.op),value:e.value}}}(r):r instanceof X?function(e){const n=e.getFilters().map(s=>Th(s));return n.length===1?n[0]:{compositeFilter:{op:lg(e.op),filters:n}}}(r):O(54877,{filter:r})}function hg(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function vh(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
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
 */class Ht{constructor(t,e,n,s,i=L.min(),a=L.min(),u=lt.EMPTY_BYTE_STRING,l=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=l}withSequenceNumber(t){return new Ht(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class wh{constructor(t){this.wt=t}}function dg(r,t){let e;if(t.document)e=sg(r.wt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const n=M.fromSegments(t.noDocument.path),s=ze(t.noDocument.readTime);e=ut.newNoDocument(n,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return O(56709);{const n=M.fromSegments(t.unknownDocument.path),s=ze(t.unknownDocument.version);e=ut.newUnknownDocument(n,s)}}return t.readTime&&e.setReadTime(function(s){const i=new ot(s[0],s[1]);return L.fromTimestamp(i)}(t.readTime)),e}function ac(r,t){const e=t.key,n={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:Os(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=function(i,a){return{name:ks(i,a.key),fields:a.data.value.mapValue.fields,updateTime:An(i,a.version.toTimestamp()),createTime:An(i,a.createTime.toTimestamp())}}(r.wt,t);else if(t.isNoDocument())n.noDocument={path:e.path.toArray(),readTime:qe(t.version)};else{if(!t.isUnknownDocument())return O(57904,{document:t});n.unknownDocument={path:e.path.toArray(),version:qe(t.version)}}return n}function Os(r){const t=r.toTimestamp();return[t.seconds,t.nanoseconds]}function qe(r){const t=r.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function ze(r){const t=new ot(r.seconds,r.nanoseconds);return L.fromTimestamp(t)}function Ce(r,t){const e=(t.baseMutations||[]).map(i=>go(r.wt,i));for(let i=0;i<t.mutations.length-1;++i){const a=t.mutations[i];if(i+1<t.mutations.length&&t.mutations[i+1].transform!==void 0){const u=t.mutations[i+1];a.updateTransforms=u.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const n=t.mutations.map(i=>go(r.wt,i)),s=ot.fromMillis(t.localWriteTimeMs);return new Uo(t.batchId,s,e,n)}function rr(r){const t=ze(r.readTime),e=r.lastLimboFreeSnapshotVersion!==void 0?ze(r.lastLimboFreeSnapshotVersion):L.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){const a=i.documents.length;return F(a===1,1966,{count:a}),Ot(Lo(ph(i.documents[0])))}(r.query):function(i){return Ot(Ih(i))}(r.query),new Ht(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,t,e,lt.fromBase64String(r.resumeToken))}function Ah(r,t){const e=qe(t.snapshotVersion),n=qe(t.lastLimboFreeSnapshotVersion);let s;s=xs(t.target)?_h(r.wt,t.target):yh(r.wt,t.target).gt;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:Ue(t.target),readTime:e,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Rh(r){const t=Ih({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?ho(t,t.limit,"L"):t}function Ui(r,t){return new zo(t.largestBatchId,go(r.wt,t.overlayMutation))}function uc(r,t){const e=t.path.lastSegment();return[r,At(t.path.popLast()),e]}function cc(r,t,e,n){return{indexId:r,uid:t,sequenceNumber:e,readTime:qe(n.readTime),documentKey:At(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class fg{getBundleMetadata(t,e){return lc(t).get(e).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:ze(i.createTime),version:i.version}}(n)})}saveBundleMetadata(t,e){return lc(t).put(function(s){return{bundleId:s.id,createTime:qe(Vt(s.createTime)),version:s.version}}(e))}getNamedQuery(t,e){return hc(t).get(e).next(n=>{if(n)return function(i){return{name:i.name,query:Rh(i.bundledQuery),readTime:ze(i.readTime)}}(n)})}saveNamedQuery(t,e){return hc(t).put(function(s){return{name:s.name,readTime:qe(Vt(s.readTime)),bundledQuery:s.bundledQuery}}(e))}}function lc(r){return ht(r,Gs)}function hc(r){return ht(r,Ks)}/**
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
 */class ti{constructor(t,e){this.serializer=t,this.userId=e}static bt(t,e){const n=e.uid||"";return new ti(t,n)}getOverlay(t,e){return Wn(t).get(uc(this.userId,e)).next(n=>n?Ui(this.serializer,n):null)}getOverlays(t,e){const n=zt();return w.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){const s=[];return n.forEach((i,a)=>{const u=new zo(e,a);s.push(this.St(t,u))}),w.waitFor(s)}removeOverlaysForBatchId(t,e,n){const s=new Set;e.forEach(a=>s.add(At(a.getCollectionPath())));const i=[];return s.forEach(a=>{const u=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(Wn(t).X(ro,u))}),w.waitFor(i)}getOverlaysForCollection(t,e,n){const s=zt(),i=At(e),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Wn(t).J(ro,a).next(u=>{for(const l of u){const d=Ui(this.serializer,l);s.set(d.getKey(),d)}return s})}getOverlaysForCollectionGroup(t,e,n,s){const i=zt();let a;const u=IDBKeyRange.bound([this.userId,e,n],[this.userId,e,Number.POSITIVE_INFINITY],!0);return Wn(t).te({index:Vl,range:u},(l,d,m)=>{const p=Ui(this.serializer,d);i.size()<s||p.largestBatchId===a?(i.set(p.getKey(),p),a=p.largestBatchId):m.done()}).next(()=>i)}St(t,e){return Wn(t).put(function(s,i,a){const[u,l,d]=uc(i,a.mutation.key);return{userId:i,collectionPath:l,documentId:d,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:Ms(s.wt,a.mutation)}}(this.serializer,this.userId,e))}}function Wn(r){return ht(r,Qs)}/**
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
 */class mg{Dt(t){return ht(t,xo)}getSessionToken(t){return this.Dt(t).get("sessionToken").next(e=>{const n=e==null?void 0:e.value;return n?lt.fromUint8Array(n):lt.EMPTY_BYTE_STRING})}setSessionToken(t,e){return this.Dt(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
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
 */class De{constructor(){}vt(t,e){this.Ct(t,e),e.Ft()}Ct(t,e){if("nullValue"in t)this.Mt(e,5);else if("booleanValue"in t)this.Mt(e,10),e.xt(t.booleanValue?1:0);else if("integerValue"in t)this.Mt(e,15),e.xt(rt(t.integerValue));else if("doubleValue"in t){const n=rt(t.doubleValue);isNaN(n)?this.Mt(e,13):(this.Mt(e,15),mr(n)?e.xt(0):e.xt(n))}else if("timestampValue"in t){let n=t.timestampValue;this.Mt(e,20),typeof n=="string"&&(n=Jt(n)),e.Ot(`${n.seconds||""}`),e.xt(n.nanos||0)}else if("stringValue"in t)this.Nt(t.stringValue,e),this.Bt(e);else if("bytesValue"in t)this.Mt(e,30),e.Lt(Xt(t.bytesValue)),this.Bt(e);else if("referenceValue"in t)this.kt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.Mt(e,45),e.xt(n.latitude||0),e.xt(n.longitude||0)}else"mapValue"in t?Bl(t)?this.Mt(e,Number.MAX_SAFE_INTEGER):Ws(t)?this.qt(t.mapValue,e):(this.Qt(t.mapValue,e),this.Bt(e)):"arrayValue"in t?(this.$t(t.arrayValue,e),this.Bt(e)):O(19022,{Ut:t})}Nt(t,e){this.Mt(e,25),this.Kt(t,e)}Kt(t,e){e.Ot(t)}Qt(t,e){const n=t.fields||{};this.Mt(e,55);for(const s of Object.keys(n))this.Nt(s,e),this.Ct(n[s],e)}qt(t,e){var n,s;const i=t.fields||{};this.Mt(e,53);const a=yn,u=((s=(n=i[a].arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.length)||0;this.Mt(e,15),e.xt(rt(u)),this.Nt(a,e),this.Ct(i[a],e)}$t(t,e){const n=t.values||[];this.Mt(e,50);for(const s of n)this.Ct(s,e)}kt(t,e){this.Mt(e,37),M.fromName(t).path.forEach(n=>{this.Mt(e,60),this.Kt(n,e)})}Mt(t,e){t.xt(e)}Bt(t){t.xt(2)}}De.Wt=new De;/**
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
 */const en=255;function pg(r){if(r===0)return 8;let t=0;return r>>4||(t+=4,r<<=4),r>>6||(t+=2,r<<=2),r>>7||(t+=1),t}function dc(r){const t=64-function(n){let s=0;for(let i=0;i<8;++i){const a=pg(255&n[i]);if(s+=a,a!==8)break}return s}(r);return Math.ceil(t/8)}class gg{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Gt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.zt(n.value),n=e.next();this.jt()}Ht(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Jt(n.value),n=e.next();this.Yt()}Zt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.zt(n);else if(n<2048)this.zt(960|n>>>6),this.zt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.zt(480|n>>>12),this.zt(128|63&n>>>6),this.zt(128|63&n);else{const s=e.codePointAt(0);this.zt(240|s>>>18),this.zt(128|63&s>>>12),this.zt(128|63&s>>>6),this.zt(128|63&s)}}this.jt()}Xt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=e.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Yt()}en(t){const e=this.tn(t),n=dc(e);this.nn(1+n),this.buffer[this.position++]=255&n;for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=255&e[s]}rn(t){const e=this.tn(t),n=dc(e);this.nn(1+n),this.buffer[this.position++]=~(255&n);for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}sn(){this._n(en),this._n(255)}an(){this.un(en),this.un(255)}reset(){this.position=0}seed(t){this.nn(t.length),this.buffer.set(t,this.position),this.position+=t.length}cn(){return this.buffer.slice(0,this.position)}tn(t){const e=function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)}(t),n=!!(128&e[0]);e[0]^=n?255:128;for(let s=1;s<e.length;++s)e[s]^=n?255:0;return e}zt(t){const e=255&t;e===0?(this._n(0),this._n(255)):e===en?(this._n(en),this._n(0)):this._n(e)}Jt(t){const e=255&t;e===0?(this.un(0),this.un(255)):e===en?(this.un(en),this.un(0)):this.un(t)}jt(){this._n(0),this._n(1)}Yt(){this.un(0),this.un(1)}_n(t){this.nn(1),this.buffer[this.position++]=t}un(t){this.nn(1),this.buffer[this.position++]=~t}nn(t){const e=t+this.position;if(e<=this.buffer.length)return;let n=2*this.buffer.length;n<e&&(n=e);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class _g{constructor(t){this.ln=t}Lt(t){this.ln.Gt(t)}Ot(t){this.ln.Zt(t)}xt(t){this.ln.en(t)}Ft(){this.ln.sn()}}class yg{constructor(t){this.ln=t}Lt(t){this.ln.Ht(t)}Ot(t){this.ln.Xt(t)}xt(t){this.ln.rn(t)}Ft(){this.ln.an()}}class Yn{constructor(){this.ln=new gg,this.hn=new _g(this.ln),this.Pn=new yg(this.ln)}seed(t){this.ln.seed(t)}Tn(t){return t===0?this.hn:this.Pn}cn(){return this.ln.cn()}reset(){this.ln.reset()}}/**
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
 */class xe{constructor(t,e,n,s){this.indexId=t,this.documentKey=e,this.arrayValue=n,this.directionalValue=s}In(){const t=this.directionalValue.length,e=t===0||this.directionalValue[t-1]===255?t+1:t,n=new Uint8Array(e);return n.set(this.directionalValue,0),e!==t?n.set([0],this.directionalValue.length):++n[n.length-1],new xe(this.indexId,this.documentKey,this.arrayValue,n)}}function ie(r,t){let e=r.indexId-t.indexId;return e!==0?e:(e=fc(r.arrayValue,t.arrayValue),e!==0?e:(e=fc(r.directionalValue,t.directionalValue),e!==0?e:M.comparator(r.documentKey,t.documentKey)))}function fc(r,t){for(let e=0;e<r.length&&e<t.length;++e){const n=r[e]-t[e];if(n!==0)return n}return r.length-t.length}/**
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
 */class mc{constructor(t){this.En=new Z((e,n)=>it.comparator(e.field,n.field)),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.dn=t.orderBy,this.An=[];for(const e of t.filters){const n=e;n.isInequality()?this.En=this.En.add(n):this.An.push(n)}}get Rn(){return this.En.size>1}Vn(t){if(F(t.collectionGroup===this.collectionId,49279),this.Rn)return!1;const e=to(t);if(e!==void 0&&!this.mn(e))return!1;const n=Pe(t);let s=new Set,i=0,a=0;for(;i<n.length&&this.mn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.En.size>0){const u=this.En.getIterator().getNext();if(!s.has(u.field.canonicalString())){const l=n[i];if(!this.fn(u,l)||!this.gn(this.dn[a++],l))return!1}++i}for(;i<n.length;++i){const u=n[i];if(a>=this.dn.length||!this.gn(this.dn[a++],u))return!1}return!0}pn(){if(this.Rn)return null;let t=new Z(it.comparator);const e=[];for(const n of this.An)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")e.push(new ls(n.field,2));else{if(t.has(n.field))continue;t=t.add(n.field),e.push(new ls(n.field,0))}for(const n of this.dn)n.field.isKeyField()||t.has(n.field)||(t=t.add(n.field),e.push(new ls(n.field,n.dir==="asc"?0:1)));return new Rs(Rs.UNKNOWN_ID,this.collectionId,e,fr.empty())}mn(t){for(const e of this.An)if(this.fn(e,t))return!0;return!1}fn(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const n=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===n}gn(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
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
 */function bh(r){var t,e;if(F(r instanceof G||r instanceof X,20012),r instanceof G){if(r instanceof Hl){const s=((e=(t=r.value.arrayValue)===null||t===void 0?void 0:t.values)===null||e===void 0?void 0:e.map(i=>G.create(r.field,"==",i)))||[];return X.create(s,"or")}return r}const n=r.filters.map(s=>bh(s));return X.create(n,r.op)}function Ig(r){if(r.getFilters().length===0)return[];const t=Io(bh(r));return F(Ph(t),7391),_o(t)||yo(t)?[t]:t.getFilters()}function _o(r){return r instanceof G}function yo(r){return r instanceof X&&Fo(r)}function Ph(r){return _o(r)||yo(r)||function(e){if(e instanceof X&&ao(e)){for(const n of e.getFilters())if(!_o(n)&&!yo(n))return!1;return!0}return!1}(r)}function Io(r){if(F(r instanceof G||r instanceof X,34018),r instanceof G)return r;if(r.filters.length===1)return Io(r.filters[0]);const t=r.filters.map(n=>Io(n));let e=X.create(t,r.op);return e=Fs(e),Ph(e)?e:(F(e instanceof X,64498),F(Tn(e),40251),F(e.filters.length>1,57927),e.filters.reduce((n,s)=>Go(n,s)))}function Go(r,t){let e;return F(r instanceof G||r instanceof X,38388),F(t instanceof G||t instanceof X,25473),e=r instanceof G?t instanceof G?function(s,i){return X.create([s,i],"and")}(r,t):pc(r,t):t instanceof G?pc(t,r):function(s,i){if(F(s.filters.length>0&&i.filters.length>0,48005),Tn(s)&&Tn(i))return Gl(s,i.getFilters());const a=ao(s)?s:i,u=ao(s)?i:s,l=a.filters.map(d=>Go(d,u));return X.create(l,"or")}(r,t),Fs(e)}function pc(r,t){if(Tn(t))return Gl(t,r.getFilters());{const e=t.filters.map(n=>Go(r,n));return X.create(e,"or")}}function Fs(r){if(F(r instanceof G||r instanceof X,11850),r instanceof G)return r;const t=r.getFilters();if(t.length===1)return Fs(t[0]);if(jl(r))return r;const e=t.map(s=>Fs(s)),n=[];return e.forEach(s=>{s instanceof G?n.push(s):s instanceof X&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:X.create(n,r.op)}/**
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
 */class Eg{constructor(){this.yn=new Ko}addToCollectionParentIndex(t,e){return this.yn.add(e),w.resolve()}getCollectionParents(t,e){return w.resolve(this.yn.getEntries(e))}addFieldIndex(t,e){return w.resolve()}deleteFieldIndex(t,e){return w.resolve()}deleteAllFieldIndexes(t){return w.resolve()}createTargetIndexes(t,e){return w.resolve()}getDocumentsMatchingTarget(t,e){return w.resolve(null)}getIndexType(t,e){return w.resolve(0)}getFieldIndexes(t,e){return w.resolve([])}getNextCollectionGroupToUpdate(t){return w.resolve(null)}getMinOffset(t,e){return w.resolve(kt.min())}getMinOffsetFromCollectionGroup(t,e){return w.resolve(kt.min())}updateCollectionGroup(t,e,n){return w.resolve()}updateIndexEntries(t,e){return w.resolve()}}class Ko{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new Z(J.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new Z(J.comparator)).toArray()}}/**
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
 */const gc="IndexedDbIndexManager",ss=new Uint8Array(0);class Tg{constructor(t,e){this.databaseId=e,this.wn=new Ko,this.bn=new Zt(n=>Ue(n),(n,s)=>Pr(n,s)),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.wn.has(e)){const n=e.lastSegment(),s=e.popLast();t.addOnCommittedListener(()=>{this.wn.add(e)});const i={collectionId:n,parent:At(s)};return _c(t).put(i)}return w.resolve()}getCollectionParents(t,e){const n=[],s=IDBKeyRange.bound([e,""],[yl(e),""],!1,!0);return _c(t).J(s).next(i=>{for(const a of i){if(a.collectionId!==e)break;n.push(qt(a.parent))}return n})}addFieldIndex(t,e){const n=Jn(t),s=function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(e);delete s.indexId;const i=n.add(s);if(e.indexState){const a=rn(t);return i.next(u=>{a.put(cc(u,this.uid,e.indexState.sequenceNumber,e.indexState.offset))})}return i.next()}deleteFieldIndex(t,e){const n=Jn(t),s=rn(t),i=nn(t);return n.delete(e.indexId).next(()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))}deleteAllFieldIndexes(t){const e=Jn(t),n=nn(t),s=rn(t);return e.X().next(()=>n.X()).next(()=>s.X())}createTargetIndexes(t,e){return w.forEach(this.Sn(e),n=>this.getIndexType(t,n).next(s=>{if(s===0||s===1){const i=new mc(n).pn();if(i!=null)return this.addFieldIndex(t,i)}}))}getDocumentsMatchingTarget(t,e){const n=nn(t);let s=!0;const i=new Map;return w.forEach(this.Sn(e),a=>this.Dn(t,a).next(u=>{s&&(s=!!u),i.set(a,u)})).next(()=>{if(s){let a=j();const u=[];return w.forEach(i,(l,d)=>{S(gc,`Using index ${function(B){return`id=${B.indexId}|cg=${B.collectionGroup}|f=${B.fields.map(Y=>`${Y.fieldPath}:${Y.kind}`).join(",")}`}(l)} to execute ${Ue(e)}`);const m=function(B,Y){const et=to(Y);if(et===void 0)return null;for(const H of Ns(B,et.fieldPath))switch(H.op){case"array-contains-any":return H.value.arrayValue.values||[];case"array-contains":return[H.value]}return null}(d,l),p=function(B,Y){const et=new Map;for(const H of Pe(Y))for(const I of Ns(B,H.fieldPath))switch(I.op){case"==":case"in":et.set(H.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return et.set(H.fieldPath.canonicalString(),I.value),Array.from(et.values())}return null}(d,l),T=function(B,Y){const et=[];let H=!0;for(const I of Pe(Y)){const g=I.kind===0?Wu(B,I.fieldPath,B.startAt):Yu(B,I.fieldPath,B.startAt);et.push(g.value),H&&(H=g.inclusive)}return new En(et,H)}(d,l),P=function(B,Y){const et=[];let H=!0;for(const I of Pe(Y)){const g=I.kind===0?Yu(B,I.fieldPath,B.endAt):Wu(B,I.fieldPath,B.endAt);et.push(g.value),H&&(H=g.inclusive)}return new En(et,H)}(d,l),C=this.vn(l,d,T),k=this.vn(l,d,P),D=this.Cn(l,d,p),$=this.Fn(l.indexId,m,C,T.inclusive,k,P.inclusive,D);return w.forEach($,z=>n.Z(z,e.limit).next(B=>{B.forEach(Y=>{const et=M.fromSegments(Y.documentKey);a.has(et)||(a=a.add(et),u.push(et))})}))}).next(()=>u)}return w.resolve(null)})}Sn(t){let e=this.bn.get(t);return e||(t.filters.length===0?e=[t]:e=Ig(X.create(t.filters,"and")).map(n=>co(t.path,t.collectionGroup,t.orderBy,n.getFilters(),t.limit,t.startAt,t.endAt)),this.bn.set(t,e),e)}Fn(t,e,n,s,i,a,u){const l=(e!=null?e.length:1)*Math.max(n.length,i.length),d=l/(e!=null?e.length:1),m=[];for(let p=0;p<l;++p){const T=e?this.Mn(e[p/d]):ss,P=this.xn(t,T,n[p%d],s),C=this.On(t,T,i[p%d],a),k=u.map(D=>this.xn(t,T,D,!0));m.push(...this.createRange(P,C,k))}return m}xn(t,e,n,s){const i=new xe(t,M.empty(),e,n);return s?i:i.In()}On(t,e,n,s){const i=new xe(t,M.empty(),e,n);return s?i.In():i}Dn(t,e){const n=new mc(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next(i=>{let a=null;for(const u of i)n.Vn(u)&&(!a||u.fields.length>a.fields.length)&&(a=u);return a})}getIndexType(t,e){let n=2;const s=this.Sn(e);return w.forEach(s,i=>this.Dn(t,i).next(a=>{a?n!==0&&a.fields.length<function(l){let d=new Z(it.comparator),m=!1;for(const p of l.filters)for(const T of p.getFlattenedFilters())T.field.isKeyField()||(T.op==="array-contains"||T.op==="array-contains-any"?m=!0:d=d.add(T.field));for(const p of l.orderBy)p.field.isKeyField()||(d=d.add(p.field));return d.size+(m?1:0)}(i)&&(n=1):n=0})).next(()=>function(a){return a.limit!==null}(e)&&s.length>1&&n===2?1:n)}Nn(t,e){const n=new Yn;for(const s of Pe(t)){const i=e.data.field(s.fieldPath);if(i==null)return null;const a=n.Tn(s.kind);De.Wt.vt(i,a)}return n.cn()}Mn(t){const e=new Yn;return De.Wt.vt(t,e.Tn(0)),e.cn()}Bn(t,e){const n=new Yn;return De.Wt.vt(Er(this.databaseId,e),n.Tn(function(i){const a=Pe(i);return a.length===0?0:a[a.length-1].kind}(t))),n.cn()}Cn(t,e,n){if(n===null)return[];let s=[];s.push(new Yn);let i=0;for(const a of Pe(t)){const u=n[i++];for(const l of s)if(this.Ln(e,a.fieldPath)&&Tr(u))s=this.kn(s,a,u);else{const d=l.Tn(a.kind);De.Wt.vt(u,d)}}return this.qn(s)}vn(t,e,n){return this.Cn(t,e,n.position)}qn(t){const e=[];for(let n=0;n<t.length;++n)e[n]=t[n].cn();return e}kn(t,e,n){const s=[...t],i=[];for(const a of n.arrayValue.values||[])for(const u of s){const l=new Yn;l.seed(u.cn()),De.Wt.vt(a,l.Tn(e.kind)),i.push(l)}return i}Ln(t,e){return!!t.filters.find(n=>n instanceof G&&n.field.isEqual(e)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(t,e){const n=Jn(t),s=rn(t);return(e?n.J(no,IDBKeyRange.bound(e,e)):n.J()).next(i=>{const a=[];return w.forEach(i,u=>s.get([u.indexId,this.uid]).next(l=>{a.push(function(m,p){const T=p?new fr(p.sequenceNumber,new kt(ze(p.readTime),new M(qt(p.documentKey)),p.largestBatchId)):fr.empty(),P=m.fields.map(([C,k])=>new ls(it.fromServerFormat(C),k));return new Rs(m.indexId,m.collectionGroup,P,T)}(u,l))})).next(()=>a)})}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next(e=>e.length===0?null:(e.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:U(n.collectionGroup,s.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(t,e,n){const s=Jn(t),i=rn(t);return this.Qn(t).next(a=>s.J(no,IDBKeyRange.bound(e,e)).next(u=>w.forEach(u,l=>i.put(cc(l.indexId,this.uid,a,n)))))}updateIndexEntries(t,e){const n=new Map;return w.forEach(e,(s,i)=>{const a=n.get(s.collectionGroup);return(a?w.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next(u=>(n.set(s.collectionGroup,u),w.forEach(u,l=>this.$n(t,s,l).next(d=>{const m=this.Un(i,l);return d.isEqual(m)?w.resolve():this.Kn(t,i,l,d,m)}))))})}Wn(t,e,n,s){return nn(t).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.Bn(n,e.key),documentKey:e.key.path.toArray()})}Gn(t,e,n,s){return nn(t).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.Bn(n,e.key),e.key.path.toArray()])}$n(t,e,n){const s=nn(t);let i=new Z(ie);return s.te({index:Pl,range:IDBKeyRange.only([n.indexId,this.uid,this.Bn(n,e)])},(a,u)=>{i=i.add(new xe(n.indexId,e,u.arrayValue,u.directionalValue))}).next(()=>i)}Un(t,e){let n=new Z(ie);const s=this.Nn(e,t);if(s==null)return n;const i=to(e);if(i!=null){const a=t.data.field(i.fieldPath);if(Tr(a))for(const u of a.arrayValue.values||[])n=n.add(new xe(e.indexId,t.key,this.Mn(u),s))}else n=n.add(new xe(e.indexId,t.key,ss,s));return n}Kn(t,e,n,s,i){S(gc,"Updating index entries for document '%s'",e.key);const a=[];return function(l,d,m,p,T){const P=l.getIterator(),C=d.getIterator();let k=tn(P),D=tn(C);for(;k||D;){let $=!1,z=!1;if(k&&D){const B=m(k,D);B<0?z=!0:B>0&&($=!0)}else k!=null?z=!0:$=!0;$?(p(D),D=tn(C)):z?(T(k),k=tn(P)):(k=tn(P),D=tn(C))}}(s,i,ie,u=>{a.push(this.Wn(t,e,n,u))},u=>{a.push(this.Gn(t,e,n,u))}),w.waitFor(a)}Qn(t){let e=1;return rn(t).te({index:bl,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),e=s.sequenceNumber+1}).next(()=>e)}createRange(t,e,n){n=n.sort((a,u)=>ie(a,u)).filter((a,u,l)=>!u||ie(a,l[u-1])!==0);const s=[];s.push(t);for(const a of n){const u=ie(a,t),l=ie(a,e);if(u===0)s[0]=t.In();else if(u>0&&l<0)s.push(a),s.push(a.In());else if(l>0)break}s.push(e);const i=[];for(let a=0;a<s.length;a+=2){if(this.zn(s[a],s[a+1]))return[];const u=[s[a].indexId,this.uid,s[a].arrayValue,s[a].directionalValue,ss,[]],l=[s[a+1].indexId,this.uid,s[a+1].arrayValue,s[a+1].directionalValue,ss,[]];i.push(IDBKeyRange.bound(u,l))}return i}zn(t,e){return ie(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(yc)}getMinOffset(t,e){return w.mapArray(this.Sn(e),n=>this.Dn(t,n).next(s=>s||O(44426))).next(yc)}}function _c(r){return ht(r,_r)}function nn(r){return ht(r,Cs)}function Jn(r){return ht(r,Do)}function rn(r){return ht(r,Ss)}function yc(r){F(r.length!==0,28825);let t=r[0].indexState.offset,e=t.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Vo(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new kt(t.readTime,t.documentKey,e)}/**
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
 */const Ic={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Vh=41943040;class vt{static withCacheSize(t){return new vt(t,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function Sh(r,t,e){const n=r.store(Lt),s=r.store(mn),i=[],a=IDBKeyRange.only(e.batchId);let u=0;const l=n.te({range:a},(m,p,T)=>(u++,T.delete()));i.push(l.next(()=>{F(u===1,47070,{batchId:e.batchId})}));const d=[];for(const m of e.mutations){const p=wl(t,m.key.path,e.batchId);i.push(s.delete(p)),d.push(m.key)}return w.waitFor(i).next(()=>d)}function Ls(r){if(!r)return 0;let t;if(r.document)t=r.document;else if(r.unknownDocument)t=r.unknownDocument;else{if(!r.noDocument)throw O(14731);t=r.noDocument}return JSON.stringify(t).length}/**
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
 */vt.DEFAULT_COLLECTION_PERCENTILE=10,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,vt.DEFAULT=new vt(Vh,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),vt.DISABLED=new vt(-1,0,0);class ei{constructor(t,e,n,s){this.userId=t,this.serializer=e,this.indexManager=n,this.referenceDelegate=s,this.jn={}}static bt(t,e,n,s){F(t.uid!=="",64387);const i=t.isAuthenticated()?t.uid:"";return new ei(i,e,n,s)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return oe(t).te({index:Ne,range:n},(s,i,a)=>{e=!1,a.done()}).next(()=>e)}addMutationBatch(t,e,n,s){const i=ln(t),a=oe(t);return a.add({}).next(u=>{F(typeof u=="number",49019);const l=new Uo(u,e,n,s),d=function(P,C,k){const D=k.baseMutations.map(z=>Ms(P.wt,z)),$=k.mutations.map(z=>Ms(P.wt,z));return{userId:C,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:D,mutations:$}}(this.serializer,this.userId,l),m=[];let p=new Z((T,P)=>U(T.canonicalString(),P.canonicalString()));for(const T of s){const P=wl(this.userId,T.key.path,u);p=p.add(T.key.path.popLast()),m.push(a.put(d)),m.push(i.put(P,Ym))}return p.forEach(T=>{m.push(this.indexManager.addToCollectionParentIndex(t,T))}),t.addOnCommittedListener(()=>{this.jn[u]=l.keys()}),w.waitFor(m).next(()=>l)})}lookupMutationBatch(t,e){return oe(t).get(e).next(n=>n?(F(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:e}),Ce(this.serializer,n)):null)}Hn(t,e){return this.jn[e]?w.resolve(this.jn[e]):this.lookupMutationBatch(t,e).next(n=>{if(n){const s=n.keys();return this.jn[e]=s,s}return null})}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return oe(t).te({index:Ne,range:s},(a,u,l)=>{u.userId===this.userId&&(F(u.batchId>=n,47524,{Jn:n}),i=Ce(this.serializer,u)),l.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=ke;return oe(t).te({index:Ne,range:e,reverse:!0},(s,i,a)=>{n=i.batchId,a.done()}).next(()=>n)}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,ke],[this.userId,Number.POSITIVE_INFINITY]);return oe(t).J(Ne,e).next(n=>n.map(s=>Ce(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=hs(this.userId,e.path),s=IDBKeyRange.lowerBound(n),i=[];return ln(t).te({range:s},(a,u,l)=>{const[d,m,p]=a,T=qt(m);if(d===this.userId&&e.path.isEqual(T))return oe(t).get(p).next(P=>{if(!P)throw O(61480,{Yn:a,batchId:p});F(P.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:P.userId,batchId:p}),i.push(Ce(this.serializer,P))});l.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Z(U);const s=[];return e.forEach(i=>{const a=hs(this.userId,i.path),u=IDBKeyRange.lowerBound(a),l=ln(t).te({range:u},(d,m,p)=>{const[T,P,C]=d,k=qt(P);T===this.userId&&i.path.isEqual(k)?n=n.add(C):p.done()});s.push(l)}),w.waitFor(s).next(()=>this.Zn(t,n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1,i=hs(this.userId,n),a=IDBKeyRange.lowerBound(i);let u=new Z(U);return ln(t).te({range:a},(l,d,m)=>{const[p,T,P]=l,C=qt(T);p===this.userId&&n.isPrefixOf(C)?C.length===s&&(u=u.add(P)):m.done()}).next(()=>this.Zn(t,u))}Zn(t,e){const n=[],s=[];return e.forEach(i=>{s.push(oe(t).get(i).next(a=>{if(a===null)throw O(35274,{batchId:i});F(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:i}),n.push(Ce(this.serializer,a))}))}),w.waitFor(s).next(()=>n)}removeMutationBatch(t,e){return Sh(t.he,this.userId,e).next(n=>(t.addOnCommittedListener(()=>{this.Xn(e.batchId)}),w.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))}Xn(t){delete this.jn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next(e=>{if(!e)return w.resolve();const n=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),s=[];return ln(t).te({range:n},(i,a,u)=>{if(i[0]===this.userId){const l=qt(i[1]);s.push(l)}else u.done()}).next(()=>{F(s.length===0,56720,{er:s.map(i=>i.canonicalString())})})})}containsKey(t,e){return Ch(t,this.userId,e)}tr(t){return Dh(t).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:ke,lastStreamToken:""})}}function Ch(r,t,e){const n=hs(t,e.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return ln(r).te({range:i,ee:!0},(u,l,d)=>{const[m,p,T]=u;m===t&&p===s&&(a=!0),d.done()}).next(()=>a)}function oe(r){return ht(r,Lt)}function ln(r){return ht(r,mn)}function Dh(r){return ht(r,pr)}/**
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
 */class je{constructor(t){this.nr=t}next(){return this.nr+=2,this.nr}static rr(){return new je(0)}static ir(){return new je(-1)}}/**
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
 */class vg{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.sr(t).next(e=>{const n=new je(e.highestTargetId);return e.highestTargetId=n.next(),this._r(t,e).next(()=>e.highestTargetId)})}getLastRemoteSnapshotVersion(t){return this.sr(t).next(e=>L.fromTimestamp(new ot(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(t){return this.sr(t).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(t,e,n){return this.sr(t).next(s=>(s.highestListenSequenceNumber=e,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this._r(t,s)))}addTargetData(t,e){return this.ar(t,e).next(()=>this.sr(t).next(n=>(n.targetCount+=1,this.ur(e,n),this._r(t,n))))}updateTargetData(t,e){return this.ar(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next(()=>sn(t).delete(e.targetId)).next(()=>this.sr(t)).next(n=>(F(n.targetCount>0,8065),n.targetCount-=1,this._r(t,n)))}removeTargets(t,e,n){let s=0;const i=[];return sn(t).te((a,u)=>{const l=rr(u);l.sequenceNumber<=e&&n.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(t,l)))}).next(()=>w.waitFor(i)).next(()=>s)}forEachTarget(t,e){return sn(t).te((n,s)=>{const i=rr(s);e(i)})}sr(t){return Ec(t).get(Vs).next(e=>(F(e!==null,2888),e))}_r(t,e){return Ec(t).put(Vs,e)}ar(t,e){return sn(t).put(Ah(this.serializer,e))}ur(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.sr(t).next(e=>e.targetCount)}getTargetData(t,e){const n=Ue(e),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return sn(t).te({range:s,index:Rl},(a,u,l)=>{const d=rr(u);Pr(e,d.target)&&(i=d,l.done())}).next(()=>i)}addMatchingKeys(t,e,n){const s=[],i=ue(t);return e.forEach(a=>{const u=At(a.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(t,n,a))}),w.waitFor(s)}removeMatchingKeys(t,e,n){const s=ue(t);return w.forEach(e,i=>{const a=At(i.path);return w.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(t,n,i)])})}removeMatchingKeysForTargetId(t,e){const n=ue(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),s=ue(t);let i=j();return s.te({range:n,ee:!0},(a,u,l)=>{const d=qt(a[1]),m=new M(d);i=i.add(m)}).next(()=>i)}containsKey(t,e){const n=At(e.path),s=IDBKeyRange.bound([n],[yl(n)],!1,!0);let i=0;return ue(t).te({index:Co,ee:!0,range:s},([a,u],l,d)=>{a!==0&&(i++,d.done())}).next(()=>i>0)}Rt(t,e){return sn(t).get(e).next(n=>n?rr(n):null)}}function sn(r){return ht(r,pn)}function Ec(r){return ht(r,Me)}function ue(r){return ht(r,gn)}/**
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
 */const Tc="LruGarbageCollector",wg=1048576;function vc([r,t],[e,n]){const s=U(r,e);return s===0?U(t,n):s}class Ag{constructor(t){this.cr=t,this.buffer=new Z(vc),this.lr=0}hr(){return++this.lr}Pr(t){const e=[t,this.hr()];if(this.buffer.size<this.cr)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();vc(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class xh{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Tr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ir(6e4)}stop(){this.Tr&&(this.Tr.cancel(),this.Tr=null)}get started(){return this.Tr!==null}Ir(t){S(Tc,`Garbage collection scheduled in ${t}ms`),this.Tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Ie(e)?S(Tc,"Ignoring IndexedDB error during garbage collection: ",e):await Ge(e)}await this.Ir(3e5)})}}class Rg{constructor(t,e){this.Er=t,this.params=e}calculateTargetCount(t,e){return this.Er.dr(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return w.resolve(Mt.le);const n=new Ag(e);return this.Er.forEachTarget(t,s=>n.Pr(s.sequenceNumber)).next(()=>this.Er.Ar(t,s=>n.Pr(s))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Er.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Er.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(S("LruGarbageCollector","Garbage collection skipped; disabled"),w.resolve(Ic)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(S("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ic):this.Rr(t,e))}getCacheSize(t){return this.Er.getCacheSize(t)}Rr(t,e){let n,s,i,a,u,l,d;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(S("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(t,s))).next(p=>(n=p,u=Date.now(),this.removeTargets(t,n,e))).next(p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(t,n))).next(p=>(d=Date.now(),on()<=Q.DEBUG&&S("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(l-u)+`ms
	Removed ${p} documents in `+(d-l)+`ms
Total Duration: ${d-m}ms`),w.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function Nh(r,t){return new Rg(r,t)}/**
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
 */class bg{constructor(t,e){this.db=t,this.garbageCollector=Nh(this,e)}dr(t){const e=this.Vr(t);return this.db.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}Vr(t){let e=0;return this.Ar(t,n=>{e++}).next(()=>e)}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}Ar(t,e){return this.mr(t,(n,s)=>e(s))}addReference(t,e,n){return is(t,n)}removeReference(t,e,n){return is(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return is(t,e)}gr(t,e){return function(s,i){let a=!1;return Dh(s).ne(u=>Ch(s,u,i).next(l=>(l&&(a=!0),w.resolve(!l)))).next(()=>a)}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.mr(t,(a,u)=>{if(u<=e){const l=this.gr(t,a).next(d=>{if(!d)return i++,n.getEntry(t,a).next(()=>(n.removeEntry(a,L.min()),ue(t).delete(function(p){return[0,At(p.path)]}(a))))});s.push(l)}}).next(()=>w.waitFor(s)).next(()=>n.apply(t)).next(()=>i)}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return is(t,e)}mr(t,e){const n=ue(t);let s,i=Mt.le;return n.te({index:Co},([a,u],{path:l,sequenceNumber:d})=>{a===0?(i!==Mt.le&&e(new M(qt(s)),i),i=d,s=l):i=Mt.le}).next(()=>{i!==Mt.le&&e(new M(qt(s)),i)})}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function is(r,t){return ue(r).put(function(n,s){return{targetId:0,path:At(n.path),sequenceNumber:s}}(t,r.currentSequenceNumber))}/**
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
 */class kh{constructor(){this.changes=new Zt(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,ut.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?w.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class Pg{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,n){return Re(t).put(n)}removeEntry(t,e,n){return Re(t).delete(function(i,a){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],Os(a),u[u.length-1]]}(e,n))}updateMetadata(t,e){return this.getMetadata(t).next(n=>(n.byteSize+=e,this.pr(t,n)))}getEntry(t,e){let n=ut.newInvalidDocument(e);return Re(t).te({index:ds,range:IDBKeyRange.only(Xn(e))},(s,i)=>{n=this.yr(e,i)}).next(()=>n)}wr(t,e){let n={size:0,document:ut.newInvalidDocument(e)};return Re(t).te({index:ds,range:IDBKeyRange.only(Xn(e))},(s,i)=>{n={document:this.yr(e,i),size:Ls(i)}}).next(()=>n)}getEntries(t,e){let n=Nt();return this.br(t,e,(s,i)=>{const a=this.yr(s,i);n=n.insert(s,a)}).next(()=>n)}Sr(t,e){let n=Nt(),s=new st(M.comparator);return this.br(t,e,(i,a)=>{const u=this.yr(i,a);n=n.insert(i,u),s=s.insert(i,Ls(a))}).next(()=>({documents:n,Dr:s}))}br(t,e,n){if(e.isEmpty())return w.resolve();let s=new Z(Rc);e.forEach(l=>s=s.add(l));const i=IDBKeyRange.bound(Xn(s.first()),Xn(s.last())),a=s.getIterator();let u=a.getNext();return Re(t).te({index:ds,range:i},(l,d,m)=>{const p=M.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;u&&Rc(u,p)<0;)n(u,null),u=a.getNext();u&&u.isEqual(p)&&(n(u,d),u=a.hasNext()?a.getNext():null),u?m.H(Xn(u)):m.done()}).next(()=>{for(;u;)n(u,null),u=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(t,e,n,s,i){const a=e.path,u=[a.popLast().toArray(),a.lastSegment(),Os(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],l=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Re(t).J(IDBKeyRange.bound(u,l,!0)).next(d=>{i==null||i.incrementDocumentReadCount(d.length);let m=Nt();for(const p of d){const T=this.yr(M.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);T.isFoundDocument()&&(Vr(e,T)||s.has(T.key))&&(m=m.insert(T.key,T))}return m})}getAllFromCollectionGroup(t,e,n,s){let i=Nt();const a=Ac(e,n),u=Ac(e,kt.max());return Re(t).te({index:Al,range:IDBKeyRange.bound(a,u,!0)},(l,d,m)=>{const p=this.yr(M.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);i=i.insert(p.key,p),i.size===s&&m.done()}).next(()=>i)}newChangeBuffer(t){return new Vg(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next(e=>e.byteSize)}getMetadata(t){return wc(t).get(eo).next(e=>(F(!!e,20021),e))}pr(t,e){return wc(t).put(eo,e)}yr(t,e){if(e){const n=dg(this.serializer,e);if(!(n.isNoDocument()&&n.version.isEqual(L.min())))return n}return ut.newInvalidDocument(t)}}function Mh(r){return new Pg(r)}class Vg extends kh{constructor(t,e){super(),this.vr=t,this.trackRemovals=e,this.Cr=new Zt(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(t){const e=[];let n=0,s=new Z((i,a)=>U(i.canonicalString(),a.canonicalString()));return this.changes.forEach((i,a)=>{const u=this.Cr.get(i);if(e.push(this.vr.removeEntry(t,i,u.readTime)),a.isValidDocument()){const l=ac(this.vr.serializer,a);s=s.add(i.path.popLast());const d=Ls(l);n+=d-u.size,e.push(this.vr.addEntry(t,i,l))}else if(n-=u.size,this.trackRemovals){const l=ac(this.vr.serializer,a.convertToNoDocument(L.min()));e.push(this.vr.addEntry(t,i,l))}}),s.forEach(i=>{e.push(this.vr.indexManager.addToCollectionParentIndex(t,i))}),e.push(this.vr.updateMetadata(t,n)),w.waitFor(e)}getFromCache(t,e){return this.vr.wr(t,e).next(n=>(this.Cr.set(e,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(t,e){return this.vr.Sr(t,e).next(({documents:n,Dr:s})=>(s.forEach((i,a)=>{this.Cr.set(i,{size:a,readTime:n.get(i).readTime})}),n))}}function wc(r){return ht(r,gr)}function Re(r){return ht(r,Ps)}function Xn(r){const t=r.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Ac(r,t){const e=t.documentKey.path.toArray();return[r,Os(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function Rc(r,t){const e=r.path.toArray(),n=t.path.toArray();let s=0;for(let i=0;i<e.length-2&&i<n.length-2;++i)if(s=U(e[i],n[i]),s)return s;return s=U(e.length,n.length),s||(s=U(e[e.length-2],n[n.length-2]),s||U(e[e.length-1],n[n.length-1]))}/**
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
 */class Sg{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class Oh{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(n!==null&&cr(n.mutation,s,St.empty(),ot.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,j()).next(()=>n))}getLocalViewOfDocuments(t,e,n=j()){const s=zt();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(i=>{let a=er();return i.forEach((u,l)=>{a=a.insert(u,l.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const n=zt();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,j()))}populateOverlays(t,e,n){const s=[];return n.forEach(i=>{e.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(t,s).next(i=>{i.forEach((a,u)=>{e.set(a,u)})})}computeViews(t,e,n,s){let i=Nt();const a=ur(),u=function(){return ur()}();return e.forEach((l,d)=>{const m=n.get(d.key);s.has(d.key)&&(m===void 0||m.mutation instanceof te)?i=i.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),cr(m.mutation,d,m.mutation.getFieldMask(),ot.now())):a.set(d.key,St.empty())}),this.recalculateAndSaveOverlays(t,i).next(l=>(l.forEach((d,m)=>a.set(d,m)),e.forEach((d,m)=>{var p;return u.set(d,new Sg(m,(p=a.get(d))!==null&&p!==void 0?p:null))}),u))}recalculateAndSaveOverlays(t,e){const n=ur();let s=new st((a,u)=>a-u),i=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const u of a)u.keys().forEach(l=>{const d=e.get(l);if(d===null)return;let m=n.get(l)||St.empty();m=u.applyToLocalView(d,m),n.set(l,m);const p=(s.get(u.batchId)||j()).add(l);s=s.insert(u.batchId,p)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const l=u.getNext(),d=l.key,m=l.value,p=th();m.forEach(T=>{if(!i.has(T)){const P=oh(e.get(T),n.get(T));P!==null&&p.set(T,P),i=i.add(T)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,p))}return w.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,s){return function(a){return M.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Wl(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-i.size):w.resolve(zt());let u=dr,l=i;return a.next(d=>w.forEach(d,(m,p)=>(u<p.largestBatchId&&(u=p.largestBatchId),i.get(m)?w.resolve():this.remoteDocumentCache.getEntry(t,m).next(T=>{l=l.insert(m,T)}))).next(()=>this.populateOverlays(t,d,i)).next(()=>this.computeViews(t,l,d,j())).next(m=>({batchId:u,changes:Zl(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(n=>{let s=er();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const i=e.collectionGroup;let a=er();return this.indexManager.getCollectionParents(t,i).next(u=>w.forEach(u,l=>{const d=function(p,T){return new Sn(T,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(e,l.child(i));return this.getDocumentsMatchingCollectionQuery(t,d,n,s).next(m=>{m.forEach((p,T)=>{a=a.insert(p,T)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,s))).next(a=>{i.forEach((l,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,ut.newInvalidDocument(m)))});let u=er();return a.forEach((l,d)=>{const m=i.get(l);m!==void 0&&cr(m.mutation,d,St.empty(),ot.now()),Vr(e,d)&&(u=u.insert(l,d))}),u})}}/**
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
 */class Cg{constructor(t){this.serializer=t,this.Fr=new Map,this.Mr=new Map}getBundleMetadata(t,e){return w.resolve(this.Fr.get(e))}saveBundleMetadata(t,e){return this.Fr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Vt(s.createTime)}}(e)),w.resolve()}getNamedQuery(t,e){return w.resolve(this.Mr.get(e))}saveNamedQuery(t,e){return this.Mr.set(e.name,function(s){return{name:s.name,query:Rh(s.bundledQuery),readTime:Vt(s.readTime)}}(e)),w.resolve()}}/**
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
 */class Dg{constructor(){this.overlays=new st(M.comparator),this.Or=new Map}getOverlay(t,e){return w.resolve(this.overlays.get(e))}getOverlays(t,e){const n=zt();return w.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((s,i)=>{this.St(t,e,i)}),w.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Or.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Or.delete(n)),w.resolve()}getOverlaysForCollection(t,e,n){const s=zt(),i=e.length+1,a=new M(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const l=u.getNext().value,d=l.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===i&&l.largestBatchId>n&&s.set(l.getKey(),l)}return w.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let i=new st((d,m)=>d-m);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>n){let m=i.get(d.largestBatchId);m===null&&(m=zt(),i=i.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const u=zt(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,m)=>u.set(d,m)),!(u.size()>=s)););return w.resolve(u)}St(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.Or.get(s.largestBatchId).delete(n.key);this.Or.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new zo(e,n));let i=this.Or.get(e);i===void 0&&(i=j(),this.Or.set(e,i)),this.Or.set(e,i.add(n.key))}}/**
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
 */class xg{constructor(){this.sessionToken=lt.EMPTY_BYTE_STRING}getSessionToken(t){return w.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,w.resolve()}}/**
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
 */class Qo{constructor(){this.Nr=new Z(dt.Br),this.Lr=new Z(dt.kr)}isEmpty(){return this.Nr.isEmpty()}addReference(t,e){const n=new dt(t,e);this.Nr=this.Nr.add(n),this.Lr=this.Lr.add(n)}qr(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.Qr(new dt(t,e))}$r(t,e){t.forEach(n=>this.removeReference(n,e))}Ur(t){const e=new M(new J([])),n=new dt(e,t),s=new dt(e,t+1),i=[];return this.Lr.forEachInRange([n,s],a=>{this.Qr(a),i.push(a.key)}),i}Kr(){this.Nr.forEach(t=>this.Qr(t))}Qr(t){this.Nr=this.Nr.delete(t),this.Lr=this.Lr.delete(t)}Wr(t){const e=new M(new J([])),n=new dt(e,t),s=new dt(e,t+1);let i=j();return this.Lr.forEachInRange([n,s],a=>{i=i.add(a.key)}),i}containsKey(t){const e=new dt(t,0),n=this.Nr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class dt{constructor(t,e){this.key=t,this.Gr=e}static Br(t,e){return M.comparator(t.key,e.key)||U(t.Gr,e.Gr)}static kr(t,e){return U(t.Gr,e.Gr)||M.comparator(t.key,e.key)}}/**
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
 */class Ng{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Jn=1,this.zr=new Z(dt.Br)}checkEmpty(t){return w.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const i=this.Jn;this.Jn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Uo(i,e,n,s);this.mutationQueue.push(a);for(const u of s)this.zr=this.zr.add(new dt(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return w.resolve(a)}lookupMutationBatch(t,e){return w.resolve(this.jr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.Hr(n),i=s<0?0:s;return w.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return w.resolve(this.mutationQueue.length===0?ke:this.Jn-1)}getAllMutationBatches(t){return w.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new dt(e,0),s=new dt(e,Number.POSITIVE_INFINITY),i=[];return this.zr.forEachInRange([n,s],a=>{const u=this.jr(a.Gr);i.push(u)}),w.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Z(U);return e.forEach(s=>{const i=new dt(s,0),a=new dt(s,Number.POSITIVE_INFINITY);this.zr.forEachInRange([i,a],u=>{n=n.add(u.Gr)})}),w.resolve(this.Jr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;M.isDocumentKey(i)||(i=i.child(""));const a=new dt(new M(i),0);let u=new Z(U);return this.zr.forEachWhile(l=>{const d=l.key.path;return!!n.isPrefixOf(d)&&(d.length===s&&(u=u.add(l.Gr)),!0)},a),w.resolve(this.Jr(u))}Jr(t){const e=[];return t.forEach(n=>{const s=this.jr(n);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){F(this.Yr(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.zr;return w.forEach(e.mutations,s=>{const i=new dt(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.zr=n})}Xn(t){}containsKey(t,e){const n=new dt(e,0),s=this.zr.firstAfterOrEqual(n);return w.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,w.resolve()}Yr(t,e){return this.Hr(t)}Hr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}jr(t){const e=this.Hr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class kg{constructor(t){this.Zr=t,this.docs=function(){return new st(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),i=s?s.size:0,a=this.Zr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return w.resolve(n?n.document.mutableCopy():ut.newInvalidDocument(e))}getEntries(t,e){let n=Nt();return e.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ut.newInvalidDocument(s))}),w.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let i=Nt();const a=e.path,u=new M(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){const{key:d,value:{document:m}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Vo(Il(m),n)<=0||(s.has(m.key)||Vr(e,m))&&(i=i.insert(m.key,m.mutableCopy()))}return w.resolve(i)}getAllFromCollectionGroup(t,e,n,s){O(9500)}Xr(t,e){return w.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new Mg(this)}getSize(t){return w.resolve(this.size)}}class Mg extends kh{constructor(t){super(),this.vr=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.vr.addEntry(t,s)):this.vr.removeEntry(n)}),w.waitFor(e)}getFromCache(t,e){return this.vr.getEntry(t,e)}getAllFromCache(t,e){return this.vr.getEntries(t,e)}}/**
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
 */class Og{constructor(t){this.persistence=t,this.ei=new Zt(e=>Ue(e),Pr),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.ti=0,this.ni=new Qo,this.targetCount=0,this.ri=je.rr()}forEachTarget(t,e){return this.ei.forEach((n,s)=>e(s)),w.resolve()}getLastRemoteSnapshotVersion(t){return w.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return w.resolve(this.ti)}allocateTargetId(t){return this.highestTargetId=this.ri.next(),w.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ti&&(this.ti=e),w.resolve()}ar(t){this.ei.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ri=new je(e),this.highestTargetId=e),t.sequenceNumber>this.ti&&(this.ti=t.sequenceNumber)}addTargetData(t,e){return this.ar(e),this.targetCount+=1,w.resolve()}updateTargetData(t,e){return this.ar(e),w.resolve()}removeTargetData(t,e){return this.ei.delete(e.target),this.ni.Ur(e.targetId),this.targetCount-=1,w.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.ei.forEach((a,u)=>{u.sequenceNumber<=e&&n.get(u.targetId)===null&&(this.ei.delete(a),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)}),w.waitFor(i).next(()=>s)}getTargetCount(t){return w.resolve(this.targetCount)}getTargetData(t,e){const n=this.ei.get(e)||null;return w.resolve(n)}addMatchingKeys(t,e,n){return this.ni.qr(e,n),w.resolve()}removeMatchingKeys(t,e,n){this.ni.$r(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach(a=>{i.push(s.markPotentiallyOrphaned(t,a))}),w.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.ni.Ur(e),w.resolve()}getMatchingKeysForTargetId(t,e){const n=this.ni.Wr(e);return w.resolve(n)}containsKey(t,e){return w.resolve(this.ni.containsKey(e))}}/**
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
 */class Ho{constructor(t,e){this.ii={},this.overlays={},this.si=new Mt(0),this.oi=!1,this.oi=!0,this._i=new xg,this.referenceDelegate=t(this),this.ai=new Og(this),this.indexManager=new Eg,this.remoteDocumentCache=function(s){return new kg(s)}(n=>this.referenceDelegate.ui(n)),this.serializer=new wh(e),this.ci=new Cg(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.oi=!1,Promise.resolve()}get started(){return this.oi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Dg,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ii[t.toKey()];return n||(n=new Ng(e,this.referenceDelegate),this.ii[t.toKey()]=n),n}getGlobalsCache(){return this._i}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.ci}runTransaction(t,e,n){S("MemoryPersistence","Starting transaction:",t);const s=new Fg(this.si.next());return this.referenceDelegate.li(),n(s).next(i=>this.referenceDelegate.hi(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Pi(t,e){return w.or(Object.values(this.ii).map(n=>()=>n.containsKey(t,e)))}}class Fg extends Tl{constructor(t){super(),this.currentSequenceNumber=t}}class ni{constructor(t){this.persistence=t,this.Ti=new Qo,this.Ii=null}static Ei(t){return new ni(t)}get di(){if(this.Ii)return this.Ii;throw O(60996)}addReference(t,e,n){return this.Ti.addReference(n,e),this.di.delete(n.toString()),w.resolve()}removeReference(t,e,n){return this.Ti.removeReference(n,e),this.di.add(n.toString()),w.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),w.resolve()}removeTarget(t,e){this.Ti.Ur(e.targetId).forEach(s=>this.di.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(i=>this.di.add(i.toString()))}).next(()=>n.removeTargetData(t,e))}li(){this.Ii=new Set}hi(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return w.forEach(this.di,n=>{const s=M.fromPath(n);return this.Ai(t,s).next(i=>{i||e.removeEntry(s,L.min())})}).next(()=>(this.Ii=null,e.apply(t)))}updateLimboDocument(t,e){return this.Ai(t,e).next(n=>{n?this.di.delete(e.toString()):this.di.add(e.toString())})}ui(t){return 0}Ai(t,e){return w.or([()=>w.resolve(this.Ti.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Pi(t,e)])}}class Bs{constructor(t,e){this.persistence=t,this.Ri=new Zt(n=>At(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=Nh(this,e)}static Ei(t,e){return new Bs(t,e)}li(){}hi(t){return w.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.Vr(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}Vr(t){let e=0;return this.Ar(t,n=>{e++}).next(()=>e)}Ar(t,e){return w.forEach(this.Ri,(n,s)=>this.gr(t,n,s).next(i=>i?w.resolve():e(s)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Xr(t,a=>this.gr(t,a,e).next(u=>{u||(n++,i.removeEntry(a,L.min()))})).next(()=>i.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.Ri.set(e,t.currentSequenceNumber),w.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.Ri.set(n,t.currentSequenceNumber),w.resolve()}removeReference(t,e,n){return this.Ri.set(n,t.currentSequenceNumber),w.resolve()}updateLimboDocument(t,e){return this.Ri.set(e,t.currentSequenceNumber),w.resolve()}ui(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=ms(t.data.value)),e}gr(t,e,n){return w.or([()=>this.persistence.Pi(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.Ri.get(e);return w.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class Lg{constructor(t){this.serializer=t}q(t,e,n,s){const i=new js("createOrUpgrade",e);n<1&&s>=1&&(function(l){l.createObjectStore(br)}(t),function(l){l.createObjectStore(pr,{keyPath:Wm}),l.createObjectStore(Lt,{keyPath:Fu,autoIncrement:!0}).createIndex(Ne,Lu,{unique:!0}),l.createObjectStore(mn)}(t),bc(t),function(l){l.createObjectStore(Ve)}(t));let a=w.resolve();return n<3&&s>=3&&(n!==0&&(function(l){l.deleteObjectStore(gn),l.deleteObjectStore(pn),l.deleteObjectStore(Me)}(t),bc(t)),a=a.next(()=>function(l){const d=l.store(Me),m={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:L.min().toTimestamp(),targetCount:0};return d.put(Vs,m)}(i))),n<4&&s>=4&&(n!==0&&(a=a.next(()=>function(l,d){return d.store(Lt).J().next(p=>{l.deleteObjectStore(Lt),l.createObjectStore(Lt,{keyPath:Fu,autoIncrement:!0}).createIndex(Ne,Lu,{unique:!0});const T=d.store(Lt),P=p.map(C=>T.put(C));return w.waitFor(P)})}(t,i))),a=a.next(()=>{(function(l){l.createObjectStore(_n,{keyPath:sp})})(t)})),n<5&&s>=5&&(a=a.next(()=>this.Vi(i))),n<6&&s>=6&&(a=a.next(()=>(function(l){l.createObjectStore(gr)}(t),this.mi(i)))),n<7&&s>=7&&(a=a.next(()=>this.fi(i))),n<8&&s>=8&&(a=a.next(()=>this.gi(t,i))),n<9&&s>=9&&(a=a.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(t)})),n<10&&s>=10&&(a=a.next(()=>this.pi(i))),n<11&&s>=11&&(a=a.next(()=>{(function(l){l.createObjectStore(Gs,{keyPath:ip})})(t),function(l){l.createObjectStore(Ks,{keyPath:op})}(t)})),n<12&&s>=12&&(a=a.next(()=>{(function(l){const d=l.createObjectStore(Qs,{keyPath:fp});d.createIndex(ro,mp,{unique:!1}),d.createIndex(Vl,pp,{unique:!1})})(t)})),n<13&&s>=13&&(a=a.next(()=>function(l){const d=l.createObjectStore(Ps,{keyPath:Jm});d.createIndex(ds,Xm),d.createIndex(Al,Zm)}(t)).next(()=>this.yi(t,i)).next(()=>t.deleteObjectStore(Ve))),n<14&&s>=14&&(a=a.next(()=>this.wi(t,i))),n<15&&s>=15&&(a=a.next(()=>function(l){l.createObjectStore(Do,{keyPath:ap,autoIncrement:!0}).createIndex(no,up,{unique:!1}),l.createObjectStore(Ss,{keyPath:cp}).createIndex(bl,lp,{unique:!1}),l.createObjectStore(Cs,{keyPath:hp}).createIndex(Pl,dp,{unique:!1})}(t))),n<16&&s>=16&&(a=a.next(()=>{e.objectStore(Ss).clear()}).next(()=>{e.objectStore(Cs).clear()})),n<17&&s>=17&&(a=a.next(()=>{(function(l){l.createObjectStore(xo,{keyPath:gp})})(t)})),a}mi(t){let e=0;return t.store(Ve).te((n,s)=>{e+=Ls(s)}).next(()=>{const n={byteSize:e};return t.store(gr).put(eo,n)})}Vi(t){const e=t.store(pr),n=t.store(Lt);return e.J().next(s=>w.forEach(s,i=>{const a=IDBKeyRange.bound([i.userId,ke],[i.userId,i.lastAcknowledgedBatchId]);return n.J(Ne,a).next(u=>w.forEach(u,l=>{F(l.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:l.batchId});const d=Ce(this.serializer,l);return Sh(t,i.userId,d).next(()=>{})}))}))}fi(t){const e=t.store(gn),n=t.store(Ve);return t.store(Me).get(Vs).next(s=>{const i=[];return n.te((a,u)=>{const l=new J(a),d=function(p){return[0,At(p)]}(l);i.push(e.get(d).next(m=>m?w.resolve():(p=>e.put({targetId:0,path:At(p),sequenceNumber:s.highestListenSequenceNumber}))(l)))}).next(()=>w.waitFor(i))})}gi(t,e){t.createObjectStore(_r,{keyPath:rp});const n=e.store(_r),s=new Ko,i=a=>{if(s.add(a)){const u=a.lastSegment(),l=a.popLast();return n.put({collectionId:u,parent:At(l)})}};return e.store(Ve).te({ee:!0},(a,u)=>{const l=new J(a);return i(l.popLast())}).next(()=>e.store(mn).te({ee:!0},([a,u,l],d)=>{const m=qt(u);return i(m.popLast())}))}pi(t){const e=t.store(pn);return e.te((n,s)=>{const i=rr(s),a=Ah(this.serializer,i);return e.put(a)})}yi(t,e){const n=e.store(Ve),s=[];return n.te((i,a)=>{const u=e.store(Ps),l=function(p){return p.document?new M(J.fromString(p.document.name).popFirst(5)):p.noDocument?M.fromSegments(p.noDocument.path):p.unknownDocument?M.fromSegments(p.unknownDocument.path):O(36783)}(a).path.toArray(),d={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(u.put(d))}).next(()=>w.waitFor(s))}wi(t,e){const n=e.store(Lt),s=Mh(this.serializer),i=new Ho(ni.Ei,this.serializer.wt);return n.J().next(a=>{const u=new Map;return a.forEach(l=>{var d;let m=(d=u.get(l.userId))!==null&&d!==void 0?d:j();Ce(this.serializer,l).keys().forEach(p=>m=m.add(p)),u.set(l.userId,m)}),w.forEach(u,(l,d)=>{const m=new pt(d),p=ti.bt(this.serializer,m),T=i.getIndexManager(m),P=ei.bt(m,this.serializer,T,i.referenceDelegate);return new Oh(s,P,p,T).recalculateAndSaveOverlaysForDocumentKeys(new so(e,Mt.le),l).next()})})}}function bc(r){r.createObjectStore(gn,{keyPath:ep}).createIndex(Co,np,{unique:!0}),r.createObjectStore(pn,{keyPath:"targetId"}).createIndex(Rl,tp,{unique:!0}),r.createObjectStore(Me)}const ae="IndexedDbPersistence",qi=18e5,zi=5e3,ji="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Bg="main";class Wo{constructor(t,e,n,s,i,a,u,l,d,m,p=17){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.bi=i,this.window=a,this.document=u,this.Si=d,this.Di=m,this.Ci=p,this.si=null,this.oi=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Fi=null,this.inForeground=!1,this.Mi=null,this.xi=null,this.Oi=Number.NEGATIVE_INFINITY,this.Ni=T=>Promise.resolve(),!Wo.C())throw new N(V.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new bg(this,s),this.Bi=e+Bg,this.serializer=new wh(l),this.Li=new fe(this.Bi,this.Ci,new Lg(this.serializer)),this._i=new mg,this.ai=new vg(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Mh(this.serializer),this.ci=new fg,this.window&&this.window.localStorage?this.ki=this.window.localStorage:(this.ki=null,m===!1&&Pt(ae,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.qi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new N(V.FAILED_PRECONDITION,ji);return this.Qi(),this.$i(),this.Ui(),this.runTransaction("getHighestListenSequenceNumber","readonly",t=>this.ai.getHighestSequenceNumber(t))}).then(t=>{this.si=new Mt(t,this.Si)}).then(()=>{this.oi=!0}).catch(t=>(this.Li&&this.Li.close(),Promise.reject(t)))}Ki(t){return this.Ni=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Li.U(async e=>{e.newVersion===null&&await t()})}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.bi.enqueueAndForget(async()=>{this.started&&await this.qi()}))}qi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",t=>os(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Wi(t).next(e=>{e||(this.isPrimary=!1,this.bi.enqueueRetryable(()=>this.Ni(!1)))})}).next(()=>this.Gi(t)).next(e=>this.isPrimary&&!e?this.zi(t).next(()=>!1):!!e&&this.ji(t).next(()=>!0))).catch(t=>{if(Ie(t))return S(ae,"Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return S(ae,"Releasing owner lease after error during lease refresh",t),!1}).then(t=>{this.isPrimary!==t&&this.bi.enqueueRetryable(()=>this.Ni(t)),this.isPrimary=t})}Wi(t){return Zn(t).get(Ze).next(e=>w.resolve(this.Hi(e)))}Ji(t){return os(t).delete(this.clientId)}async Yi(){if(this.isPrimary&&!this.Zi(this.Oi,qi)){this.Oi=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const n=ht(e,_n);return n.J().next(s=>{const i=this.Xi(s,qi),a=s.filter(u=>i.indexOf(u)===-1);return w.forEach(a,u=>n.delete(u.clientId)).next(()=>a)})}).catch(()=>[]);if(this.ki)for(const e of t)this.ki.removeItem(this.es(e.clientId))}}Ui(){this.xi=this.bi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.qi().then(()=>this.Yi()).then(()=>this.Ui()))}Hi(t){return!!t&&t.ownerId===this.clientId}Gi(t){return this.Di?w.resolve(!0):Zn(t).get(Ze).next(e=>{if(e!==null&&this.Zi(e.leaseTimestampMs,zi)&&!this.ts(e.ownerId)){if(this.Hi(e)&&this.networkEnabled)return!0;if(!this.Hi(e)){if(!e.allowTabSynchronization)throw new N(V.FAILED_PRECONDITION,ji);return!1}}return!(!this.networkEnabled||!this.inForeground)||os(t).J().next(n=>this.Xi(n,zi).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||a&&u)return!0}return!1})===void 0)}).next(e=>(this.isPrimary!==e&&S(ae,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.oi=!1,this.ns(),this.xi&&(this.xi.cancel(),this.xi=null),this.rs(),this.ss(),await this.Li.runTransaction("shutdown","readwrite",[br,_n],t=>{const e=new so(t,Mt.le);return this.zi(e).next(()=>this.Ji(e))}),this.Li.close(),this._s()}Xi(t,e){return t.filter(n=>this.Zi(n.updateTimeMs,e)&&!this.ts(n.clientId))}us(){return this.runTransaction("getActiveClients","readonly",t=>os(t).J().next(e=>this.Xi(e,qi).map(n=>n.clientId)))}get started(){return this.oi}getGlobalsCache(){return this._i}getMutationQueue(t,e){return ei.bt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new Tg(t,this.serializer.wt.databaseId)}getDocumentOverlayCache(t){return ti.bt(this.serializer,t)}getBundleCache(){return this.ci}runTransaction(t,e,n){S(ae,"Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",i=function(l){return l===17?Ip:l===16?yp:l===15?No:l===14?Dl:l===13?Cl:l===12?_p:l===11?Sl:void O(60245)}(this.Ci);let a;return this.Li.runTransaction(t,s,i,u=>(a=new so(u,this.si?this.si.next():Mt.le),e==="readwrite-primary"?this.Wi(a).next(l=>!!l||this.Gi(a)).next(l=>{if(!l)throw Pt(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.bi.enqueueRetryable(()=>this.Ni(!1)),new N(V.FAILED_PRECONDITION,El);return n(a)}).next(l=>this.ji(a).next(()=>l)):this.cs(a).next(()=>n(a)))).then(u=>(a.raiseOnCommittedEvent(),u))}cs(t){return Zn(t).get(Ze).next(e=>{if(e!==null&&this.Zi(e.leaseTimestampMs,zi)&&!this.ts(e.ownerId)&&!this.Hi(e)&&!(this.Di||this.allowTabSynchronization&&e.allowTabSynchronization))throw new N(V.FAILED_PRECONDITION,ji)})}ji(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Zn(t).put(Ze,e)}static C(){return fe.C()}zi(t){const e=Zn(t);return e.get(Ze).next(n=>this.Hi(n)?(S(ae,"Releasing primary lease."),e.delete(Ze)):w.resolve())}Zi(t,e){const n=Date.now();return!(t<n-e)&&(!(t>n)||(Pt(`Detected an update time that is in the future: ${t} > ${n}`),!1))}Qi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Mi=()=>{this.bi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.qi()))},this.document.addEventListener("visibilitychange",this.Mi),this.inForeground=this.document.visibilityState==="visible")}rs(){this.Mi&&(this.document.removeEventListener("visibilitychange",this.Mi),this.Mi=null)}$i(){var t;typeof((t=this.window)===null||t===void 0?void 0:t.addEventListener)=="function"&&(this.Fi=()=>{this.ns();const e=/(?:Version|Mobile)\/1[456]/;Zc()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.bi.enterRestrictedMode(!0),this.bi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Fi))}ss(){this.Fi&&(this.window.removeEventListener("pagehide",this.Fi),this.Fi=null)}ts(t){var e;try{const n=((e=this.ki)===null||e===void 0?void 0:e.getItem(this.es(t)))!==null;return S(ae,`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return Pt(ae,"Failed to get zombied client id.",n),!1}}ns(){if(this.ki)try{this.ki.setItem(this.es(this.clientId),String(Date.now()))}catch(t){Pt("Failed to set zombie client id.",t)}}_s(){if(this.ki)try{this.ki.removeItem(this.es(this.clientId))}catch{}}es(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Zn(r){return ht(r,br)}function os(r){return ht(r,_n)}function Ug(r,t){let e=r.projectId;return r.isDefaultDatabase||(e+="."+r.database),"firestore/"+t+"/"+e+"/"}/**
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
 */class Yo{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.ls=n,this.hs=s}static Ps(t,e){let n=j(),s=j();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Yo(t,e.fromCache,n,s)}}/**
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
 */class qg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Fh{constructor(){this.Ts=!1,this.Is=!1,this.Es=100,this.ds=function(){return Zc()?8:vl(Ts())>0?6:4}()}initialize(t,e){this.As=t,this.indexManager=e,this.Ts=!0}getDocumentsMatchingQuery(t,e,n,s){const i={result:null};return this.Rs(t,e).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.Vs(t,e,s,n).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new qg;return this.fs(t,e,a).next(u=>{if(i.result=u,this.Is)return this.gs(t,e,a,u.size)})}).next(()=>i.result)}gs(t,e,n,s){return n.documentReadCount<this.Es?(on()<=Q.DEBUG&&S("QueryEngine","SDK will not create cache indexes for query:",an(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Es,"documents"),w.resolve()):(on()<=Q.DEBUG&&S("QueryEngine","Query:",an(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(on()<=Q.DEBUG&&S("QueryEngine","The SDK decides to create cache indexes for query:",an(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Ot(e))):w.resolve())}Rs(t,e){if(Ju(e))return w.resolve(null);let n=Ot(e);return this.indexManager.getIndexType(t,n).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=ho(e,null,"F"),n=Ot(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(i=>{const a=j(...i);return this.As.getDocuments(t,a).next(u=>this.indexManager.getMinOffset(t,n).next(l=>{const d=this.ps(e,u);return this.ys(e,d,a,l.readTime)?this.Rs(t,ho(e,null,"F")):this.ws(t,d,e,l)}))})))}Vs(t,e,n,s){return Ju(e)||s.isEqual(L.min())?w.resolve(null):this.As.getDocuments(t,n).next(i=>{const a=this.ps(e,i);return this.ys(e,a,n,s)?w.resolve(null):(on()<=Q.DEBUG&&S("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),an(e)),this.ws(t,a,e,zm(s,dr)).next(u=>u))})}ps(t,e){let n=new Z(Jl(t));return e.forEach((s,i)=>{Vr(t,i)&&(n=n.add(i))}),n}ys(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}fs(t,e,n){return on()<=Q.DEBUG&&S("QueryEngine","Using full collection scan to execute query:",an(e)),this.As.getDocumentsMatchingQuery(t,e,kt.min(),n)}ws(t,e,n,s){return this.As.getDocumentsMatchingQuery(t,n,s).next(i=>(e.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const Jo="LocalStore",zg=3e8;class jg{constructor(t,e,n,s){this.persistence=t,this.bs=e,this.serializer=s,this.Ss=new st(U),this.Ds=new Zt(i=>Ue(i),Pr),this.vs=new Map,this.Cs=t.getRemoteDocumentCache(),this.ai=t.getTargetCache(),this.ci=t.getBundleCache(),this.Fs(n)}Fs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Oh(this.Cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Cs.setIndexManager(this.indexManager),this.bs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ss))}}function Lh(r,t,e,n){return new jg(r,t,e,n)}async function Bh(r,t){const e=q(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,e.Fs(t),e.mutationQueue.getAllMutationBatches(n))).next(i=>{const a=[],u=[];let l=j();for(const d of s){a.push(d.batchId);for(const m of d.mutations)l=l.add(m.key)}for(const d of i){u.push(d.batchId);for(const m of d.mutations)l=l.add(m.key)}return e.localDocuments.getDocuments(n,l).next(d=>({Ms:d,removedBatchIds:a,addedBatchIds:u}))})})}function $g(r,t){const e=q(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=t.batch.keys(),i=e.Cs.newChangeBuffer({trackRemovals:!0});return function(u,l,d,m){const p=d.batch,T=p.keys();let P=w.resolve();return T.forEach(C=>{P=P.next(()=>m.getEntry(l,C)).next(k=>{const D=d.docVersions.get(C);F(D!==null,48541),k.version.compareTo(D)<0&&(p.applyToRemoteDocument(k,d),k.isValidDocument()&&(k.setReadTime(d.commitVersion),m.addEntry(k)))})}),P.next(()=>u.mutationQueue.removeMutationBatch(l,p))}(e,n,t,i).next(()=>i.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(u){let l=j();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(l=l.add(u.batch.mutations[d].key));return l}(t))).next(()=>e.localDocuments.getDocuments(n,s))})}function Uh(r){const t=q(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.ai.getLastRemoteSnapshotVersion(e))}function Gg(r,t){const e=q(r),n=t.snapshotVersion;let s=e.Ss;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=e.Cs.newChangeBuffer({trackRemovals:!0});s=e.Ss;const u=[];t.targetChanges.forEach((m,p)=>{const T=s.get(p);if(!T)return;u.push(e.ai.removeMatchingKeys(i,m.removedDocuments,p).next(()=>e.ai.addMatchingKeys(i,m.addedDocuments,p)));let P=T.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(p)!==null?P=P.withResumeToken(lt.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):m.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(m.resumeToken,n)),s=s.insert(p,P),function(k,D,$){return k.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=zg?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0}(T,P,m)&&u.push(e.ai.updateTargetData(i,P))});let l=Nt(),d=j();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,m))}),u.push(Kg(i,a,t.documentUpdates).next(m=>{l=m.xs,d=m.Os})),!n.isEqual(L.min())){const m=e.ai.getLastRemoteSnapshotVersion(i).next(p=>e.ai.setTargetsMetadata(i,i.currentSequenceNumber,n));u.push(m)}return w.waitFor(u).next(()=>a.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,l,d)).next(()=>l)}).then(i=>(e.Ss=s,i))}function Kg(r,t,e){let n=j(),s=j();return e.forEach(i=>n=n.add(i)),t.getEntries(r,n).next(i=>{let a=Nt();return e.forEach((u,l)=>{const d=i.get(u);l.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(u)),l.isNoDocument()&&l.version.isEqual(L.min())?(t.removeEntry(u,l.readTime),a=a.insert(u,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(l),a=a.insert(u,l)):S(Jo,"Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",l.version)}),{xs:a,Os:s}})}function Qg(r,t){const e=q(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=ke),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function Hg(r,t){const e=q(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return e.ai.getTargetData(n,t).next(i=>i?(s=i,w.resolve(s)):e.ai.allocateTargetId(n).next(a=>(s=new Ht(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.ai.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=e.Ss.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Ss=e.Ss.insert(n.targetId,n),e.Ds.set(t,n.targetId)),n})}async function Eo(r,t,e){const n=q(r),s=n.Ss.get(t),i=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",i,a=>n.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Ie(a))throw a;S(Jo,`Failed to update sequence numbers for target ${t}: ${a}`)}n.Ss=n.Ss.remove(t),n.Ds.delete(s.target)}function Pc(r,t,e){const n=q(r);let s=L.min(),i=j();return n.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,m){const p=q(l),T=p.Ds.get(m);return T!==void 0?w.resolve(p.Ss.get(T)):p.ai.getTargetData(d,m)}(n,a,Ot(t)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.ai.getMatchingKeysForTargetId(a,u.targetId).next(l=>{i=l})}).next(()=>n.bs.getDocumentsMatchingQuery(a,t,e?s:L.min(),e?i:j())).next(u=>(Wg(n,kp(t),u),{documents:u,Ns:i})))}function Wg(r,t,e){let n=r.vs.get(t)||L.min();e.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.vs.set(t,n)}class Vc{constructor(){this.activeTargetIds=Up()}$s(t){this.activeTargetIds=this.activeTargetIds.add(t)}Us(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Qs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class qh{constructor(){this.So=new Vc,this.Do={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.So.$s(t),this.Do[t]||"not-current"}updateQueryState(t,e,n){this.Do[t]=e}removeLocalQueryTarget(t){this.So.Us(t)}isLocalQueryTarget(t){return this.So.activeTargetIds.has(t)}clearQueryState(t){delete this.Do[t]}getAllActiveQueryTargets(){return this.So.activeTargetIds}isActiveQueryTarget(t){return this.So.activeTargetIds.has(t)}start(){return this.So=new Vc,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class Yg{vo(t){}shutdown(){}}/**
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
 */const Sc="ConnectivityMonitor";class Cc{constructor(){this.Co=()=>this.Fo(),this.Mo=()=>this.xo(),this.Oo=[],this.No()}vo(t){this.Oo.push(t)}shutdown(){window.removeEventListener("online",this.Co),window.removeEventListener("offline",this.Mo)}No(){window.addEventListener("online",this.Co),window.addEventListener("offline",this.Mo)}Fo(){S(Sc,"Network connectivity changed: AVAILABLE");for(const t of this.Oo)t(0)}xo(){S(Sc,"Network connectivity changed: UNAVAILABLE");for(const t of this.Oo)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let as=null;function To(){return as===null?as=function(){return 268435456+Math.round(2147483648*Math.random())}():as++,"0x"+as.toString(16)}/**
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
 */const $i="RestConnection",Jg={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Xg{get Bo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Lo=e+"://"+t.host,this.ko=`projects/${n}/databases/${s}`,this.qo=this.databaseId.database===Ds?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Qo(t,e,n,s,i){const a=To(),u=this.$o(t,e.toUriEncodedString());S($i,`Sending RPC '${t}' ${a}:`,u,n);const l={"google-cloud-resource-prefix":this.ko,"x-goog-request-params":this.qo};return this.Uo(l,s,i),this.Ko(t,u,l,n).then(d=>(S($i,`Received RPC '${t}' ${a}: `,d),d),d=>{throw Le($i,`RPC '${t}' ${a} failed with error: `,d,"url: ",u,"request:",n),d})}Wo(t,e,n,s,i,a){return this.Qo(t,e,n,s,i)}Uo(t,e,n){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Vn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,i)=>t[i]=s),n&&n.headers.forEach((s,i)=>t[i]=s)}$o(t,e){const n=Jg[t];return`${this.Lo}/v1/${e}:${n}`}terminate(){}}/**
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
 */class Zg{constructor(t){this.Go=t.Go,this.zo=t.zo}jo(t){this.Ho=t}Jo(t){this.Yo=t}Zo(t){this.Xo=t}onMessage(t){this.e_=t}close(){this.zo()}send(t){this.Go(t)}t_(){this.Ho()}n_(){this.Yo()}r_(t){this.Xo(t)}i_(t){this.e_(t)}}/**
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
 */const Tt="WebChannelConnection";class t_ extends Xg{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Ko(t,e,n,s){const i=To();return new Promise((a,u)=>{const l=new cl;l.setWithCredentials(!0),l.listenOnce(ll.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case cs.NO_ERROR:const m=l.getResponseJson();S(Tt,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(m)),a(m);break;case cs.TIMEOUT:S(Tt,`RPC '${t}' ${i} timed out`),u(new N(V.DEADLINE_EXCEEDED,"Request time out"));break;case cs.HTTP_ERROR:const p=l.getStatus();if(S(Tt,`RPC '${t}' ${i} failed with status:`,p,"response text:",l.getResponseText()),p>0){let T=l.getResponseJson();Array.isArray(T)&&(T=T[0]);const P=T==null?void 0:T.error;if(P&&P.status&&P.message){const C=function(D){const $=D.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf($)>=0?$:V.UNKNOWN}(P.status);u(new N(C,P.message))}else u(new N(V.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new N(V.UNAVAILABLE,"Connection failed."));break;default:O(9055,{s_:t,streamId:i,o_:l.getLastErrorCode(),__:l.getLastError()})}}finally{S(Tt,`RPC '${t}' ${i} completed.`)}});const d=JSON.stringify(s);S(Tt,`RPC '${t}' ${i} sending request:`,s),l.send(e,"POST",d,n,15)})}a_(t,e,n){const s=To(),i=[this.Lo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=fl(),u=dl(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Uo(l.initMessageHeaders,e,n),l.encodeInitMessageHeaders=!0;const m=i.join("");S(Tt,`Creating RPC '${t}' stream ${s}: ${m}`,l);const p=a.createWebChannel(m,l);let T=!1,P=!1;const C=new Zg({Go:D=>{P?S(Tt,`Not sending because RPC '${t}' stream ${s} is closed:`,D):(T||(S(Tt,`Opening RPC '${t}' stream ${s} transport.`),p.open(),T=!0),S(Tt,`RPC '${t}' stream ${s} sending:`,D),p.send(D))},zo:()=>p.close()}),k=(D,$,z)=>{D.listen($,B=>{try{z(B)}catch(Y){setTimeout(()=>{throw Y},0)}})};return k(p,tr.EventType.OPEN,()=>{P||(S(Tt,`RPC '${t}' stream ${s} transport opened.`),C.t_())}),k(p,tr.EventType.CLOSE,()=>{P||(P=!0,S(Tt,`RPC '${t}' stream ${s} transport closed`),C.r_())}),k(p,tr.EventType.ERROR,D=>{P||(P=!0,Le(Tt,`RPC '${t}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),C.r_(new N(V.UNAVAILABLE,"The operation could not be completed")))}),k(p,tr.EventType.MESSAGE,D=>{var $;if(!P){const z=D.data[0];F(!!z,16349);const B=z,Y=(B==null?void 0:B.error)||(($=B[0])===null||$===void 0?void 0:$.error);if(Y){S(Tt,`RPC '${t}' stream ${s} received error:`,Y);const et=Y.status;let H=function(y){const E=ct[y];if(E!==void 0)return ch(E)}(et),I=Y.message;H===void 0&&(H=V.INTERNAL,I="Unknown error status: "+et+" with message "+Y.message),P=!0,C.r_(new N(H,I)),p.close()}else S(Tt,`RPC '${t}' stream ${s} received:`,z),C.i_(z)}}),k(u,hl.STAT_EVENT,D=>{D.stat===Xi.PROXY?S(Tt,`RPC '${t}' stream ${s} detected buffering proxy`):D.stat===Xi.NOPROXY&&S(Tt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.n_()},0),C}}/**
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
 */function e_(){return typeof window<"u"?window:null}function ys(){return typeof document<"u"?document:null}/**
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
 */function ri(r){return new ng(r,!0)}/**
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
 */class zh{constructor(t,e,n=1e3,s=1.5,i=6e4){this.bi=t,this.timerId=e,this.u_=n,this.c_=s,this.l_=i,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(t){this.cancel();const e=Math.floor(this.h_+this.d_()),n=Math.max(0,Date.now()-this.T_),s=Math.max(0,e-n);s>0&&S("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.h_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,s,()=>(this.T_=Date.now(),t())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){this.P_!==null&&(this.P_.skipDelay(),this.P_=null)}cancel(){this.P_!==null&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}/**
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
 */const Dc="PersistentStream";class jh{constructor(t,e,n,s,i,a,u,l){this.bi=t,this.R_=n,this.V_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=l,this.state=0,this.m_=0,this.f_=null,this.g_=null,this.stream=null,this.p_=0,this.y_=new zh(t,e)}w_(){return this.state===1||this.state===5||this.b_()}b_(){return this.state===2||this.state===3}start(){this.p_=0,this.state!==4?this.auth():this.S_()}async stop(){this.w_()&&await this.close(0)}D_(){this.state=0,this.y_.reset()}v_(){this.b_()&&this.f_===null&&(this.f_=this.bi.enqueueAfterDelay(this.R_,6e4,()=>this.C_()))}F_(t){this.M_(),this.stream.send(t)}async C_(){if(this.b_())return this.close(0)}M_(){this.f_&&(this.f_.cancel(),this.f_=null)}x_(){this.g_&&(this.g_.cancel(),this.g_=null)}async close(t,e){this.M_(),this.x_(),this.y_.cancel(),this.m_++,t!==4?this.y_.reset():e&&e.code===V.RESOURCE_EXHAUSTED?(Pt(e.toString()),Pt("Using maximum backoff delay to prevent overloading the backend."),this.y_.I_()):e&&e.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.O_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Zo(e)}O_(){}auth(){this.state=1;const t=this.N_(this.m_),e=this.m_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.m_===e&&this.B_(n,s)},n=>{t(()=>{const s=new N(V.UNKNOWN,"Fetching auth token failed: "+n.message);return this.L_(s)})})}B_(t,e){const n=this.N_(this.m_);this.stream=this.k_(t,e),this.stream.jo(()=>{n(()=>this.listener.jo())}),this.stream.Jo(()=>{n(()=>(this.state=2,this.g_=this.bi.enqueueAfterDelay(this.V_,1e4,()=>(this.b_()&&(this.state=3),Promise.resolve())),this.listener.Jo()))}),this.stream.Zo(s=>{n(()=>this.L_(s))}),this.stream.onMessage(s=>{n(()=>++this.p_==1?this.q_(s):this.onNext(s))})}S_(){this.state=5,this.y_.E_(async()=>{this.state=0,this.start()})}L_(t){return S(Dc,`close with error: ${t}`),this.stream=null,this.close(4,t)}N_(t){return e=>{this.bi.enqueueAndForget(()=>this.m_===t?e():(S(Dc,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class n_ extends jh{constructor(t,e,n,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}k_(t,e){return this.connection.a_("Listen",t,e)}q_(t){return this.onNext(t)}onNext(t){this.y_.reset();const e=ig(this.serializer,t),n=function(i){if(!("targetChange"in i))return L.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?L.min():a.readTime?Vt(a.readTime):L.min()}(t);return this.listener.Q_(e,n)}U_(t){const e={};e.database=po(this.serializer),e.addTarget=function(i,a){let u;const l=a.target;if(u=xs(l)?{documents:_h(i,l)}:{query:yh(i,l).gt},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=dh(i,a.resumeToken);const d=fo(i,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(L.min())>0){u.readTime=An(i,a.snapshotVersion.toTimestamp());const d=fo(i,a.expectedCount);d!==null&&(u.expectedCount=d)}return u}(this.serializer,t);const n=ag(this.serializer,t);n&&(e.labels=n),this.F_(e)}K_(t){const e={};e.database=po(this.serializer),e.removeTarget=t,this.F_(e)}}class r_ extends jh{constructor(t,e,n,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}get W_(){return this.p_>0}start(){this.lastStreamToken=void 0,super.start()}O_(){this.W_&&this.G_([])}k_(t,e){return this.connection.a_("Write",t,e)}q_(t){return F(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,F(!t.writeResults||t.writeResults.length===0,55816),this.listener.z_()}onNext(t){F(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.y_.reset();const e=og(t.writeResults,t.commitTime),n=Vt(t.commitTime);return this.listener.j_(n,e)}H_(){const t={};t.database=po(this.serializer),this.F_(t)}G_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>Ms(this.serializer,n))};this.F_(e)}}/**
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
 */class s_{}class i_ extends s_{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.J_=!1}Y_(){if(this.J_)throw new N(V.FAILED_PRECONDITION,"The client has already been terminated.")}Qo(t,e,n,s){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Qo(t,mo(e,n),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(V.UNKNOWN,i.toString())})}Wo(t,e,n,s,i){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.Wo(t,mo(e,n),s,a,u,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new N(V.UNKNOWN,a.toString())})}terminate(){this.J_=!0,this.connection.terminate()}}class o_{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.Z_=0,this.X_=null,this.ea=!0}ta(){this.Z_===0&&(this.na("Unknown"),this.X_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.X_=null,this.ra("Backend didn't respond within 10 seconds."),this.na("Offline"),Promise.resolve())))}ia(t){this.state==="Online"?this.na("Unknown"):(this.Z_++,this.Z_>=1&&(this.sa(),this.ra(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.na("Offline")))}set(t){this.sa(),this.Z_=0,t==="Online"&&(this.ea=!1),this.na(t)}na(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ra(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ea?(Pt(e),this.ea=!1):S("OnlineStateTracker",e)}sa(){this.X_!==null&&(this.X_.cancel(),this.X_=null)}}/**
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
 */const $e="RemoteStore";class a_{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.oa=[],this._a=new Map,this.aa=new Set,this.ua=[],this.ca=i,this.ca.vo(a=>{n.enqueueAndForget(async()=>{Ke(this)&&(S($e,"Restarting streams for network reachability change."),await async function(l){const d=q(l);d.aa.add(4),await Dr(d),d.la.set("Unknown"),d.aa.delete(4),await si(d)}(this))})}),this.la=new o_(n,s)}}async function si(r){if(Ke(r))for(const t of r.ua)await t(!0)}async function Dr(r){for(const t of r.ua)await t(!1)}function $h(r,t){const e=q(r);e._a.has(t.targetId)||(e._a.set(t.targetId,t),ea(e)?ta(e):Dn(e).b_()&&Zo(e,t))}function Xo(r,t){const e=q(r),n=Dn(e);e._a.delete(t),n.b_()&&Gh(e,t),e._a.size===0&&(n.b_()?n.v_():Ke(e)&&e.la.set("Unknown"))}function Zo(r,t){if(r.ha.Ke(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Dn(r).U_(t)}function Gh(r,t){r.ha.Ke(t),Dn(r).K_(t)}function ta(r){r.ha=new Xp({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),Rt:t=>r._a.get(t)||null,Pt:()=>r.datastore.serializer.databaseId}),Dn(r).start(),r.la.ta()}function ea(r){return Ke(r)&&!Dn(r).w_()&&r._a.size>0}function Ke(r){return q(r).aa.size===0}function Kh(r){r.ha=void 0}async function u_(r){r.la.set("Online")}async function c_(r){r._a.forEach((t,e)=>{Zo(r,t)})}async function l_(r,t){Kh(r),ea(r)?(r.la.ia(t),ta(r)):r.la.set("Unknown")}async function h_(r,t,e){if(r.la.set("Online"),t instanceof hh&&t.state===2&&t.cause)try{await async function(s,i){const a=i.cause;for(const u of i.targetIds)s._a.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s._a.delete(u),s.ha.removeTarget(u))}(r,t)}catch(n){S($e,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await Us(r,n)}else if(t instanceof _s?r.ha.Xe(t):t instanceof lh?r.ha.ot(t):r.ha.nt(t),!e.isEqual(L.min()))try{const n=await Uh(r.localStore);e.compareTo(n)>=0&&await function(i,a){const u=i.ha.It(a);return u.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const m=i._a.get(d);m&&i._a.set(d,m.withResumeToken(l.resumeToken,a))}}),u.targetMismatches.forEach((l,d)=>{const m=i._a.get(l);if(!m)return;i._a.set(l,m.withResumeToken(lt.EMPTY_BYTE_STRING,m.snapshotVersion)),Gh(i,l);const p=new Ht(m.target,l,d,m.sequenceNumber);Zo(i,p)}),i.remoteSyncer.applyRemoteEvent(u)}(r,e)}catch(n){S($e,"Failed to raise snapshot:",n),await Us(r,n)}}async function Us(r,t,e){if(!Ie(t))throw t;r.aa.add(1),await Dr(r),r.la.set("Offline"),e||(e=()=>Uh(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{S($e,"Retrying IndexedDB access"),await e(),r.aa.delete(1),await si(r)})}function Qh(r,t){return t().catch(e=>Us(r,e,t))}async function xr(r){const t=q(r),e=_e(t);let n=t.oa.length>0?t.oa[t.oa.length-1].batchId:ke;for(;d_(t);)try{const s=await Qg(t.localStore,n);if(s===null){t.oa.length===0&&e.v_();break}n=s.batchId,f_(t,s)}catch(s){await Us(t,s)}Hh(t)&&Wh(t)}function d_(r){return Ke(r)&&r.oa.length<10}function f_(r,t){r.oa.push(t);const e=_e(r);e.b_()&&e.W_&&e.G_(t.mutations)}function Hh(r){return Ke(r)&&!_e(r).w_()&&r.oa.length>0}function Wh(r){_e(r).start()}async function m_(r){_e(r).H_()}async function p_(r){const t=_e(r);for(const e of r.oa)t.G_(e.mutations)}async function g_(r,t,e){const n=r.oa.shift(),s=qo.from(n,t,e);await Qh(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await xr(r)}async function __(r,t){t&&_e(r).W_&&await async function(n,s){if(function(a){return Yp(a)&&a!==V.ABORTED}(s.code)){const i=n.oa.shift();_e(n).D_(),await Qh(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await xr(n)}}(r,t),Hh(r)&&Wh(r)}async function xc(r,t){const e=q(r);e.asyncQueue.verifyOperationInProgress(),S($e,"RemoteStore received new credentials");const n=Ke(e);e.aa.add(3),await Dr(e),n&&e.la.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.aa.delete(3),await si(e)}async function y_(r,t){const e=q(r);t?(e.aa.delete(2),await si(e)):t||(e.aa.add(2),await Dr(e),e.la.set("Unknown"))}function Dn(r){return r.Pa||(r.Pa=function(e,n,s){const i=q(e);return i.Y_(),new n_(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{jo:u_.bind(null,r),Jo:c_.bind(null,r),Zo:l_.bind(null,r),Q_:h_.bind(null,r)}),r.ua.push(async t=>{t?(r.Pa.D_(),ea(r)?ta(r):r.la.set("Unknown")):(await r.Pa.stop(),Kh(r))})),r.Pa}function _e(r){return r.Ta||(r.Ta=function(e,n,s){const i=q(e);return i.Y_(),new r_(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{jo:()=>Promise.resolve(),Jo:m_.bind(null,r),Zo:__.bind(null,r),z_:p_.bind(null,r),j_:g_.bind(null,r)}),r.ua.push(async t=>{t?(r.Ta.D_(),await xr(r)):(await r.Ta.stop(),r.oa.length>0&&(S($e,`Stopping write stream with ${r.oa.length} pending writes`),r.oa=[]))})),r.Ta}/**
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
 */class na{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,i){const a=Date.now()+n,u=new na(t,e,a,s,i);return u.start(n),u}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(V.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ra(r,t){if(Pt("AsyncQueue",`${t}: ${r}`),Ie(r))return new N(V.UNAVAILABLE,`${t}: ${r}`);throw r}/**
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
 */class dn{static emptySet(t){return new dn(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||M.comparator(e.key,n.key):(e,n)=>M.comparator(e.key,n.key),this.keyedMap=er(),this.sortedSet=new st(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof dn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new dn;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
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
 */class Nc{constructor(){this.Ia=new st(M.comparator)}track(t){const e=t.doc.key,n=this.Ia.get(e);n?t.type!==0&&n.type===3?this.Ia=this.Ia.insert(e,t):t.type===3&&n.type!==1?this.Ia=this.Ia.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.Ia=this.Ia.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.Ia=this.Ia.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.Ia=this.Ia.remove(e):t.type===1&&n.type===2?this.Ia=this.Ia.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.Ia=this.Ia.insert(e,{type:2,doc:t.doc}):O(63341,{Vt:t,Ea:n}):this.Ia=this.Ia.insert(e,t)}da(){const t=[];return this.Ia.inorderTraversal((e,n)=>{t.push(n)}),t}}class Rn{constructor(t,e,n,s,i,a,u,l,d){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(t,e,n,s,i){const a=[];return e.forEach(u=>{a.push({type:0,doc:u})}),new Rn(t,e,dn.emptySet(e),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Ys(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class I_{constructor(){this.Aa=void 0,this.Ra=[]}Va(){return this.Ra.some(t=>t.ma())}}class E_{constructor(){this.queries=kc(),this.onlineState="Unknown",this.fa=new Set}terminate(){(function(e,n){const s=q(e),i=s.queries;s.queries=kc(),i.forEach((a,u)=>{for(const l of u.Ra)l.onError(n)})})(this,new N(V.ABORTED,"Firestore shutting down"))}}function kc(){return new Zt(r=>Yl(r),Ys)}async function T_(r,t){const e=q(r);let n=3;const s=t.query;let i=e.queries.get(s);i?!i.Va()&&t.ma()&&(n=2):(i=new I_,n=t.ma()?0:1);try{switch(n){case 0:i.Aa=await e.onListen(s,!0);break;case 1:i.Aa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=ra(a,`Initialization of query '${an(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,i),i.Ra.push(t),t.ga(e.onlineState),i.Aa&&t.pa(i.Aa)&&sa(e)}async function v_(r,t){const e=q(r),n=t.query;let s=3;const i=e.queries.get(n);if(i){const a=i.Ra.indexOf(t);a>=0&&(i.Ra.splice(a,1),i.Ra.length===0?s=t.ma()?0:1:!i.Va()&&t.ma()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function w_(r,t){const e=q(r);let n=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const u of a.Ra)u.pa(s)&&(n=!0);a.Aa=s}}n&&sa(e)}function A_(r,t,e){const n=q(r),s=n.queries.get(t);if(s)for(const i of s.Ra)i.onError(e);n.queries.delete(t)}function sa(r){r.fa.forEach(t=>{t.next()})}var vo,Mc;(Mc=vo||(vo={})).ya="default",Mc.Cache="cache";class R_{constructor(t,e,n){this.query=t,this.wa=e,this.ba=!1,this.Sa=null,this.onlineState="Unknown",this.options=n||{}}pa(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new Rn(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.ba?this.Da(t)&&(this.wa.next(t),e=!0):this.va(t,this.onlineState)&&(this.Ca(t),e=!0),this.Sa=t,e}onError(t){this.wa.error(t)}ga(t){this.onlineState=t;let e=!1;return this.Sa&&!this.ba&&this.va(this.Sa,t)&&(this.Ca(this.Sa),e=!0),e}va(t,e){if(!t.fromCache||!this.ma())return!0;const n=e!=="Offline";return(!this.options.Fa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Da(t){if(t.docChanges.length>0)return!0;const e=this.Sa&&this.Sa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}Ca(t){t=Rn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.ba=!0,this.wa.next(t)}ma(){return this.options.source!==vo.Cache}}/**
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
 */class Yh{constructor(t){this.key=t}}class Jh{constructor(t){this.key=t}}class b_{constructor(t,e){this.query=t,this.qa=e,this.Qa=null,this.hasCachedResults=!1,this.current=!1,this.$a=j(),this.mutatedKeys=j(),this.Ua=Jl(t),this.Ka=new dn(this.Ua)}get Wa(){return this.qa}Ga(t,e){const n=e?e.za:new Nc,s=e?e.Ka:this.Ka;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((m,p)=>{const T=s.get(m),P=Vr(this.query,p)?p:null,C=!!T&&this.mutatedKeys.has(T.key),k=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let D=!1;T&&P?T.data.isEqual(P.data)?C!==k&&(n.track({type:3,doc:P}),D=!0):this.ja(T,P)||(n.track({type:2,doc:P}),D=!0,(l&&this.Ua(P,l)>0||d&&this.Ua(P,d)<0)&&(u=!0)):!T&&P?(n.track({type:0,doc:P}),D=!0):T&&!P&&(n.track({type:1,doc:T}),D=!0,(l||d)&&(u=!0)),D&&(P?(a=a.add(P),i=k?i.add(m):i.delete(m)):(a=a.delete(m),i=i.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),i=i.delete(m.key),n.track({type:1,doc:m})}return{Ka:a,za:n,ys:u,mutatedKeys:i}}ja(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const i=this.Ka;this.Ka=t.Ka,this.mutatedKeys=t.mutatedKeys;const a=t.za.da();a.sort((m,p)=>function(P,C){const k=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{Vt:D})}};return k(P)-k(C)}(m.type,p.type)||this.Ua(m.doc,p.doc)),this.Ha(n),s=s!=null&&s;const u=e&&!s?this.Ja():[],l=this.$a.size===0&&this.current&&!s?1:0,d=l!==this.Qa;return this.Qa=l,a.length!==0||d?{snapshot:new Rn(this.query,t.Ka,i,a,t.mutatedKeys,l===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),Ya:u}:{Ya:u}}ga(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ka:this.Ka,za:new Nc,mutatedKeys:this.mutatedKeys,ys:!1},!1)):{Ya:[]}}Za(t){return!this.qa.has(t)&&!!this.Ka.has(t)&&!this.Ka.get(t).hasLocalMutations}Ha(t){t&&(t.addedDocuments.forEach(e=>this.qa=this.qa.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.qa=this.qa.delete(e)),this.current=t.current)}Ja(){if(!this.current)return[];const t=this.$a;this.$a=j(),this.Ka.forEach(n=>{this.Za(n.key)&&(this.$a=this.$a.add(n.key))});const e=[];return t.forEach(n=>{this.$a.has(n)||e.push(new Jh(n))}),this.$a.forEach(n=>{t.has(n)||e.push(new Yh(n))}),e}Xa(t){this.qa=t.Ns,this.$a=j();const e=this.Ga(t.documents);return this.applyChanges(e,!0)}eu(){return Rn.fromInitialDocuments(this.query,this.Ka,this.mutatedKeys,this.Qa===0,this.hasCachedResults)}}const ia="SyncEngine";class P_{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class V_{constructor(t){this.key=t,this.tu=!1}}class S_{constructor(t,e,n,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.nu={},this.ru=new Zt(u=>Yl(u),Ys),this.iu=new Map,this.su=new Set,this.ou=new st(M.comparator),this._u=new Map,this.au=new Qo,this.uu={},this.cu=new Map,this.lu=je.ir(),this.onlineState="Unknown",this.hu=void 0}get isPrimaryClient(){return this.hu===!0}}async function C_(r,t,e=!0){const n=rd(r);let s;const i=n.ru.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.eu()):s=await Xh(n,t,e,!0),s}async function D_(r,t){const e=rd(r);await Xh(e,t,!0,!1)}async function Xh(r,t,e,n){const s=await Hg(r.localStore,Ot(t)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,e);let u;return n&&(u=await x_(r,t,i,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&$h(r.remoteStore,s),u}async function x_(r,t,e,n,s){r.Pu=(p,T,P)=>async function(k,D,$,z){let B=D.view.Ga($);B.ys&&(B=await Pc(k.localStore,D.query,!1).then(({documents:I})=>D.view.Ga(I,B)));const Y=z&&z.targetChanges.get(D.targetId),et=z&&z.targetMismatches.get(D.targetId)!=null,H=D.view.applyChanges(B,k.isPrimaryClient,Y,et);return Fc(k,D.targetId,H.Ya),H.snapshot}(r,p,T,P);const i=await Pc(r.localStore,t,!0),a=new b_(t,i.Ns),u=a.Ga(i.documents),l=Cr.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),d=a.applyChanges(u,r.isPrimaryClient,l);Fc(r,e,d.Ya);const m=new P_(t,e,a);return r.ru.set(t,m),r.iu.has(e)?r.iu.get(e).push(t):r.iu.set(e,[t]),d.snapshot}async function N_(r,t,e){const n=q(r),s=n.ru.get(t),i=n.iu.get(s.targetId);if(i.length>1)return n.iu.set(s.targetId,i.filter(a=>!Ys(a,t))),void n.ru.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Eo(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),e&&Xo(n.remoteStore,s.targetId),wo(n,s.targetId)}).catch(Ge)):(wo(n,s.targetId),await Eo(n.localStore,s.targetId,!0))}async function k_(r,t){const e=q(r),n=e.ru.get(t),s=e.iu.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Xo(e.remoteStore,n.targetId))}async function M_(r,t,e){const n=sd(r);try{const s=await function(a,u){const l=q(a),d=ot.now(),m=u.reduce((P,C)=>P.add(C.key),j());let p,T;return l.persistence.runTransaction("Locally write mutations","readwrite",P=>{let C=Nt(),k=j();return l.Cs.getEntries(P,m).next(D=>{C=D,C.forEach(($,z)=>{z.isValidDocument()||(k=k.add($))})}).next(()=>l.localDocuments.getOverlayedDocuments(P,C)).next(D=>{p=D;const $=[];for(const z of u){const B=Hp(z,p.get(z.key).overlayedDocument);B!=null&&$.push(new te(z.key,B,ql(B.value.mapValue),ft.exists(!0)))}return l.mutationQueue.addMutationBatch(P,d,$,u)}).next(D=>{T=D;const $=D.applyToLocalDocumentSet(p,k);return l.documentOverlayCache.saveOverlays(P,D.batchId,$)})}).then(()=>({batchId:T.batchId,changes:Zl(p)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),function(a,u,l){let d=a.uu[a.currentUser.toKey()];d||(d=new st(U)),d=d.insert(u,l),a.uu[a.currentUser.toKey()]=d}(n,s.batchId,e),await Nr(n,s.changes),await xr(n.remoteStore)}catch(s){const i=ra(s,"Failed to persist write");e.reject(i)}}async function Zh(r,t){const e=q(r);try{const n=await Gg(e.localStore,t);t.targetChanges.forEach((s,i)=>{const a=e._u.get(i);a&&(F(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.tu=!0:s.modifiedDocuments.size>0?F(a.tu,14607):s.removedDocuments.size>0&&(F(a.tu,42227),a.tu=!1))}),await Nr(e,n,t)}catch(n){await Ge(n)}}function Oc(r,t,e){const n=q(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.ru.forEach((i,a)=>{const u=a.view.ga(t);u.snapshot&&s.push(u.snapshot)}),function(a,u){const l=q(a);l.onlineState=u;let d=!1;l.queries.forEach((m,p)=>{for(const T of p.Ra)T.ga(u)&&(d=!0)}),d&&sa(l)}(n.eventManager,t),s.length&&n.nu.Q_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function O_(r,t,e){const n=q(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n._u.get(t),i=s&&s.key;if(i){let a=new st(M.comparator);a=a.insert(i,ut.newNoDocument(i,L.min()));const u=j().add(i),l=new Zs(L.min(),new Map,new st(U),a,u);await Zh(n,l),n.ou=n.ou.remove(i),n._u.delete(t),oa(n)}else await Eo(n.localStore,t,!1).then(()=>wo(n,t,e)).catch(Ge)}async function F_(r,t){const e=q(r),n=t.batch.batchId;try{const s=await $g(e.localStore,t);ed(e,n,null),td(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await Nr(e,s)}catch(s){await Ge(s)}}async function L_(r,t,e){const n=q(r);try{const s=await function(a,u){const l=q(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let m;return l.mutationQueue.lookupMutationBatch(d,u).next(p=>(F(p!==null,37113),m=p.keys(),l.mutationQueue.removeMutationBatch(d,p))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,m,u)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m)).next(()=>l.localDocuments.getDocuments(d,m))})}(n.localStore,t);ed(n,t,e),td(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await Nr(n,s)}catch(s){await Ge(s)}}function td(r,t){(r.cu.get(t)||[]).forEach(e=>{e.resolve()}),r.cu.delete(t)}function ed(r,t,e){const n=q(r);let s=n.uu[n.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),n.uu[n.currentUser.toKey()]=s}}function wo(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.iu.get(t))r.ru.delete(n),e&&r.nu.Tu(n,e);r.iu.delete(t),r.isPrimaryClient&&r.au.Ur(t).forEach(n=>{r.au.containsKey(n)||nd(r,n)})}function nd(r,t){r.su.delete(t.path.canonicalString());const e=r.ou.get(t);e!==null&&(Xo(r.remoteStore,e),r.ou=r.ou.remove(t),r._u.delete(e),oa(r))}function Fc(r,t,e){for(const n of e)n instanceof Yh?(r.au.addReference(n.key,t),B_(r,n)):n instanceof Jh?(S(ia,"Document no longer in limbo: "+n.key),r.au.removeReference(n.key,t),r.au.containsKey(n.key)||nd(r,n.key)):O(19791,{Iu:n})}function B_(r,t){const e=t.key,n=e.path.canonicalString();r.ou.get(e)||r.su.has(n)||(S(ia,"New document in limbo: "+e),r.su.add(n),oa(r))}function oa(r){for(;r.su.size>0&&r.ou.size<r.maxConcurrentLimboResolutions;){const t=r.su.values().next().value;r.su.delete(t);const e=new M(J.fromString(t)),n=r.lu.next();r._u.set(n,new V_(e)),r.ou=r.ou.insert(e,n),$h(r.remoteStore,new Ht(Ot(Lo(e.path)),n,"TargetPurposeLimboResolution",Mt.le))}}async function Nr(r,t,e){const n=q(r),s=[],i=[],a=[];n.ru.isEmpty()||(n.ru.forEach((u,l)=>{a.push(n.Pu(l,t,e).then(d=>{var m;if((d||e)&&n.isPrimaryClient){const p=d?!d.fromCache:(m=e==null?void 0:e.targetChanges.get(l.targetId))===null||m===void 0?void 0:m.current;n.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(d){s.push(d);const p=Yo.Ps(l.targetId,d);i.push(p)}}))}),await Promise.all(a),n.nu.Q_(s),await async function(l,d){const m=q(l);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>w.forEach(d,T=>w.forEach(T.ls,P=>m.persistence.referenceDelegate.addReference(p,T.targetId,P)).next(()=>w.forEach(T.hs,P=>m.persistence.referenceDelegate.removeReference(p,T.targetId,P)))))}catch(p){if(!Ie(p))throw p;S(Jo,"Failed to update sequence numbers: "+p)}for(const p of d){const T=p.targetId;if(!p.fromCache){const P=m.Ss.get(T),C=P.snapshotVersion,k=P.withLastLimboFreeSnapshotVersion(C);m.Ss=m.Ss.insert(T,k)}}}(n.localStore,i))}async function U_(r,t){const e=q(r);if(!e.currentUser.isEqual(t)){S(ia,"User change. New user:",t.toKey());const n=await Bh(e.localStore,t);e.currentUser=t,function(i,a){i.cu.forEach(u=>{u.forEach(l=>{l.reject(new N(V.CANCELLED,a))})}),i.cu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await Nr(e,n.Ms)}}function q_(r,t){const e=q(r),n=e._u.get(t);if(n&&n.tu)return j().add(n.key);{let s=j();const i=e.iu.get(t);if(!i)return s;for(const a of i){const u=e.ru.get(a);s=s.unionWith(u.view.Wa)}return s}}function rd(r){const t=q(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=Zh.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=q_.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=O_.bind(null,t),t.nu.Q_=w_.bind(null,t.eventManager),t.nu.Tu=A_.bind(null,t.eventManager),t}function sd(r){const t=q(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=F_.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=L_.bind(null,t),t}class Rr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=ri(t.databaseInfo.databaseId),this.sharedClientState=this.Au(t),this.persistence=this.Ru(t),await this.persistence.start(),this.localStore=this.Vu(t),this.gcScheduler=this.mu(t,this.localStore),this.indexBackfillerScheduler=this.fu(t,this.localStore)}mu(t,e){return null}fu(t,e){return null}Vu(t){return Lh(this.persistence,new Fh,t.initialUser,this.serializer)}Ru(t){return new Ho(ni.Ei,this.serializer)}Au(t){return new qh}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Rr.provider={build:()=>new Rr};class z_ extends Rr{constructor(t){super(),this.cacheSizeBytes=t}mu(t,e){F(this.persistence.referenceDelegate instanceof Bs,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new xh(n,t.asyncQueue,e)}Ru(t){const e=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new Ho(n=>Bs.Ei(n,e),this.serializer)}}class j_ extends Rr{constructor(t,e,n){super(),this.gu=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.gu.initialize(this,t),await sd(this.gu.syncEngine),await xr(this.gu.remoteStore),await this.persistence.Ki(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}Vu(t){return Lh(this.persistence,new Fh,t.initialUser,this.serializer)}mu(t,e){const n=this.persistence.referenceDelegate.garbageCollector;return new xh(n,t.asyncQueue,e)}fu(t,e){const n=new Km(e,this.persistence);return new Gm(t.asyncQueue,n)}Ru(t){const e=Ug(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new Wo(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,e_(),ys(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Au(t){return new qh}}class qs{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Oc(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=U_.bind(null,this.syncEngine),await y_(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new E_}()}createDatastore(t){const e=ri(t.databaseInfo.databaseId),n=function(i){return new t_(i)}(t.databaseInfo);return function(i,a,u,l){return new i_(i,a,u,l)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,s,i,a,u){return new a_(n,s,i,a,u)}(this.localStore,this.datastore,t.asyncQueue,e=>Oc(this.syncEngine,e,0),function(){return Cc.C()?new Cc:new Yg}())}createSyncEngine(t,e){return function(s,i,a,u,l,d,m){const p=new S_(s,i,a,u,l,d);return m&&(p.hu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const i=q(s);S($e,"RemoteStore shutting down."),i.aa.add(5),await Dr(i),i.ca.shutdown(),i.la.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}qs.provider={build:()=>new qs};/**
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
 */class $_{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.pu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.pu(this.observer.error,t):Pt("Uncaught Error in snapshot listener:",t.toString()))}yu(){this.muted=!0}pu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
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
 */const ye="FirestoreClient";class G_{constructor(t,e,n,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=pt.UNAUTHENTICATED,this.clientId=_l.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async a=>{S(ye,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(S(ye,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=ra(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function Gi(r,t){r.asyncQueue.verifyOperationInProgress(),S(ye,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await Bh(t.localStore,s),n=s)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function Lc(r,t){r.asyncQueue.verifyOperationInProgress();const e=await K_(r);S(ye,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>xc(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>xc(t.remoteStore,s)),r._onlineComponents=t}async function K_(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){S(ye,"Using user provided OfflineComponentProvider");try{await Gi(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;Le("Error using user provided cache. Falling back to memory cache: "+e),await Gi(r,new Rr)}}else S(ye,"Using default OfflineComponentProvider"),await Gi(r,new z_(void 0));return r._offlineComponents}async function id(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(S(ye,"Using user provided OnlineComponentProvider"),await Lc(r,r._uninitializedComponentsProvider._online)):(S(ye,"Using default OnlineComponentProvider"),await Lc(r,new qs))),r._onlineComponents}function Q_(r){return id(r).then(t=>t.syncEngine)}async function H_(r){const t=await id(r),e=t.eventManager;return e.onListen=C_.bind(null,t.syncEngine),e.onUnlisten=N_.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=D_.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=k_.bind(null,t.syncEngine),e}function W_(r,t,e={}){const n=new Wt;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,u,l,d){const m=new $_({next:T=>{m.yu(),a.enqueueAndForget(()=>v_(i,p)),T.fromCache&&l.source==="server"?d.reject(new N(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(T)},error:T=>d.reject(T)}),p=new R_(u,m,{includeMetadataChanges:!0,Fa:!0});return T_(i,p)}(await H_(r),r.asyncQueue,t,e,n)),n.promise}/**
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
 */function od(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
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
 */const Bc=new Map;/**
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
 */function ad(r,t,e){if(!e)throw new N(V.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function Y_(r,t,e,n){if(t===!0&&n===!0)throw new N(V.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function Uc(r){if(!M.isDocumentKey(r))throw new N(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function qc(r){if(M.isDocumentKey(r))throw new N(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function ii(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":O(12329,{type:typeof r})}function $t(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new N(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=ii(r);throw new N(V.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
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
 */const ud="firestore.googleapis.com",zc=!0;class jc{constructor(t){var e,n;if(t.host===void 0){if(t.ssl!==void 0)throw new N(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ud,this.ssl=zc}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:zc;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Vh;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<wg)throw new N(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Y_("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=od((n=t.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new N(V.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new N(V.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new N(V.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class oi{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new jc({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new N(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new jc(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Nm;switch(n.type){case"firstParty":return new Fm(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new N(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=Bc.get(e);n&&(S("ComponentProvider","Removing Datastore"),Bc.delete(e),n.terminate())}(this),Promise.resolve()}}function J_(r,t,e,n={}){var s;const i=(r=$t(r,oi))._getSettings(),a=Object.assign(Object.assign({},i),{emulatorOptions:r._getEmulatorOptions()}),u=`${t}:${e}`;i.host!==ud&&i.host!==u&&Le("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l=Object.assign(Object.assign({},i),{host:u,ssl:!1,emulatorOptions:n});if(!vs(l,a)&&(r._setSettings(l),n.mockUserToken)){let d,m;if(typeof n.mockUserToken=="string")d=n.mockUserToken,m=pt.MOCK_USER;else{d=pf(n.mockUserToken,(s=r._app)===null||s===void 0?void 0:s.options.projectId);const p=n.mockUserToken.sub||n.mockUserToken.user_id;if(!p)throw new N(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new pt(p)}r._authCredentials=new km(new pl(d,m))}}/**
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
 */class Qe{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Qe(this.firestore,t,this._query)}}class Ct{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new me(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Ct(this.firestore,t,this._key)}}class me extends Qe{constructor(t,e,n){super(t,e,Lo(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Ct(this.firestore,null,new M(t))}withConverter(t){return new me(this.firestore,t,this._path)}}function Ey(r,t,...e){if(r=Bt(r),ad("collection","path",t),r instanceof oi){const n=J.fromString(t,...e);return qc(n),new me(r,null,n)}{if(!(r instanceof Ct||r instanceof me))throw new N(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(J.fromString(t,...e));return qc(n),new me(r.firestore,null,n)}}function Ty(r,t,...e){if(r=Bt(r),arguments.length===1&&(t=_l.newId()),ad("doc","path",t),r instanceof oi){const n=J.fromString(t,...e);return Uc(n),new Ct(r,null,new M(n))}{if(!(r instanceof Ct||r instanceof me))throw new N(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(J.fromString(t,...e));return Uc(n),new Ct(r.firestore,r instanceof me?r.converter:null,new M(n))}}/**
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
 */const $c="AsyncQueue";class Gc{constructor(t=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new zh(this,"async_queue_retry"),this.ju=()=>{const n=ys();n&&S($c,"Visibility state changed to "+n.visibilityState),this.y_.A_()},this.Hu=t;const e=ys();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Ju(),this.Yu(t)}enterRestrictedMode(t){if(!this.$u){this.$u=!0,this.Gu=t||!1;const e=ys();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.ju)}}enqueue(t){if(this.Ju(),this.$u)return new Promise(()=>{});const e=new Wt;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Qu.push(t),this.Zu()))}async Zu(){if(this.Qu.length!==0){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(t){if(!Ie(t))throw t;S($c,"Operation failed with retryable error: "+t)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(t){const e=this.Hu.then(()=>(this.Wu=!0,t().catch(n=>{throw this.Ku=n,this.Wu=!1,Pt("INTERNAL UNHANDLED ERROR: ",Kc(n)),n}).then(n=>(this.Wu=!1,n))));return this.Hu=e,e}enqueueAfterDelay(t,e,n){this.Ju(),this.zu.indexOf(t)>-1&&(e=0);const s=na.createAndSchedule(this,t,e,n,i=>this.Xu(i));return this.Uu.push(s),s}Ju(){this.Ku&&O(47125,{ec:Kc(this.Ku)})}verifyOperationInProgress(){}async tc(){let t;do t=this.Hu,await t;while(t!==this.Hu)}nc(t){for(const e of this.Uu)if(e.timerId===t)return!0;return!1}rc(t){return this.tc().then(()=>{this.Uu.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.Uu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.tc()})}sc(t){this.zu.push(t)}Xu(t){const e=this.Uu.indexOf(t);this.Uu.splice(e,1)}}function Kc(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),t}class He extends oi{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new Gc,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Gc(t),this._firestoreClient=void 0,await t}}}function X_(r,t){const e=typeof r=="object"?r:vm(),n=typeof r=="string"?r:Ds,s=_m(e,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=ff("firestore");i&&J_(s,...i)}return s}function aa(r){if(r._terminated)throw new N(V.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||cd(r),r._firestoreClient}function cd(r){var t,e,n;const s=r._freezeSettings(),i=function(u,l,d,m){return new Tp(u,l,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,od(m.experimentalLongPollingOptions),m.useFetchStreams)}(r._databaseId,((t=r._app)===null||t===void 0?void 0:t.options.appId)||"",r._persistenceKey,s);r._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((n=s.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),r._firestoreClient=new G_(r._authCredentials,r._appCheckCredentials,r._queue,i,r._componentsProvider&&function(u){const l=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(l),_online:l}}(r._componentsProvider))}function Z_(r,t){Le("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();return ty(r,qs.provider,{build:n=>new j_(n,e.cacheSizeBytes,void 0)}),Promise.resolve()}function ty(r,t,e){if((r=$t(r,He))._firestoreClient||r._terminated)throw new N(V.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new N(V.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:t,_offline:e},cd(r)}/**
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
 */class bn{constructor(t){this._byteString=t}static fromBase64String(t){try{return new bn(lt.fromBase64String(t))}catch(e){throw new N(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new bn(lt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
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
 */class kr{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new N(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new it(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class ua{constructor(t){this._methodName=t}}/**
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
 */class ca{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new N(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new N(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return U(this._lat,t._lat)||U(this._long,t._long)}}/**
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
 */class la{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,t._values)}}/**
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
 */const ey=/^__.*__$/;class ny{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new te(t,this.data,this.fieldMask,e,this.fieldTransforms):new Cn(t,this.data,e,this.fieldTransforms)}}class ld{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new te(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function hd(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{oc:r})}}class ha{constructor(t,e,n,s,i,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this._c(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get oc(){return this.settings.oc}ac(t){return new ha(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}uc(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.ac({path:n,cc:!1});return s.lc(t),s}hc(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.ac({path:n,cc:!1});return s._c(),s}Pc(t){return this.ac({path:void 0,cc:!0})}Tc(t){return zs(t,this.settings.methodName,this.settings.Ic||!1,this.path,this.settings.Ec)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}_c(){if(this.path)for(let t=0;t<this.path.length;t++)this.lc(this.path.get(t))}lc(t){if(t.length===0)throw this.Tc("Document fields must not be empty");if(hd(this.oc)&&ey.test(t))throw this.Tc('Document fields cannot begin and end with "__"')}}class ry{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||ri(t)}dc(t,e,n,s=!1){return new ha({oc:t,methodName:e,Ec:n,path:it.emptyPath(),cc:!1,Ic:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ai(r){const t=r._freezeSettings(),e=ri(r._databaseId);return new ry(r._databaseId,!!t.ignoreUndefinedProperties,e)}function dd(r,t,e,n,s,i={}){const a=r.dc(i.merge||i.mergeFields?2:0,t,e,s);da("Data must be an object, but it was:",a,n);const u=pd(n,a);let l,d;if(i.merge)l=new St(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const m=[];for(const p of i.mergeFields){const T=Ao(t,p,e);if(!a.contains(T))throw new N(V.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);_d(m,T)||m.push(T)}l=new St(m),d=a.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,d=a.fieldTransforms;return new ny(new wt(u),l,d)}class ui extends ua{_toFieldTransform(t){if(t.oc!==2)throw t.oc===1?t.Tc(`${this._methodName}() can only appear at the top level of your update data`):t.Tc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof ui}}function fd(r,t,e,n){const s=r.dc(1,t,e);da("Data must be an object, but it was:",s,n);const i=[],a=wt.empty();Ee(n,(l,d)=>{const m=fa(t,l,e);d=Bt(d);const p=s.hc(m);if(d instanceof ui)i.push(m);else{const T=Mr(d,p);T!=null&&(i.push(m),a.set(m,T))}});const u=new St(i);return new ld(a,u,s.fieldTransforms)}function md(r,t,e,n,s,i){const a=r.dc(1,t,e),u=[Ao(t,n,e)],l=[s];if(i.length%2!=0)throw new N(V.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<i.length;T+=2)u.push(Ao(t,i[T])),l.push(i[T+1]);const d=[],m=wt.empty();for(let T=u.length-1;T>=0;--T)if(!_d(d,u[T])){const P=u[T];let C=l[T];C=Bt(C);const k=a.hc(P);if(C instanceof ui)d.push(P);else{const D=Mr(C,k);D!=null&&(d.push(P),m.set(P,D))}}const p=new St(d);return new ld(m,p,a.fieldTransforms)}function sy(r,t,e,n=!1){return Mr(e,r.dc(n?4:3,t))}function Mr(r,t){if(gd(r=Bt(r)))return da("Unsupported field value:",t,r),pd(r,t);if(r instanceof ua)return function(n,s){if(!hd(s.oc))throw s.Tc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Tc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.cc&&t.oc!==4)throw t.Tc("Nested arrays are not supported");return function(n,s){const i=[];let a=0;for(const u of n){let l=Mr(u,s.Pc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(r,t)}return function(n,s){if((n=Bt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return qp(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=ot.fromDate(n);return{timestampValue:An(s.serializer,i)}}if(n instanceof ot){const i=new ot(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:An(s.serializer,i)}}if(n instanceof ca)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof bn)return{bytesValue:dh(s.serializer,n._byteString)};if(n instanceof Ct){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.Tc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:$o(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof la)return function(a,u){return{mapValue:{fields:{[Mo]:{stringValue:Oo},[yn]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw u.Tc("VectorValues must only contain numeric values.");return Bo(u.serializer,d)})}}}}}}(n,s);throw s.Tc(`Unsupported field value: ${ii(n)}`)}(r,t)}function pd(r,t){const e={};return xl(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Ee(r,(n,s)=>{const i=Mr(s,t.uc(n));i!=null&&(e[n]=i)}),{mapValue:{fields:e}}}function gd(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof ot||r instanceof ca||r instanceof bn||r instanceof Ct||r instanceof ua||r instanceof la)}function da(r,t,e){if(!gd(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const n=ii(e);throw n==="an object"?t.Tc(r+" a custom object"):t.Tc(r+" "+n)}}function Ao(r,t,e){if((t=Bt(t))instanceof kr)return t._internalPath;if(typeof t=="string")return fa(r,t);throw zs("Field path arguments must be of type string or ",r,!1,void 0,e)}const iy=new RegExp("[~\\*/\\[\\]]");function fa(r,t,e){if(t.search(iy)>=0)throw zs(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new kr(...t.split("."))._internalPath}catch{throw zs(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function zs(r,t,e,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${n}`),a&&(l+=` in document ${s}`),l+=")"),new N(V.INVALID_ARGUMENT,u+r+l)}function _d(r,t){return r.some(e=>e.isEqual(t))}/**
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
 */class yd{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ct(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new oy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(ci("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class oy extends yd{data(){return super.data()}}function ci(r,t){return typeof t=="string"?fa(r,t):t instanceof kr?t._internalPath:t._delegate._internalPath}/**
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
 */function ay(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new N(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ma{}class Id extends ma{}function vy(r,t,...e){let n=[];t instanceof ma&&n.push(t),n=n.concat(e),function(i){const a=i.filter(l=>l instanceof pa).length,u=i.filter(l=>l instanceof li).length;if(a>1||a>0&&u>0)throw new N(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class li extends Id{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new li(t,e,n)}_apply(t){const e=this._parse(t);return Ed(t._query,e),new Qe(t.firestore,t.converter,lo(t._query,e))}_parse(t){const e=ai(t.firestore);return function(i,a,u,l,d,m,p){let T;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new N(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){Hc(p,m);const C=[];for(const k of p)C.push(Qc(l,i,k));T={arrayValue:{values:C}}}else T=Qc(l,i,p)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||Hc(p,m),T=sy(u,a,p,m==="in"||m==="not-in");return G.create(d,m,T)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function wy(r,t,e){const n=t,s=ci("where",r);return li._create(s,n,e)}class pa extends ma{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new pa(t,e)}_parse(t){const e=this._queryConstraints.map(n=>n._parse(t)).filter(n=>n.getFilters().length>0);return e.length===1?e[0]:X.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,i){let a=s;const u=i.getFlattenedFilters();for(const l of u)Ed(a,l),a=lo(a,l)}(t._query,e),new Qe(t.firestore,t.converter,lo(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ga extends Id{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new ga(t,e)}_apply(t){const e=function(s,i,a){if(s.startAt!==null)throw new N(V.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new N(V.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new vr(i,a)}(t._query,this._field,this._direction);return new Qe(t.firestore,t.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new Sn(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(t._query,e))}}function Ay(r,t="asc"){const e=t,n=ci("orderBy",r);return ga._create(n,e)}function Qc(r,t,e){if(typeof(e=Bt(e))=="string"){if(e==="")throw new N(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Wl(t)&&e.indexOf("/")!==-1)throw new N(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(J.fromString(e));if(!M.isDocumentKey(n))throw new N(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Er(r,new M(n))}if(e instanceof Ct)return Er(r,e._key);throw new N(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ii(e)}.`)}function Hc(r,t){if(!Array.isArray(r)||r.length===0)throw new N(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Ed(r,t){const e=function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new N(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new N(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class uy{convertValue(t,e="none"){switch(pe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return rt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Xt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw O(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Ee(t,(s,i)=>{n[s]=this.convertValue(i,e)}),n}convertVectorValue(t){var e,n,s;const i=(s=(n=(e=t.fields)===null||e===void 0?void 0:e[yn].arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.map(a=>rt(a.doubleValue));return new la(i)}convertGeoPoint(t){return new ca(rt(t.latitude),rt(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=Hs(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(yr(t));default:return null}}convertTimestamp(t){const e=Jt(t);return new ot(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=J.fromString(t);F(vh(n),9688,{name:t});const s=new Be(n.get(1),n.get(3)),i=new M(n.popFirst(5));return s.isEqual(e)||Pt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
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
 */function Td(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}/**
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
 */class us{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class cy extends yd{constructor(t,e,n,s,i,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Is(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(ci("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class Is extends cy{data(t={}){return super.data(t)}}class ly{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new us(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new Is(this._firestore,this._userDataWriter,n.key,n,new us(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new N(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const l=new Is(s._firestore,s._userDataWriter,u.doc.key,u.doc,new us(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const l=new Is(s._firestore,s._userDataWriter,u.doc.key,u.doc,new us(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,m=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),m=a.indexOf(u.doc.key)),{type:hy(u.type),doc:l,oldIndex:d,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function hy(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:r})}}class dy extends uy{constructor(t){super(),this.firestore=t}convertBytes(t){return new bn(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Ct(this.firestore,null,e)}}function Ry(r){r=$t(r,Qe);const t=$t(r.firestore,He),e=aa(t),n=new dy(t);return ay(r._query),W_(e,r._query).then(s=>new ly(t,n,r,s))}function by(r,t,e){r=$t(r,Ct);const n=$t(r.firestore,He),s=Td(r.converter,t,e);return hi(n,[dd(ai(n),"setDoc",r._key,s,r.converter!==null,e).toMutation(r._key,ft.none())])}function Py(r,t,e,...n){r=$t(r,Ct);const s=$t(r.firestore,He),i=ai(s);let a;return a=typeof(t=Bt(t))=="string"||t instanceof kr?md(i,"updateDoc",r._key,t,e,n):fd(i,"updateDoc",r._key,t),hi(s,[a.toMutation(r._key,ft.exists(!0))])}function Vy(r){return hi($t(r.firestore,He),[new Sr(r._key,ft.none())])}function hi(r,t){return function(n,s){const i=new Wt;return n.asyncQueue.enqueueAndForget(async()=>M_(await Q_(n),s,i)),i.promise}(aa(r),t)}/**
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
 */class fy{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=ai(t)}set(t,e,n){this._verifyNotCommitted();const s=Ki(t,this._firestore),i=Td(s.converter,e,n),a=dd(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(a.toMutation(s._key,ft.none())),this}update(t,e,n,...s){this._verifyNotCommitted();const i=Ki(t,this._firestore);let a;return a=typeof(e=Bt(e))=="string"||e instanceof kr?md(this._dataReader,"WriteBatch.update",i._key,e,n,s):fd(this._dataReader,"WriteBatch.update",i._key,e),this._mutations.push(a.toMutation(i._key,ft.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=Ki(t,this._firestore);return this._mutations=this._mutations.concat(new Sr(e._key,ft.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new N(V.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Ki(r,t){if((r=Bt(r)).firestore!==t)throw new N(V.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
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
 */function Sy(r){return aa(r=$t(r,He)),new fy(r,t=>hi(r,t))}(function(t,e=!0){(function(s){Vn=s})(Tm),As(new lr("firestore",(n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),u=new He(new Mm(n.getProvider("auth-internal")),new Lm(a,n.getProvider("app-check-internal")),function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new N(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Be(d.options.projectId,m)}(a,s),a);return i=Object.assign({useFetchStreams:e},i),u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),hn(Vu,Su,t),hn(Vu,Su,"esm2017")})();var my="firebase",py="11.6.1";/**
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
 */hn(my,py,"app");const gy={apiKey:"AIzaSyCDgtC4qaL0cqSjEu7GS4CkTHtneuoz_TI",authDomain:"sacred-sutra.firebaseapp.com",projectId:"sacred-sutra",storageBucket:"sacred-sutra.firebasestorage.app",messagingSenderId:"676199421158",appId:"1:676199421158:web:ed2e9164f94a2e51165727"},_y=il(gy),yy=X_(_y);Z_(yy).catch(r=>{r.code==="failed-precondition"?console.error("Multiple tabs open, persistence can only be enabled in one tab at a time."):r.code==="unimplemented"&&console.error("The current browser does not support offline persistence.")});export{ot as T,yy as a,Vy as b,Ey as c,Ty as d,wy as e,Ry as g,Ay as o,vy as q,by as s,Py as u,Sy as w};
