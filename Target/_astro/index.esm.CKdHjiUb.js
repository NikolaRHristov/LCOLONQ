var L={};const W=function(e){const t=[];let r=0;for(let n=0;n<e.length;n++){let a=e.charCodeAt(n);a<128?t[r++]=a:a<2048?(t[r++]=a>>6|192,t[r++]=63&a|128):55296==(64512&a)&&n+1<e.length&&56320==(64512&e.charCodeAt(n+1))?(a=65536+((1023&a)<<10)+(1023&e.charCodeAt(++n)),t[r++]=a>>18|240,t[r++]=a>>12&63|128,t[r++]=a>>6&63|128,t[r++]=63&a|128):(t[r++]=a>>12|224,t[r++]=a>>6&63|128,t[r++]=63&a|128)}return t},ee=function(e){const t=[];let r=0,n=0;for(;r<e.length;){const a=e[r++];if(a<128)t[n++]=String.fromCharCode(a);else if(a>191&&a<224){const i=e[r++];t[n++]=String.fromCharCode((31&a)<<6|63&i)}else if(a>239&&a<365){const i=((7&a)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536;t[n++]=String.fromCharCode(55296+(i>>10)),t[n++]=String.fromCharCode(56320+(1023&i))}else{const i=e[r++],s=e[r++];t[n++]=String.fromCharCode((15&a)<<12|(63&i)<<6|63&s)}}return t.join("")},G={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let t=0;t<e.length;t+=3){const a=e[t],i=t+1<e.length,s=i?e[t+1]:0,o=t+2<e.length,c=o?e[t+2]:0,h=a>>2,l=(3&a)<<4|s>>4;let d=(15&s)<<2|c>>6,u=63&c;o||(u=64,i||(d=64)),n.push(r[h],r[l],r[d],r[u])}return n.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(W(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):ee(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const r=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let t=0;t<e.length;){const a=r[e.charAt(t++)],i=t<e.length?r[e.charAt(t)]:0;++t;const s=t<e.length?r[e.charAt(t)]:64;++t;const o=t<e.length?r[e.charAt(t)]:64;if(++t,null==a||null==i||null==s||null==o)throw new te;const c=a<<2|i>>4;if(n.push(c),64!==s){const e=i<<4&240|s>>2;if(n.push(e),64!==o){const e=s<<6&192|o;n.push(e)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class te extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ne=function(e){const t=W(e);return G.encodeByteArray(t,!0)},J=function(e){return ne(e).replace(/\./g,"")},re=function(e){try{return G.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function se(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}const ae=()=>se().__FIREBASE_DEFAULTS__,ie=()=>{if(typeof process>"u"||typeof L>"u")return;const e=L.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0},oe=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&re(e[1]);return t&&JSON.parse(t)},ce=()=>{try{return ae()||ie()||oe()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},he=()=>{var e;return null===(e=ce())||void 0===e?void 0:e.config};class le{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,r))}}}function de(){try{return"object"==typeof indexedDB}catch{return!1}}function fe(){return new Promise(((e,t)=>{try{let r=!0;const n="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(n);a.onsuccess=()=>{a.result.close(),r||self.indexedDB.deleteDatabase(n),e(!0)},a.onupgradeneeded=()=>{r=!1},a.onerror=()=>{var e;t((null===(e=a.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}const ue="FirebaseError";class b extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ue,Object.setPrototypeOf(this,b.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,K.prototype.create)}}class K{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},n=`${this.service}/${e}`,a=this.errors[e],i=a?pe(a,r):"Error",s=`${this.serviceName}: ${i} (${n}).`;return new b(n,s,r)}}function pe(e,t){return e.replace(me,((e,r)=>{const n=t[r];return null!=n?String(n):`<${r}?>`}))}const me=/\{\$([^}]+)}/g;function C(e,t){if(e===t)return!0;const r=Object.keys(e),n=Object.keys(t);for(const a of r){if(!n.includes(a))return!1;const r=e[a],i=t[a];if(H(r)&&H(i)){if(!C(r,i))return!1}else if(r!==i)return!1}for(const e of n)if(!r.includes(e))return!1;return!0}function H(e){return null!==e&&"object"==typeof e}class D{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const u="[DEFAULT]";class ge{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new le;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&e.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),n=null!==(t=e?.optional)&&void 0!==t&&t;if(!this.isInitialized(r)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:r})}catch(e){if(n)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(_e(e))try{this.getOrInitializeService({instanceIdentifier:u})}catch{}for(const[e,t]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});t.resolve(e)}catch{}}}}clearInstance(e=u){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e=u){return this.instances.has(e)}getOptions(e=u){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const n=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[e,t]of this.instancesDeferred.entries()){r===this.normalizeInstanceIdentifier(e)&&t.resolve(n)}return n}onInit(e,t){var r;const n=this.normalizeInstanceIdentifier(t),a=null!==(r=this.onInitCallbacks.get(n))&&void 0!==r?r:new Set;a.add(e),this.onInitCallbacks.set(n,a);const i=this.instances.get(n);return i&&e(i,n),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const n of r)try{n(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:be(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=u){return this.component?this.component.multipleInstances?e:u:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}function be(e){return e===u?void 0:e}function _e(e){return"EAGER"===e.instantiationMode}class Ee{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ge(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}var h;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(h||(h={}));const ye={debug:h.DEBUG,verbose:h.VERBOSE,info:h.INFO,warn:h.WARN,error:h.ERROR,silent:h.SILENT},De=h.INFO,Ie={[h.DEBUG]:"log",[h.VERBOSE]:"log",[h.INFO]:"info",[h.WARN]:"warn",[h.ERROR]:"error"},ve=(e,t,...r)=>{if(t<e.logLevel)return;const n=(new Date).toISOString(),a=Ie[t];if(!a)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[a](`[${n}]  ${e.name}:`,...r)};class we{constructor(e){this.name=e,this._logLevel=De,this._logHandler=ve,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in h))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?ye[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,h.DEBUG,...e),this._logHandler(this,h.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,h.VERBOSE,...e),this._logHandler(this,h.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,h.INFO,...e),this._logHandler(this,h.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,h.WARN,...e),this._logHandler(this,h.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,h.ERROR,...e),this._logHandler(this,h.ERROR,...e)}}const Se=(e,t)=>t.some((t=>e instanceof t));let P,F;function Ce(){return P||(P=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ae(){return F||(F=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Y=new WeakMap,A=new WeakMap,X=new WeakMap,I=new WeakMap,N=new WeakMap;function Be(e){const t=new Promise(((t,r)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",i)},a=()=>{t(f(e.result)),n()},i=()=>{r(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",i)}));return t.then((t=>{t instanceof IDBCursor&&Y.set(t,e)})).catch((()=>{})),N.set(t,e),t}function Oe(e){if(A.has(e))return;const t=new Promise(((t,r)=>{const n=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",i),e.removeEventListener("abort",i)},a=()=>{t(),n()},i=()=>{r(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",a),e.addEventListener("error",i),e.addEventListener("abort",i)}));A.set(e,t)}let B={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return A.get(e);if("objectStoreNames"===t)return e.objectStoreNames||X.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return f(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Te(e){B=e(B)}function Me(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?Ae().includes(e)?function(...t){return e.apply(v(this),t),f(Y.get(this))}:function(...t){return f(e.apply(v(this),t))}:function(t,...r){const n=e.call(v(this),t,...r);return X.set(n,t.sort?t.sort():[t]),f(n)}}function $e(e){return"function"==typeof e?Me(e):(e instanceof IDBTransaction&&Oe(e),Se(e,Ce())?new Proxy(e,B):e)}function f(e){if(e instanceof IDBRequest)return Be(e);if(I.has(e))return I.get(e);const t=$e(e);return t!==e&&(I.set(e,t),N.set(t,e)),t}const v=e=>N.get(e);function Ne(e,t,{blocked:r,upgrade:n,blocking:a,terminated:i}={}){const s=indexedDB.open(e,t),o=f(s);return n&&s.addEventListener("upgradeneeded",(e=>{n(f(s.result),e.oldVersion,e.newVersion,f(s.transaction),e)})),r&&s.addEventListener("blocked",(e=>r(e.oldVersion,e.newVersion,e))),o.then((e=>{i&&e.addEventListener("close",(()=>i())),a&&e.addEventListener("versionchange",(e=>a(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),o}const Re=["get","getKey","getAll","getAllKeys","count"],Le=["put","add","delete","clear"],w=new Map;function x(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(w.get(t))return w.get(t);const r=t.replace(/FromIndex$/,""),n=t!==r,a=Le.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!a&&!Re.includes(r))return;const i=async function(e,...t){const i=this.transaction(e,a?"readwrite":"readonly");let s=i.store;return n&&(s=s.index(t.shift())),(await Promise.all([s[r](...t),a&&i.done]))[0]};return w.set(t,i),i}Te((e=>({...e,get:(t,r,n)=>x(t,r)||e.get(t,r,n),has:(t,r)=>!!x(t,r)||e.has(t,r)})));class He{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(Pe(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}function Pe(e){const t=e.getComponent();return"VERSION"===t?.type}const O="@firebase/app",V="0.10.15",d=new we("@firebase/app"),Fe="@firebase/app-compat",xe="@firebase/analytics-compat",Ve="@firebase/analytics",je="@firebase/app-check-compat",ke="@firebase/app-check",ze="@firebase/auth",Ue="@firebase/auth-compat",We="@firebase/database",Ge="@firebase/data-connect",Je="@firebase/database-compat",Ke="@firebase/functions",Ye="@firebase/functions-compat",Xe="@firebase/installations",Ze="@firebase/installations-compat",qe="@firebase/messaging",Qe="@firebase/messaging-compat",et="@firebase/performance",tt="@firebase/performance-compat",nt="@firebase/remote-config",rt="@firebase/remote-config-compat",st="@firebase/storage",at="@firebase/storage-compat",it="@firebase/firestore",ot="@firebase/vertexai",ct="@firebase/firestore-compat",ht="firebase",lt="[DEFAULT]",dt={[O]:"fire-core",[Fe]:"fire-core-compat",[Ve]:"fire-analytics",[xe]:"fire-analytics-compat",[ke]:"fire-app-check",[je]:"fire-app-check-compat",[ze]:"fire-auth",[Ue]:"fire-auth-compat",[We]:"fire-rtdb",[Ge]:"fire-data-connect",[Je]:"fire-rtdb-compat",[Ke]:"fire-fn",[Ye]:"fire-fn-compat",[Xe]:"fire-iid",[Ze]:"fire-iid-compat",[qe]:"fire-fcm",[Qe]:"fire-fcm-compat",[et]:"fire-perf",[tt]:"fire-perf-compat",[nt]:"fire-rc",[rt]:"fire-rc-compat",[st]:"fire-gcs",[at]:"fire-gcs-compat",[it]:"fire-fst",[ct]:"fire-fst-compat",[ot]:"fire-vertex","fire-js":"fire-js",[ht]:"fire-js-all"},T=new Map,ft=new Map,M=new Map;function j(e,t){try{e.container.addComponent(t)}catch(r){d.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,r)}}function $(e){const t=e.name;if(M.has(t))return d.debug(`There were multiple attempts to register component ${t}.`),!1;M.set(t,e);for(const t of T.values())j(t,e);for(const t of ft.values())j(t,e);return!0}const ut={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},p=new K("app","Firebase",ut);class pt{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new D("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw p.create("app-deleted",{appName:this._name})}}function Ct(e,t={}){let r=e;"object"!=typeof t&&(t={name:t});const n=Object.assign({name:lt,automaticDataCollectionEnabled:!1},t),a=n.name;if("string"!=typeof a||!a)throw p.create("bad-app-name",{appName:String(a)});if(r||(r=he()),!r)throw p.create("no-options");const i=T.get(a);if(i){if(C(r,i.options)&&C(n,i.config))return i;throw p.create("duplicate-app",{appName:a})}const s=new Ee(a);for(const e of M.values())s.addComponent(e);const o=new pt(r,n,s);return T.set(a,o),o}function y(e,t,r){var n;let a=null!==(n=dt[e])&&void 0!==n?n:e;r&&(a+=`-${r}`);const i=a.match(/\s|\//),s=t.match(/\s|\//);if(i||s){const e=[`Unable to register library "${a}" with version "${t}":`];return i&&e.push(`library name "${a}" contains illegal characters (whitespace or "/")`),i&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void d.warn(e.join(" "))}$(new D(`${a}-version`,(()=>({library:a,version:t})),"VERSION"))}const mt="firebase-heartbeat-database",gt=1,g="firebase-heartbeat-store";let S=null;function Z(){return S||(S=Ne(mt,1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(g)}catch(e){console.warn(e)}}}).catch((e=>{throw p.create("idb-open",{originalErrorMessage:e.message})}))),S}async function bt(e){try{const t=(await Z()).transaction(g),r=await t.objectStore(g).get(q(e));return await t.done,r}catch(e){if(e instanceof b)d.warn(e.message);else{const t=p.create("idb-get",{originalErrorMessage:e?.message});d.warn(t.message)}}}async function k(e,t){try{const r=(await Z()).transaction(g,"readwrite");await r.objectStore(g).put(t,q(e)),await r.done}catch(e){if(e instanceof b)d.warn(e.message);else{const t=p.create("idb-set",{originalErrorMessage:e?.message});d.warn(t.message)}}}function q(e){return`${e.name}!${e.options.appId}`}const _t=1024,Et=2592e6;class yt{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new It(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=z();return null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats))||this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some((e=>e.date===n))?void 0:(this._heartbeatsCache.heartbeats.push({date:n,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=Et})),this._storage.overwrite(this._heartbeatsCache))}catch(e){d.warn(e)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=z(),{heartbeatsToSend:r,unsentEntries:n}=Dt(this._heartbeatsCache.heartbeats),a=J(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(e){return d.warn(e),""}}}function z(){return(new Date).toISOString().substring(0,10)}function Dt(e,t=_t){const r=[];let n=e.slice();for(const a of e){const e=r.find((e=>e.agent===a.agent));if(e){if(e.dates.push(a.date),U(r)>t){e.dates.pop();break}}else if(r.push({agent:a.agent,dates:[a.date]}),U(r)>t){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}class It{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!de()&&fe().then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){const e=await bt(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return k(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return k(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}}}function U(e){return J(JSON.stringify({version:2,heartbeats:e})).length}function vt(e){$(new D("platform-logger",(e=>new He(e)),"PRIVATE")),$(new D("heartbeat",(e=>new yt(e)),"PRIVATE")),y(O,V,e),y(O,V,"esm2017"),y("fire-js","")}vt("");var wt="firebase",St="11.0.1";y(wt,St,"app");export{b as FirebaseError,lt as _DEFAULT_ENTRY_NAME,j as _addComponent,T as _apps,M as _components,$ as _registerComponent,ft as _serverApps,Ct as initializeApp,y as registerVersion};