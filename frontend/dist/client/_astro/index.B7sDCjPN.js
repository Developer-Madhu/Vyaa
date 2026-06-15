import{c as o}from"./createLucideIcon.DbVS5xJX.js";import{r as a}from"./index.yGrMsBkE.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],S=o("x",s);function m(e,t,i){let r=new Set(t).add(void 0);return e.listen((n,c,u)=>{r.has(u)&&i(n,c,u)})}let f=(e,t)=>i=>{e.current!==i&&(e.current=i,t())};function x(e,{keys:t,deps:i=[e,t],ssr:r}={}){let n=a.useRef();n.current=e.get();let c=a.useCallback(l=>(f(n,l)(e.value),t?.length>0?m(e,t,f(n,l)):e.listen(f(n,l))),i),u=()=>n.current,d=u;return r&&"init"in e&&(d=r==="initial"?()=>e.init:r),a.useSyncExternalStore(c,u,d)}export{S as X,x as u};
