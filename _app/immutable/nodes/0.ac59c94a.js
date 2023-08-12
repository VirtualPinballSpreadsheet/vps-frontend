import{n as te,i as bo,g as Rr,c as ae,d as Ln,s as Be,e as ie,u as re,f as se,h as oe,j as Cr,k as Ue,l as ht,r as Nn,m as ai,p as Or,q as Dr,v as Mn,w as vo,o as yo}from"../chunks/scheduler.53b6a842.js";import{x as wo,y as Io,z as Eo,A as To,S as Ve,i as He,g as D,s as H,h as P,j as U,c as j,f as k,k as w,a as F,B as L,d as O,p as Z,t as N,b as $,C as ee,m as lt,n as ut,D as ci,E as li,o as Yt,F as ui,e as di,H as Pr,G as Lr,I as ko,J as So,r as ye,u as we,v as Ie,w as Ee,K as _e,L as je}from"../chunks/index.87a2390f.js";import{w as Un}from"../chunks/index.8246a737.js";import{g as Ao,e as fi,u as Ro,f as Co,F as Oo,a as Do}from"../chunks/index.1d26e80a.js";import{_ as hi}from"../chunks/preload-helper.a4192956.js";import{D as Po}from"../chunks/DbStore.4e20062f.js";function Lo(t,e,n,i){if(!e)return te;const r=t.getBoundingClientRect();if(e.left===r.left&&e.right===r.right&&e.top===r.top&&e.bottom===r.bottom)return te;const{delay:s=0,duration:o=300,easing:a=bo,start:c=wo()+s,end:l=c+o,tick:d=te,css:u}=n(t,{from:e,to:r},i);let f=!0,h=!1,g;function _(){u&&(g=Eo(t,0,1,o,s,a,u)),s||(h=!0)}function p(){u&&To(t,g),f=!1}return Io(m=>{if(!h&&m>=c&&(h=!0),h&&m>=l&&(d(1,0),p()),!f)return!1;if(h){const b=m-c,T=0+1*a(b/o);d(T,1-T)}return!0}),_(),d(0,1),p}function No(t){const e=getComputedStyle(t);if(e.position!=="absolute"&&e.position!=="fixed"){const{width:n,height:i}=e,r=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=i,Nr(t,r)}}function Nr(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const i=getComputedStyle(t),r=i.transform==="none"?"":i.transform;t.style.transform=`${r} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}const Mo=!1,Gh=Object.freeze(Object.defineProperty({__proto__:null,ssr:Mo},Symbol.toStringTag,{value:"Module"}));const ot=Math.min,Ge=Math.max,xt=Math.round,Dt=Math.floor,xe=t=>({x:t,y:t}),Uo={left:"right",right:"left",bottom:"top",top:"bottom"},xo={start:"end",end:"start"};function wn(t,e,n){return Ge(t,ot(e,n))}function yt(t,e){return typeof t=="function"?t(e):t}function Je(t){return t.split("-")[0]}function wt(t){return t.split("-")[1]}function Mr(t){return t==="x"?"y":"x"}function xn(t){return t==="y"?"height":"width"}function Xt(t){return["top","bottom"].includes(Je(t))?"y":"x"}function Fn(t){return Mr(Xt(t))}function Fo(t,e,n){n===void 0&&(n=!1);const i=wt(t),r=Fn(t),s=xn(r);let o=r==="x"?i===(n?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(o=Ft(o)),[o,Ft(o)]}function Bo(t){const e=Ft(t);return[In(t),e,In(e)]}function In(t){return t.replace(/start|end/g,e=>xo[e])}function Vo(t,e,n){const i=["left","right"],r=["right","left"],s=["top","bottom"],o=["bottom","top"];switch(t){case"top":case"bottom":return n?e?r:i:e?i:r;case"left":case"right":return e?s:o;default:return[]}}function Ho(t,e,n,i){const r=wt(t);let s=Vo(Je(t),n==="start",i);return r&&(s=s.map(o=>o+"-"+r),e&&(s=s.concat(s.map(In)))),s}function Ft(t){return t.replace(/left|right|bottom|top/g,e=>Uo[e])}function jo(t){return{top:0,right:0,bottom:0,left:0,...t}}function Ur(t){return typeof t!="number"?jo(t):{top:t,right:t,bottom:t,left:t}}function Bt(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function pi(t,e,n){let{reference:i,floating:r}=t;const s=Xt(e),o=Fn(e),a=xn(o),c=Je(e),l=s==="y",d=i.x+i.width/2-r.width/2,u=i.y+i.height/2-r.height/2,f=i[a]/2-r[a]/2;let h;switch(c){case"top":h={x:d,y:i.y-r.height};break;case"bottom":h={x:d,y:i.y+i.height};break;case"right":h={x:i.x+i.width,y:u};break;case"left":h={x:i.x-r.width,y:u};break;default:h={x:i.x,y:i.y}}switch(wt(e)){case"start":h[o]-=f*(n&&l?-1:1);break;case"end":h[o]+=f*(n&&l?-1:1);break}return h}const Wo=async(t,e,n)=>{const{placement:i="bottom",strategy:r="absolute",middleware:s=[],platform:o}=n,a=s.filter(Boolean),c=await(o.isRTL==null?void 0:o.isRTL(e));let l=await o.getElementRects({reference:t,floating:e,strategy:r}),{x:d,y:u}=pi(l,i,c),f=i,h={},g=0;for(let _=0;_<a.length;_++){const{name:p,fn:m}=a[_],{x:b,y:T,data:A,reset:y}=await m({x:d,y:u,initialPlacement:i,placement:f,strategy:r,middlewareData:h,rects:l,platform:o,elements:{reference:t,floating:e}});if(d=b??d,u=T??u,h={...h,[p]:{...h[p],...A}},y&&g<=50){g++,typeof y=="object"&&(y.placement&&(f=y.placement),y.rects&&(l=y.rects===!0?await o.getElementRects({reference:t,floating:e,strategy:r}):y.rects),{x:d,y:u}=pi(l,f,c)),_=-1;continue}}return{x:d,y:u,placement:f,strategy:r,middlewareData:h}};async function xr(t,e){var n;e===void 0&&(e={});const{x:i,y:r,platform:s,rects:o,elements:a,strategy:c}=t,{boundary:l="clippingAncestors",rootBoundary:d="viewport",elementContext:u="floating",altBoundary:f=!1,padding:h=0}=yt(e,t),g=Ur(h),p=a[f?u==="floating"?"reference":"floating":u],m=Bt(await s.getClippingRect({element:(n=await(s.isElement==null?void 0:s.isElement(p)))==null||n?p:p.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:l,rootBoundary:d,strategy:c})),b=u==="floating"?{...o.floating,x:i,y:r}:o.reference,T=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),A=await(s.isElement==null?void 0:s.isElement(T))?await(s.getScale==null?void 0:s.getScale(T))||{x:1,y:1}:{x:1,y:1},y=Bt(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({rect:b,offsetParent:T,strategy:c}):b);return{top:(m.top-y.top+g.top)/A.y,bottom:(y.bottom-m.bottom+g.bottom)/A.y,left:(m.left-y.left+g.left)/A.x,right:(y.right-m.right+g.right)/A.x}}const zo=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:i,placement:r,rects:s,platform:o,elements:a}=e,{element:c,padding:l=0}=yt(t,e)||{};if(c==null)return{};const d=Ur(l),u={x:n,y:i},f=Fn(r),h=xn(f),g=await o.getDimensions(c),_=f==="y",p=_?"top":"left",m=_?"bottom":"right",b=_?"clientHeight":"clientWidth",T=s.reference[h]+s.reference[f]-u[f]-s.floating[h],A=u[f]-s.reference[f],y=await(o.getOffsetParent==null?void 0:o.getOffsetParent(c));let I=y?y[b]:0;(!I||!await(o.isElement==null?void 0:o.isElement(y)))&&(I=a.floating[b]||s.floating[h]);const E=T/2-A/2,v=I/2-g[h]/2-1,R=ot(d[p],v),S=ot(d[m],v),x=R,V=I-g[h]-S,W=I/2-g[h]/2+E,q=wn(x,W,V),K=wt(r)!=null&&W!=q&&s.reference[h]/2-(W<x?R:S)-g[h]/2<0?W<x?x-W:V-W:0;return{[f]:u[f]-K,data:{[f]:q,centerOffset:W-q+K}}}}),qo=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n;const{placement:i,middlewareData:r,rects:s,initialPlacement:o,platform:a,elements:c}=e,{mainAxis:l=!0,crossAxis:d=!0,fallbackPlacements:u,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:h="none",flipAlignment:g=!0,..._}=yt(t,e),p=Je(i),m=Je(o)===o,b=await(a.isRTL==null?void 0:a.isRTL(c.floating)),T=u||(m||!g?[Ft(o)]:Bo(o));!u&&h!=="none"&&T.push(...Ho(o,g,h,b));const A=[o,...T],y=await xr(e,_),I=[];let E=((n=r.flip)==null?void 0:n.overflows)||[];if(l&&I.push(y[p]),d){const x=Fo(i,s,b);I.push(y[x[0]],y[x[1]])}if(E=[...E,{placement:i,overflows:I}],!I.every(x=>x<=0)){var v,R;const x=(((v=r.flip)==null?void 0:v.index)||0)+1,V=A[x];if(V)return{data:{index:x,overflows:E},reset:{placement:V}};let W=(R=E.filter(q=>q.overflows[0]<=0).sort((q,Q)=>q.overflows[1]-Q.overflows[1])[0])==null?void 0:R.placement;if(!W)switch(f){case"bestFit":{var S;const q=(S=E.map(Q=>[Q.placement,Q.overflows.filter(K=>K>0).reduce((K,tt)=>K+tt,0)]).sort((Q,K)=>Q[1]-K[1])[0])==null?void 0:S[0];q&&(W=q);break}case"initialPlacement":W=o;break}if(i!==W)return{reset:{placement:W}}}return{}}}};async function Go(t,e){const{placement:n,platform:i,elements:r}=t,s=await(i.isRTL==null?void 0:i.isRTL(r.floating)),o=Je(n),a=wt(n),c=Xt(n)==="y",l=["left","top"].includes(o)?-1:1,d=s&&c?-1:1,u=yt(e,t);let{mainAxis:f,crossAxis:h,alignmentAxis:g}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...u};return a&&typeof g=="number"&&(h=a==="end"?g*-1:g),c?{x:h*d,y:f*l}:{x:f*l,y:h*d}}const Ko=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){const{x:n,y:i}=e,r=await Go(e,t);return{x:n+r.x,y:i+r.y,data:r}}}},Jo=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:i,placement:r}=e,{mainAxis:s=!0,crossAxis:o=!1,limiter:a={fn:p=>{let{x:m,y:b}=p;return{x:m,y:b}}},...c}=yt(t,e),l={x:n,y:i},d=await xr(e,c),u=Xt(Je(r)),f=Mr(u);let h=l[f],g=l[u];if(s){const p=f==="y"?"top":"left",m=f==="y"?"bottom":"right",b=h+d[p],T=h-d[m];h=wn(b,h,T)}if(o){const p=u==="y"?"top":"left",m=u==="y"?"bottom":"right",b=g+d[p],T=g-d[m];g=wn(b,g,T)}const _=a.fn({...e,[f]:h,[u]:g});return{..._,data:{x:_.x-n,y:_.y-i}}}}};function Fe(t){return Fr(t)?(t.nodeName||"").toLowerCase():"#document"}function Y(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Ae(t){var e;return(e=(Fr(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Fr(t){return t instanceof Node||t instanceof Y(t).Node}function Te(t){return t instanceof Element||t instanceof Y(t).Element}function he(t){return t instanceof HTMLElement||t instanceof Y(t).HTMLElement}function mi(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof Y(t).ShadowRoot}function It(t){const{overflow:e,overflowX:n,overflowY:i,display:r}=ne(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+n)&&!["inline","contents"].includes(r)}function Yo(t){return["table","td","th"].includes(Fe(t))}function Bn(t){const e=Vn(),n=ne(t);return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(i=>(n.willChange||"").includes(i))||["paint","layout","strict","content"].some(i=>(n.contain||"").includes(i))}function Xo(t){let e=at(t);for(;he(e)&&!Qt(e);){if(Bn(e))return e;e=at(e)}return null}function Vn(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Qt(t){return["html","body","#document"].includes(Fe(t))}function ne(t){return Y(t).getComputedStyle(t)}function Zt(t){return Te(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function at(t){if(Fe(t)==="html")return t;const e=t.assignedSlot||t.parentNode||mi(t)&&t.host||Ae(t);return mi(e)?e.host:e}function Br(t){const e=at(t);return Qt(e)?t.ownerDocument?t.ownerDocument.body:t.body:he(e)&&It(e)?e:Br(e)}function Vt(t,e){var n;e===void 0&&(e=[]);const i=Br(t),r=i===((n=t.ownerDocument)==null?void 0:n.body),s=Y(i);return r?e.concat(s,s.visualViewport||[],It(i)?i:[]):e.concat(i,Vt(i))}function Vr(t){const e=ne(t);let n=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const r=he(t),s=r?t.offsetWidth:n,o=r?t.offsetHeight:i,a=xt(n)!==s||xt(i)!==o;return a&&(n=s,i=o),{width:n,height:i,$:a}}function Hn(t){return Te(t)?t:t.contextElement}function it(t){const e=Hn(t);if(!he(e))return xe(1);const n=e.getBoundingClientRect(),{width:i,height:r,$:s}=Vr(e);let o=(s?xt(n.width):n.width)/i,a=(s?xt(n.height):n.height)/r;return(!o||!Number.isFinite(o))&&(o=1),(!a||!Number.isFinite(a))&&(a=1),{x:o,y:a}}const Qo=xe(0);function Hr(t){const e=Y(t);return!Vn()||!e.visualViewport?Qo:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Zo(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==Y(t)?!1:e}function Ye(t,e,n,i){e===void 0&&(e=!1),n===void 0&&(n=!1);const r=t.getBoundingClientRect(),s=Hn(t);let o=xe(1);e&&(i?Te(i)&&(o=it(i)):o=it(t));const a=Zo(s,n,i)?Hr(s):xe(0);let c=(r.left+a.x)/o.x,l=(r.top+a.y)/o.y,d=r.width/o.x,u=r.height/o.y;if(s){const f=Y(s),h=i&&Te(i)?Y(i):i;let g=f.frameElement;for(;g&&i&&h!==f;){const _=it(g),p=g.getBoundingClientRect(),m=ne(g),b=p.left+(g.clientLeft+parseFloat(m.paddingLeft))*_.x,T=p.top+(g.clientTop+parseFloat(m.paddingTop))*_.y;c*=_.x,l*=_.y,d*=_.x,u*=_.y,c+=b,l+=T,g=Y(g).frameElement}}return Bt({width:d,height:u,x:c,y:l})}function $o(t){let{rect:e,offsetParent:n,strategy:i}=t;const r=he(n),s=Ae(n);if(n===s)return e;let o={scrollLeft:0,scrollTop:0},a=xe(1);const c=xe(0);if((r||!r&&i!=="fixed")&&((Fe(n)!=="body"||It(s))&&(o=Zt(n)),he(n))){const l=Ye(n);a=it(n),c.x=l.x+n.clientLeft,c.y=l.y+n.clientTop}return{width:e.width*a.x,height:e.height*a.y,x:e.x*a.x-o.scrollLeft*a.x+c.x,y:e.y*a.y-o.scrollTop*a.y+c.y}}function ea(t){return Array.from(t.getClientRects())}function jr(t){return Ye(Ae(t)).left+Zt(t).scrollLeft}function ta(t){const e=Ae(t),n=Zt(t),i=t.ownerDocument.body,r=Ge(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),s=Ge(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let o=-n.scrollLeft+jr(t);const a=-n.scrollTop;return ne(i).direction==="rtl"&&(o+=Ge(e.clientWidth,i.clientWidth)-r),{width:r,height:s,x:o,y:a}}function na(t,e){const n=Y(t),i=Ae(t),r=n.visualViewport;let s=i.clientWidth,o=i.clientHeight,a=0,c=0;if(r){s=r.width,o=r.height;const l=Vn();(!l||l&&e==="fixed")&&(a=r.offsetLeft,c=r.offsetTop)}return{width:s,height:o,x:a,y:c}}function ia(t,e){const n=Ye(t,!0,e==="fixed"),i=n.top+t.clientTop,r=n.left+t.clientLeft,s=he(t)?it(t):xe(1),o=t.clientWidth*s.x,a=t.clientHeight*s.y,c=r*s.x,l=i*s.y;return{width:o,height:a,x:c,y:l}}function gi(t,e,n){let i;if(e==="viewport")i=na(t,n);else if(e==="document")i=ta(Ae(t));else if(Te(e))i=ia(e,n);else{const r=Hr(t);i={...e,x:e.x-r.x,y:e.y-r.y}}return Bt(i)}function Wr(t,e){const n=at(t);return n===e||!Te(n)||Qt(n)?!1:ne(n).position==="fixed"||Wr(n,e)}function ra(t,e){const n=e.get(t);if(n)return n;let i=Vt(t).filter(a=>Te(a)&&Fe(a)!=="body"),r=null;const s=ne(t).position==="fixed";let o=s?at(t):t;for(;Te(o)&&!Qt(o);){const a=ne(o),c=Bn(o);!c&&a.position==="fixed"&&(r=null),(s?!c&&!r:!c&&a.position==="static"&&!!r&&["absolute","fixed"].includes(r.position)||It(o)&&!c&&Wr(t,o))?i=i.filter(d=>d!==o):r=a,o=at(o)}return e.set(t,i),i}function sa(t){let{element:e,boundary:n,rootBoundary:i,strategy:r}=t;const o=[...n==="clippingAncestors"?ra(e,this._c):[].concat(n),i],a=o[0],c=o.reduce((l,d)=>{const u=gi(e,d,r);return l.top=Ge(u.top,l.top),l.right=ot(u.right,l.right),l.bottom=ot(u.bottom,l.bottom),l.left=Ge(u.left,l.left),l},gi(e,a,r));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function oa(t){return Vr(t)}function aa(t,e,n){const i=he(e),r=Ae(e),s=n==="fixed",o=Ye(t,!0,s,e);let a={scrollLeft:0,scrollTop:0};const c=xe(0);if(i||!i&&!s)if((Fe(e)!=="body"||It(r))&&(a=Zt(e)),i){const l=Ye(e,!0,s,e);c.x=l.x+e.clientLeft,c.y=l.y+e.clientTop}else r&&(c.x=jr(r));return{x:o.left+a.scrollLeft-c.x,y:o.top+a.scrollTop-c.y,width:o.width,height:o.height}}function _i(t,e){return!he(t)||ne(t).position==="fixed"?null:e?e(t):t.offsetParent}function zr(t,e){const n=Y(t);if(!he(t))return n;let i=_i(t,e);for(;i&&Yo(i)&&ne(i).position==="static";)i=_i(i,e);return i&&(Fe(i)==="html"||Fe(i)==="body"&&ne(i).position==="static"&&!Bn(i))?n:i||Xo(t)||n}const ca=async function(t){let{reference:e,floating:n,strategy:i}=t;const r=this.getOffsetParent||zr,s=this.getDimensions;return{reference:aa(e,await r(n),i),floating:{x:0,y:0,...await s(n)}}};function la(t){return ne(t).direction==="rtl"}const ua={convertOffsetParentRelativeRectToViewportRelativeRect:$o,getDocumentElement:Ae,getClippingRect:sa,getOffsetParent:zr,getElementRects:ca,getClientRects:ea,getDimensions:oa,getScale:it,isElement:Te,isRTL:la};function da(t,e){let n=null,i;const r=Ae(t);function s(){clearTimeout(i),n&&n.disconnect(),n=null}function o(a,c){a===void 0&&(a=!1),c===void 0&&(c=1),s();const{left:l,top:d,width:u,height:f}=t.getBoundingClientRect();if(a||e(),!u||!f)return;const h=Dt(d),g=Dt(r.clientWidth-(l+u)),_=Dt(r.clientHeight-(d+f)),p=Dt(l),b={rootMargin:-h+"px "+-g+"px "+-_+"px "+-p+"px",threshold:Ge(0,ot(1,c))||1};let T=!0;function A(y){const I=y[0].intersectionRatio;if(I!==c){if(!T)return o();I?o(!1,I):i=setTimeout(()=>{o(!1,1e-7)},100)}T=!1}try{n=new IntersectionObserver(A,{...b,root:r.ownerDocument})}catch{n=new IntersectionObserver(A,b)}n.observe(t)}return o(!0),s}function fa(t,e,n,i){i===void 0&&(i={});const{ancestorScroll:r=!0,ancestorResize:s=!0,elementResize:o=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:c=!1}=i,l=Hn(t),d=r||s?[...l?Vt(l):[],...Vt(e)]:[];d.forEach(m=>{r&&m.addEventListener("scroll",n,{passive:!0}),s&&m.addEventListener("resize",n)});const u=l&&a?da(l,n):null;let f=-1,h=null;o&&(h=new ResizeObserver(m=>{let[b]=m;b&&b.target===l&&h&&(h.unobserve(e),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{h&&h.observe(e)})),n()}),l&&!c&&h.observe(l),h.observe(e));let g,_=c?Ye(t):null;c&&p();function p(){const m=Ye(t);_&&(m.x!==_.x||m.y!==_.y||m.width!==_.width||m.height!==_.height)&&n(),_=m,g=requestAnimationFrame(p)}return n(),()=>{d.forEach(m=>{r&&m.removeEventListener("scroll",n),s&&m.removeEventListener("resize",n)}),u&&u(),h&&h.disconnect(),h=null,c&&cancelAnimationFrame(g)}}const ha=(t,e,n)=>{const i=new Map,r={platform:ua,...n},s={...r.platform,_c:i};return Wo(t,e,{...r,platform:s})},qr=Un(void 0);function pa(t,e){const{computePosition:n,autoUpdate:i,offset:r,shift:s,flip:o,arrow:a,size:c,autoPlacement:l,hide:d,inline:u}=Rr(qr),f={open:!1,autoUpdateCleanup:()=>{}},h=':is(a[href], button, input, textarea, select, details, [tabindex]):not([tabindex="-1"])';let g;const _="https://www.skeleton.dev/utilities/popups";let p,m;function b(){p=document.querySelector(`[data-popup="${e.target}"]`)??document.createElement("div"),m=p.querySelector(".arrow")??document.createElement("div")}b();function T(){var S,x,V,W,q,Q,K,tt;if(!p)throw new Error(`The data-popup="${e.target}" element was not found. ${_}`);if(!n)throw new Error(`Floating UI 'computePosition' not found for data-popup="${e.target}". ${_}`);if(!r)throw new Error(`Floating UI 'offset' not found for data-popup="${e.target}". ${_}`);if(!s)throw new Error(`Floating UI 'shift' not found for data-popup="${e.target}". ${_}`);if(!o)throw new Error(`Floating UI 'flip' not found for data-popup="${e.target}". ${_}`);if(!a)throw new Error(`Floating UI 'arrow' not found for data-popup="${e.target}". ${_}`);const R=[];c&&R.push(c((S=e.middleware)==null?void 0:S.size)),l&&R.push(l((x=e.middleware)==null?void 0:x.autoPlacement)),d&&R.push(d((V=e.middleware)==null?void 0:V.hide)),u&&R.push(u((W=e.middleware)==null?void 0:W.inline)),n(t,p,{placement:e.placement??"bottom",middleware:[r(((q=e.middleware)==null?void 0:q.offset)??8),s(((Q=e.middleware)==null?void 0:Q.shift)??{padding:8}),o((K=e.middleware)==null?void 0:K.flip),a(((tt=e.middleware)==null?void 0:tt.arrow)??{element:m||null}),...R]}).then(({x:C,y:J,placement:nt,middlewareData:Ot})=>{if(Object.assign(p.style,{left:`${C}px`,top:`${J}px`}),m){const{x:ft,y:oi}=Ot.arrow,_o={top:"bottom",right:"left",bottom:"top",left:"right"}[nt.split("-")[0]];Object.assign(m.style,{left:ft!=null?`${ft}px`:"",top:oi!=null?`${oi}px`:"",right:"",bottom:"",[_o]:"-4px"})}})}function A(){p&&(f.open=!0,e.state&&e.state({state:f.open}),T(),p.style.display="block",p.style.opacity="1",p.style.pointerEvents="auto",p.removeAttribute("inert"),f.autoUpdateCleanup=i(t,p,T),g=Array.from(p==null?void 0:p.querySelectorAll(h)))}function y(R){if(!p)return;const S=parseFloat(window.getComputedStyle(p).transitionDuration.replace("s",""))*1e3;setTimeout(()=>{f.open=!1,e.state&&e.state({state:f.open}),p.style.opacity="0",p.setAttribute("inert",""),f.autoUpdateCleanup&&f.autoUpdateCleanup(),R&&R()},S)}function I(){f.open===!1?A():y()}function E(R){if(f.open===!1||t.contains(R.target))return;if(p&&p.contains(R.target)===!1){y();return}const S=e.closeQuery===void 0?"a[href], button":e.closeQuery,x=p==null?void 0:p.querySelectorAll(S);x==null||x.forEach(V=>{V.contains(R.target)&&y()})}const v=R=>{if(f.open===!1)return;const S=R.key;if(S==="Escape"){R.preventDefault(),t.focus(),y();return}g=Array.from(p==null?void 0:p.querySelectorAll(h)),f.open&&document.activeElement===t&&(S==="ArrowDown"||S==="Tab")&&h.length>0&&g.length>0&&(R.preventDefault(),g[0].focus())};switch(e.event){case"click":t.addEventListener("click",I,!0),window.addEventListener("click",E,!0);break;case"hover":t.addEventListener("mouseover",A,!0),t.addEventListener("mouseleave",()=>y(),!0);break;case"focus-blur":t.addEventListener("focus",I,!0),t.addEventListener("blur",()=>y(),!0);break;case"focus-click":t.addEventListener("focus",A,!0),window.addEventListener("click",E,!0);break;default:throw new Error(`Event value of '${e.event}' is not supported. ${_}`)}return window.addEventListener("keydown",v,!0),T(),{update(R){y(()=>{e=R,T(),b()})},destroy(){t.removeEventListener("click",I,!0),t.removeEventListener("mouseover",A,!0),t.removeEventListener("mouseleave",()=>y(),!0),t.removeEventListener("focus",I,!0),t.removeEventListener("focus",A,!0),t.removeEventListener("blur",()=>y(),!0),window.removeEventListener("click",E,!0),window.removeEventListener("keydown",v,!0)}}}const ma={message:"Missing Toast Message",autohide:!0,timeout:5e3};function ga(){const t=Math.random();return Number(t).toString(32)}function bi(t){if(t.autohide===!0)return setTimeout(()=>{ce.close(t.id)},t.timeout)}function _a(){const{subscribe:t,set:e,update:n}=Un([]);return{subscribe:t,trigger:i=>{const r=ga();return n(s=>{i&&i.callback&&i.callback({id:r,status:"queued"}),i.hideDismiss&&(i.autohide=!0);const o={...ma,...i,id:r};return o.timeoutId=bi(o),s.push(o),s}),r},close:i=>n(r=>{if(r.length>0){const s=r.findIndex(a=>a.id===i),o=r[s];o&&(o.callback&&o.callback({id:i,status:"closed"}),o.timeoutId&&clearTimeout(o.timeoutId),r.splice(s,1))}return r}),freeze:i=>n(r=>(r.length>0&&clearTimeout(r[i].timeoutId),r)),unfreeze:i=>n(r=>(r.length>0&&(r[i].timeoutId=bi(r[i])),r)),clear:()=>e([])}}const ce=_a(),an={};function vi(t){return t==="local"?localStorage:sessionStorage}function $t(t,e,n){const i=(n==null?void 0:n.serializer)??JSON,r=(n==null?void 0:n.storage)??"local";function s(o,a){vi(r).setItem(o,i.stringify(a))}if(!an[t]){const o=Un(e,l=>{const d=vi(r).getItem(t);d&&l(i.parse(d));{const u=f=>{f.key===t&&l(f.newValue?i.parse(f.newValue):null)};return window.addEventListener("storage",u),()=>window.removeEventListener("storage",u)}}),{subscribe:a,set:c}=o;an[t]={set(l){s(t,l),c(l)},update(l){const d=l(Rr(o));s(t,d),c(d)},subscribe:a}}return an[t]}$t("modeOsPrefers",!1);$t("modeUserPrefers",void 0);$t("modeCurrent",!1);function ba(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function Gr(t){const e=t-1;return e*e*e+1}function va({fallback:t,...e}){const n=new Map,i=new Map;function r(o,a,c){const{delay:l=0,duration:d=I=>Math.sqrt(I)*30,easing:u=Gr}=ae(ae({},e),c),f=o.getBoundingClientRect(),h=a.getBoundingClientRect(),g=f.left-h.left,_=f.top-h.top,p=f.width/h.width,m=f.height/h.height,b=Math.sqrt(g*g+_*_),T=getComputedStyle(a),A=T.transform==="none"?"":T.transform,y=+T.opacity;return{delay:l,duration:Ln(d)?d(b):d,easing:u,css:(I,E)=>`
				opacity: ${I*y};
				transform-origin: top left;
				transform: ${A} translate(${E*g}px,${E*_}px) scale(${I+(1-I)*p}, ${I+(1-I)*m});
			`}}function s(o,a,c){return(l,d)=>(o.set(d.key,l),()=>{if(a.has(d.key)){const u=a.get(d.key);return a.delete(d.key),r(u,l,d)}return o.delete(d.key),t&&t(l,d,c)})}return[s(i,n,!1),s(n,i,!0)]}const ya=t=>({}),yi=t=>({}),wa=t=>({}),wi=t=>({}),Ia=t=>({}),Ii=t=>({});function Ei(t){let e,n,i;const r=t[22].lead,s=ie(r,t,t[21],Ii);return{c(){e=D("div"),s&&s.c(),this.h()},l(o){e=P(o,"DIV",{class:!0});var a=U(e);s&&s.l(a),a.forEach(k),this.h()},h(){w(e,"class",n="app-bar-slot-lead "+t[4])},m(o,a){F(o,e,a),s&&s.m(e,null),i=!0},p(o,a){s&&s.p&&(!i||a&2097152)&&re(s,r,o,o[21],i?oe(r,o[21],a,Ia):se(o[21]),Ii),(!i||a&16&&n!==(n="app-bar-slot-lead "+o[4]))&&w(e,"class",n)},i(o){i||(O(s,o),i=!0)},o(o){N(s,o),i=!1},d(o){o&&k(e),s&&s.d(o)}}}function Ti(t){let e,n,i;const r=t[22].trail,s=ie(r,t,t[21],wi);return{c(){e=D("div"),s&&s.c(),this.h()},l(o){e=P(o,"DIV",{class:!0});var a=U(e);s&&s.l(a),a.forEach(k),this.h()},h(){w(e,"class",n="app-bar-slot-trail "+t[2])},m(o,a){F(o,e,a),s&&s.m(e,null),i=!0},p(o,a){s&&s.p&&(!i||a&2097152)&&re(s,r,o,o[21],i?oe(r,o[21],a,wa):se(o[21]),wi),(!i||a&4&&n!==(n="app-bar-slot-trail "+o[2]))&&w(e,"class",n)},i(o){i||(O(s,o),i=!0)},o(o){N(s,o),i=!1},d(o){o&&k(e),s&&s.d(o)}}}function ki(t){let e,n,i;const r=t[22].headline,s=ie(r,t,t[21],yi);return{c(){e=D("div"),s&&s.c(),this.h()},l(o){e=P(o,"DIV",{class:!0});var a=U(e);s&&s.l(a),a.forEach(k),this.h()},h(){w(e,"class",n="app-bar-row-headline "+t[5])},m(o,a){F(o,e,a),s&&s.m(e,null),i=!0},p(o,a){s&&s.p&&(!i||a&2097152)&&re(s,r,o,o[21],i?oe(r,o[21],a,ya):se(o[21]),yi),(!i||a&32&&n!==(n="app-bar-row-headline "+o[5]))&&w(e,"class",n)},i(o){i||(O(s,o),i=!0)},o(o){N(s,o),i=!1},d(o){o&&k(e),s&&s.d(o)}}}function Ea(t){let e,n,i,r,s,o,a,c,l,d,u=t[8].lead&&Ei(t);const f=t[22].default,h=ie(f,t,t[21],null);let g=t[8].trail&&Ti(t),_=t[8].headline&&ki(t);return{c(){e=D("div"),n=D("div"),u&&u.c(),i=H(),r=D("div"),h&&h.c(),o=H(),g&&g.c(),c=H(),_&&_.c(),this.h()},l(p){e=P(p,"DIV",{class:!0,"data-testid":!0,role:!0,"aria-label":!0,"aria-labelledby":!0});var m=U(e);n=P(m,"DIV",{class:!0});var b=U(n);u&&u.l(b),i=j(b),r=P(b,"DIV",{class:!0});var T=U(r);h&&h.l(T),T.forEach(k),o=j(b),g&&g.l(b),b.forEach(k),c=j(m),_&&_.l(m),m.forEach(k),this.h()},h(){w(r,"class",s="app-bar-slot-default "+t[3]),w(n,"class",a="app-bar-row-main "+t[6]),w(e,"class",l="app-bar "+t[7]),w(e,"data-testid","app-bar"),w(e,"role","toolbar"),w(e,"aria-label",t[0]),w(e,"aria-labelledby",t[1])},m(p,m){F(p,e,m),L(e,n),u&&u.m(n,null),L(n,i),L(n,r),h&&h.m(r,null),L(n,o),g&&g.m(n,null),L(e,c),_&&_.m(e,null),d=!0},p(p,[m]){p[8].lead?u?(u.p(p,m),m&256&&O(u,1)):(u=Ei(p),u.c(),O(u,1),u.m(n,i)):u&&(Z(),N(u,1,1,()=>{u=null}),$()),h&&h.p&&(!d||m&2097152)&&re(h,f,p,p[21],d?oe(f,p[21],m,null):se(p[21]),null),(!d||m&8&&s!==(s="app-bar-slot-default "+p[3]))&&w(r,"class",s),p[8].trail?g?(g.p(p,m),m&256&&O(g,1)):(g=Ti(p),g.c(),O(g,1),g.m(n,null)):g&&(Z(),N(g,1,1,()=>{g=null}),$()),(!d||m&64&&a!==(a="app-bar-row-main "+p[6]))&&w(n,"class",a),p[8].headline?_?(_.p(p,m),m&256&&O(_,1)):(_=ki(p),_.c(),O(_,1),_.m(e,null)):_&&(Z(),N(_,1,1,()=>{_=null}),$()),(!d||m&128&&l!==(l="app-bar "+p[7]))&&w(e,"class",l),(!d||m&1)&&w(e,"aria-label",p[0]),(!d||m&2)&&w(e,"aria-labelledby",p[1])},i(p){d||(O(u),O(h,p),O(g),O(_),d=!0)},o(p){N(u),N(h,p),N(g),N(_),d=!1},d(p){p&&k(e),u&&u.d(),h&&h.d(p),g&&g.d(),_&&_.d()}}}const Ta="flex flex-col",ka="grid items-center",Sa="",Aa="flex-none flex justify-between items-center",Ra="flex-auto",Ca="flex-none flex items-center space-x-4";function Oa(t,e,n){let i,r,s,o,a,c,{$$slots:l={},$$scope:d}=e;const u=Cr(l);let{background:f="bg-surface-100-800-token"}=e,{border:h=""}=e,{padding:g="p-4"}=e,{shadow:_=""}=e,{spacing:p="space-y-4"}=e,{gridColumns:m="grid-cols-[auto_1fr_auto]"}=e,{gap:b="gap-4"}=e,{regionRowMain:T=""}=e,{regionRowHeadline:A=""}=e,{slotLead:y=""}=e,{slotDefault:I=""}=e,{slotTrail:E=""}=e,{label:v=""}=e,{labelledby:R=""}=e;return t.$$set=S=>{n(23,e=ae(ae({},e),Ue(S))),"background"in S&&n(9,f=S.background),"border"in S&&n(10,h=S.border),"padding"in S&&n(11,g=S.padding),"shadow"in S&&n(12,_=S.shadow),"spacing"in S&&n(13,p=S.spacing),"gridColumns"in S&&n(14,m=S.gridColumns),"gap"in S&&n(15,b=S.gap),"regionRowMain"in S&&n(16,T=S.regionRowMain),"regionRowHeadline"in S&&n(17,A=S.regionRowHeadline),"slotLead"in S&&n(18,y=S.slotLead),"slotDefault"in S&&n(19,I=S.slotDefault),"slotTrail"in S&&n(20,E=S.slotTrail),"label"in S&&n(0,v=S.label),"labelledby"in S&&n(1,R=S.labelledby),"$$scope"in S&&n(21,d=S.$$scope)},t.$$.update=()=>{n(7,i=`${Ta} ${f} ${h} ${p} ${g} ${_} ${e.class??""}`),t.$$.dirty&114688&&n(6,r=`${ka} ${m} ${b} ${T}`),t.$$.dirty&131072&&n(5,s=`${Sa} ${A}`),t.$$.dirty&262144&&n(4,o=`${Aa} ${y}`),t.$$.dirty&524288&&n(3,a=`${Ra} ${I}`),t.$$.dirty&1048576&&n(2,c=`${Ca} ${E}`)},e=Ue(e),[v,R,c,a,o,s,r,i,u,f,h,g,_,p,m,b,T,A,y,I,E,d,l]}class Da extends Ve{constructor(e){super(),He(this,e,Oa,Ea,Be,{background:9,border:10,padding:11,shadow:12,spacing:13,gridColumns:14,gap:15,regionRowMain:16,regionRowHeadline:17,slotLead:18,slotDefault:19,slotTrail:20,label:0,labelledby:1})}}const Pa=t=>({}),Si=t=>({}),La=t=>({}),Ai=t=>({}),Na=t=>({}),Ri=t=>({}),Ma=t=>({}),Ci=t=>({}),Ua=t=>({}),Oi=t=>({}),xa=t=>({}),Di=t=>({});function Pi(t){let e,n,i;const r=t[18].header,s=ie(r,t,t[17],Di);return{c(){e=D("header"),s&&s.c(),this.h()},l(o){e=P(o,"HEADER",{id:!0,class:!0});var a=U(e);s&&s.l(a),a.forEach(k),this.h()},h(){w(e,"id","shell-header"),w(e,"class",n="flex-none "+t[7])},m(o,a){F(o,e,a),s&&s.m(e,null),i=!0},p(o,a){s&&s.p&&(!i||a&131072)&&re(s,r,o,o[17],i?oe(r,o[17],a,xa):se(o[17]),Di),(!i||a&128&&n!==(n="flex-none "+o[7]))&&w(e,"class",n)},i(o){i||(O(s,o),i=!0)},o(o){N(s,o),i=!1},d(o){o&&k(e),s&&s.d(o)}}}function Li(t){let e,n;const i=t[18].sidebarLeft,r=ie(i,t,t[17],Oi);return{c(){e=D("aside"),r&&r.c(),this.h()},l(s){e=P(s,"ASIDE",{id:!0,class:!0});var o=U(e);r&&r.l(o),o.forEach(k),this.h()},h(){w(e,"id","sidebar-left"),w(e,"class",t[6])},m(s,o){F(s,e,o),r&&r.m(e,null),n=!0},p(s,o){r&&r.p&&(!n||o&131072)&&re(r,i,s,s[17],n?oe(i,s[17],o,Ua):se(s[17]),Oi),(!n||o&64)&&w(e,"class",s[6])},i(s){n||(O(r,s),n=!0)},o(s){N(r,s),n=!1},d(s){s&&k(e),r&&r.d(s)}}}function Ni(t){let e,n,i;const r=t[18].pageHeader,s=ie(r,t,t[17],Ci),o=s||Fa();return{c(){e=D("header"),o&&o.c(),this.h()},l(a){e=P(a,"HEADER",{id:!0,class:!0});var c=U(e);o&&o.l(c),c.forEach(k),this.h()},h(){w(e,"id","page-header"),w(e,"class",n="flex-none "+t[4])},m(a,c){F(a,e,c),o&&o.m(e,null),i=!0},p(a,c){s&&s.p&&(!i||c&131072)&&re(s,r,a,a[17],i?oe(r,a[17],c,Ma):se(a[17]),Ci),(!i||c&16&&n!==(n="flex-none "+a[4]))&&w(e,"class",n)},i(a){i||(O(o,a),i=!0)},o(a){N(o,a),i=!1},d(a){a&&k(e),o&&o.d(a)}}}function Fa(t){let e;return{c(){e=lt("(slot:header)")},l(n){e=ut(n,"(slot:header)")},m(n,i){F(n,e,i)},d(n){n&&k(e)}}}function Mi(t){let e,n,i;const r=t[18].pageFooter,s=ie(r,t,t[17],Ri),o=s||Ba();return{c(){e=D("footer"),o&&o.c(),this.h()},l(a){e=P(a,"FOOTER",{id:!0,class:!0});var c=U(e);o&&o.l(c),c.forEach(k),this.h()},h(){w(e,"id","page-footer"),w(e,"class",n="flex-none "+t[2])},m(a,c){F(a,e,c),o&&o.m(e,null),i=!0},p(a,c){s&&s.p&&(!i||c&131072)&&re(s,r,a,a[17],i?oe(r,a[17],c,Na):se(a[17]),Ri),(!i||c&4&&n!==(n="flex-none "+a[2]))&&w(e,"class",n)},i(a){i||(O(o,a),i=!0)},o(a){N(o,a),i=!1},d(a){a&&k(e),o&&o.d(a)}}}function Ba(t){let e;return{c(){e=lt("(slot:footer)")},l(n){e=ut(n,"(slot:footer)")},m(n,i){F(n,e,i)},d(n){n&&k(e)}}}function Ui(t){let e,n;const i=t[18].sidebarRight,r=ie(i,t,t[17],Ai);return{c(){e=D("aside"),r&&r.c(),this.h()},l(s){e=P(s,"ASIDE",{id:!0,class:!0});var o=U(e);r&&r.l(o),o.forEach(k),this.h()},h(){w(e,"id","sidebar-right"),w(e,"class",t[5])},m(s,o){F(s,e,o),r&&r.m(e,null),n=!0},p(s,o){r&&r.p&&(!n||o&131072)&&re(r,i,s,s[17],n?oe(i,s[17],o,La):se(s[17]),Ai),(!n||o&32)&&w(e,"class",s[5])},i(s){n||(O(r,s),n=!0)},o(s){N(r,s),n=!1},d(s){s&&k(e),r&&r.d(s)}}}function xi(t){let e,n,i;const r=t[18].footer,s=ie(r,t,t[17],Si);return{c(){e=D("footer"),s&&s.c(),this.h()},l(o){e=P(o,"FOOTER",{id:!0,class:!0});var a=U(e);s&&s.l(a),a.forEach(k),this.h()},h(){w(e,"id","shell-footer"),w(e,"class",n="flex-none "+t[1])},m(o,a){F(o,e,a),s&&s.m(e,null),i=!0},p(o,a){s&&s.p&&(!i||a&131072)&&re(s,r,o,o[17],i?oe(r,o[17],a,Pa):se(o[17]),Si),(!i||a&2&&n!==(n="flex-none "+o[1]))&&w(e,"class",n)},i(o){i||(O(s,o),i=!0)},o(o){N(s,o),i=!1},d(o){o&&k(e),s&&s.d(o)}}}function Va(t){let e,n,i,r,s,o,a,c,l,d,u,f,h,g,_,p=t[9].header&&Pi(t),m=t[9].sidebarLeft&&Li(t),b=t[9].pageHeader&&Ni(t);const T=t[18].default,A=ie(T,t,t[17],null);let y=t[9].pageFooter&&Mi(t),I=t[9].sidebarRight&&Ui(t),E=t[9].footer&&xi(t);return{c(){e=D("div"),p&&p.c(),n=H(),i=D("div"),m&&m.c(),r=H(),s=D("div"),b&&b.c(),o=H(),a=D("main"),A&&A.c(),l=H(),y&&y.c(),u=H(),I&&I.c(),f=H(),E&&E.c(),this.h()},l(v){e=P(v,"DIV",{id:!0,class:!0,"data-testid":!0});var R=U(e);p&&p.l(R),n=j(R),i=P(R,"DIV",{class:!0});var S=U(i);m&&m.l(S),r=j(S),s=P(S,"DIV",{id:!0,class:!0});var x=U(s);b&&b.l(x),o=j(x),a=P(x,"MAIN",{id:!0,class:!0});var V=U(a);A&&A.l(V),V.forEach(k),l=j(x),y&&y.l(x),x.forEach(k),u=j(S),I&&I.l(S),S.forEach(k),f=j(R),E&&E.l(R),R.forEach(k),this.h()},h(){w(a,"id","page-content"),w(a,"class",c="flex-auto "+t[3]),w(s,"id","page"),w(s,"class",d=t[0]+" "+Fi),w(i,"class","flex-auto "+ja),w(e,"id","appShell"),w(e,"class",t[8]),w(e,"data-testid","app-shell")},m(v,R){F(v,e,R),p&&p.m(e,null),L(e,n),L(e,i),m&&m.m(i,null),L(i,r),L(i,s),b&&b.m(s,null),L(s,o),L(s,a),A&&A.m(a,null),L(s,l),y&&y.m(s,null),L(i,u),I&&I.m(i,null),L(e,f),E&&E.m(e,null),h=!0,g||(_=ee(s,"scroll",t[19]),g=!0)},p(v,[R]){v[9].header?p?(p.p(v,R),R&512&&O(p,1)):(p=Pi(v),p.c(),O(p,1),p.m(e,n)):p&&(Z(),N(p,1,1,()=>{p=null}),$()),v[9].sidebarLeft?m?(m.p(v,R),R&512&&O(m,1)):(m=Li(v),m.c(),O(m,1),m.m(i,r)):m&&(Z(),N(m,1,1,()=>{m=null}),$()),v[9].pageHeader?b?(b.p(v,R),R&512&&O(b,1)):(b=Ni(v),b.c(),O(b,1),b.m(s,o)):b&&(Z(),N(b,1,1,()=>{b=null}),$()),A&&A.p&&(!h||R&131072)&&re(A,T,v,v[17],h?oe(T,v[17],R,null):se(v[17]),null),(!h||R&8&&c!==(c="flex-auto "+v[3]))&&w(a,"class",c),v[9].pageFooter?y?(y.p(v,R),R&512&&O(y,1)):(y=Mi(v),y.c(),O(y,1),y.m(s,null)):y&&(Z(),N(y,1,1,()=>{y=null}),$()),(!h||R&1&&d!==(d=v[0]+" "+Fi))&&w(s,"class",d),v[9].sidebarRight?I?(I.p(v,R),R&512&&O(I,1)):(I=Ui(v),I.c(),O(I,1),I.m(i,null)):I&&(Z(),N(I,1,1,()=>{I=null}),$()),v[9].footer?E?(E.p(v,R),R&512&&O(E,1)):(E=xi(v),E.c(),O(E,1),E.m(e,null)):E&&(Z(),N(E,1,1,()=>{E=null}),$()),(!h||R&256)&&w(e,"class",v[8])},i(v){h||(O(p),O(m),O(b),O(A,v),O(y),O(I),O(E),h=!0)},o(v){N(p),N(m),N(b),N(A,v),N(y),N(I),N(E),h=!1},d(v){v&&k(e),p&&p.d(),m&&m.d(),b&&b.d(),A&&A.d(v),y&&y.d(),I&&I.d(),E&&E.d(),g=!1,_()}}}const Ha="w-full h-full flex flex-col overflow-hidden",ja="w-full h-full flex overflow-hidden",Fi="flex-1 overflow-x-hidden flex flex-col",Wa="flex-none overflow-x-hidden overflow-y-auto",za="flex-none overflow-x-hidden overflow-y-auto";function qa(t,e,n){let i,r,s,o,a,c,l,d,{$$slots:u={},$$scope:f}=e;const h=Cr(u);let{regionPage:g=""}=e,{slotHeader:_="z-10"}=e,{slotSidebarLeft:p="w-auto"}=e,{slotSidebarRight:m="w-auto"}=e,{slotPageHeader:b=""}=e,{slotPageContent:T=""}=e,{slotPageFooter:A=""}=e,{slotFooter:y=""}=e;function I(E){ht.call(this,t,E)}return t.$$set=E=>{n(20,e=ae(ae({},e),Ue(E))),"regionPage"in E&&n(0,g=E.regionPage),"slotHeader"in E&&n(10,_=E.slotHeader),"slotSidebarLeft"in E&&n(11,p=E.slotSidebarLeft),"slotSidebarRight"in E&&n(12,m=E.slotSidebarRight),"slotPageHeader"in E&&n(13,b=E.slotPageHeader),"slotPageContent"in E&&n(14,T=E.slotPageContent),"slotPageFooter"in E&&n(15,A=E.slotPageFooter),"slotFooter"in E&&n(16,y=E.slotFooter),"$$scope"in E&&n(17,f=E.$$scope)},t.$$.update=()=>{n(8,i=`${Ha} ${e.class??""}`),t.$$.dirty&1024&&n(7,r=`${_}`),t.$$.dirty&2048&&n(6,s=`${Wa} ${p}`),t.$$.dirty&4096&&n(5,o=`${za} ${m}`),t.$$.dirty&8192&&n(4,a=`${b}`),t.$$.dirty&16384&&n(3,c=`${T}`),t.$$.dirty&32768&&n(2,l=`${A}`),t.$$.dirty&65536&&n(1,d=`${y}`)},e=Ue(e),[g,d,l,c,a,o,s,r,i,h,_,p,m,b,T,A,y,f,u,I]}class Ga extends Ve{constructor(e){super(),He(this,e,qa,Va,Be,{regionPage:0,slotHeader:10,slotSidebarLeft:11,slotSidebarRight:12,slotPageHeader:13,slotPageContent:14,slotPageFooter:15,slotFooter:16})}}function Ka(t){let e,n,i=String(t[1]).substring(0,2).toUpperCase()+"",r,s;return{c(){e=ci("svg"),n=ci("text"),r=lt(i),this.h()},l(o){e=li(o,"svg",{class:!0,viewBox:!0});var a=U(e);n=li(a,"text",{x:!0,y:!0,"dominant-baseline":!0,"text-anchor":!0,"font-weight":!0,"font-size":!0,class:!0});var c=U(n);r=ut(c,i),c.forEach(k),a.forEach(k),this.h()},h(){w(n,"x","50%"),w(n,"y","50%"),w(n,"dominant-baseline","central"),w(n,"text-anchor","middle"),w(n,"font-weight","bold"),w(n,"font-size",150),w(n,"class",s="avatar-text "+t[2]),w(e,"class","avatar-initials w-full h-full"),w(e,"viewBox","0 0 512 512")},m(o,a){F(o,e,a),L(e,n),L(n,r)},p(o,a){a&2&&i!==(i=String(o[1]).substring(0,2).toUpperCase()+"")&&Yt(r,i),a&4&&s!==(s="avatar-text "+o[2])&&w(n,"class",s)},d(o){o&&k(e)}}}function Ja(t){let e,n,i,r,s,o,a,c,l=[{class:n="avatar-image "+Qa},{style:i=t[8].style??""},{src:r=t[0]},{alt:s=t[8].alt||""},t[7]()],d={};for(let u=0;u<l.length;u+=1)d=ae(d,l[u]);return{c(){e=D("img"),this.h()},l(u){e=P(u,"IMG",{class:!0,style:!0,src:!0,alt:!0}),this.h()},h(){ui(e,d)},m(u,f){F(u,e,f),a||(c=[Or(o=t[4].call(null,e,t[5])),ee(e,"error",t[19])],a=!0)},p(u,f){ui(e,d=Ao(l,[{class:n},f&256&&i!==(i=u[8].style??"")&&{style:i},f&1&&!Dr(e.src,r=u[0])&&{src:r},f&256&&s!==(s=u[8].alt||"")&&{alt:s},u[7]()])),o&&Ln(o.update)&&f&32&&o.update.call(null,u[5])},d(u){u&&k(e),a=!1,Nn(c)}}}function Ya(t){let e,n,i,r;function s(c,l){return c[0]?Ja:Ka}let o=s(t),a=o(t);return{c(){e=D("figure"),a.c(),this.h()},l(c){e=P(c,"FIGURE",{class:!0,"data-testid":!0});var l=U(e);a.l(l),l.forEach(k),this.h()},h(){w(e,"class",n="avatar "+t[6]),w(e,"data-testid","avatar")},m(c,l){F(c,e,l),a.m(e,null),i||(r=[ee(e,"click",t[15]),ee(e,"keydown",t[16]),ee(e,"keyup",t[17]),ee(e,"keypress",t[18])],i=!0)},p(c,[l]){o===(o=s(c))&&a?a.p(c,l):(a.d(1),a=o(c),a&&(a.c(),a.m(e,null))),l&64&&n!==(n="avatar "+c[6])&&w(e,"class",n)},i:te,o:te,d(c){c&&k(e),a.d(),i=!1,Nn(r)}}}let Xa="flex aspect-square text-surface-50 font-semibold justify-center items-center overflow-hidden isolate",Qa="w-full h-full object-cover";function Za(t,e,n){let i;const r=["initials","fill","src","fallback","action","actionParams","background","width","border","rounded","shadow","cursor"];let s=ai(e,r),{initials:o="AB"}=e,{fill:a="fill-token"}=e,{src:c=""}=e,{fallback:l=""}=e,{action:d=()=>{}}=e,{actionParams:u=""}=e,{background:f="bg-surface-400-500-token"}=e,{width:h="w-16"}=e,{border:g=""}=e,{rounded:_="rounded-full"}=e,{shadow:p=""}=e,{cursor:m=""}=e;function b(){return delete s.class,s}function T(v){ht.call(this,t,v)}function A(v){ht.call(this,t,v)}function y(v){ht.call(this,t,v)}function I(v){ht.call(this,t,v)}const E=()=>n(0,c=l);return t.$$set=v=>{n(8,e=ae(ae({},e),Ue(v))),n(20,s=ai(e,r)),"initials"in v&&n(1,o=v.initials),"fill"in v&&n(2,a=v.fill),"src"in v&&n(0,c=v.src),"fallback"in v&&n(3,l=v.fallback),"action"in v&&n(4,d=v.action),"actionParams"in v&&n(5,u=v.actionParams),"background"in v&&n(9,f=v.background),"width"in v&&n(10,h=v.width),"border"in v&&n(11,g=v.border),"rounded"in v&&n(12,_=v.rounded),"shadow"in v&&n(13,p=v.shadow),"cursor"in v&&n(14,m=v.cursor)},t.$$.update=()=>{n(6,i=`${Xa} ${f} ${h} ${g} ${_} ${p} ${m} ${e.class??""}`)},e=Ue(e),[c,o,a,l,d,u,i,b,e,f,h,g,_,p,m,T,A,y,I,E]}class Kr extends Ve{constructor(e){super(),He(this,e,Za,Ya,Be,{initials:1,fill:2,src:0,fallback:3,action:4,actionParams:5,background:9,width:10,border:11,rounded:12,shadow:13,cursor:14})}}function $a(t,{from:e,to:n},i={}){const r=getComputedStyle(t),s=r.transform==="none"?"":r.transform,[o,a]=r.transformOrigin.split(" ").map(parseFloat),c=e.left+e.width*o/n.width-(n.left+o),l=e.top+e.height*a/n.height-(n.top+a),{delay:d=0,duration:u=h=>Math.sqrt(h)*120,easing:f=Gr}=i;return{delay:d,duration:Ln(u)?u(Math.sqrt(c*c+l*l)):u,easing:f,css:(h,g)=>{const _=g*c,p=g*l,m=h+g*e.width/n.width,b=h+g*e.height/n.height;return`transform: ${s} translate(${_}px, ${p}px) scale(${m}, ${b});`}}}function Bi(t,e,n){const i=t.slice();return i[32]=e[n],i[34]=n,i}function Vi(t){let e,n,i=[],r=new Map,s,o,a,c=fi(t[6]);const l=d=>d[32];for(let d=0;d<c.length;d+=1){let u=Bi(t,c,d),f=l(u);r.set(f,i[d]=zi(f,u))}return{c(){e=D("div"),n=D("div");for(let d=0;d<i.length;d+=1)i[d].c();this.h()},l(d){e=P(d,"DIV",{class:!0,"data-testid":!0});var u=U(e);n=P(u,"DIV",{class:!0});var f=U(n);for(let h=0;h<i.length;h+=1)i[h].l(f);f.forEach(k),u.forEach(k),this.h()},h(){w(n,"class",s="snackbar "+t[8]),w(e,"class",o="snackbar-wrapper "+t[9]),w(e,"data-testid","snackbar-wrapper")},m(d,u){F(d,e,u),L(e,n);for(let f=0;f<i.length;f+=1)i[f]&&i[f].m(n,null);a=!0},p(d,u){if(u[0]&7390){c=fi(d[6]),Z();for(let f=0;f<i.length;f+=1)i[f].r();i=Ro(i,u,l,1,d,c,r,n,Co,zi,null,Bi);for(let f=0;f<i.length;f+=1)i[f].a();$()}(!a||u[0]&256&&s!==(s="snackbar "+d[8]))&&w(n,"class",s),(!a||u[0]&512&&o!==(o="snackbar-wrapper "+d[9]))&&w(e,"class",o)},i(d){if(!a){for(let u=0;u<c.length;u+=1)O(i[u]);a=!0}},o(d){for(let u=0;u<i.length;u+=1)N(i[u]);a=!1},d(d){d&&k(e);for(let u=0;u<i.length;u+=1)i[u].d()}}}function Hi(t){let e,n,i=t[32].action&&ji(t),r=!t[32].hideDismiss&&Wi(t);return{c(){e=D("div"),i&&i.c(),n=H(),r&&r.c(),this.h()},l(s){e=P(s,"DIV",{class:!0});var o=U(e);i&&i.l(o),n=j(o),r&&r.l(o),o.forEach(k),this.h()},h(){w(e,"class","toast-actions "+rc)},m(s,o){F(s,e,o),i&&i.m(e,null),L(e,n),r&&r.m(e,null)},p(s,o){s[32].action?i?i.p(s,o):(i=ji(s),i.c(),i.m(e,n)):i&&(i.d(1),i=null),s[32].hideDismiss?r&&(r.d(1),r=null):r?r.p(s,o):(r=Wi(s),r.c(),r.m(e,null))},d(s){s&&k(e),i&&i.d(),r&&r.d()}}}function ji(t){let e,n,i=t[32].action.label+"",r,s;function o(){return t[26](t[34])}return{c(){e=D("button"),n=new Pr(!1),this.h()},l(a){e=P(a,"BUTTON",{class:!0});var c=U(e);n=Lr(c,!1),c.forEach(k),this.h()},h(){n.a=null,w(e,"class",t[2])},m(a,c){F(a,e,c),n.m(i,e),r||(s=ee(e,"click",o),r=!0)},p(a,c){t=a,c[0]&64&&i!==(i=t[32].action.label+"")&&n.p(i),c[0]&4&&w(e,"class",t[2])},d(a){a&&k(e),r=!1,s()}}}function Wi(t){let e,n,i,r;function s(){return t[27](t[32])}return{c(){e=D("button"),n=lt(t[4]),this.h()},l(o){e=P(o,"BUTTON",{class:!0,"aria-label":!0});var a=U(e);n=ut(a,t[4]),a.forEach(k),this.h()},h(){w(e,"class",t[3]),w(e,"aria-label","Dismiss toast")},m(o,a){F(o,e,a),L(e,n),i||(r=ee(e,"click",s),i=!0)},p(o,a){t=o,a[0]&16&&Yt(n,t[4]),a[0]&8&&w(e,"class",t[3])},d(o){o&&k(e),i=!1,r()}}}function zi(t,e){let n,i,r,s,o=e[32].message+"",a,c,l,d,u,f,h,g=te,_,p,m,b=(e[32].action||!e[32].hideDismiss)&&Hi(e);function T(){return e[28](e[34])}function A(){return e[29](e[34])}return{key:t,first:null,c(){n=D("div"),i=D("div"),r=D("div"),s=new Pr(!1),a=H(),b&&b.c(),l=H(),this.h()},l(y){n=P(y,"DIV",{role:!0,"aria-live":!0});var I=U(n);i=P(I,"DIV",{class:!0,"data-testid":!0});var E=U(i);r=P(E,"DIV",{class:!0});var v=U(r);s=Lr(v,!1),v.forEach(k),a=j(E),b&&b.l(E),E.forEach(k),l=j(I),I.forEach(k),this.h()},h(){s.a=null,w(r,"class","text-base"),w(i,"class",c="toast "+e[7]+" "+(e[32].background??e[1])+" "+(e[32].classes??"")),w(i,"data-testid","toast"),w(n,"role",d=e[32].hideDismiss?"alert":"alertdialog"),w(n,"aria-live","polite"),this.first=n},m(y,I){F(y,n,I),L(n,i),L(i,r),s.m(o,r),L(i,a),b&&b.m(i,null),L(n,l),_=!0,p||(m=[ee(n,"mouseenter",T),ee(n,"mouseleave",A)],p=!0)},p(y,I){e=y,(!_||I[0]&64)&&o!==(o=e[32].message+"")&&s.p(o),e[32].action||!e[32].hideDismiss?b?b.p(e,I):(b=Hi(e),b.c(),b.m(i,null)):b&&(b.d(1),b=null),(!_||I[0]&194&&c!==(c="toast "+e[7]+" "+(e[32].background??e[1])+" "+(e[32].classes??"")))&&w(i,"class",c),(!_||I[0]&64&&d!==(d=e[32].hideDismiss?"alert":"alertdialog"))&&w(n,"role",d)},r(){h=n.getBoundingClientRect()},f(){No(n),g(),Nr(n,h)},a(){g(),g=Lo(n,h,$a,{duration:e[0]})},i(y){_||(vo(()=>{_&&(f&&f.end(1),u=ko(n,e[14],{key:e[32].id}),u.start())}),_=!0)},o(y){u&&u.invalidate(),f=So(n,e[13],{key:e[32].id}),_=!1},d(y){y&&k(n),b&&b.d(),y&&f&&f.end(),p=!1,Nn(m)}}}function ec(t){let e,n,i=t[5].length&&Vi(t);return{c(){i&&i.c(),e=di()},l(r){i&&i.l(r),e=di()},m(r,s){i&&i.m(r,s),F(r,e,s),n=!0},p(r,s){r[5].length?i?(i.p(r,s),s[0]&32&&O(i,1)):(i=Vi(r),i.c(),O(i,1),i.m(e.parentNode,e)):i&&(Z(),N(i,1,1,()=>{i=null}),$())},i(r){n||(O(i),n=!0)},o(r){N(i),n=!1},d(r){r&&k(e),i&&i.d(r)}}}const tc="flex fixed top-0 left-0 right-0 bottom-0 pointer-events-none",nc="flex flex-col gap-y-2",ic="flex justify-between items-center pointer-events-auto",rc="flex items-center space-x-2";function sc(t,e,n){let i,r,s,o,a;Mn(t,ce,C=>n(5,a=C));let{position:c="b"}=e,{max:l=3}=e,{duration:d=250}=e,{background:u="variant-filled-secondary"}=e,{width:f="max-w-[640px]"}=e,{color:h=""}=e,{padding:g="p-4"}=e,{spacing:_="space-x-4"}=e,{rounded:p="rounded-container-token"}=e,{shadow:m="shadow-lg"}=e,{zIndex:b="z-[888]"}=e,{buttonAction:T="btn variant-filled"}=e,{buttonDismiss:A="btn-icon btn-icon-sm variant-filled"}=e,{buttonDismissLabel:y="✕"}=e,I,E,v={x:0,y:0};switch(c){case"t":I="justify-center items-start",E="items-center",v={x:0,y:-100};break;case"b":I="justify-center items-end",E="items-center",v={x:0,y:100};break;case"l":I="justify-start items-center",E="items-start",v={x:-100,y:0};break;case"r":I="justify-end items-center",E="items-end",v={x:100,y:0};break;case"tl":I="justify-start items-start",E="items-start",v={x:-100,y:0};break;case"tr":I="justify-end items-start",E="items-end",v={x:100,y:0};break;case"bl":I="justify-start items-end",E="items-start",v={x:-100,y:0};break;case"br":I="justify-end items-end",E="items-end",v={x:100,y:0};break}function R(C){var J,nt;(nt=(J=a[C])==null?void 0:J.action)==null||nt.response(),ce.close(a[C].id)}function S(C){var J;(J=a[C])!=null&&J.hoverable&&(ce.freeze(C),n(8,r+=" scale-[105%]"))}function x(C){var J;(J=a[C])!=null&&J.hoverable&&(ce.unfreeze(C),n(8,r=r.replace(" scale-[105%]","")))}const[V,W]=va({duration:C=>Math.sqrt(C*d),fallback(C){const J=getComputedStyle(C),nt=J.transform==="none"?"":J.transform;return{duration:d,easing:ba,css:(Ot,ft)=>`
					transform: ${nt} scale(${Ot}) translate(${ft*v.x}%, ${ft*v.y}%);
					opacity: ${Ot}
				`}}}),q=C=>R(C),Q=C=>ce.close(C.id),K=C=>S(C),tt=C=>x(C);return t.$$set=C=>{n(31,e=ae(ae({},e),Ue(C))),"position"in C&&n(15,c=C.position),"max"in C&&n(16,l=C.max),"duration"in C&&n(0,d=C.duration),"background"in C&&n(1,u=C.background),"width"in C&&n(17,f=C.width),"color"in C&&n(18,h=C.color),"padding"in C&&n(19,g=C.padding),"spacing"in C&&n(20,_=C.spacing),"rounded"in C&&n(21,p=C.rounded),"shadow"in C&&n(22,m=C.shadow),"zIndex"in C&&n(23,b=C.zIndex),"buttonAction"in C&&n(2,T=C.buttonAction),"buttonDismiss"in C&&n(3,A=C.buttonDismiss),"buttonDismissLabel"in C&&n(4,y=C.buttonDismissLabel)},t.$$.update=()=>{n(9,i=`${tc} ${I} ${b} ${e.class||""}`),t.$$.dirty[0]&34078720&&n(8,r=`${nc} ${E} ${g}`),t.$$.dirty[0]&8257536&&n(7,s=`${ic} ${f} ${h} ${g} ${_} ${p} ${m}`),t.$$.dirty[0]&65568&&n(6,o=Array.from(a).slice(0,l))},e=Ue(e),[d,u,T,A,y,a,o,s,r,i,R,S,x,V,W,c,l,f,h,g,_,p,m,b,I,E,q,Q,K,tt]}class oc extends Ve{constructor(e){super(),He(this,e,sc,ec,Be,{position:15,max:16,duration:0,background:1,width:17,color:18,padding:19,spacing:20,rounded:21,shadow:22,zIndex:23,buttonAction:2,buttonDismiss:3,buttonDismissLabel:4},null,[-1,-1])}}const ac=""+new URL("../assets/vpsLogo.a05dfbbc.png",import.meta.url).href;/**
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
 */const Jr=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},cc=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const r=t[n++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){const s=t[n++];e[i++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){const s=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[i++]=String.fromCharCode((r&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Yr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<t.length;r+=3){const s=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,d=s>>2,u=(s&3)<<4|a>>4;let f=(a&15)<<2|l>>6,h=l&63;c||(h=64,o||(f=64)),i.push(n[d],n[u],n[f],n[h])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Jr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):cc(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<t.length;){const s=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const u=r<t.length?n[t.charAt(r)]:64;if(++r,s==null||a==null||l==null||u==null)throw new lc;const f=s<<2|a>>4;if(i.push(f),l!==64){const h=a<<4&240|l>>2;if(i.push(h),u!==64){const g=l<<6&192|u;i.push(g)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class lc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const uc=function(t){const e=Jr(t);return Yr.encodeByteArray(e,!0)},Xr=function(t){return uc(t).replace(/\./g,"")},Qr=function(t){try{return Yr.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function dc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const fc=()=>dc().__FIREBASE_DEFAULTS__,hc=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},pc=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Qr(t[1]);return e&&JSON.parse(e)},jn=()=>{try{return fc()||hc()||pc()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},mc=t=>{var e,n;return(n=(e=jn())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Zr=()=>{var t;return(t=jn())===null||t===void 0?void 0:t.config},$r=t=>{var e;return(e=jn())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class gc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function z(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function _c(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(z())}function es(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function bc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vc(){const t=z();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function ts(){try{return typeof indexedDB=="object"}catch{return!1}}function ns(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var s;e(((s=r.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}function yc(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const wc="FirebaseError";class ge extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=wc,Object.setPrototypeOf(this,ge.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,et.prototype.create)}}class et{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},r=`${this.service}/${e}`,s=this.errors[e],o=s?Ic(s,i):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new ge(r,a,i)}}function Ic(t,e){return t.replace(Ec,(n,i)=>{const r=e[i];return r!=null?String(r):`<${i}?>`})}const Ec=/\{\$([^}]+)}/g;function Tc(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function gt(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const r of n){if(!i.includes(r))return!1;const s=t[r],o=e[r];if(qi(s)&&qi(o)){if(!gt(s,o))return!1}else if(s!==o)return!1}for(const r of i)if(!n.includes(r))return!1;return!0}function qi(t){return t!==null&&typeof t=="object"}/**
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
 */function Et(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function kc(t,e){const n=new Sc(t,e);return n.subscribe.bind(n)}class Sc{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let r;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");Ac(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:i},r.next===void 0&&(r.next=cn),r.error===void 0&&(r.error=cn),r.complete===void 0&&(r.complete=cn);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ac(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function cn(){}/**
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
 */const Rc=1e3,Cc=2,Oc=4*60*60*1e3,Dc=.5;function Gi(t,e=Rc,n=Cc){const i=e*Math.pow(n,t),r=Math.round(Dc*i*(Math.random()-.5)*2);return Math.min(Oc,i+r)}/**
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
 */function Re(t){return t&&t._delegate?t._delegate:t}class pe{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const We="[DEFAULT]";/**
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
 */class Pc{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new gc;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Nc(e))try{this.getOrInitializeService({instanceIdentifier:We})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:r});i.resolve(s)}catch{}}}}clearInstance(e=We){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=We){return this.instances.has(e)}getOptions(e=We){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);i===a&&o.resolve(r)}return r}onInit(e,n){var i;const r=this.normalizeInstanceIdentifier(n),s=(i=this.onInitCallbacks.get(r))!==null&&i!==void 0?i:new Set;s.add(e),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&e(o,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const r of i)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Lc(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=We){return this.component?this.component.multipleInstances?e:We:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Lc(t){return t===We?void 0:t}function Nc(t){return t.instantiationMode==="EAGER"}/**
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
 */class Mc{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Pc(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var B;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(B||(B={}));const Uc={debug:B.DEBUG,verbose:B.VERBOSE,info:B.INFO,warn:B.WARN,error:B.ERROR,silent:B.SILENT},xc=B.INFO,Fc={[B.DEBUG]:"log",[B.VERBOSE]:"log",[B.INFO]:"info",[B.WARN]:"warn",[B.ERROR]:"error"},Bc=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),r=Fc[e];if(r)console[r](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Wn{constructor(e){this.name=e,this._logLevel=xc,this._logHandler=Bc,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in B))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Uc[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,B.DEBUG,...e),this._logHandler(this,B.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,B.VERBOSE,...e),this._logHandler(this,B.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,B.INFO,...e),this._logHandler(this,B.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,B.WARN,...e),this._logHandler(this,B.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,B.ERROR,...e),this._logHandler(this,B.ERROR,...e)}}const Vc=(t,e)=>e.some(n=>t instanceof n);let Ki,Ji;function Hc(){return Ki||(Ki=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function jc(){return Ji||(Ji=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const is=new WeakMap,En=new WeakMap,rs=new WeakMap,ln=new WeakMap,zn=new WeakMap;function Wc(t){const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Le(t.result)),r()},o=()=>{i(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&is.set(n,t)}).catch(()=>{}),zn.set(e,t),e}function zc(t){if(En.has(t))return;const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),r()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});En.set(t,e)}let Tn={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return En.get(t);if(e==="objectStoreNames")return t.objectStoreNames||rs.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Le(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function qc(t){Tn=t(Tn)}function Gc(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(un(this),e,...n);return rs.set(i,e.sort?e.sort():[e]),Le(i)}:jc().includes(t)?function(...e){return t.apply(un(this),e),Le(is.get(this))}:function(...e){return Le(t.apply(un(this),e))}}function Kc(t){return typeof t=="function"?Gc(t):(t instanceof IDBTransaction&&zc(t),Vc(t,Hc())?new Proxy(t,Tn):t)}function Le(t){if(t instanceof IDBRequest)return Wc(t);if(ln.has(t))return ln.get(t);const e=Kc(t);return e!==t&&(ln.set(t,e),zn.set(e,t)),e}const un=t=>zn.get(t);function Jc(t,e,{blocked:n,upgrade:i,blocking:r,terminated:s}={}){const o=indexedDB.open(t,e),a=Le(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Le(o.result),c.oldVersion,c.newVersion,Le(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Yc=["get","getKey","getAll","getAllKeys","count"],Xc=["put","add","delete","clear"],dn=new Map;function Yi(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(dn.get(e))return dn.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,r=Xc.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||Yc.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return dn.set(e,s),s}qc(t=>({...t,get:(e,n,i)=>Yi(e,n)||t.get(e,n,i),has:(e,n)=>!!Yi(e,n)||t.has(e,n)}));/**
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
 */class Qc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Zc(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Zc(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const kn="@firebase/app",Xi="0.9.15";/**
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
 */const Xe=new Wn("@firebase/app"),$c="@firebase/app-compat",el="@firebase/analytics-compat",tl="@firebase/analytics",nl="@firebase/app-check-compat",il="@firebase/app-check",rl="@firebase/auth",sl="@firebase/auth-compat",ol="@firebase/database",al="@firebase/database-compat",cl="@firebase/functions",ll="@firebase/functions-compat",ul="@firebase/installations",dl="@firebase/installations-compat",fl="@firebase/messaging",hl="@firebase/messaging-compat",pl="@firebase/performance",ml="@firebase/performance-compat",gl="@firebase/remote-config",_l="@firebase/remote-config-compat",bl="@firebase/storage",vl="@firebase/storage-compat",yl="@firebase/firestore",wl="@firebase/firestore-compat",Il="firebase",El="10.1.0";/**
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
 */const Sn="[DEFAULT]",Tl={[kn]:"fire-core",[$c]:"fire-core-compat",[tl]:"fire-analytics",[el]:"fire-analytics-compat",[il]:"fire-app-check",[nl]:"fire-app-check-compat",[rl]:"fire-auth",[sl]:"fire-auth-compat",[ol]:"fire-rtdb",[al]:"fire-rtdb-compat",[cl]:"fire-fn",[ll]:"fire-fn-compat",[ul]:"fire-iid",[dl]:"fire-iid-compat",[fl]:"fire-fcm",[hl]:"fire-fcm-compat",[pl]:"fire-perf",[ml]:"fire-perf-compat",[gl]:"fire-rc",[_l]:"fire-rc-compat",[bl]:"fire-gcs",[vl]:"fire-gcs-compat",[yl]:"fire-fst",[wl]:"fire-fst-compat","fire-js":"fire-js",[Il]:"fire-js-all"};/**
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
 */const Ht=new Map,An=new Map;function kl(t,e){try{t.container.addComponent(e)}catch(n){Xe.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ke(t){const e=t.name;if(An.has(e))return Xe.debug(`There were multiple attempts to register component ${e}.`),!1;An.set(e,t);for(const n of Ht.values())kl(n,t);return!0}function dt(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
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
 */const Sl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Ne=new et("app","Firebase",Sl);/**
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
 */class Al{constructor(e,n,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new pe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ne.create("app-deleted",{appName:this._name})}}/**
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
 */const Tt=El;function ss(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Sn,automaticDataCollectionEnabled:!1},e),r=i.name;if(typeof r!="string"||!r)throw Ne.create("bad-app-name",{appName:String(r)});if(n||(n=Zr()),!n)throw Ne.create("no-options");const s=Ht.get(r);if(s){if(gt(n,s.options)&&gt(i,s.config))return s;throw Ne.create("duplicate-app",{appName:r})}const o=new Mc(r);for(const c of An.values())o.addComponent(c);const a=new Al(n,i,o);return Ht.set(r,a),a}function os(t=Sn){const e=Ht.get(t);if(!e&&t===Sn&&Zr())return ss();if(!e)throw Ne.create("no-app",{appName:t});return e}function ue(t,e,n){var i;let r=(i=Tl[t])!==null&&i!==void 0?i:t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Xe.warn(a.join(" "));return}ke(new pe(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Rl="firebase-heartbeat-database",Cl=1,_t="firebase-heartbeat-store";let fn=null;function as(){return fn||(fn=Jc(Rl,Cl,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(_t)}}}).catch(t=>{throw Ne.create("idb-open",{originalErrorMessage:t.message})})),fn}async function Ol(t){try{return await(await as()).transaction(_t).objectStore(_t).get(cs(t))}catch(e){if(e instanceof ge)Xe.warn(e.message);else{const n=Ne.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Xe.warn(n.message)}}}async function Qi(t,e){try{const i=(await as()).transaction(_t,"readwrite");await i.objectStore(_t).put(e,cs(t)),await i.done}catch(n){if(n instanceof ge)Xe.warn(n.message);else{const i=Ne.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Xe.warn(i.message)}}}function cs(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Dl=1024,Pl=30*24*60*60*1e3;class Ll{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ml(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Zi();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(r=>r.date===i)))return this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(r=>{const s=new Date(r.date).valueOf();return Date.now()-s<=Pl}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Zi(),{heartbeatsToSend:n,unsentEntries:i}=Nl(this._heartbeatsCache.heartbeats),r=Xr(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function Zi(){return new Date().toISOString().substring(0,10)}function Nl(t,e=Dl){const n=[];let i=t.slice();for(const r of t){const s=n.find(o=>o.agent===r.agent);if(s){if(s.dates.push(r.date),$i(n)>e){s.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),$i(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Ml{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ts()?ns().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Ol(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Qi(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Qi(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function $i(t){return Xr(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function Ul(t){ke(new pe("platform-logger",e=>new Qc(e),"PRIVATE")),ke(new pe("heartbeat",e=>new Ll(e),"PRIVATE")),ue(kn,Xi,t),ue(kn,Xi,"esm2017"),ue("fire-js","")}Ul("");var xl="firebase",Fl="10.1.0";/**
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
 */ue(xl,Fl,"app");const Bl=(t,e)=>e.some(n=>t instanceof n);let er,tr;function Vl(){return er||(er=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Hl(){return tr||(tr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ls=new WeakMap,Rn=new WeakMap,us=new WeakMap,hn=new WeakMap,qn=new WeakMap;function jl(t){const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Me(t.result)),r()},o=()=>{i(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ls.set(n,t)}).catch(()=>{}),qn.set(e,t),e}function Wl(t){if(Rn.has(t))return;const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),r()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Rn.set(t,e)}let Cn={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Rn.get(t);if(e==="objectStoreNames")return t.objectStoreNames||us.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Me(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function zl(t){Cn=t(Cn)}function ql(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(pn(this),e,...n);return us.set(i,e.sort?e.sort():[e]),Me(i)}:Hl().includes(t)?function(...e){return t.apply(pn(this),e),Me(ls.get(this))}:function(...e){return Me(t.apply(pn(this),e))}}function Gl(t){return typeof t=="function"?ql(t):(t instanceof IDBTransaction&&Wl(t),Bl(t,Vl())?new Proxy(t,Cn):t)}function Me(t){if(t instanceof IDBRequest)return jl(t);if(hn.has(t))return hn.get(t);const e=Gl(t);return e!==t&&(hn.set(t,e),qn.set(e,t)),e}const pn=t=>qn.get(t);function Kl(t,e,{blocked:n,upgrade:i,blocking:r,terminated:s}={}){const o=indexedDB.open(t,e),a=Me(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Me(o.result),c.oldVersion,c.newVersion,Me(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),a.then(c=>{s&&c.addEventListener("close",()=>s()),r&&c.addEventListener("versionchange",()=>r())}).catch(()=>{}),a}const Jl=["get","getKey","getAll","getAllKeys","count"],Yl=["put","add","delete","clear"],mn=new Map;function nr(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(mn.get(e))return mn.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,r=Yl.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||Jl.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return mn.set(e,s),s}zl(t=>({...t,get:(e,n,i)=>nr(e,n)||t.get(e,n,i),has:(e,n)=>!!nr(e,n)||t.has(e,n)}));const ds="@firebase/installations",Gn="0.6.4";/**
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
 */const fs=1e4,hs=`w:${Gn}`,ps="FIS_v2",Xl="https://firebaseinstallations.googleapis.com/v1",Ql=60*60*1e3,Zl="installations",$l="Installations";/**
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
 */const eu={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Qe=new et(Zl,$l,eu);function ms(t){return t instanceof ge&&t.code.includes("request-failed")}/**
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
 */function gs({projectId:t}){return`${Xl}/projects/${t}/installations`}function _s(t){return{token:t.token,requestStatus:2,expiresIn:nu(t.expiresIn),creationTime:Date.now()}}async function bs(t,e){const i=(await e.json()).error;return Qe.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function vs({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function tu(t,{refreshToken:e}){const n=vs(t);return n.append("Authorization",iu(e)),n}async function ys(t){const e=await t();return e.status>=500&&e.status<600?t():e}function nu(t){return Number(t.replace("s","000"))}function iu(t){return`${ps} ${t}`}/**
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
 */async function ru({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=gs(t),r=vs(t),s=e.getImmediate({optional:!0});if(s){const l=await s.getHeartbeatsHeader();l&&r.append("x-firebase-client",l)}const o={fid:n,authVersion:ps,appId:t.appId,sdkVersion:hs},a={method:"POST",headers:r,body:JSON.stringify(o)},c=await ys(()=>fetch(i,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:_s(l.authToken)}}else throw await bs("Create Installation",c)}/**
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
 */function ws(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function su(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const ou=/^[cdef][\w-]{21}$/,On="";function au(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=cu(t);return ou.test(n)?n:On}catch{return On}}function cu(t){return su(t).substr(0,22)}/**
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
 */function en(t){return`${t.appName}!${t.appId}`}/**
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
 */const Is=new Map;function Es(t,e){const n=en(t);Ts(n,e),lu(n,e)}function Ts(t,e){const n=Is.get(t);if(n)for(const i of n)i(e)}function lu(t,e){const n=uu();n&&n.postMessage({key:t,fid:e}),du()}let ze=null;function uu(){return!ze&&"BroadcastChannel"in self&&(ze=new BroadcastChannel("[Firebase] FID Change"),ze.onmessage=t=>{Ts(t.data.key,t.data.fid)}),ze}function du(){Is.size===0&&ze&&(ze.close(),ze=null)}/**
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
 */const fu="firebase-installations-database",hu=1,Ze="firebase-installations-store";let gn=null;function Kn(){return gn||(gn=Kl(fu,hu,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Ze)}}})),gn}async function jt(t,e){const n=en(t),r=(await Kn()).transaction(Ze,"readwrite"),s=r.objectStore(Ze),o=await s.get(n);return await s.put(e,n),await r.done,(!o||o.fid!==e.fid)&&Es(t,e.fid),e}async function ks(t){const e=en(t),i=(await Kn()).transaction(Ze,"readwrite");await i.objectStore(Ze).delete(e),await i.done}async function tn(t,e){const n=en(t),r=(await Kn()).transaction(Ze,"readwrite"),s=r.objectStore(Ze),o=await s.get(n),a=e(o);return a===void 0?await s.delete(n):await s.put(a,n),await r.done,a&&(!o||o.fid!==a.fid)&&Es(t,a.fid),a}/**
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
 */async function Jn(t){let e;const n=await tn(t.appConfig,i=>{const r=pu(i),s=mu(t,r);return e=s.registrationPromise,s.installationEntry});return n.fid===On?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function pu(t){const e=t||{fid:au(),registrationStatus:0};return Ss(e)}function mu(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(Qe.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=gu(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:_u(t)}:{installationEntry:e}}async function gu(t,e){try{const n=await ru(t,e);return jt(t.appConfig,n)}catch(n){throw ms(n)&&n.customData.serverCode===409?await ks(t.appConfig):await jt(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function _u(t){let e=await ir(t.appConfig);for(;e.registrationStatus===1;)await ws(100),e=await ir(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await Jn(t);return i||n}return e}function ir(t){return tn(t,e=>{if(!e)throw Qe.create("installation-not-found");return Ss(e)})}function Ss(t){return bu(t)?{fid:t.fid,registrationStatus:0}:t}function bu(t){return t.registrationStatus===1&&t.registrationTime+fs<Date.now()}/**
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
 */async function vu({appConfig:t,heartbeatServiceProvider:e},n){const i=yu(t,n),r=tu(t,n),s=e.getImmediate({optional:!0});if(s){const l=await s.getHeartbeatsHeader();l&&r.append("x-firebase-client",l)}const o={installation:{sdkVersion:hs,appId:t.appId}},a={method:"POST",headers:r,body:JSON.stringify(o)},c=await ys(()=>fetch(i,a));if(c.ok){const l=await c.json();return _s(l)}else throw await bs("Generate Auth Token",c)}function yu(t,{fid:e}){return`${gs(t)}/${e}/authTokens:generate`}/**
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
 */async function Yn(t,e=!1){let n;const i=await tn(t.appConfig,s=>{if(!As(s))throw Qe.create("not-registered");const o=s.authToken;if(!e&&Eu(o))return s;if(o.requestStatus===1)return n=wu(t,e),s;{if(!navigator.onLine)throw Qe.create("app-offline");const a=ku(s);return n=Iu(t,a),a}});return n?await n:i.authToken}async function wu(t,e){let n=await rr(t.appConfig);for(;n.authToken.requestStatus===1;)await ws(100),n=await rr(t.appConfig);const i=n.authToken;return i.requestStatus===0?Yn(t,e):i}function rr(t){return tn(t,e=>{if(!As(e))throw Qe.create("not-registered");const n=e.authToken;return Su(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Iu(t,e){try{const n=await vu(t,e),i=Object.assign(Object.assign({},e),{authToken:n});return await jt(t.appConfig,i),n}catch(n){if(ms(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await ks(t.appConfig);else{const i=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await jt(t.appConfig,i)}throw n}}function As(t){return t!==void 0&&t.registrationStatus===2}function Eu(t){return t.requestStatus===2&&!Tu(t)}function Tu(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Ql}function ku(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Su(t){return t.requestStatus===1&&t.requestTime+fs<Date.now()}/**
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
 */async function Au(t){const e=t,{installationEntry:n,registrationPromise:i}=await Jn(e);return i?i.catch(console.error):Yn(e).catch(console.error),n.fid}/**
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
 */async function Ru(t,e=!1){const n=t;return await Cu(n),(await Yn(n,e)).token}async function Cu(t){const{registrationPromise:e}=await Jn(t);e&&await e}/**
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
 */function Ou(t){if(!t||!t.options)throw _n("App Configuration");if(!t.name)throw _n("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw _n(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function _n(t){return Qe.create("missing-app-config-values",{valueName:t})}/**
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
 */const Rs="installations",Du="installations-internal",Pu=t=>{const e=t.getProvider("app").getImmediate(),n=Ou(e),i=dt(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},Lu=t=>{const e=t.getProvider("app").getImmediate(),n=dt(e,Rs).getImmediate();return{getId:()=>Au(n),getToken:r=>Ru(n,r)}};function Nu(){ke(new pe(Rs,Pu,"PUBLIC")),ke(new pe(Du,Lu,"PRIVATE"))}Nu();ue(ds,Gn);ue(ds,Gn,"esm2017");/**
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
 */const Wt="analytics",Mu="firebase_id",Uu="origin",xu=60*1e3,Fu="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Xn="https://www.googletagmanager.com/gtag/js";/**
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
 */const G=new Wn("@firebase/analytics");/**
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
 */const Bu={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},X=new et("analytics","Analytics",Bu);/**
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
 */function Vu(t){if(!t.startsWith(Xn)){const e=X.create("invalid-gtag-resource",{gtagURL:t});return G.warn(e.message),""}return t}function Cs(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function Hu(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function ju(t,e){const n=Hu("firebase-js-sdk-policy",{createScriptURL:Vu}),i=document.createElement("script"),r=`${Xn}?l=${t}&id=${e}`;i.src=n?n==null?void 0:n.createScriptURL(r):r,i.async=!0,document.head.appendChild(i)}function Wu(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function zu(t,e,n,i,r,s){const o=i[r];try{if(o)await e[o];else{const c=(await Cs(n)).find(l=>l.measurementId===r);c&&await e[c.appId]}}catch(a){G.error(a)}t("config",r,s)}async function qu(t,e,n,i,r){try{let s=[];if(r&&r.send_to){let o=r.send_to;Array.isArray(o)||(o=[o]);const a=await Cs(n);for(const c of o){const l=a.find(u=>u.measurementId===c),d=l&&e[l.appId];if(d)s.push(d);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),t("event",i,r||{})}catch(s){G.error(s)}}function Gu(t,e,n,i){async function r(s,...o){try{if(s==="event"){const[a,c]=o;await qu(t,e,n,a,c)}else if(s==="config"){const[a,c]=o;await zu(t,e,n,i,a,c)}else if(s==="consent"){const[a]=o;t("consent","update",a)}else if(s==="get"){const[a,c,l]=o;t("get",a,c,l)}else if(s==="set"){const[a]=o;t("set",a)}else t(s,...o)}catch(a){G.error(a)}}return r}function Ku(t,e,n,i,r){let s=function(...o){window[i].push(arguments)};return window[r]&&typeof window[r]=="function"&&(s=window[r]),window[r]=Gu(s,t,e,n),{gtagCore:s,wrappedGtag:window[r]}}function Ju(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Xn)&&n.src.includes(t))return n;return null}/**
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
 */const Yu=30,Xu=1e3;class Qu{constructor(e={},n=Xu){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Os=new Qu;function Zu(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function $u(t){var e;const{appId:n,apiKey:i}=t,r={method:"GET",headers:Zu(i)},s=Fu.replace("{app-id}",n),o=await fetch(s,r);if(o.status!==200&&o.status!==304){let a="";try{const c=await o.json();!((e=c.error)===null||e===void 0)&&e.message&&(a=c.error.message)}catch{}throw X.create("config-fetch-failed",{httpStatus:o.status,responseMessage:a})}return o.json()}async function ed(t,e=Os,n){const{appId:i,apiKey:r,measurementId:s}=t.options;if(!i)throw X.create("no-app-id");if(!r){if(s)return{measurementId:s,appId:i};throw X.create("no-api-key")}const o=e.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new id;return setTimeout(async()=>{a.abort()},n!==void 0?n:xu),Ds({appId:i,apiKey:r,measurementId:s},o,a,e)}async function Ds(t,{throttleEndTimeMillis:e,backoffCount:n},i,r=Os){var s;const{appId:o,measurementId:a}=t;try{await td(i,e)}catch(c){if(a)return G.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:o,measurementId:a};throw c}try{const c=await $u(t);return r.deleteThrottleMetadata(o),c}catch(c){const l=c;if(!nd(l)){if(r.deleteThrottleMetadata(o),a)return G.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:o,measurementId:a};throw c}const d=Number((s=l==null?void 0:l.customData)===null||s===void 0?void 0:s.httpStatus)===503?Gi(n,r.intervalMillis,Yu):Gi(n,r.intervalMillis),u={throttleEndTimeMillis:Date.now()+d,backoffCount:n+1};return r.setThrottleMetadata(o,u),G.debug(`Calling attemptFetch again in ${d} millis`),Ds(t,u,i,r)}}function td(t,e){return new Promise((n,i)=>{const r=Math.max(e-Date.now(),0),s=setTimeout(n,r);t.addEventListener(()=>{clearTimeout(s),i(X.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function nd(t){if(!(t instanceof ge)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class id{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function rd(t,e,n,i,r){if(r&&r.global){t("event",n,i);return}else{const s=await e,o=Object.assign(Object.assign({},i),{send_to:s});t("event",n,o)}}/**
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
 */async function sd(){if(ts())try{await ns()}catch(t){return G.warn(X.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return G.warn(X.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function od(t,e,n,i,r,s,o){var a;const c=ed(t);c.then(h=>{n[h.measurementId]=h.appId,t.options.measurementId&&h.measurementId!==t.options.measurementId&&G.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${h.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(h=>G.error(h)),e.push(c);const l=sd().then(h=>{if(h)return i.getId()}),[d,u]=await Promise.all([c,l]);Ju(s)||ju(s,d.measurementId),r("js",new Date);const f=(a=o==null?void 0:o.config)!==null&&a!==void 0?a:{};return f[Uu]="firebase",f.update=!0,u!=null&&(f[Mu]=u),r("config",d.measurementId,f),d.measurementId}/**
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
 */class ad{constructor(e){this.app=e}_delete(){return delete pt[this.app.options.appId],Promise.resolve()}}let pt={},sr=[];const or={};let bn="dataLayer",cd="gtag",ar,Ps,cr=!1;function ld(){const t=[];if(es()&&t.push("This is a browser extension environment."),yc()||t.push("Cookies are not available."),t.length>0){const e=t.map((i,r)=>`(${r+1}) ${i}`).join(" "),n=X.create("invalid-analytics-context",{errorInfo:e});G.warn(n.message)}}function ud(t,e,n){ld();const i=t.options.appId;if(!i)throw X.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)G.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw X.create("no-api-key");if(pt[i]!=null)throw X.create("already-exists",{id:i});if(!cr){Wu(bn);const{wrappedGtag:s,gtagCore:o}=Ku(pt,sr,or,bn,cd);Ps=s,ar=o,cr=!0}return pt[i]=od(t,sr,or,e,ar,bn,n),new ad(t)}function dd(t=os()){t=Re(t);const e=dt(t,Wt);return e.isInitialized()?e.getImmediate():fd(t)}function fd(t,e={}){const n=dt(t,Wt);if(n.isInitialized()){const r=n.getImmediate();if(gt(e,n.getOptions()))return r;throw X.create("already-initialized")}return n.initialize({options:e})}function hd(t,e,n,i){t=Re(t),rd(Ps,pt[t.app.options.appId],e,n,i).catch(r=>G.error(r))}const lr="@firebase/analytics",ur="0.10.0";function pd(){ke(new pe(Wt,(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return ud(i,r,n)},"PUBLIC")),ke(new pe("analytics-internal",t,"PRIVATE")),ue(lr,ur),ue(lr,ur,"esm2017");function t(e){try{const n=e.getProvider(Wt).getImmediate();return{logEvent:(i,r,s)=>hd(n,i,r,s)}}catch(n){throw X.create("interop-component-reg-failed",{reason:n})}}}pd();function Qn(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(t);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(t,i[r])&&(n[i[r]]=t[i[r]]);return n}function Ls(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const md=Ls,Ns=new et("auth","Firebase",Ls());/**
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
 */const zt=new Wn("@firebase/auth");function gd(t,...e){zt.logLevel<=B.WARN&&zt.warn(`Auth (${Tt}): ${t}`,...e)}function Lt(t,...e){zt.logLevel<=B.ERROR&&zt.error(`Auth (${Tt}): ${t}`,...e)}/**
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
 */function me(t,...e){throw Zn(t,...e)}function de(t,...e){return Zn(t,...e)}function Ms(t,e,n){const i=Object.assign(Object.assign({},md()),{[e]:n});return new et("auth","Firebase",i).create(e,{appName:t.name})}function _d(t,e,n){const i=n;if(!(e instanceof i))throw i.name!==e.constructor.name&&me(t,"argument-error"),Ms(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Zn(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return Ns.create(t,...e)}function M(t,e,...n){if(!t)throw Zn(e,...n)}function be(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Lt(e),new Error(e)}function Se(t,e){t||be(e)}/**
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
 */function Dn(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function bd(){return dr()==="http:"||dr()==="https:"}function dr(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function vd(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(bd()||es()||"connection"in navigator)?navigator.onLine:!0}function yd(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class kt{constructor(e,n){this.shortDelay=e,this.longDelay=n,Se(n>e,"Short delay should be less than long delay!"),this.isMobile=_c()||bc()}get(){return vd()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function $n(t,e){Se(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Us{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;be("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;be("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;be("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const wd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Id=new kt(3e4,6e4);function xs(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function St(t,e,n,i,r={}){return Fs(t,r,async()=>{let s={},o={};i&&(e==="GET"?o=i:s={body:JSON.stringify(i)});const a=Et(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode),Us.fetch()(Bs(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},s))})}async function Fs(t,e,n){t._canInitEmulator=!1;const i=Object.assign(Object.assign({},wd),e);try{const r=new Td(t),s=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Pt(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Pt(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Pt(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Pt(t,"user-disabled",o);const d=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Ms(t,d,l);me(t,d)}}catch(r){if(r instanceof ge)throw r;me(t,"network-request-failed",{message:String(r)})}}async function Ed(t,e,n,i,r={}){const s=await St(t,e,n,i,r);return"mfaPendingCredential"in s&&me(t,"multi-factor-auth-required",{_serverResponse:s}),s}function Bs(t,e,n,i){const r=`${e}${n}?${i}`;return t.config.emulator?$n(t.config,r):`${t.config.apiScheme}://${r}`}class Td{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(de(this.auth,"network-request-failed")),Id.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Pt(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const r=de(t,e,i);return r.customData._tokenResponse=n,r}/**
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
 */async function kd(t,e){return St(t,"POST","/v1/accounts:delete",e)}async function Sd(t,e){return St(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function mt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ad(t,e=!1){const n=Re(t),i=await n.getIdToken(e),r=ei(i);M(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const s=typeof r.firebase=="object"?r.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:r,token:i,authTime:mt(vn(r.auth_time)),issuedAtTime:mt(vn(r.iat)),expirationTime:mt(vn(r.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function vn(t){return Number(t)*1e3}function ei(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return Lt("JWT malformed, contained fewer than 3 sections"),null;try{const r=Qr(n);return r?JSON.parse(r):(Lt("Failed to decode base64 JWT payload"),null)}catch(r){return Lt("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function Rd(t){const e=ei(t);return M(e,"internal-error"),M(typeof e.exp<"u","internal-error"),M(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function bt(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof ge&&Cd(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function Cd({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class Od{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const r=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Vs{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=mt(this.lastLoginAt),this.creationTime=mt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function qt(t){var e;const n=t.auth,i=await t.getIdToken(),r=await bt(t,Sd(n,{idToken:i}));M(r==null?void 0:r.users.length,n,"internal-error");const s=r.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Ld(s.providerUserInfo):[],a=Pd(t.providerData,o),c=t.isAnonymous,l=!(t.email&&s.passwordHash)&&!(a!=null&&a.length),d=c?l:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Vs(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(t,u)}async function Dd(t){const e=Re(t);await qt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Pd(t,e){return[...t.filter(i=>!e.some(r=>r.providerId===i.providerId)),...e]}function Ld(t){return t.map(e=>{var{providerId:n}=e,i=Qn(e,["providerId"]);return{providerId:n,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function Nd(t,e){const n=await Fs(t,{},async()=>{const i=Et({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:s}=t.config,o=Bs(t,r,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Us.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
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
 */class vt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){M(e.idToken,"internal-error"),M(typeof e.idToken<"u","internal-error"),M(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Rd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return M(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:r,expiresIn:s}=await Nd(e,n);this.updateTokensAndExpiration(i,r,Number(s))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:r,expirationTime:s}=n,o=new vt;return i&&(M(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),r&&(M(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),s&&(M(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new vt,this.toJSON())}_performRefresh(){return be("not implemented")}}/**
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
 */function Ce(t,e){M(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Ke{constructor(e){var{uid:n,auth:i,stsTokenManager:r}=e,s=Qn(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Od(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=i,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Vs(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await bt(this,this.stsTokenManager.getToken(this.auth,e));return M(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Ad(this,e)}reload(){return Dd(this)}_assign(e){this!==e&&(M(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Ke(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){M(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await qt(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await bt(this,kd(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var i,r,s,o,a,c,l,d;const u=(i=n.displayName)!==null&&i!==void 0?i:void 0,f=(r=n.email)!==null&&r!==void 0?r:void 0,h=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,g=(o=n.photoURL)!==null&&o!==void 0?o:void 0,_=(a=n.tenantId)!==null&&a!==void 0?a:void 0,p=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,m=(l=n.createdAt)!==null&&l!==void 0?l:void 0,b=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:T,emailVerified:A,isAnonymous:y,providerData:I,stsTokenManager:E}=n;M(T&&E,e,"internal-error");const v=vt.fromJSON(this.name,E);M(typeof T=="string",e,"internal-error"),Ce(u,e.name),Ce(f,e.name),M(typeof A=="boolean",e,"internal-error"),M(typeof y=="boolean",e,"internal-error"),Ce(h,e.name),Ce(g,e.name),Ce(_,e.name),Ce(p,e.name),Ce(m,e.name),Ce(b,e.name);const R=new Ke({uid:T,auth:e,email:f,emailVerified:A,displayName:u,isAnonymous:y,photoURL:g,phoneNumber:h,tenantId:_,stsTokenManager:v,createdAt:m,lastLoginAt:b});return I&&Array.isArray(I)&&(R.providerData=I.map(S=>Object.assign({},S))),p&&(R._redirectEventId=p),R}static async _fromIdTokenResponse(e,n,i=!1){const r=new vt;r.updateFromServerResponse(n);const s=new Ke({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await qt(s),s}}/**
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
 */const fr=new Map;function ve(t){Se(t instanceof Function,"Expected a class definition");let e=fr.get(t);return e?(Se(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,fr.set(t,e),e)}/**
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
 */class Hs{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Hs.type="NONE";const hr=Hs;/**
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
 */function Nt(t,e,n){return`firebase:${t}:${e}:${n}`}class rt{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:r,name:s}=this.auth;this.fullUserKey=Nt(this.userKey,r.apiKey,s),this.fullPersistenceKey=Nt("persistence",r.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ke._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new rt(ve(hr),e,i);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=r[0]||ve(hr);const o=Nt(i,e.config.apiKey,e.name);let a=null;for(const l of n)try{const d=await l._get(o);if(d){const u=Ke._fromJSON(e,d);l!==s&&(a=u),s=l;break}}catch{}const c=r.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new rt(s,e,i):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new rt(s,e,i))}}/**
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
 */function pr(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(zs(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(js(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Gs(e))return"Blackberry";if(Ks(e))return"Webos";if(ti(e))return"Safari";if((e.includes("chrome/")||Ws(e))&&!e.includes("edge/"))return"Chrome";if(qs(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function js(t=z()){return/firefox\//i.test(t)}function ti(t=z()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ws(t=z()){return/crios\//i.test(t)}function zs(t=z()){return/iemobile/i.test(t)}function qs(t=z()){return/android/i.test(t)}function Gs(t=z()){return/blackberry/i.test(t)}function Ks(t=z()){return/webos/i.test(t)}function nn(t=z()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Md(t=z()){var e;return nn(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Ud(){return vc()&&document.documentMode===10}function Js(t=z()){return nn(t)||qs(t)||Ks(t)||Gs(t)||/windows phone/i.test(t)||zs(t)}function xd(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function Ys(t,e=[]){let n;switch(t){case"Browser":n=pr(z());break;case"Worker":n=`${pr(z())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Tt}/${i}`}async function Xs(t,e){return St(t,"GET","/v2/recaptchaConfig",xs(t,e))}function mr(t){return t!==void 0&&t.enterprise!==void 0}class Qs{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}/**
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
 */function Fd(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function Zs(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=r=>{const s=de("internal-error");s.customData=r,n(s)},i.type="text/javascript",i.charset="UTF-8",Fd().appendChild(i)})}function Bd(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const Vd="https://www.google.com/recaptcha/enterprise.js?render=",Hd="recaptcha-enterprise",jd="NO_RECAPTCHA";class Wd{constructor(e){this.type=Hd,this.auth=At(e)}async verify(e="verify",n=!1){async function i(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{Xs(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new Qs(c);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function r(s,o,a){const c=window.grecaptcha;mr(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(jd)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{i(this.auth).then(a=>{if(!n&&mr(window.grecaptcha))r(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}Zs(Vd+a).then(()=>{r(a,s,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}/**
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
 */class zd{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});i.onAbort=n,this.queue.push(i);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
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
 */class qd{constructor(e,n,i,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new gr(this),this.idTokenSubscription=new gr(this),this.beforeStateQueue=new zd(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ns,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ve(n)),this._initializationPromise=this.queue(async()=>{var i,r;if(!this._deleted&&(this.persistenceManager=await rt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const i=await this.assertedPersistence.getCurrentUser();let r=i,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return M(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await qt(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=yd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?Re(e):null;return n&&M(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&M(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(ve(e))})}async initializeRecaptchaConfig(){const e=await Xs(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new Qs(e);this.tenantId==null?this._agentRecaptchaConfig=n:this._tenantRecaptchaConfigs[this.tenantId]=n,n.emailPasswordEnabled&&new Wd(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new et("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ve(e)||this._popupRedirectResolver;M(n,this,"argument-error"),this.redirectPersistenceManager=await rt.create(this,[ve(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,i;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,r){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return M(o,this,"internal-error"),o.then(()=>s(this.currentUser)),typeof n=="function"?e.addObserver(n,i,r):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return M(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ys(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(n["X-Firebase-Client"]=i);const r=await this._getAppCheckToken();return r&&(n["X-Firebase-AppCheck"]=r),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&gd(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function At(t){return Re(t)}class gr{constructor(e){this.auth=e,this.observer=null,this.addObserver=kc(n=>this.observer=n)}get next(){return M(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */function Gd(t,e){const n=dt(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),s=n.getOptions();if(gt(s,e??{}))return r;me(r,"already-initialized")}return n.initialize({options:e})}function Kd(t,e){const n=(e==null?void 0:e.persistence)||[],i=(Array.isArray(n)?n:[n]).map(ve);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function Jd(t,e,n){const i=At(t);M(i._canInitEmulator,i,"emulator-config-failed"),M(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const r=!!(n!=null&&n.disableWarnings),s=$s(e),{host:o,port:a}=Yd(e),c=a===null?"":`:${a}`;i.config.emulator={url:`${s}//${o}${c}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:r})}),r||Xd()}function $s(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Yd(t){const e=$s(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){const s=r[1];return{host:s,port:_r(i.substr(s.length+1))}}else{const[s,o]=i.split(":");return{host:s,port:_r(o)}}}function _r(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Xd(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class eo{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return be("not implemented")}_getIdTokenResponse(e){return be("not implemented")}_linkToIdToken(e,n){return be("not implemented")}_getReauthenticationResolver(e){return be("not implemented")}}/**
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
 */async function st(t,e){return Ed(t,"POST","/v1/accounts:signInWithIdp",xs(t,e))}/**
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
 */const Qd="http://localhost";class $e extends eo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new $e(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):me("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r}=n,s=Qn(n,["providerId","signInMethod"]);if(!i||!r)return null;const o=new $e(i,r);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return st(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,st(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,st(e,n)}buildRequest(){const e={requestUri:Qd,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Et(n)}return e}}/**
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
 */class ni{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Rt extends ni{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Oe extends Rt{constructor(){super("facebook.com")}static credential(e){return $e._fromParams({providerId:Oe.PROVIDER_ID,signInMethod:Oe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Oe.credentialFromTaggedObject(e)}static credentialFromError(e){return Oe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Oe.credential(e.oauthAccessToken)}catch{return null}}}Oe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Oe.PROVIDER_ID="facebook.com";/**
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
 */class De extends Rt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return $e._fromParams({providerId:De.PROVIDER_ID,signInMethod:De.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return De.credentialFromTaggedObject(e)}static credentialFromError(e){return De.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return De.credential(n,i)}catch{return null}}}De.GOOGLE_SIGN_IN_METHOD="google.com";De.PROVIDER_ID="google.com";/**
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
 */class le extends Rt{constructor(){super("github.com")}static credential(e){return $e._fromParams({providerId:le.PROVIDER_ID,signInMethod:le.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return le.credentialFromTaggedObject(e)}static credentialFromError(e){return le.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return le.credential(e.oauthAccessToken)}catch{return null}}}le.GITHUB_SIGN_IN_METHOD="github.com";le.PROVIDER_ID="github.com";/**
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
 */class Pe extends Rt{constructor(){super("twitter.com")}static credential(e,n){return $e._fromParams({providerId:Pe.PROVIDER_ID,signInMethod:Pe.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Pe.credentialFromTaggedObject(e)}static credentialFromError(e){return Pe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return Pe.credential(n,i)}catch{return null}}}Pe.TWITTER_SIGN_IN_METHOD="twitter.com";Pe.PROVIDER_ID="twitter.com";/**
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
 */class ct{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,r=!1){const s=await Ke._fromIdTokenResponse(e,i,r),o=br(i);return new ct({user:s,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const r=br(i);return new ct({user:e,providerId:r,_tokenResponse:i,operationType:n})}}function br(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class Gt extends ge{constructor(e,n,i,r){var s;super(n.code,n.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,Gt.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,r){return new Gt(e,n,i,r)}}function to(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Gt._fromErrorAndOperation(t,s,e,i):s})}async function Zd(t,e,n=!1){const i=await bt(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ct._forOperation(t,"link",i)}/**
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
 */async function $d(t,e,n=!1){const{auth:i}=t,r="reauthenticate";try{const s=await bt(t,to(i,r,e,t),n);M(s.idToken,i,"internal-error");const o=ei(s.idToken);M(o,i,"internal-error");const{sub:a}=o;return M(t.uid===a,i,"user-mismatch"),ct._forOperation(t,r,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&me(i,"user-mismatch"),s}}/**
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
 */async function ef(t,e,n=!1){const i="signIn",r=await to(t,i,e),s=await ct._fromIdTokenResponse(t,i,r);return n||await t._updateCurrentUser(s.user),s}function tf(t,e,n,i){return Re(t).onIdTokenChanged(e,n,i)}function nf(t,e,n){return Re(t).beforeAuthStateChanged(e,n)}function rf(t){return Re(t).signOut()}const Kt="__sak";/**
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
 */class no{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Kt,"1"),this.storage.removeItem(Kt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function sf(){const t=z();return ti(t)||nn(t)}const of=1e3,af=10;class io extends no{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=sf()&&xd(),this.fallbackToPolling=Js(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),r=this.localCache[n];i!==r&&e(n,r,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(i);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(i,e.newValue):this.storage.removeItem(i);else if(this.localCache[i]===e.newValue&&!n)return}const r=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},s=this.storage.getItem(i);Ud()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,af):r()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},of)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}io.type="LOCAL";const cf=io;/**
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
 */class ro extends no{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}ro.type="SESSION";const so=ro;/**
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
 */function lf(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class rn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const i=new rn(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:r,data:s}=n.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:r});const a=Array.from(o).map(async l=>l(n.origin,s)),c=await lf(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}rn.receivers=[];/**
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
 */function ii(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class uf{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=ii("",20);r.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:r,onMessage(u){const f=u;if(f.data.eventId===l)switch(f.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(f.data.response);break;default:clearTimeout(d),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function fe(){return window}function df(t){fe().location.href=t}/**
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
 */function oo(){return typeof fe().WorkerGlobalScope<"u"&&typeof fe().importScripts=="function"}async function ff(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function hf(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function pf(){return oo()?self:null}/**
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
 */const ao="firebaseLocalStorageDb",mf=1,Jt="firebaseLocalStorage",co="fbase_key";class Ct{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function sn(t,e){return t.transaction([Jt],e?"readwrite":"readonly").objectStore(Jt)}function gf(){const t=indexedDB.deleteDatabase(ao);return new Ct(t).toPromise()}function Pn(){const t=indexedDB.open(ao,mf);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(Jt,{keyPath:co})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(Jt)?e(i):(i.close(),await gf(),e(await Pn()))})})}async function vr(t,e,n){const i=sn(t,!0).put({[co]:e,value:n});return new Ct(i).toPromise()}async function _f(t,e){const n=sn(t,!1).get(e),i=await new Ct(n).toPromise();return i===void 0?null:i.value}function yr(t,e){const n=sn(t,!0).delete(e);return new Ct(n).toPromise()}const bf=800,vf=3;class lo{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Pn(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>vf)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return oo()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=rn._getInstance(pf()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await ff(),!this.activeServiceWorker)return;this.sender=new uf(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((n=i[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||hf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Pn();return await vr(e,Kt,"1"),await yr(e,Kt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>vr(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>_f(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>yr(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const s=sn(r,!1).getAll();return new Ct(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;for(const{fbase_key:r,value:s}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!i.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),bf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}lo.type="LOCAL";const yf=lo;new kt(3e4,6e4);/**
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
 */function uo(t,e){return e?ve(e):(M(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class ri extends eo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return st(e,this._buildIdpRequest())}_linkToIdToken(e,n){return st(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return st(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function wf(t){return ef(t.auth,new ri(t),t.bypassAuthState)}function If(t){const{auth:e,user:n}=t;return M(n,e,"internal-error"),$d(n,new ri(t),t.bypassAuthState)}async function Ef(t){const{auth:e,user:n}=t;return M(n,e,"internal-error"),Zd(n,new ri(t),t.bypassAuthState)}/**
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
 */class fo{constructor(e,n,i,r,s=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:r,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:i,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return wf;case"linkViaPopup":case"linkViaRedirect":return Ef;case"reauthViaPopup":case"reauthViaRedirect":return If;default:me(this.auth,"internal-error")}}resolve(e){Se(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Se(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Tf=new kt(2e3,1e4);async function kf(t,e,n){const i=At(t);_d(t,e,ni);const r=uo(i,n);return new qe(i,"signInViaPopup",e,r).executeNotNull()}class qe extends fo{constructor(e,n,i,r,s){super(e,n,r,s),this.provider=i,this.authWindow=null,this.pollId=null,qe.currentPopupAction&&qe.currentPopupAction.cancel(),qe.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return M(e,this.auth,"internal-error"),e}async onExecution(){Se(this.filter.length===1,"Popup operations only handle one event");const e=ii();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(de(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(de(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,qe.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,i;if(!((i=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(de(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Tf.get())};e()}}qe.currentPopupAction=null;/**
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
 */const Sf="pendingRedirect",Mt=new Map;class Af extends fo{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=Mt.get(this.auth._key());if(!e){try{const i=await Rf(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}Mt.set(this.auth._key(),e)}return this.bypassAuthState||Mt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Rf(t,e){const n=Df(e),i=Of(t);if(!await i._isAvailable())return!1;const r=await i._get(n)==="true";return await i._remove(n),r}function Cf(t,e){Mt.set(t._key(),e)}function Of(t){return ve(t._redirectPersistence)}function Df(t){return Nt(Sf,t.config.apiKey,t.name)}async function Pf(t,e,n=!1){const i=At(t),r=uo(i,e),o=await new Af(i,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const Lf=10*60*1e3;class Nf{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Mf(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var i;if(e.error&&!ho(e)){const r=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";n.onError(de(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Lf&&this.cachedEventUids.clear(),this.cachedEventUids.has(wr(e))}saveEventToCache(e){this.cachedEventUids.add(wr(e)),this.lastProcessedEventTime=Date.now()}}function wr(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function ho({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Mf(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ho(t);default:return!1}}/**
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
 */async function Uf(t,e={}){return St(t,"GET","/v1/projects",e)}/**
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
 */const xf=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ff=/^https?/;async function Bf(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Uf(t);for(const n of e)try{if(Vf(n))return}catch{}me(t,"unauthorized-domain")}function Vf(t){const e=Dn(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!Ff.test(n))return!1;if(xf.test(t))return i===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}/**
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
 */const Hf=new kt(3e4,6e4);function Ir(){const t=fe().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function jf(t){return new Promise((e,n)=>{var i,r,s;function o(){Ir(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ir(),n(de(t,"network-request-failed"))},timeout:Hf.get()})}if(!((r=(i=fe().gapi)===null||i===void 0?void 0:i.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((s=fe().gapi)===null||s===void 0)&&s.load)o();else{const a=Bd("iframefcb");return fe()[a]=()=>{gapi.load?o():n(de(t,"network-request-failed"))},Zs(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw Ut=null,e})}let Ut=null;function Wf(t){return Ut=Ut||jf(t),Ut}/**
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
 */const zf=new kt(5e3,15e3),qf="__/auth/iframe",Gf="emulator/auth/iframe",Kf={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Jf=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Yf(t){const e=t.config;M(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?$n(e,Gf):`https://${t.config.authDomain}/${qf}`,i={apiKey:e.apiKey,appName:t.name,v:Tt},r=Jf.get(t.config.apiHost);r&&(i.eid=r);const s=t._getFrameworks();return s.length&&(i.fw=s.join(",")),`${n}?${Et(i).slice(1)}`}async function Xf(t){const e=await Wf(t),n=fe().gapi;return M(n,t,"internal-error"),e.open({where:document.body,url:Yf(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Kf,dontclear:!0},i=>new Promise(async(r,s)=>{await i.restyle({setHideOnLeave:!1});const o=de(t,"network-request-failed"),a=fe().setTimeout(()=>{s(o)},zf.get());function c(){fe().clearTimeout(a),r(i)}i.ping(c).then(c,()=>{s(o)})}))}/**
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
 */const Qf={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Zf=500,$f=600,eh="_blank",th="http://localhost";class Er{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function nh(t,e,n,i=Zf,r=$f){const s=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c=Object.assign(Object.assign({},Qf),{width:i.toString(),height:r.toString(),top:s,left:o}),l=z().toLowerCase();n&&(a=Ws(l)?eh:n),js(l)&&(e=e||th,c.scrollbars="yes");const d=Object.entries(c).reduce((f,[h,g])=>`${f}${h}=${g},`,"");if(Md(l)&&a!=="_self")return ih(e||"",a),new Er(null);const u=window.open(e||"",a,d);M(u,t,"popup-blocked");try{u.focus()}catch{}return new Er(u)}function ih(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
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
 */const rh="__/auth/handler",sh="emulator/auth/handler",oh=encodeURIComponent("fac");async function Tr(t,e,n,i,r,s){M(t.config.authDomain,t,"auth-domain-config-required"),M(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:Tt,eventId:r};if(e instanceof ni){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Tc(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,u]of Object.entries(s||{}))o[d]=u}if(e instanceof Rt){const d=e.getScopes().filter(u=>u!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const c=await t._getAppCheckToken(),l=c?`#${oh}=${encodeURIComponent(c)}`:"";return`${ah(t)}?${Et(a).slice(1)}${l}`}function ah({config:t}){return t.emulator?$n(t,sh):`https://${t.authDomain}/${rh}`}/**
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
 */const yn="webStorageSupport";class ch{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=so,this._completeRedirectFn=Pf,this._overrideRedirectResult=Cf}async _openPopup(e,n,i,r){var s;Se((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Tr(e,n,i,Dn(),r);return nh(e,o,ii())}async _openRedirect(e,n,i,r){await this._originValidation(e);const s=await Tr(e,n,i,Dn(),r);return df(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:s}=this.eventManagers[n];return r?Promise.resolve(r):(Se(s,"If manager is not set, promise should be"),s)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await Xf(e),i=new Nf(e);return n.register("authEvent",r=>(M(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:i.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(yn,{type:yn},r=>{var s;const o=(s=r==null?void 0:r[0])===null||s===void 0?void 0:s[yn];o!==void 0&&n(!!o),me(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Bf(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Js()||ti()||nn()}}const lh=ch;var kr="@firebase/auth",Sr="1.1.0";/**
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
 */class uh{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){M(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function dh(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function fh(t){ke(new pe("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;M(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ys(t)},l=new qd(i,r,s,c);return Kd(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),ke(new pe("auth-internal",e=>{const n=At(e.getProvider("auth").getImmediate());return(i=>new uh(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ue(kr,Sr,dh(t)),ue(kr,Sr,"esm2017")}/**
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
 */const hh=5*60,ph=$r("authIdTokenMaxAge")||hh;let Ar=null;const mh=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>ph)return;const r=n==null?void 0:n.token;Ar!==r&&(Ar=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function gh(t=os()){const e=dt(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Gd(t,{popupRedirectResolver:lh,persistence:[yf,cf,so]}),i=$r("authTokenSyncURL");if(i){const s=mh(i);nf(n,s,()=>s(n.currentUser)),tf(n,o=>s(o))}const r=mc("auth");return r&&Jd(n,`http://${r}`),n}fh("Browser");const _h={apiKey:"AIzaSyAjCRLDHuTkfnKU5TTV6ZZasUXecSvlQOE",authDomain:"virtual-pinball-spreadsh-71a64.firebaseapp.com",projectId:"virtual-pinball-spreadsh-71a64",appId:"1:497322440319:web:8a7f7a2997664a9af7f14a",measurementId:"G-DB48L7QGX0"},po=ss(_h);dd(po);const mo=gh(po),bh="VirtualPinballSpreadsheet",vh="vps-db",si=$t("user",{});let yh;const wh=()=>{const t=new le;t.addScope("public_repo"),t.setCustomParameters({allow_signup:"false"}),kf(mo,t).then(async e=>{const n=le.credentialFromResult(e),i=e.user;if(console.log(e),console.log(n),console.log(i),i.displayName=e._tokenResponse.screenName,!(n!=null&&n.accessToken))throw new Error;go(n.accessToken,i)}).catch(e=>{console.error(e)})},go=async(t,e)=>{try{const{Octokit:n}=await hi(()=>import("https://esm.sh/octokit"),[],import.meta.url),{createOrUpdateTextFile:i}=await hi(()=>import("https://esm.sh/@octokit/plugin-create-or-update-text-file"),[],import.meta.url),r=n.plugin(i),s=new r({auth:t}),a=(await s.request("GET /repos/{owner}/{repo}/collaborators/{username}/permission",{owner:bh,username:e.displayName,repo:vh})).data.permission;if(!(a==="admin"||a==="write"||location.hostname==="localhost"||location.hostname==="127.0.0.1")){ce.trigger({message:"You don't have permission to edit on VPS.",background:"variant-filled-error"});return}yh=s,si.set({user:e,permission:a,token:t}),ce.trigger({message:"Login successfull",background:"variant-filled-success"})}catch(n){console.log(n),ce.trigger({message:"Login was unsuccessfull.",background:"variant-filled-error"})}},Ih=()=>{rf(mo).then(()=>{si.set({}),ce.trigger({message:"Logout successfull",background:"variant-filled-success"})})},on={login:go,logout:Ih,triggerLoginPopup:wh,userStore:si};function Eh(t){let e,n,i,r,s,o,a,c,l,d="Game",u,f="Table",h,g="B2s",_,p="PuP",m,b="Rom",T,A="Topper",y,I="Toppefffffffffr",E;return r=new Oo({props:{icon:Do}}),{c(){e=D("div"),n=D("div"),i=D("div"),ye(r.$$.fragment),s=H(),o=D("input"),a=H(),c=D("select"),l=D("option"),l.textContent=d,u=D("option"),u.textContent=f,h=D("option"),h.textContent=g,_=D("option"),_.textContent=p,m=D("option"),m.textContent=b,T=D("option"),T.textContent=A,y=D("option"),y.textContent=I,this.h()},l(v){e=P(v,"DIV",{class:!0});var R=U(e);n=P(R,"DIV",{class:!0});var S=U(n);i=P(S,"DIV",{});var x=U(i);we(r.$$.fragment,x),x.forEach(k),s=j(S),o=P(S,"INPUT",{type:!0,placeholder:!0}),a=j(S),c=P(S,"SELECT",{class:!0});var V=U(c);l=P(V,"OPTION",{"data-svelte-h":!0}),_e(l)!=="svelte-ua828d"&&(l.textContent=d),u=P(V,"OPTION",{"data-svelte-h":!0}),_e(u)!=="svelte-mq4vnc"&&(u.textContent=f),h=P(V,"OPTION",{"data-svelte-h":!0}),_e(h)!=="svelte-12soh3g"&&(h.textContent=g),_=P(V,"OPTION",{"data-svelte-h":!0}),_e(_)!=="svelte-1jq5q8d"&&(_.textContent=p),m=P(V,"OPTION",{"data-svelte-h":!0}),_e(m)!=="svelte-1t00bes"&&(m.textContent=b),T=P(V,"OPTION",{"data-svelte-h":!0}),_e(T)!=="svelte-r0idhh"&&(T.textContent=A),y=P(V,"OPTION",{"data-svelte-h":!0}),_e(y)!=="svelte-1q14tb1"&&(y.textContent=I),V.forEach(k),S.forEach(k),R.forEach(k),this.h()},h(){w(o,"type","search"),w(o,"placeholder","Search..."),l.__value="1",je(l,l.__value),u.__value="2",je(u,u.__value),h.__value="3",je(h,h.__value),_.__value="4",je(_,_.__value),m.__value="4",je(m,m.__value),T.__value="5",je(T,T.__value),y.__value="5",je(y,y.__value),w(c,"class","select"),w(n,"class","input-group grid-cols-[auto_1fr_auto] border-none"),w(e,"class","px-4")},m(v,R){F(v,e,R),L(e,n),L(n,i),Ie(r,i,null),L(n,s),L(n,o),L(n,a),L(n,c),L(c,l),L(c,u),L(c,h),L(c,_),L(c,m),L(c,T),L(c,y),E=!0},p:te,i(v){E||(O(r.$$.fragment,v),E=!0)},o(v){N(r.$$.fragment,v),E=!1},d(v){v&&k(e),Ee(r)}}}function Th(t){let e,n;return{c(){e=D("img"),this.h()},l(i){e=P(i,"IMG",{src:!0,alt:!0,width:!0,class:!0}),this.h()},h(){Dr(e.src,n=ac)||w(e,"src",n),w(e,"alt","VPS"),w(e,"width","36px"),w(e,"class","ml-4")},m(i,r){F(i,e,r)},p:te,d(i){i&&k(e)}}}function kh(t){let e,n,i,r,s=t[0].user.displayName+"",o,a,c,l;return n=new Kr({props:{src:t[0].user.photoURL||"",width:"w-6",rounded:"rounded-full"}}),{c(){e=D("button"),ye(n.$$.fragment),i=H(),r=D("span"),o=lt(s),this.h()},l(d){e=P(d,"BUTTON",{class:!0});var u=U(e);we(n.$$.fragment,u),i=j(u),r=P(u,"SPAN",{});var f=U(r);o=ut(f,s),f.forEach(k),u.forEach(k),this.h()},h(){w(e,"class","space-x-2 flex items-center")},m(d,u){F(d,e,u),Ie(n,e,null),L(e,i),L(e,r),L(r,o),a=!0,c||(l=Or(pa.call(null,e,t[2])),c=!0)},p(d,u){const f={};u&1&&(f.src=d[0].user.photoURL||""),n.$set(f),(!a||u&1)&&s!==(s=d[0].user.displayName+"")&&Yt(o,s)},i(d){a||(O(n.$$.fragment,d),a=!0)},o(d){N(n.$$.fragment,d),a=!1},d(d){d&&k(e),Ee(n),c=!1,l()}}}function Sh(t){let e,n="Login",i,r;return{c(){e=D("button"),e.textContent=n,this.h()},l(s){e=P(s,"BUTTON",{class:!0,"data-svelte-h":!0}),_e(e)!=="svelte-d4ncwp"&&(e.textContent=n),this.h()},h(){w(e,"class","btn btn-sm variant-ghost-surface")},m(s,o){F(s,e,o),i||(r=ee(e,"click",on.triggerLoginPopup),i=!0)},p:te,i:te,o:te,d(s){s&&k(e),i=!1,r()}}}function Ah(t){let e,n,i,r;const s=[Sh,kh],o=[];function a(c,l){return c[0].user?1:0}return n=a(t),i=o[n]=s[n](t),{c(){e=D("div"),i.c(),this.h()},l(c){e=P(c,"DIV",{slot:!0,class:!0});var l=U(e);i.l(l),l.forEach(k),this.h()},h(){w(e,"slot","trail"),w(e,"class","mr-4")},m(c,l){F(c,e,l),o[n].m(e,null),r=!0},p(c,l){let d=n;n=a(c),n===d?o[n].p(c,l):(Z(),N(o[d],1,1,()=>{o[d]=null}),$(),i=o[n],i?i.p(c,l):(i=o[n]=s[n](c),i.c()),O(i,1),i.m(e,null))},i(c){r||(O(i),r=!0)},o(c){N(i),r=!1},d(c){c&&k(e),o[n].d()}}}function Rh(t){let e,n;return e=new Da({props:{$$slots:{trail:[Ah],lead:[Th],default:[Eh]},$$scope:{ctx:t}}}),{c(){ye(e.$$.fragment)},l(i){we(e.$$.fragment,i)},m(i,r){Ie(e,i,r),n=!0},p(i,[r]){const s={};r&9&&(s.$$scope={dirty:r,ctx:i}),e.$set(s)},i(i){n||(O(e.$$.fragment,i),n=!0)},o(i){N(e.$$.fragment,i),n=!1},d(i){Ee(e,i)}}}function Ch(t,e,n){let i;const{userStore:r}=on;return Mn(t,r,o=>n(0,i=o)),[i,r,{event:"click",target:"popupUser",placement:"bottom"}]}class Oh extends Ve{constructor(e){super(),He(this,e,Ch,Rh,Be,{})}}function Dh(t){var p,m;let e,n,i,r,s,o=((p=t[0].user)==null?void 0:p.displayName)+"",a,c,l,d="Logout",u,f,h,g,_;return i=new Kr({props:{src:((m=t[0].user)==null?void 0:m.photoURL)||"",width:"w-12",rounded:"rounded-full"}}),{c(){e=D("div"),n=D("div"),ye(i.$$.fragment),r=H(),s=D("b"),a=lt(o),c=H(),l=D("button"),l.textContent=d,u=H(),f=D("div"),this.h()},l(b){e=P(b,"DIV",{class:!0,"data-popup":!0});var T=U(e);n=P(T,"DIV",{class:!0});var A=U(n);we(i.$$.fragment,A),r=j(A),s=P(A,"B",{});var y=U(s);a=ut(y,o),y.forEach(k),c=j(A),l=P(A,"BUTTON",{class:!0,"data-svelte-h":!0}),_e(l)!=="svelte-nsylsw"&&(l.textContent=d),A.forEach(k),u=j(T),f=P(T,"DIV",{class:!0}),U(f).forEach(k),T.forEach(k),this.h()},h(){w(l,"class","btn w-full variant-filled-secondary"),w(n,"class","flex flex-col space-y-2"),w(f,"class","arrow bg-surface-100-800-token"),w(e,"class","card p-4 w-72 shadow-xl"),w(e,"data-popup","popupUser")},m(b,T){F(b,e,T),L(e,n),Ie(i,n,null),L(n,r),L(n,s),L(s,a),L(n,c),L(n,l),L(e,u),L(e,f),h=!0,g||(_=ee(l,"click",on.logout),g=!0)},p(b,[T]){var y,I;const A={};T&1&&(A.src=((y=b[0].user)==null?void 0:y.photoURL)||""),i.$set(A),(!h||T&1)&&o!==(o=((I=b[0].user)==null?void 0:I.displayName)+"")&&Yt(a,o)},i(b){h||(O(i.$$.fragment,b),h=!0)},o(b){N(i.$$.fragment,b),h=!1},d(b){b&&k(e),Ee(i),g=!1,_()}}}function Ph(t,e,n){let i;const{userStore:r}=on;return Mn(t,r,s=>n(0,i=s)),[i,r]}class Lh extends Ve{constructor(e){super(),He(this,e,Ph,Dh,Be,{})}}function Nh(t){let e,n;return e=new Lh({}),{c(){ye(e.$$.fragment)},l(i){we(e.$$.fragment,i)},m(i,r){Ie(e,i,r),n=!0},p:te,i(i){n||(O(e.$$.fragment,i),n=!0)},o(i){N(e.$$.fragment,i),n=!1},d(i){Ee(e,i)}}}class Mh extends Ve{constructor(e){super(),He(this,e,null,Nh,Be,{})}}function Uh(t){let e;const n=t[0].default,i=ie(n,t,t[1],null);return{c(){i&&i.c()},l(r){i&&i.l(r)},m(r,s){i&&i.m(r,s),e=!0},p(r,s){i&&i.p&&(!e||s&2)&&re(i,n,r,r[1],e?oe(n,r[1],s,null):se(r[1]),null)},i(r){e||(O(i,r),e=!0)},o(r){N(i,r),e=!1},d(r){i&&i.d(r)}}}function xh(t){let e,n;return e=new Oh({}),{c(){ye(e.$$.fragment)},l(i){we(e.$$.fragment,i)},m(i,r){Ie(e,i,r),n=!0},i(i){n||(O(e.$$.fragment,i),n=!0)},o(i){N(e.$$.fragment,i),n=!1},d(i){Ee(e,i)}}}function Fh(t){let e,n,i,r,s,o;return e=new Mh({}),i=new oc({}),s=new Ga({props:{$$slots:{header:[xh],default:[Uh]},$$scope:{ctx:t}}}),{c(){ye(e.$$.fragment),n=H(),ye(i.$$.fragment),r=H(),ye(s.$$.fragment)},l(a){we(e.$$.fragment,a),n=j(a),we(i.$$.fragment,a),r=j(a),we(s.$$.fragment,a)},m(a,c){Ie(e,a,c),F(a,n,c),Ie(i,a,c),F(a,r,c),Ie(s,a,c),o=!0},p(a,[c]){const l={};c&2&&(l.$$scope={dirty:c,ctx:a}),s.$set(l)},i(a){o||(O(e.$$.fragment,a),O(i.$$.fragment,a),O(s.$$.fragment,a),o=!0)},o(a){N(e.$$.fragment,a),N(i.$$.fragment,a),N(s.$$.fragment,a),o=!1},d(a){a&&(k(n),k(r)),Ee(e,a),Ee(i,a),Ee(s,a)}}}function Bh(t,e,n){let{$$slots:i={},$$scope:r}=e;return qr.set({computePosition:ha,autoUpdate:fa,offset:Ko,shift:Jo,flip:qo,arrow:zo}),yo(()=>{Po.fetchDb()}),t.$$set=s=>{"$$scope"in s&&n(1,r=s.$$scope)},[i,r]}class Kh extends Ve{constructor(e){super(),He(this,e,Bh,Fh,Be,{})}}export{Kh as component,Gh as universal};
