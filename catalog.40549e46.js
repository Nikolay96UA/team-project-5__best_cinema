function e(e,t,o,n){Object.defineProperty(e,t,{get:o,set:n,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r),r.register("alV1T",(function(e,t){r("kNFGG"),r("6kH5X")})),r.register("kNFGG",(function(e,t){const o=document.querySelectorAll("link[rel=stylesheet][media*=prefers-color-scheme][media*=light]"),n=document.querySelectorAll("link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]"),r=matchMedia("(prefers-color-scheme: dark)"),i=document.querySelectorAll(".switcher-radio");function l(e){!function(e){let t="light"===e?"all":"not all",r="dark"===e?"all":"not all";[...o].forEach((e=>{e.media=t})),[...n].forEach((e=>{e.media=r}))}(e),function(e){localStorage.setItem("color-scheme",e)}(e)}function d(){return localStorage.getItem("color-scheme")}!function(){let e=d();null===e&&l("dark"),e=d(),document.querySelector(`.switcher-radio[value=${e}]`).checked=!0,[...i].forEach((e=>{e.addEventListener("change",(e=>{l(e.target.value)}))}))}(),function(){const e=d(),t=r.matches?"dark":"light";null!==e&&e!==t&&l(e)}()})),r.register("6kH5X",(function(e,t){var o=r("jQ7WT");const n=document.querySelector(".js-menu-container"),i=document.querySelector(".js-open-menu"),l=document.querySelector(".js-close-menu"),d=()=>{const e="true"===i.getAttribute("aria-expanded")||!1;i.setAttribute("aria-expanded",!e),n.classList.toggle("is-open");o[e?"enableBodyScroll":"disableBodyScroll"](document.body)};i.addEventListener("click",d),l.addEventListener("click",d),window.matchMedia("(min-width: 768px)").addEventListener("change",(e=>{e.matches&&(n.classList.remove("is-open"),i.setAttribute("aria-expanded",!1),o.enableBodyScroll(document.body))}))})),r.register("jQ7WT",(function(t,o){e(t.exports,"disableBodyScroll",(function(){return p})),e(t.exports,"clearAllBodyScrollLocks",(function(){return g})),e(t.exports,"enableBodyScroll",(function(){return h}));var n=!1;if("undefined"!=typeof window){var r={get passive(){n=!0}};window.addEventListener("testPassive",null,r),window.removeEventListener("testPassive",null,r)}var i="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),l=[],d=!1,c=-1,a=void 0,u=void 0,s=void 0,f=function(e){return l.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},m=function(e){var t=e||window.event;return!!f(t.target)||(t.touches.length>1||(t.preventDefault&&t.preventDefault(),!1))},v=function(){void 0!==s&&(document.body.style.paddingRight=s,s=void 0),void 0!==a&&(document.body.style.overflow=a,a=void 0)},y=function(){if(void 0!==u){var e=-parseInt(document.body.style.top,10),t=-parseInt(document.body.style.left,10);document.body.style.position=u.position,document.body.style.top=u.top,document.body.style.left=u.left,window.scrollTo(t,e),u=void 0}},p=function(e,t){if(e){if(!l.some((function(t){return t.targetElement===e}))){var o={targetElement:e,options:t||{}};l=[].concat(function(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}(l),[o]),i?window.requestAnimationFrame((function(){if(void 0===u){u={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var e=window,t=e.scrollY,o=e.scrollX,n=e.innerHeight;document.body.style.position="fixed",document.body.style.top=-t,document.body.style.left=-o,setTimeout((function(){return window.requestAnimationFrame((function(){var e=n-window.innerHeight;e&&t>=n&&(document.body.style.top=-(t+e))}))}),300)}})):function(e){if(void 0===s){var t=!!e&&!0===e.reserveScrollBarGap,o=window.innerWidth-document.documentElement.clientWidth;if(t&&o>0){var n=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);s=document.body.style.paddingRight,document.body.style.paddingRight=n+o+"px"}}void 0===a&&(a=document.body.style.overflow,document.body.style.overflow="hidden")}(t),i&&(e.ontouchstart=function(e){1===e.targetTouches.length&&(c=e.targetTouches[0].clientY)},e.ontouchmove=function(t){1===t.targetTouches.length&&function(e,t){var o=e.targetTouches[0].clientY-c;!f(e.target)&&(t&&0===t.scrollTop&&o>0||function(e){return!!e&&e.scrollHeight-e.scrollTop<=e.clientHeight}(t)&&o<0?m(e):e.stopPropagation())}(t,e)},d||(document.addEventListener("touchmove",m,n?{passive:!1}:void 0),d=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},g=function(){i&&(l.forEach((function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null})),d&&(document.removeEventListener("touchmove",m,n?{passive:!1}:void 0),d=!1),c=-1),i?y():v(),l=[]},h=function(e){e?(l=l.filter((function(t){return t.targetElement!==e})),i&&(e.ontouchstart=null,e.ontouchmove=null,d&&0===l.length&&(document.removeEventListener("touchmove",m,n?{passive:!1}:void 0),d=!1)),i?y():v()):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")}}));
//# sourceMappingURL=catalog.40549e46.js.map