(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{4875:function(t,r){var e;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var t=[],r=0;r<arguments.length;r++){var e=arguments[r];if(e){var a=typeof e;if("string"===a||"number"===a)t.push(e);else if(Array.isArray(e)){if(e.length){var i=o.apply(null,e);i&&t.push(i)}}else if("object"===a){if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]")){t.push(e.toString());continue}for(var c in e)n.call(e,c)&&e[c]&&t.push(c)}}}return t.join(" ")}t.exports?(o.default=o,t.exports=o):void 0!==(e=(function(){return o}).apply(r,[]))&&(t.exports=e)}()},4396:function(t,r,e){var n=e(9165).Symbol;t.exports=n},9809:function(t,r,e){var n=e(9739),o=e(353),a=e(4669),i=e(1563),c=e(1010),u=e(3806),f=Object.prototype.hasOwnProperty;t.exports=function(t,r){var e=a(t),l=!e&&o(t),s=!e&&!l&&i(t),p=!e&&!l&&!s&&u(t),v=e||l||s||p,d=v?n(t.length,String):[],y=d.length;for(var b in t)(r||f.call(t,b))&&!(v&&("length"==b||s&&("offset"==b||"parent"==b)||p&&("buffer"==b||"byteLength"==b||"byteOffset"==b)||c(b,y)))&&d.push(b);return d}},5697:function(t){t.exports=function(t,r){for(var e=-1,n=null==t?0:t.length,o=Array(n);++e<n;)o[e]=r(t[e],e,t);return o}},4229:function(t,r,e){var n=e(7017);t.exports=function(t){var r=t.length;return r?t[n(0,r-1)]:void 0}},1800:function(t,r,e){var n=e(7165),o=e(4214);t.exports=function(t){return o(n(t))}},4527:function(t){t.exports=function(t,r,e){return t==t&&(void 0!==e&&(t=t<=e?t:e),void 0!==r&&(t=t>=r?t:r)),t}},732:function(t,r,e){var n=e(4396),o=e(1239),a=e(7058),i=n?n.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":i&&i in Object(t)?o(t):a(t)}},4742:function(t,r,e){var n=e(732),o=e(5073);t.exports=function(t){return o(t)&&"[object Arguments]"==n(t)}},2882:function(t,r,e){var n=e(732),o=e(7216),a=e(5073),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,t.exports=function(t){return a(t)&&o(t.length)&&!!i[n(t)]}},7473:function(t,r,e){var n=e(2963),o=e(4457),a=Object.prototype.hasOwnProperty;t.exports=function(t){if(!n(t))return o(t);var r=[];for(var e in Object(t))a.call(t,e)&&"constructor"!=e&&r.push(e);return r}},7017:function(t){var r=Math.floor,e=Math.random;t.exports=function(t,n){return t+r(e()*(n-t+1))}},3381:function(t,r,e){var n=e(4229),o=e(1017);t.exports=function(t){return n(o(t))}},1724:function(t,r,e){var n=e(4214),o=e(1017);t.exports=function(t){return n(o(t))}},9739:function(t){t.exports=function(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n}},3124:function(t,r,e){var n=e(2996),o=/^\s+/;t.exports=function(t){return t?t.slice(0,n(t)+1).replace(o,""):t}},8792:function(t){t.exports=function(t){return function(r){return t(r)}}},4290:function(t,r,e){var n=e(5697);t.exports=function(t,r){return n(r,function(r){return t[r]})}},7165:function(t){t.exports=function(t,r){var e=-1,n=t.length;for(r||(r=Array(n));++e<n;)r[e]=t[e];return r}},6476:function(t,r,e){var n="object"==typeof e.g&&e.g&&e.g.Object===Object&&e.g;t.exports=n},1239:function(t,r,e){var n=e(4396),o=Object.prototype,a=o.hasOwnProperty,i=o.toString,c=n?n.toStringTag:void 0;t.exports=function(t){var r=a.call(t,c),e=t[c];try{t[c]=void 0;var n=!0}catch(o){}var u=i.call(t);return n&&(r?t[c]=e:delete t[c]),u}},1010:function(t){var r=/^(?:0|[1-9]\d*)$/;t.exports=function(t,e){var n=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==n||"symbol"!=n&&r.test(t))&&t>-1&&t%1==0&&t<e}},7616:function(t,r,e){var n=e(2448),o=e(7428),a=e(1010),i=e(6838);t.exports=function(t,r,e){if(!i(e))return!1;var c=typeof r;return("number"==c?!!(o(e)&&a(r,e.length)):"string"==c&&r in e)&&n(e[r],t)}},2963:function(t){var r=Object.prototype;t.exports=function(t){var e=t&&t.constructor,n="function"==typeof e&&e.prototype||r;return t===n}},4457:function(t,r,e){var n=e(5542)(Object.keys,Object);t.exports=n},8478:function(t,r,e){t=e.nmd(t);var n=e(6476),o=r&&!r.nodeType&&r,a=o&&t&&!t.nodeType&&t,i=a&&a.exports===o&&n.process,c=function(){try{var t=a&&a.require&&a.require("util").types;if(t)return t;return i&&i.binding&&i.binding("util")}catch(r){}}();t.exports=c},7058:function(t){var r=Object.prototype.toString;t.exports=function(t){return r.call(t)}},5542:function(t){t.exports=function(t,r){return function(e){return t(r(e))}}},9165:function(t,r,e){var n=e(6476),o="object"==typeof self&&self&&self.Object===Object&&self,a=n||o||Function("return this")();t.exports=a},4214:function(t,r,e){var n=e(7017);t.exports=function(t,r){var e=-1,o=t.length,a=o-1;for(r=void 0===r?o:r;++e<r;){var i=n(e,a),c=t[i];t[i]=t[e],t[e]=c}return t.length=r,t}},2996:function(t){var r=/\s/;t.exports=function(t){for(var e=t.length;e--&&r.test(t.charAt(e)););return e}},5636:function(t,r,e){var n=e(4527),o=e(2931);t.exports=function(t,r,e){return void 0===e&&(e=r,r=void 0),void 0!==e&&(e=(e=o(e))==e?e:0),void 0!==r&&(r=(r=o(r))==r?r:0),n(o(t),r,e)}},2448:function(t){t.exports=function(t,r){return t===r||t!=t&&r!=r}},353:function(t,r,e){var n=e(4742),o=e(5073),a=Object.prototype,i=a.hasOwnProperty,c=a.propertyIsEnumerable,u=n(function(){return arguments}())?n:function(t){return o(t)&&i.call(t,"callee")&&!c.call(t,"callee")};t.exports=u},4669:function(t){var r=Array.isArray;t.exports=r},7428:function(t,r,e){var n=e(2042),o=e(7216);t.exports=function(t){return null!=t&&o(t.length)&&!n(t)}},1563:function(t,r,e){t=e.nmd(t);var n=e(9165),o=e(4193),a=r&&!r.nodeType&&r,i=a&&t&&!t.nodeType&&t,c=i&&i.exports===a?n.Buffer:void 0,u=c?c.isBuffer:void 0;t.exports=u||o},2042:function(t,r,e){var n=e(732),o=e(6838);t.exports=function(t){if(!o(t))return!1;var r=n(t);return"[object Function]"==r||"[object GeneratorFunction]"==r||"[object AsyncFunction]"==r||"[object Proxy]"==r}},7216:function(t){t.exports=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}},6838:function(t){t.exports=function(t){var r=typeof t;return null!=t&&("object"==r||"function"==r)}},5073:function(t){t.exports=function(t){return null!=t&&"object"==typeof t}},6764:function(t,r,e){var n=e(732),o=e(5073);t.exports=function(t){return"symbol"==typeof t||o(t)&&"[object Symbol]"==n(t)}},3806:function(t,r,e){var n=e(2882),o=e(8792),a=e(8478),i=a&&a.isTypedArray,c=i?o(i):n;t.exports=c},579:function(t,r,e){var n=e(9809),o=e(7473),a=e(7428);t.exports=function(t){return a(t)?n(t):o(t)}},1102:function(t,r,e){var n=e(7017),o=e(7616),a=e(986),i=parseFloat,c=Math.min,u=Math.random;t.exports=function(t,r,e){if(e&&"boolean"!=typeof e&&o(t,r,e)&&(r=e=void 0),void 0===e&&("boolean"==typeof r?(e=r,r=void 0):"boolean"==typeof t&&(e=t,t=void 0)),void 0===t&&void 0===r?(t=0,r=1):(t=a(t),void 0===r?(r=t,t=0):r=a(r)),t>r){var f=t;t=r,r=f}if(e||t%1||r%1){var l=u();return c(t+l*(r-t+i("1e-"+((l+"").length-1))),r)}return n(t,r)}},2052:function(t,r,e){var n=e(4229),o=e(3381),a=e(4669);t.exports=function(t){return(a(t)?n:o)(t)}},492:function(t,r,e){var n=e(1800),o=e(1724),a=e(4669);t.exports=function(t){return(a(t)?n:o)(t)}},4193:function(t){t.exports=function(){return!1}},986:function(t,r,e){var n=e(2931),o=1/0;t.exports=function(t){return t?(t=n(t))===o||t===-o?(t<0?-1:1)*17976931348623157e292:t==t?t:0:0===t?t:0}},2931:function(t,r,e){var n=e(3124),o=e(6838),a=e(6764),i=0/0,c=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,f=/^0o[0-7]+$/i,l=parseInt;t.exports=function(t){if("number"==typeof t)return t;if(a(t))return i;if(o(t)){var r="function"==typeof t.valueOf?t.valueOf():t;t=o(r)?r+"":r}if("string"!=typeof t)return 0===t?t:+t;t=n(t);var e=u.test(t);return e||f.test(t)?l(t.slice(2),e?2:8):c.test(t)?i:+t}},1017:function(t,r,e){var n=e(4290),o=e(579);t.exports=function(t){return null==t?[]:n(t,o(t))}},7700:function(t,r,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(8039)}])},8039:function(t,r,e){"use strict";e.r(r),e.d(r,{default:function(){return L}});var n=e(1527),o=e(959);function a(t){var r=t.match(/^var\((.*)\)$/);return r?r[1]:t}function i(t,r){var e=t;for(var n of r){if(!(n in e))throw Error("Path ".concat(r.join(" -> ")," does not exist in object"));e=e[n]}return e}function c(t,r){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=t.constructor();for(var o in t){var a=t[o],i=[...e,o];"string"==typeof a||"number"==typeof a||null==a?n[o]=r(a,i):"object"!=typeof a||Array.isArray(a)?console.warn('Skipping invalid key "'.concat(i.join("."),'". Should be a string, number, null or object. Received: "').concat(Array.isArray(a)?"Array":typeof a,'"')):n[o]=c(a,r,i)}return n}function u(t,r,e){t.style.setProperty(a(r),e)}function f(t,r,e){if("object"==typeof e)c(e,(e,n)=>{u(t,i(r,n),String(e))});else for(var n in r)u(t,n,r[n])}var l=e(1102),s=e.n(l),p=e(492),v=e.n(p),d=e(4875),y=e.n(d);e(9806),e(7206),e(4583);var b="var(--growingLeafVar__13ydx6w3)";let x=o.memo(t=>{let{orientation:r,level:e=0}=t,[u,f]=(0,o.useState)([]),l=(0,o.useMemo)(()=>Math.pow(.87,e),[]),p=(0,o.useMemo)(()=>0===e?"root-node":"Node-".concat(e,"-").concat("right"==r?0:1),[]);return(0,o.useEffect)(()=>{let t=[];if(e<5){let r=s()(333,555),[n,o]=v()(["left","right"]);t=[setTimeout(()=>{f([n])},r),setTimeout(()=>{f([n,o])},s()(r,777))]}return()=>{t.forEach(t=>clearTimeout(t))}},[]),(0,n.jsx)("div",{className:y()("leaf_leaf__edrx7b5",r?"right"===r?"leaf_rightLeaf__edrx7b4":"leaf_leftLeaf__edrx7b3":""),id:p,style:function(t,r){var e={};if("object"==typeof r)c(r,(r,n)=>{e[a(i(t,n))]=String(r)});else for(var n in t)e[a(n)]=t[n];return Object.defineProperty(e,"toString",{value:function(){return Object.keys(this).map(t=>"".concat(t,":").concat(this[t])).join(";")},writable:!1}),e}({"var(--coefficientVar__edrx7b0)":l.toString(),"var(--leafBackgroundVar__13ydx6w5)":u.length<2?b:"var(--fullLeafVar__13ydx6w4)"}),children:(0,n.jsx)("div",{className:"leaf_leafInner__edrx7b2",children:u.map(t=>(0,n.jsx)(x,{orientation:t,level:e+1},t))})})});var g=e(5636),h=e.n(g);let j={canvasToBaseNodeRatio:.125,pageToCanvasRatio:.6,defaultFractal:{rightScale:.9371561629564998,leftScale:.3489101979487707,rightAngle:20.42067243832907,leftAngle:69.57932756167094,polarityX:-.7565233475346995,polarityY:.6539666846521254}},_={leafyGreen:"rgb(135,191,67)",pinkRed:"rgb(246,62,98)",mudPurple:"rgb(132,74,135)"};(()=>{let t=Object.entries(_);return t.reduce((t,r)=>(t[r[0]]=r[1].replace("rgb(","").replace(")",""),t),{})})();let m=t=>t*Math.PI/180,w=t=>t/Math.PI*180,A=(t,r,e)=>{let n=O(e),o=r-n.top,a=t-(n.left+n.width/2),i=w(Math.asin(Math.abs(o)/Math.sqrt(o*o+a*a))),c=a>0?180-i:i,u=180-c,f=Math.sin(m(u))*Math.sign(-o),l=Math.cos(m(u)),s=h()(c,30,150),p=(180-s)/2,v=s/2,d=Math.sin(m(p)),y=Math.sin(m(v));return{rightScale:d,leftScale:y,rightAngle:v,leftAngle:p,polarityX:l,polarityY:f}},O=t=>{let r=t.width*j.canvasToBaseNodeRatio;return{top:t.top+t.width-r,left:t.left+t.width/2-r/2,width:r}};var S=e(2052),M=e.n(S);let k=["var(--leafyGreenVar__13ydx6w0)","var(--pinkRedVar__13ydx6w1)","var(--mudPurpleVar__13ydx6w2)"],E=()=>M()(k),N={rightScale:.707,leftScale:.707,rightAngle:45,leftAngle:45,polarityX:0,polarityY:1},P=(t,r)=>{let{rightScale:e,leftScale:n,rightAngle:o,leftAngle:a,polarityX:i,polarityY:c}=A(t.x,t.y,r);Object.assign(N,{rightScale:e,leftScale:n,rightAngle:o,leftAngle:a,polarityX:i,polarityY:c})},T=!0,V=!0,R=t=>{t.current&&f(t.current,{[b]:E()})},F=()=>{let t=(0,o.useRef)(null),r=(0,o.useRef)(null),e=(0,o.useCallback)(()=>{if(T){let{leftScale:r,rightScale:n,leftAngle:o,rightAngle:a,polarityX:i,polarityY:c}=N;t.current&&f(t.current,{"var(--leftScaleVar__13ydx6w8)":"".concat(r),"var(--rightScaleVar__13ydx6w9)":"".concat(n),"var(--leftAngleVar__13ydx6wa)":"".concat(o,"deg"),"var(--rightAngleVar__13ydx6wb)":"".concat(a,"deg"),"var(--polarityXVar__13ydx6wc)":"".concat(i),"var(--polarityYVar__13ydx6wd)":"".concat(c)}),T=!1}V&&window.requestAnimationFrame(e)},[t]),a=(0,o.useCallback)(r=>{var e,n;T=!0,P({x:r.pageX,y:r.pageY},null!==(n=null===(e=t.current)||void 0===e?void 0:e.getBoundingClientRect())&&void 0!==n?n:{})},[t]);return(0,o.useEffect)(()=>{var r,n;return T=!0,V=!0,R(t),P({x:0,y:0},null!==(n=null===(r=t.current)||void 0===r?void 0:r.getBoundingClientRect())&&void 0!==n?n:{}),e(),window.addEventListener("mousemove",a,!1),()=>{window.removeEventListener("mousemove",a),T=!1,V=!1}},[e,a]),(0,o.useEffect)(()=>{let r=setInterval(()=>{R(t)},2e3);return()=>{clearInterval(r)}},[]),(0,n.jsxs)("div",{id:"canvas",className:"".concat("fractal_fractalVars__13ydx6wg"," ").concat("fractal_canvas__13ydx6wh"),ref:t,children:[(0,n.jsx)("pre",{className:"fractal_debug__13ydx6wk",ref:r}),(0,n.jsx)("div",{id:"base",className:"fractal_base__13ydx6wi",children:(0,n.jsx)(x,{})})]})};e(8587);var I=e(7516);let B=()=>{let t=(0,I.useRouter)(),r=(0,o.useCallback)(()=>{t.push("/hello")},[t]);return(0,o.useEffect)(()=>(window.addEventListener("dblclick",r),()=>{window.removeEventListener("dblclick",r)}),[r]),(0,n.jsx)("div",{className:"page ".concat("home-page_homePage__111jgtc0"),children:(0,n.jsx)(F,{})})},C=()=>(0,n.jsx)(B,{});var L=C},7206:function(){},4583:function(){},8587:function(){},7516:function(t,r,e){t.exports=e(4587)}},function(t){t.O(0,[774,888,179],function(){return t(t.s=7700)}),_N_E=t.O()}]);