"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[525],{5525:function(e,t,n){let r,o,i,u,l,s;n.d(t,{pJ:function(){return eL}});let a=e=>{var t;return null!==(t=null==e?void 0:e.ownerDocument)&&void 0!==t?t:document},c=e=>e&&"window"in e&&e.window===e?e:a(e).defaultView||window;var d,f=n(7294);let p=null,v=new Set,g=new Map,m=!1,h=!1,y={Tab:!0,Escape:!0};function b(e,t){for(let n of v)n(e,t)}function E(e){var t,n;m=!0,e.metaKey||(t=/^Mac/i,!("undefined"!=typeof window&&null!=window.navigator&&t.test((null===(n=window.navigator.userAgentData)||void 0===n?void 0:n.platform)||window.navigator.platform))&&e.altKey)||e.ctrlKey||"Control"===e.key||"Shift"===e.key||"Meta"===e.key||(p="keyboard",b("keyboard",e))}function w(e){p="pointer",("mousedown"===e.type||"pointerdown"===e.type)&&(m=!0,b("pointer",e))}function T(e){var t,n;(0===e.mozInputSource&&e.isTrusted?0:(t=/Android/i,"undefined"!=typeof window&&null!=window.navigator&&((null===(n=window.navigator.userAgentData)||void 0===n?void 0:n.brands.some(e=>t.test(e.brand)))||t.test(window.navigator.userAgent))&&e.pointerType)?"click"!==e.type||1!==e.buttons:0!==e.detail||e.pointerType)||(m=!0,p="virtual")}function P(e){e.target!==window&&e.target!==document&&(m||h||(p="virtual",b("virtual",e)),m=!1,h=!1)}function L(){m=!1,h=!0}function k(e){if("undefined"==typeof window||g.get(c(e)))return;let t=c(e),n=a(e),r=t.HTMLElement.prototype.focus;t.HTMLElement.prototype.focus=function(){m=!0,r.apply(this,arguments)},n.addEventListener("keydown",E,!0),n.addEventListener("keyup",E,!0),n.addEventListener("click",T,!0),t.addEventListener("focus",P,!0),t.addEventListener("blur",L,!1),"undefined"!=typeof PointerEvent?(n.addEventListener("pointerdown",w,!0),n.addEventListener("pointermove",w,!0),n.addEventListener("pointerup",w,!0)):(n.addEventListener("mousedown",w,!0),n.addEventListener("mousemove",w,!0),n.addEventListener("mouseup",w,!0)),t.addEventListener("beforeunload",()=>{S(e)},{once:!0}),g.set(t,{focus:r})}let S=(e,t)=>{let n=c(e),r=a(e);t&&r.removeEventListener("DOMContentLoaded",t),g.has(n)&&(n.HTMLElement.prototype.focus=g.get(n).focus,r.removeEventListener("keydown",E,!0),r.removeEventListener("keyup",E,!0),r.removeEventListener("click",T,!0),n.removeEventListener("focus",P,!0),n.removeEventListener("blur",L,!1),"undefined"!=typeof PointerEvent?(r.removeEventListener("pointerdown",w,!0),r.removeEventListener("pointermove",w,!0),r.removeEventListener("pointerup",w,!0)):(r.removeEventListener("mousedown",w,!0),r.removeEventListener("mousemove",w,!0),r.removeEventListener("mouseup",w,!0)),g.delete(n))};function C(){return"pointer"!==p}"undefined"!=typeof document&&function(e){let t;let n=a(void 0);"loading"!==n.readyState?k(void 0):(t=()=>{k(void 0)},n.addEventListener("DOMContentLoaded",t)),()=>S(e,t)}();let F=new Set(["checkbox","radio","range","color","file","image","button","submit","reset"]),D="undefined"!=typeof document?f.useLayoutEffect:()=>{};class A{isDefaultPrevented(){return this.nativeEvent.defaultPrevented}preventDefault(){this.defaultPrevented=!0,this.nativeEvent.preventDefault()}stopPropagation(){this.nativeEvent.stopPropagation(),this.isPropagationStopped=()=>!0}isPropagationStopped(){return!1}persist(){}constructor(e,t){this.nativeEvent=t,this.target=t.target,this.currentTarget=t.currentTarget,this.relatedTarget=t.relatedTarget,this.bubbles=t.bubbles,this.cancelable=t.cancelable,this.defaultPrevented=t.defaultPrevented,this.eventPhase=t.eventPhase,this.isTrusted=t.isTrusted,this.timeStamp=t.timeStamp,this.type=e}}function M(e){let t=(0,f.useRef)({isFocused:!1,observer:null});D(()=>{let e=t.current;return()=>{e.observer&&(e.observer.disconnect(),e.observer=null)}},[]);let n=function(e){let t=(0,f.useRef)(null);return D(()=>{t.current=e},[e]),(0,f.useCallback)((...e)=>{let n=t.current;return null==n?void 0:n(...e)},[])}(t=>{null==e||e(t)});return(0,f.useCallback)(e=>{if(e.target instanceof HTMLButtonElement||e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||e.target instanceof HTMLSelectElement){t.current.isFocused=!0;let r=e.target;r.addEventListener("focusout",e=>{t.current.isFocused=!1,r.disabled&&n(new A("blur",e)),t.current.observer&&(t.current.observer.disconnect(),t.current.observer=null)},{once:!0}),t.current.observer=new MutationObserver(()=>{if(t.current.isFocused&&r.disabled){var e;null===(e=t.current.observer)||void 0===e||e.disconnect();let n=r===document.activeElement?null:document.activeElement;r.dispatchEvent(new FocusEvent("blur",{relatedTarget:n})),r.dispatchEvent(new FocusEvent("focusout",{bubbles:!0,relatedTarget:n}))}}),t.current.observer.observe(r,{attributes:!0,attributeFilter:["disabled"]})}},[n])}let I=!1,H=0;function O(){I=!0,setTimeout(()=>{I=!1},50)}function R(e){"touch"===e.pointerType&&O()}function j(){if("undefined"!=typeof document)return"undefined"!=typeof PointerEvent?document.addEventListener("pointerup",R):document.addEventListener("touchend",O),H++,()=>{--H>0||("undefined"!=typeof PointerEvent?document.removeEventListener("pointerup",R):document.removeEventListener("touchend",O))}}var x=Object.defineProperty,N=(e,t,n)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,B=(e,t,n)=>(N(e,"symbol"!=typeof t?t+"":t,n),n);class W{set(e){this.current!==e&&(this.handoffState="pending",this.currentId=0,this.current=e)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return"server"===this.current}get isClient(){return"client"===this.current}detect(){return"undefined"==typeof document?"server":"client"}handoff(){"pending"===this.handoffState&&(this.handoffState="complete")}get isHandoffComplete(){return"complete"===this.handoffState}constructor(){B(this,"current",this.detect()),B(this,"handoffState","pending"),B(this,"currentId",0)}}let U=new W;function K(e){return U.isServer?null:e instanceof Node?e.ownerDocument:null!=e&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}let V=(e,t)=>{U.isServer?(0,f.useEffect)(e,t):(0,f.useLayoutEffect)(e,t)},q=function(e){let t;let n=(t=(0,f.useRef)(e),V(()=>{t.current=e},[e]),t);return f.useCallback(function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return n.current(...t)},[n])};function _(e){var t;if(e.type)return e.type;let n=null!=(t=e.as)?t:"button";if("string"==typeof n&&"button"===n.toLowerCase())return"button"}let Y=Symbol();function X(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];let r=(0,f.useRef)(t);(0,f.useEffect)(()=>{r.current=t},[t]);let o=q(e=>{for(let t of r.current)null!=t&&("function"==typeof t?t(e):t.current=e)});return t.every(e=>null==e||(null==e?void 0:e[Y]))?void 0:o}let z=(0,f.createContext)(()=>{});function J(e){let{value:t,children:n}=e;return f.createElement(z.Provider,{value:t},n)}let Z=(0,f.createContext)(null);Z.displayName="OpenClosedContext";var $=((r=$||{})[r.Open=1]="Open",r[r.Closed=2]="Closed",r[r.Closing=4]="Closing",r[r.Opening=8]="Opening",r);function G(e){let{value:t,children:n}=e;return f.createElement(Z.Provider,{value:t},n)}function Q(e,t){for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];if(e in t){let n=t[e];return"function"==typeof n?n(...r):n}let i=Error('Tried to handle "'.concat(e,'" but there is no handler defined. Only defined handlers are: ').concat(Object.keys(t).map(e=>'"'.concat(e,'"')).join(", "),"."));throw Error.captureStackTrace&&Error.captureStackTrace(i,Q),i}function ee(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return Array.from(new Set(t.flatMap(e=>"string"==typeof e?e.split(" "):[]))).filter(Boolean).join(" ")}var et=((o=et||{})[o.None=0]="None",o[o.RenderStrategy=1]="RenderStrategy",o[o.Static=2]="Static",o),en=((i=en||{})[i.Unmount=0]="Unmount",i[i.Hidden=1]="Hidden",i);function er(e){let{ourProps:t,theirProps:n,slot:r,defaultTag:o,features:i,visible:u=!0,name:l,mergeRefs:s}=e;s=null!=s?s:eu;let a=el(n,t);if(u)return eo(a,r,o,l,s);let c=null!=i?i:0;if(2&c){let{static:e=!1,...t}=a;if(e)return eo(t,r,o,l,s)}if(1&c){let{unmount:e=!0,...t}=a;return Q(e?0:1,{0:()=>null,1:()=>eo({...t,hidden:!0,style:{display:"none"}},r,o,l,s)})}return eo(a,r,o,l,s)}function eo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,o=arguments.length>4?arguments[4]:void 0,{as:i=n,children:u,refName:l="ref",...s}=ed(e,["unmount","static"]),a=void 0!==e.ref?{[l]:e.ref}:{},c="function"==typeof u?u(t):u;"className"in s&&s.className&&"function"==typeof s.className&&(s.className=s.className(t)),s["aria-labelledby"]&&s["aria-labelledby"]===s.id&&(s["aria-labelledby"]=void 0);let d={};if(t){let e=!1,n=[];for(let[r,o]of Object.entries(t))"boolean"==typeof o&&(e=!0),!0===o&&n.push(r.replace(/([A-Z])/g,e=>"-".concat(e.toLowerCase())));if(e)for(let e of(d["data-headlessui-state"]=n.join(" "),n))d["data-".concat(e)]=""}if(i===f.Fragment&&(Object.keys(ec(s)).length>0||Object.keys(ec(d)).length>0)){if(!(0,f.isValidElement)(c)||Array.isArray(c)&&c.length>1){if(Object.keys(ec(s)).length>0)throw Error(['Passing props on "Fragment"!',"","The current component <".concat(r,' /> is rendering a "Fragment".'),"However we need to passthrough the following props:",Object.keys(ec(s)).concat(Object.keys(ec(d))).map(e=>"  - ".concat(e)).join("\n"),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(e=>"  - ".concat(e)).join("\n")].join("\n"))}else{let e=c.props,t=null==e?void 0:e.className,n="function"==typeof t?function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return ee(t(...n),s.className)}:ee(t,s.className),r=el(c.props,ec(ed(s,["ref"])));for(let e in d)e in r&&delete d[e];return(0,f.cloneElement)(c,Object.assign({},r,d,a,{ref:o(c.ref,a.ref)},n?{className:n}:{}))}}return(0,f.createElement)(i,Object.assign({},ed(s,["ref"]),i!==f.Fragment&&a,i!==f.Fragment&&d),c)}function ei(){let e=(0,f.useRef)([]),t=(0,f.useCallback)(t=>{for(let n of e.current)null!=n&&("function"==typeof n?n(t):n.current=t)},[]);return function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];if(!r.every(e=>null==e))return e.current=r,t}}function eu(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.every(e=>null==e)?void 0:e=>{for(let n of t)null!=n&&("function"==typeof n?n(e):n.current=e)}}function el(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];if(0===t.length)return{};if(1===t.length)return t[0];let r={},o={};for(let e of t)for(let t in e)t.startsWith("on")&&"function"==typeof e[t]?(null!=o[t]||(o[t]=[]),o[t].push(e[t])):r[t]=e[t];if(r.disabled||r["aria-disabled"])for(let e in o)/^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(e)&&(o[e]=[e=>{var t;return null==(t=null==e?void 0:e.preventDefault)?void 0:t.call(e)}]);for(let e in o)Object.assign(r,{[e](t){for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];for(let n of o[e]){if((t instanceof Event||(null==t?void 0:t.nativeEvent)instanceof Event)&&t.defaultPrevented)return;n(t,...r)}}});return r}function es(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];if(0===t.length)return{};if(1===t.length)return t[0];let r={},o={};for(let e of t)for(let t in e)t.startsWith("on")&&"function"==typeof e[t]?(null!=o[t]||(o[t]=[]),o[t].push(e[t])):r[t]=e[t];for(let e in o)Object.assign(r,{[e](){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];for(let t of o[e])null==t||t(...n)}});return r}function ea(e){var t;return Object.assign((0,f.forwardRef)(e),{displayName:null!=(t=e.displayName)?t:e.name})}function ec(e){let t=Object.assign({},e);for(let e in t)void 0===t[e]&&delete t[e];return t}function ed(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=Object.assign({},e);for(let e of t)e in n&&delete n[e];return n}let ef=null!=(d=f.startTransition)?d:function(e){e()};var ep=((u=ep||{}).Space=" ",u.Enter="Enter",u.Escape="Escape",u.Backspace="Backspace",u.Delete="Delete",u.ArrowLeft="ArrowLeft",u.ArrowUp="ArrowUp",u.ArrowRight="ArrowRight",u.ArrowDown="ArrowDown",u.Home="Home",u.End="End",u.PageUp="PageUp",u.PageDown="PageDown",u.Tab="Tab",u),ev=((l=ev||{})[l.Open=0]="Open",l[l.Closed=1]="Closed",l),eg=((s=eg||{})[s.ToggleDisclosure=0]="ToggleDisclosure",s[s.CloseDisclosure=1]="CloseDisclosure",s[s.SetButtonId=2]="SetButtonId",s[s.SetPanelId=3]="SetPanelId",s[s.LinkPanel=4]="LinkPanel",s[s.UnlinkPanel=5]="UnlinkPanel",s);let em={0:e=>({...e,disclosureState:Q(e.disclosureState,{0:1,1:0})}),1:e=>1===e.disclosureState?e:{...e,disclosureState:1},4:e=>!0===e.linkedPanel?e:{...e,linkedPanel:!0},5:e=>!1===e.linkedPanel?e:{...e,linkedPanel:!1},2:(e,t)=>e.buttonId===t.buttonId?e:{...e,buttonId:t.buttonId},3:(e,t)=>e.panelId===t.panelId?e:{...e,panelId:t.panelId}},eh=(0,f.createContext)(null);function ey(e){let t=(0,f.useContext)(eh);if(null===t){let t=Error("<".concat(e," /> is missing a parent <Disclosure /> component."));throw Error.captureStackTrace&&Error.captureStackTrace(t,ey),t}return t}eh.displayName="DisclosureContext";let eb=(0,f.createContext)(null);eb.displayName="DisclosureAPIContext";let eE=(0,f.createContext)(null);function ew(e,t){return Q(t.type,em,e,t)}eE.displayName="DisclosurePanelContext";let eT=f.Fragment,eP=et.RenderStrategy|et.Static,eL=Object.assign(ea(function(e,t){let{defaultOpen:n=!1,...r}=e,o=(0,f.useRef)(null),i=X(t,function(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1];return Object.assign(e,{[Y]:t})}(e=>{o.current=e},void 0===e.as||e.as===f.Fragment)),u=(0,f.useRef)(null),l=(0,f.useRef)(null),s=(0,f.useReducer)(ew,{disclosureState:n?0:1,linkedPanel:!1,buttonRef:l,panelRef:u,buttonId:null,panelId:null}),[{disclosureState:a,buttonId:c},d]=s,p=q(e=>{d({type:1});let t=K(o);if(!t||!c)return;let n=e?e instanceof HTMLElement?e:e.current instanceof HTMLElement?e.current:t.getElementById(c):t.getElementById(c);null==n||n.focus()}),v=(0,f.useMemo)(()=>({close:p}),[p]),g=(0,f.useMemo)(()=>({open:0===a,close:p}),[a,p]);return f.createElement(eh.Provider,{value:s},f.createElement(eb.Provider,{value:v},f.createElement(J,{value:p},f.createElement(G,{value:Q(a,{0:$.Open,1:$.Closed})},er({ourProps:{ref:i},theirProps:r,slot:g,defaultTag:eT,name:"Disclosure"})))))}),{Button:ea(function(e,t){let n=(0,f.useId)(),{id:r="headlessui-disclosure-button-".concat(n),disabled:o=!1,autoFocus:i=!1,...u}=e,[l,s]=ey("Disclosure.Button"),d=(0,f.useContext)(eE),p=null!==d&&d===l.panelId,g=(0,f.useRef)(null),m=X(g,t,p?null:l.buttonRef),h=ei();(0,f.useEffect)(()=>{if(!p)return s({type:2,buttonId:r}),()=>{s({type:2,buttonId:null})}},[r,s,p]);let b=q(e=>{var t;if(p){if(1===l.disclosureState)return;switch(e.key){case ep.Space:case ep.Enter:e.preventDefault(),e.stopPropagation(),s({type:0}),null==(t=l.buttonRef.current)||t.focus()}}else switch(e.key){case ep.Space:case ep.Enter:e.preventDefault(),e.stopPropagation(),s({type:0})}}),E=q(e=>{e.key===ep.Space&&e.preventDefault()}),w=q(e=>{var t;(function(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=(null==t?void 0:t.getAttribute("disabled"))==="";return!(r&&function(e){if(!e)return!1;let t=e.previousElementSibling;for(;null!==t;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}(n))&&r})(e.currentTarget)||o||(p?(s({type:0}),null==(t=l.buttonRef.current)||t.focus()):s({type:0}))}),{isFocusVisible:T,focusProps:P}=function(e={}){var t,n,r;let{autoFocus:o=!1,isTextInput:i,within:u}=e,l=(0,f.useRef)({isFocused:!1,isFocusVisible:o||C()}),[s,d]=(0,f.useState)(!1),[p,g]=(0,f.useState)(()=>l.current.isFocused&&l.current.isFocusVisible),m=(0,f.useCallback)(()=>g(l.current.isFocused&&l.current.isFocusVisible),[]),h=(0,f.useCallback)(e=>{l.current.isFocused=e,d(e),m()},[m]);t=e=>{l.current.isFocusVisible=e,m()},n=[],r={isTextInput:i},k(),(0,f.useEffect)(()=>{let e=(e,n)=>{(function(e,t,n){var r;let o="undefined"!=typeof window?c(null==n?void 0:n.target).HTMLInputElement:HTMLInputElement,i="undefined"!=typeof window?c(null==n?void 0:n.target).HTMLTextAreaElement:HTMLTextAreaElement,u="undefined"!=typeof window?c(null==n?void 0:n.target).HTMLElement:HTMLElement,l="undefined"!=typeof window?c(null==n?void 0:n.target).KeyboardEvent:KeyboardEvent;return!((e=e||(null==n?void 0:n.target)instanceof o&&!F.has(null==n?void 0:null===(r=n.target)||void 0===r?void 0:r.type)||(null==n?void 0:n.target)instanceof i||(null==n?void 0:n.target)instanceof u&&(null==n?void 0:n.target.isContentEditable))&&"keyboard"===t&&n instanceof l&&!y[n.key])})(!!(null==r?void 0:r.isTextInput),e,n)&&t(C())};return v.add(e),()=>{v.delete(e)}},n);let{focusProps:b}=function(e){let{isDisabled:t,onFocus:n,onBlur:r,onFocusChange:o}=e,i=(0,f.useCallback)(e=>{if(e.target===e.currentTarget)return r&&r(e),o&&o(!1),!0},[r,o]),u=M(i),l=(0,f.useCallback)(e=>{let t=a(e.target);e.target===e.currentTarget&&t.activeElement===e.target&&(n&&n(e),o&&o(!0),u(e))},[o,n,u]);return{focusProps:{onFocus:!t&&(n||o||r)?l:void 0,onBlur:!t&&(r||o)?i:void 0}}}({isDisabled:u,onFocusChange:h}),{focusWithinProps:E}=function(e){let{isDisabled:t,onBlurWithin:n,onFocusWithin:r,onFocusWithinChange:o}=e,i=(0,f.useRef)({isFocusWithin:!1}),u=(0,f.useCallback)(e=>{i.current.isFocusWithin&&!e.currentTarget.contains(e.relatedTarget)&&(i.current.isFocusWithin=!1,n&&n(e),o&&o(!1))},[n,o,i]),l=M(u),s=(0,f.useCallback)(e=>{i.current.isFocusWithin||document.activeElement!==e.target||(r&&r(e),o&&o(!0),i.current.isFocusWithin=!0,l(e))},[r,o,l]);return t?{focusWithinProps:{onFocus:void 0,onBlur:void 0}}:{focusWithinProps:{onFocus:s,onBlur:u}}}({isDisabled:!u,onFocusWithinChange:h});return{isFocused:s,isFocusVisible:p,focusProps:u?E:b}}({autoFocus:i}),{isHovered:L,hoverProps:S}=function(e){let{onHoverStart:t,onHoverChange:n,onHoverEnd:r,isDisabled:o}=e,[i,u]=(0,f.useState)(!1),l=(0,f.useRef)({isHovered:!1,ignoreEmulatedMouseEvents:!1,pointerType:"",target:null}).current;(0,f.useEffect)(j,[]);let{hoverProps:s,triggerHoverEnd:a}=(0,f.useMemo)(()=>{let e=(e,r)=>{if(l.pointerType=r,o||"touch"===r||l.isHovered||!e.currentTarget.contains(e.target))return;l.isHovered=!0;let i=e.currentTarget;l.target=i,t&&t({type:"hoverstart",target:i,pointerType:r}),n&&n(!0),u(!0)},i=(e,t)=>{if(l.pointerType="",l.target=null,"touch"===t||!l.isHovered)return;l.isHovered=!1;let o=e.currentTarget;r&&r({type:"hoverend",target:o,pointerType:t}),n&&n(!1),u(!1)},s={};return"undefined"!=typeof PointerEvent?(s.onPointerEnter=t=>{I&&"mouse"===t.pointerType||e(t,t.pointerType)},s.onPointerLeave=e=>{!o&&e.currentTarget.contains(e.target)&&i(e,e.pointerType)}):(s.onTouchStart=()=>{l.ignoreEmulatedMouseEvents=!0},s.onMouseEnter=t=>{l.ignoreEmulatedMouseEvents||I||e(t,"mouse"),l.ignoreEmulatedMouseEvents=!1},s.onMouseLeave=e=>{!o&&e.currentTarget.contains(e.target)&&i(e,"mouse")}),{hoverProps:s,triggerHoverEnd:i}},[t,n,r,o,l]);return(0,f.useEffect)(()=>{o&&a({currentTarget:l.target},l.pointerType)},[o]),{hoverProps:s,isHovered:i}}({isDisabled:o}),{pressed:D,pressProps:A}=function(){let{disabled:e=!1}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=(0,f.useRef)(null),[n,r]=(0,f.useState)(!1),o=function(){let[e]=(0,f.useState)(function e(){let t=[],n={addEventListener:(e,t,r,o)=>(e.addEventListener(t,r,o),n.add(()=>e.removeEventListener(t,r,o))),requestAnimationFrame(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];let o=requestAnimationFrame(...t);return n.add(()=>cancelAnimationFrame(o))},nextFrame(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return n.requestAnimationFrame(()=>n.requestAnimationFrame(...t))},setTimeout(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];let o=setTimeout(...t);return n.add(()=>clearTimeout(o))},microTask(){for(var e,t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];let i={current:!0};return e=()=>{i.current&&r[0]()},"function"==typeof queueMicrotask?queueMicrotask(e):Promise.resolve().then(e).catch(e=>setTimeout(()=>{throw e})),n.add(()=>{i.current=!1})},style(e,t,n){let r=e.style.getPropertyValue(t);return Object.assign(e.style,{[t]:n}),this.add(()=>{Object.assign(e.style,{[t]:r})})},group(t){let n=e();return t(n),this.add(()=>n.dispose())},add:e=>(t.includes(e)||t.push(e),()=>{let n=t.indexOf(e);if(n>=0)for(let e of t.splice(n,1))e()}),dispose(){for(let e of t.splice(0))e()}};return n});return(0,f.useEffect)(()=>()=>e.dispose(),[e]),e}(),i=q(()=>{t.current=null,r(!1),o.dispose()}),u=q(e=>{if(o.dispose(),null===t.current){t.current=e.currentTarget,r(!0);{let n=K(e.currentTarget);o.addEventListener(n,"pointerup",i,!1),o.addEventListener(n,"pointermove",e=>{if(t.current){var n,o;let i,u;r((i=e.width/2,u=e.height/2,n={top:e.clientY-u,right:e.clientX+i,bottom:e.clientY+u,left:e.clientX-i},o=t.current.getBoundingClientRect(),!(!n||!o||n.right<o.left||n.left>o.right||n.bottom<o.top||n.top>o.bottom)))}},!1),o.addEventListener(n,"pointercancel",i,!1)}}});return{pressed:n,pressProps:e?{}:{onPointerDown:u,onPointerUp:i,onClick:i}}}({disabled:o}),H=(0,f.useMemo)(()=>({open:0===l.disclosureState,hover:L,active:D,disabled:o,focus:T,autofocus:i}),[l,L,D,T,o,i]),O=function(e,t){let[n,r]=(0,f.useState)(()=>_(e));return V(()=>{r(_(e))},[e.type,e.as]),V(()=>{n||t.current&&t.current instanceof HTMLButtonElement&&!t.current.hasAttribute("type")&&r("button")},[n,t]),n}(e,g);return er({mergeRefs:h,ourProps:p?es({ref:m,type:O,disabled:o||void 0,autoFocus:i,onKeyDown:b,onClick:w},P,S,A):es({ref:m,id:r,type:O,"aria-expanded":0===l.disclosureState,"aria-controls":l.linkedPanel?l.panelId:void 0,disabled:o||void 0,autoFocus:i,onKeyDown:b,onKeyUp:E,onClick:w},P,S,A),theirProps:u,slot:H,defaultTag:"button",name:"Disclosure.Button"})}),Panel:ea(function(e,t){let n=(0,f.useId)(),{id:r="headlessui-disclosure-panel-".concat(n),...o}=e,[i,u]=ey("Disclosure.Panel"),{close:l}=function e(t){let n=(0,f.useContext)(eb);if(null===n){let n=Error("<".concat(t," /> is missing a parent <Disclosure /> component."));throw Error.captureStackTrace&&Error.captureStackTrace(n,e),n}return n}("Disclosure.Panel"),s=ei(),a=X(t,i.panelRef,e=>{ef(()=>u({type:e?4:5}))});(0,f.useEffect)(()=>(u({type:3,panelId:r}),()=>{u({type:3,panelId:null})}),[r,u]);let c=(0,f.useContext)(Z),d=null!==c?(c&$.Open)===$.Open:0===i.disclosureState,p=(0,f.useMemo)(()=>({open:0===i.disclosureState,close:l}),[i,l]);return f.createElement(eE.Provider,{value:i.panelId},er({mergeRefs:s,ourProps:{ref:a,id:r},theirProps:o,slot:p,defaultTag:"div",features:eP,visible:d,name:"Disclosure.Panel"}))})})}}]);