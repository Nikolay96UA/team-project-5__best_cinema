!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){a[e]=t},t.parcelRequired7c6=r),r("kDSvw"),r("85oQj");var o=r("bpxeT"),c=r("2TvXO"),l=(o=r("bpxeT"),r("8MBJY")),s=r("a2hTj"),i=(c=r("2TvXO"),r("dIxxU")),u=r("lIyNj");r("kDSvw");var d,p=function(){"use strict";function t(){e(l)(this,t)}return e(s)(t,[{key:"fetchMovieDetails",value:function(t){return e(o)(e(c).mark((function n(){var a;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.default.get("".concat(u.BASE_URL,"/movie/").concat(t,"?api_key=").concat(u.API_KEY,"&language=en-US"));case 3:return a=e.sent,e.abrupt("return",a.data);case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),n,null,[[0,7]])})))()}}]),t}(),f=r("kDSvw"),v=(document.querySelector("[data-close-modal]"),document.querySelector("[data-backdrop]")),m=(document.querySelector(".modal"),document.querySelector(".wrap")),y=new p;function g(){v.classList.toggle("backdrop--hidden")}function b(){return(b=e(o)(e(c).mark((function t(n){var a,r;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.fetchMovieDetails(n);case 3:h(a=e.sent),console.log(a),g(),r=document.querySelector(".add-to-library"),localStorage.getItem("library")&&JSON.parse(localStorage.getItem("library")).includes(a)&&(r.innerText="Delete from my library"),r.addEventListener("click",(function(){var e=localStorage.getItem("library")?JSON.parse(localStorage.getItem("library")):[];if("Add to my library"===r.innerText)e.push(a),localStorage.setItem("library",JSON.stringify(e)),r.innerText="Delete from my library";else{var t=e.findIndex((function(e){return e.name===a.name}));-1!==t&&(e.splice(t,1),localStorage.setItem("library",JSON.stringify(e)),r.innerText="Add to my library")}})),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.dir(e.t0);case 15:case"end":return e.stop()}}),t,null,[[0,12]])})))).apply(this,arguments)}function h(e){var t=e.poster_path,n=e.original_title,a=e.vote_average,r=e.vote_count,o=e.popularity,c=e.genres,l=e.overview;d="\n    <div class='container-image-wrap'>".concat(t?'<img src="https://image.tmdb.org/t/p/w500'.concat(t,'" alt="tizer">'):"","</div>\n    <div class='container-content-wrap'>\n        <h3 class='title'>").concat(n,"</h3>\n        <div class='content-wrap'>\n            <div class='features-wrap'>\n                <p class='feature-name'>Vote / Votes</p>\n                <p class='feature-name'>Popularity</p>\n                <p class='feature-name'>Genre</p>\n            </div>\n            <div class='features-values-wrap'>\n                <p class='feature-value'>").concat(a,"<span> / </span>").concat(r,"</p>\n                <p class='feature-value'>").concat(o,"</p>\n                <p class='feature-value'>").concat(Object.values(c).map((function(e){return e.name})).join(" "),"</p>\n            </div>\n        </div>\n        <p class='feature-name feature-name-uppercase'>About</p>\n        <p class='feature-value feature-value-description'>").concat(l,'</p>\n        <button class="add-to-library" type="button">Add to my library</button>\n    </div>\n    <button class="close-modal" type="button" data-close-modal>\n          <svg width="24px" height="24px">\n            <use\n              class="close-modal__icon-close"\n              href="./images/icons/symbol-defs.svg#close-button"\n            ></use>\n          </svg>\n        </button>\n    '),m.innerHTML=d}f.galleryEl.addEventListener("click",(function(e){if("LI"===e.target.nodeName){!function(e){b.apply(this,arguments)}(e.target.dataset.id)}}))}();
//# sourceMappingURL=catalog.02eee149.js.map