(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{4875:function(t,r){var n;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var e={}.hasOwnProperty;function o(){for(var t=[],r=0;r<arguments.length;r++){var n=arguments[r];if(n){var a=typeof n;if("string"===a||"number"===a)t.push(n);else if(Array.isArray(n)){if(n.length){var i=o.apply(null,n);i&&t.push(i)}}else if("object"===a){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){t.push(n.toString());continue}for(var c in n)e.call(n,c)&&n[c]&&t.push(c)}}}return t.join(" ")}t.exports?(o.default=o,t.exports=o):void 0!==(n=(function(){return o}).apply(r,[]))&&(t.exports=n)}()},4396:function(t,r,n){var e=n(9165).Symbol;t.exports=e},9809:function(t,r,n){var e=n(9739),o=n(353),a=n(4669),i=n(1563),c=n(1010),u=n(3806),f=Object.prototype.hasOwnProperty;t.exports=function(t,r){var n=a(t),l=!n&&o(t),s=!n&&!l&&i(t),v=!n&&!l&&!s&&u(t),p=n||l||s||v,d=p?e(t.length,String):[],y=d.length;for(var b in t)(r||f.call(t,b))&&!(p&&("length"==b||s&&("offset"==b||"parent"==b)||v&&("buffer"==b||"byteLength"==b||"byteOffset"==b)||c(b,y)))&&d.push(b);return d}},5697:function(t){t.exports=function(t,r){for(var n=-1,e=null==t?0:t.length,o=Array(e);++n<e;)o[n]=r(t[n],n,t);return o}},4229:function(t,r,n){var e=n(7017);t.exports=function(t){var r=t.length;return r?t[e(0,r-1)]:void 0}},1800:function(t,r,n){var e=n(7165),o=n(4214);t.exports=function(t){return o(e(t))}},4527:function(t){t.exports=function(t,r,n){return t==t&&(void 0!==n&&(t=t<=n?t:n),void 0!==r&&(t=t>=r?t:r)),t}},732:function(t,r,n){var e=n(4396),o=n(1239),a=n(7058),i=e?e.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":i&&i in Object(t)?o(t):a(t)}},4742:function(t,r,n){var e=n(732),o=n(5073);t.exports=function(t){return o(t)&&"[object Arguments]"==e(t)}},2882:function(t,r,n){var e=n(732),o=n(7216),a=n(5073),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,t.exports=function(t){return a(t)&&o(t.length)&&!!i[e(t)]}},7473:function(t,r,n){var e=n(2963),o=n(4457),a=Object.prototype.hasOwnProperty;t.exports=function(t){if(!e(t))return o(t);var r=[];for(var n in Object(t))a.call(t,n)&&"constructor"!=n&&r.push(n);return r}},7017:function(t){var r=Math.floor,n=Math.random;t.exports=function(t,e){return t+r(n()*(e-t+1))}},3381:function(t,r,n){var e=n(4229),o=n(1017);t.exports=function(t){return e(o(t))}},1724:function(t,r,n){var e=n(4214),o=n(1017);t.exports=function(t){return e(o(t))}},9739:function(t){t.exports=function(t,r){for(var n=-1,e=Array(t);++n<t;)e[n]=r(n);return e}},3124:function(t,r,n){var e=n(2996),o=/^\s+/;t.exports=function(t){return t?t.slice(0,e(t)+1).replace(o,""):t}},8792:function(t){t.exports=function(t){return function(r){return t(r)}}},4290:function(t,r,n){var e=n(5697);t.exports=function(t,r){return e(r,function(r){return t[r]})}},7165:function(t){t.exports=function(t,r){var n=-1,e=t.length;for(r||(r=Array(e));++n<e;)r[n]=t[n];return r}},6476:function(t,r,n){var e="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;t.exports=e},1239:function(t,r,n){var e=n(4396),o=Object.prototype,a=o.hasOwnProperty,i=o.toString,c=e?e.toStringTag:void 0;t.exports=function(t){var r=a.call(t,c),n=t[c];try{t[c]=void 0;var e=!0}catch(t){}var o=i.call(t);return e&&(r?t[c]=n:delete t[c]),o}},1010:function(t){var r=/^(?:0|[1-9]\d*)$/;t.exports=function(t,n){var e=typeof t;return!!(n=null==n?9007199254740991:n)&&("number"==e||"symbol"!=e&&r.test(t))&&t>-1&&t%1==0&&t<n}},7616:function(t,r,n){var e=n(2448),o=n(7428),a=n(1010),i=n(6838);t.exports=function(t,r,n){if(!i(n))return!1;var c=typeof r;return("number"==c?!!(o(n)&&a(r,n.length)):"string"==c&&r in n)&&e(n[r],t)}},2963:function(t){var r=Object.prototype;t.exports=function(t){var n=t&&t.constructor,e="function"==typeof n&&n.prototype||r;return t===e}},4457:function(t,r,n){var e=n(5542)(Object.keys,Object);t.exports=e},8478:function(t,r,n){t=n.nmd(t);var e=n(6476),o=r&&!r.nodeType&&r,a=o&&t&&!t.nodeType&&t,i=a&&a.exports===o&&e.process,c=function(){try{var t=a&&a.require&&a.require("util").types;if(t)return t;return i&&i.binding&&i.binding("util")}catch(t){}}();t.exports=c},7058:function(t){var r=Object.prototype.toString;t.exports=function(t){return r.call(t)}},5542:function(t){t.exports=function(t,r){return function(n){return t(r(n))}}},9165:function(t,r,n){var e=n(6476),o="object"==typeof self&&self&&self.Object===Object&&self,a=e||o||Function("return this")();t.exports=a},4214:function(t,r,n){var e=n(7017);t.exports=function(t,r){var n=-1,o=t.length,a=o-1;for(r=void 0===r?o:r;++n<r;){var i=e(n,a),c=t[i];t[i]=t[n],t[n]=c}return t.length=r,t}},2996:function(t){var r=/\s/;t.exports=function(t){for(var n=t.length;n--&&r.test(t.charAt(n)););return n}},5636:function(t,r,n){var e=n(4527),o=n(2931);t.exports=function(t,r,n){return void 0===n&&(n=r,r=void 0),void 0!==n&&(n=(n=o(n))==n?n:0),void 0!==r&&(r=(r=o(r))==r?r:0),e(o(t),r,n)}},2448:function(t){t.exports=function(t,r){return t===r||t!=t&&r!=r}},353:function(t,r,n){var e=n(4742),o=n(5073),a=Object.prototype,i=a.hasOwnProperty,c=a.propertyIsEnumerable,u=e(function(){return arguments}())?e:function(t){return o(t)&&i.call(t,"callee")&&!c.call(t,"callee")};t.exports=u},4669:function(t){var r=Array.isArray;t.exports=r},7428:function(t,r,n){var e=n(2042),o=n(7216);t.exports=function(t){return null!=t&&o(t.length)&&!e(t)}},1563:function(t,r,n){t=n.nmd(t);var e=n(9165),o=n(4193),a=r&&!r.nodeType&&r,i=a&&t&&!t.nodeType&&t,c=i&&i.exports===a?e.Buffer:void 0,u=c?c.isBuffer:void 0;t.exports=u||o},2042:function(t,r,n){var e=n(732),o=n(6838);t.exports=function(t){if(!o(t))return!1;var r=e(t);return"[object Function]"==r||"[object GeneratorFunction]"==r||"[object AsyncFunction]"==r||"[object Proxy]"==r}},7216:function(t){t.exports=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}},6838:function(t){t.exports=function(t){var r=typeof t;return null!=t&&("object"==r||"function"==r)}},5073:function(t){t.exports=function(t){return null!=t&&"object"==typeof t}},6764:function(t,r,n){var e=n(732),o=n(5073);t.exports=function(t){return"symbol"==typeof t||o(t)&&"[object Symbol]"==e(t)}},3806:function(t,r,n){var e=n(2882),o=n(8792),a=n(8478),i=a&&a.isTypedArray,c=i?o(i):e;t.exports=c},579:function(t,r,n){var e=n(9809),o=n(7473),a=n(7428);t.exports=function(t){return a(t)?e(t):o(t)}},1102:function(t,r,n){var e=n(7017),o=n(7616),a=n(986),i=parseFloat,c=Math.min,u=Math.random;t.exports=function(t,r,n){if(n&&"boolean"!=typeof n&&o(t,r,n)&&(r=n=void 0),void 0===n&&("boolean"==typeof r?(n=r,r=void 0):"boolean"==typeof t&&(n=t,t=void 0)),void 0===t&&void 0===r?(t=0,r=1):(t=a(t),void 0===r?(r=t,t=0):r=a(r)),t>r){var f=t;t=r,r=f}if(n||t%1||r%1){var l=u();return c(t+l*(r-t+i("1e-"+((l+"").length-1))),r)}return e(t,r)}},2052:function(t,r,n){var e=n(4229),o=n(3381),a=n(4669);t.exports=function(t){return(a(t)?e:o)(t)}},492:function(t,r,n){var e=n(1800),o=n(1724),a=n(4669);t.exports=function(t){return(a(t)?e:o)(t)}},4193:function(t){t.exports=function(){return!1}},986:function(t,r,n){var e=n(2931),o=1/0;t.exports=function(t){return t?(t=e(t))===o||t===-o?(t<0?-1:1)*17976931348623157e292:t==t?t:0:0===t?t:0}},2931:function(t,r,n){var e=n(3124),o=n(6838),a=n(6764),i=0/0,c=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,f=/^0o[0-7]+$/i,l=parseInt;t.exports=function(t){if("number"==typeof t)return t;if(a(t))return i;if(o(t)){var r="function"==typeof t.valueOf?t.valueOf():t;t=o(r)?r+"":r}if("string"!=typeof t)return 0===t?t:+t;t=e(t);var n=u.test(t);return n||f.test(t)?l(t.slice(2),n?2:8):c.test(t)?i:+t}},1017:function(t,r,n){var e=n(4290),o=n(579);t.exports=function(t){return null==t?[]:e(t,o(t))}},410:function(t,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(1157)}])},1157:function(t,r,n){"use strict";n.r(r),n.d(r,{default:function(){return I}});var e=n(1527),o=n(959);function a(t){var r=t.match(/^var\((.*)\)$/);return r?r[1]:t}function i(t,r){var n=t;for(var e of r){if(!(e in n))throw Error("Path ".concat(r.join(" -> ")," does not exist in object"));n=n[e]}return n}function c(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],e=t.constructor();for(var o in t){var a=t[o],i=[...n,o];"string"==typeof a||"number"==typeof a||null==a?e[o]=r(a,i):"object"!=typeof a||Array.isArray(a)?console.warn('Skipping invalid key "'.concat(i.join("."),'". Should be a string, number, null or object. Received: "').concat(Array.isArray(a)?"Array":typeof a,'"')):e[o]=c(a,r,i)}return e}function u(t,r,n){t.style.setProperty(a(r),n)}function f(t,r,n){if("object"==typeof n)c(n,(n,e)=>{u(t,i(r,e),String(n))});else for(var e in r)u(t,e,r[e])}var l=n(4875),s=n.n(l),v=n(2052),p=n.n(v),d=n(1102),y=n.n(d),b=n(492),x=n.n(b);n(2969),n(7220);var g="var(--growingLeafVar__13ydx6w3)",h={rightScale:.8513454738749322,leftScale:.5246054556642229,rightAngle:31.64168652012685,leftAngle:58.358313479873146,polarityX:-.4495782317746656,polarityY:.8932409604996655,visualTargetX:12,visualTargetY:12};let j=o.memo(t=>{let{orientation:r,level:n=0}=t,[u,f]=(0,o.useState)([]),l=(0,o.useMemo)(()=>Math.pow(.87,n),[]),v=(0,o.useMemo)(()=>0===n?"root-node":"Node-".concat(n,"-").concat("right"==r?0:1),[]);return(0,o.useEffect)(()=>{let t=[];if(n<5){let r=y()(333,555),[n,e]=x()(["left","right"]);t=[setTimeout(()=>{f([n])},r),setTimeout(()=>{f([n,e])},y()(r,777))]}return()=>{t.forEach(t=>clearTimeout(t))}},[]),(0,e.jsx)("div",{className:s()("leaf_leaf__edrx7b5",r?"right"===r?"leaf_rightLeaf__edrx7b4":"leaf_leftLeaf__edrx7b3":""),id:v,style:function(t,r){var n={};if("object"==typeof r)c(r,(r,e)=>{n[a(i(t,e))]=String(r)});else for(var e in t)n[a(e)]=t[e];return Object.defineProperty(n,"toString",{value:function(){return Object.keys(this).map(t=>"".concat(t,":").concat(this[t])).join(";")},writable:!1}),n}({"var(--coefficientVar__edrx7b0)":l.toString(),"var(--leafBackgroundVar__13ydx6w5)":u.length<2?g:"var(--fullLeafVar__13ydx6w4)"}),children:(0,e.jsx)("div",{className:"leaf_leafInner__edrx7b2",children:u.map(t=>(0,e.jsx)(j,{orientation:t,level:n+1},t))})})});var _=n(5636),w=n.n(_);let m={canvasToBaseNodeRatio:.125,pageToCanvasRatio:.65,defaultFractal:{rightScale:.9371561629564998,leftScale:.3489101979487707,rightAngle:20.42067243832907,leftAngle:69.57932756167094,polarityX:-.7565233475346995,polarityY:.6539666846521254}},A=t=>t*Math.PI/180,O=t=>t/Math.PI*180,S=(t,r,n)=>{let e=E(n),o=r-e.top,a=t-(e.left+e.width/2),i=O(Math.asin(Math.abs(o)/Math.sqrt(o*o+a*a))),c=a>0?180-i:i,u=180-c,f=Math.sin(A(u))*Math.sign(-o),l=Math.cos(A(u)),s=w()(c,30,150),v=(180-s)/2,p=s/2,d=Math.sin(A(v)),y=Math.sin(A(p)),b=w()((t-n.left)/n.width*100,0,100),x=w()((r-n.top)/n.width*100,0,100);return{rightScale:d,leftScale:y,rightAngle:p,leftAngle:v,polarityX:l,polarityY:f,visualTargetX:b,visualTargetY:x}},E=t=>{let r=t.width*m.canvasToBaseNodeRatio;return{top:t.top+t.width-r,left:t.left+t.width/2-r/2,width:r}},T=t=>({"var(--leftScaleVar__13ydx6w8)":"".concat(t.leftScale),"var(--rightScaleVar__13ydx6w9)":"".concat(t.rightScale),"var(--leftAngleVar__13ydx6wa)":"".concat(t.leftAngle,"deg"),"var(--rightAngleVar__13ydx6wb)":"".concat(t.rightAngle,"deg"),"var(--polarityXVar__13ydx6wc)":"".concat(t.polarityX),"var(--polarityYVar__13ydx6wd)":"".concat(t.polarityY),"var(--visualXVar__13ydx6we)":"".concat(t.visualTargetX,"%"),"var(--visualYVar__13ydx6wf)":"".concat(t.visualTargetY,"%")}),N=["var(--leafyGreenVar__13ydx6w0)","var(--pinkRedVar__13ydx6w1)","var(--mudPurpleVar__13ydx6w2)"],M=()=>p()(N),k=!0,V=!0,P=t=>{t.current&&f(t.current,{[g]:M()})},L=()=>({...h}),C=L(),R=()=>{let t=(0,o.useRef)(null),r=(0,o.useRef)(!1),[n,a]=(0,o.useState)(!0),i=(0,o.useCallback)(()=>{k&&(t.current&&f(t.current,T(C)),k=!1),V&&window.requestAnimationFrame(i)},[]),c=(0,o.useCallback)(e=>{var o,i;k=!0,r.current=!0,n&&a(!1),Object.assign(C,S(e.clientX,e.clientY,null!==(i=null===(o=t.current)||void 0===o?void 0:o.getBoundingClientRect())&&void 0!==i?i:{}))},[n]),u=(0,o.useCallback)(n=>{if(r.current){var e,o;k=!0,Object.assign(C,S(n.clientX,n.clientY,null!==(o=null===(e=t.current)||void 0===e?void 0:e.getBoundingClientRect())&&void 0!==o?o:{}))}},[]),l=(0,o.useCallback)(()=>{r.current=!1},[]);return(0,o.useEffect)(()=>(Object.assign(C,L()),k=!0,V=!0,P(t),i(),window.addEventListener("pointerdown",c),window.addEventListener("pointermove",u),window.addEventListener("pointerup",l),()=>{window.removeEventListener("pointerup",c),window.removeEventListener("pointermove",u),window.removeEventListener("pointerdown",l),r.current=!1,k=!1,V=!1}),[]),(0,e.jsx)("div",{id:"canvas",className:"".concat("fractal_fractalVars__13ydx6wi"," ").concat("fractal_canvas__13ydx6wj"),ref:t,children:(0,e.jsxs)("div",{className:"fractal_canvasInner__13ydx6wm",children:[(0,e.jsx)("div",{id:"base",className:"fractal_base__13ydx6wn",children:(0,e.jsx)(j,{})}),(0,e.jsx)("div",{id:"visualTarget",className:"fractal_visualTarget__13ydx6wo",children:(0,e.jsx)("div",{className:"fractal_targetBall__13ydx6wq",children:(0,e.jsx)("div",{className:s()("fractal_ballInner__13ydx6wr",{hidden:!n})})})})]})})};var X=n(1638);n(9468);let B=()=>{(0,X.useRouter)();let t=(0,o.useCallback)(()=>{console.log("nothing happened, on purpose")},[]);return(0,o.useEffect)(()=>(window.addEventListener("dblclick",t),()=>{window.removeEventListener("dblclick",t)}),[t]),(0,e.jsx)("div",{className:"home-page_homePage__111jgtc0",children:(0,e.jsx)("div",{className:"home-page_canvasOuter__111jgtc1",children:(0,e.jsx)(R,{})})})},F=()=>(0,e.jsx)(B,{});var I=F},2969:function(){},7220:function(){},9468:function(){}},function(t){t.O(0,[774,888,179],function(){return t(t.s=410)}),_N_E=t.O()}]);