(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{5938:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(3539)}])},9700:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9060:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(1322).Z,o=n(6239).Z,l=r(n(959)),u=n(1410),i=n(5007),a=n(3233),f=n(7257),c=n(4802),s=n(7768),d=n(2066),p=n(7479),h=n(9700),v=n(8434);let y=new Set;function b(e,t,n,r,o){if(o||i.isLocalURL(t)){if(!r.bypassPrefetchedCheck){let o=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,l=t+"%"+n+"%"+o;if(y.has(l))return;y.add(l)}Promise.resolve(e.prefetch(t,n,r)).catch(e=>{})}}function g(e){return"string"==typeof e?e:a.formatUrl(e)}let j=l.default.forwardRef(function(e,t){let n,r;let{href:a,as:y,children:j,prefetch:_,passHref:m,replace:x,shallow:C,scroll:E,locale:D,onClick:M,onMouseEnter:k,onTouchStart:P,legacyBehavior:w=!1}=e,O=o(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=j,w&&("string"==typeof n||"number"==typeof n)&&(n=l.default.createElement("a",null,n));let R=!1!==_,T=l.default.useContext(s.RouterContext),I=l.default.useContext(d.AppRouterContext),L=null!=T?T:I,A=!T,{href:S,as:N}=l.default.useMemo(()=>{if(!T){let e=g(a);return{href:e,as:y?g(y):e}}let[e,t]=u.resolveHref(T,a,!0);return{href:e,as:y?u.resolveHref(T,y):t||e}},[T,a,y]),U=l.default.useRef(S),H=l.default.useRef(N);w&&(r=l.default.Children.only(n));let F=w?r&&"object"==typeof r&&r.ref:t,[K,B,X]=p.useIntersection({rootMargin:"200px"}),Z=l.default.useCallback(e=>{(H.current!==N||U.current!==S)&&(X(),H.current=N,U.current=S),K(e),F&&("function"==typeof F?F(e):"object"==typeof F&&(F.current=e))},[N,F,S,X,K]);l.default.useEffect(()=>{L&&B&&R&&b(L,S,N,{locale:D},A)},[N,S,B,D,R,null==T?void 0:T.locale,L,A]);let q={ref:Z,onClick(e){w||"function"!=typeof M||M(e),w&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),L&&!e.defaultPrevented&&function(e,t,n,r,o,u,a,f,c,s){let{nodeName:d}=e.currentTarget,p="A"===d.toUpperCase();if(p&&(function(e){let t=e.currentTarget,n=t.getAttribute("target");return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!c&&!i.isLocalURL(n)))return;e.preventDefault();let h=()=>{"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:u,locale:f,scroll:a}):t[o?"replace":"push"](r||n,{forceOptimisticNavigation:!s})};c?l.default.startTransition(h):h()}(e,L,S,N,x,C,E,D,A,R)},onMouseEnter(e){w||"function"!=typeof k||k(e),w&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),L&&(R||!A)&&b(L,S,N,{locale:D,priority:!0,bypassPrefetchedCheck:!0},A)},onTouchStart(e){w||"function"!=typeof P||P(e),w&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),L&&(R||!A)&&b(L,S,N,{locale:D,priority:!0,bypassPrefetchedCheck:!0},A)}};if(f.isAbsoluteUrl(N))q.href=N;else if(!w||m||"a"===r.type&&!("href"in r.props)){let e=void 0!==D?D:null==T?void 0:T.locale,t=(null==T?void 0:T.isLocaleDomain)&&h.getDomainLocale(N,e,null==T?void 0:T.locales,null==T?void 0:T.domainLocales);q.href=t||v.addBasePath(c.addLocale(N,e,null==T?void 0:T.defaultLocale))}return w?l.default.cloneElement(r,q):l.default.createElement("a",Object.assign({},O,q),n)});t.default=j,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7479:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){let{rootRef:t,rootMargin:n,disabled:a}=e,f=a||!l,[c,s]=r.useState(!1),d=r.useRef(null),p=r.useCallback(e=>{d.current=e},[]);r.useEffect(()=>{if(l){if(f||c)return;let e=d.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:o,elements:l}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=i.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=u.get(r)))return t;let o=new Map,l=new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:l,elements:o},i.push(n),u.set(n,t),t}(n);return l.set(e,t),o.observe(e),function(){if(l.delete(e),o.unobserve(e),0===l.size){o.disconnect(),u.delete(r);let e=i.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&i.splice(e,1)}}}(e,e=>e&&s(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!c){let e=o.requestIdleCallback(()=>s(!0));return()=>o.cancelIdleCallback(e)}},[f,n,t,c,d.current]);let h=r.useCallback(()=>{s(!1)},[]);return[p,c,h]};var r=n(959),o=n(1138);let l="function"==typeof IntersectionObserver,u=new Map,i=[];("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3539:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(1527),o=n(959),l=n(7048),u=n.n(l),i=n(1638),a=n(9532),f=n.n(a);let c=e=>{let{children:t}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("nav",{children:[(0,r.jsx)("p",{children:"\uD83D\uDEA7\uD83C\uDFD7️ Under heavy construction \uD83C\uDFD7️\uD83D\uDEA7 Please be careful \uD83D\uDEA7"}),(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:(0,r.jsx)(f(),{href:"/",children:"Home"})}),(0,r.jsx)("li",{children:(0,r.jsx)(f(),{href:"/playground",children:"Playground"})}),(0,r.jsx)("li",{children:(0,r.jsx)(f(),{href:"/resume",children:"Resum\xe9"})})]})]}),(0,r.jsx)("main",{children:t})]})},s=()=>{};function d(e){let{Component:t,pageProps:n}=e,l=(0,i.useRouter)();return(0,o.useEffect)(()=>(l.events.on("routeChangeComplete",s),()=>{l.events.off("routeChangeComplete",s)}),[l.events]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(u(),{children:[(0,r.jsx)("title",{children:"Abderrahmane TAHRI JOUTI"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width,initial-scale=1,shrink-to-fit=no"})]}),(0,r.jsx)(c,{children:(0,r.jsx)(t,{...n})})]})}n(6712)},6712:function(){},7048:function(e,t,n){e.exports=n(3345)},9532:function(e,t,n){e.exports=n(9060)},1638:function(e,t,n){e.exports=n(5552)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(5938),t(5552)}),_N_E=e.O()}]);