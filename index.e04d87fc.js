var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var s={id:e,exports:{}};return t[e]=s,a.call(s.exports,s,s.exports),s.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=a),a("alV1T"),a("5h2Rr");var s=a("g5NAz");s=a("g5NAz");const i=document.querySelector("#uncoming-this-mounth");function r(e){const t=`<div class="img-div">\n    <img class="muvie-image-poster"\n        src="https://image.tmdb.org/t/p/original/${e.poster_path}"\n        alt="" width="805" height="458">\n    <img class="muvie-image-backdrop"\n        src="https://image.tmdb.org/t/p/original/${e.backdrop_path}"\n        alt="" width="805" height="458">\n</div>\n\n<div class="meta-items-div">\n    <h2 class="muvie-name">${e.title}</h2>\n    <div class="meta-div">\n        <div class="meta-left">\n            <ul class="muvie-meta-left-criterions">\n                <li class="muvie-meta-item">\n                    <b class="criterion">Release date</b>\n                </li>\n                <li class="muvie-meta-item">\n                    <b class="criterion">Vote / Votes</b>\n                </li>\n            </ul>\n            <ul class="muvie-meta-left-data">\n                <li class="muvie-meta-item">\n                    <span class="date-number">${e.release_date}</span>\n                </li>\n                <li class="muvie-meta-item">\n                    <span class="vote-numbers">${e.vote_average}</span><span class="slash"> / </span><span\n                        class="vote-numbers">${e.vote_count}</span>\n                </li>\n            </ul>\n        </div>\n        <div class="meta-right">\n            <ul class="muvie-meta-right-criterions">\n                <li class="muvie-meta-item">\n                    <b class="criterion">Popularity</b>\n                </li>\n                <li class="muvie-meta-item">\n                    <b class="criterion">Genre</b>\n                </li>\n            </ul>\n            <ul class="muvie-meta-right-data">\n                <li class="muvie-meta-item">\n                    <span class="data">${e.popularity}</span>\n                </li>\n                <li class="muvie-meta-item">\n                    <span class="data">${e.genres.map((e=>`${e.name}`))}</span>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div class="muvie-description-item">\n        <b class="criterion about">About</b>\n        <p class="description">${e.overview}</p>\n    </div>\n\n    <button type="button" class="remind-btn">Remind me</button>\n</div>`;i.insertAdjacentHTML("beforeend",t)}fetch(`${s.BASE_URL}${s.URL_TREND_DAY}?api_key=${s.API_KEY}&page=1`).then((e=>e.json())).then((e=>e.results[0].id)).then((e=>{fetch(`${s.BASE_URL}movie/${e}?api_key=${s.API_KEY}&language=en-US`).then((e=>e.json())).then(r)}));s=a("g5NAz");var l=a("2shzp");const o=document.getElementById("trends-list");let c=[],d=[];!async function(){try{const t=await async function(){try{const{data:e}=await l.default.get(`${s.BASE_URL}${s.URL_TREND_WEEK}?api_key=${s.API_KEY}&page=1`);return e.results}catch(e){console.log(e)}}(),{data:n}=await l.default.get(`${s.BASE_URL}${s.URL_GENRE_LIST}?api_key=${s.API_KEY}`),a=t.slice(0,3),i=n.genres;for(let e=0;e<i.length;e+=1)c.push(i[e].id),d.push(i[e].name);e=a.map((({title:e,genre_ids:t,release_date:n,poster_path:a,vote_average:s,id:i})=>{return`\n        <li class="trends-card" style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 63.48%, rgba(0, 0, 0, 0.9) 92.16%), url(https://image.tmdb.org/t/p/w500${a})" data-id=${i}>\n          <div class="trends-card-about">\n            <h3 class="trends-card-subtitle">${e}</h3>\n            <p class="trends-card-meta">\n              ${function(e){const t=[];for(let n=0;n<=e.length;n+=1)if(c.includes(e[n])){const a=c.indexOf(e[n]);t.push(d[a])}for(;t.length>2;)t.pop();return t.join(", ")}(t)} | ${n.slice(0,4)}\n            </p>\n          </div>\n          <div class="vote-cinemas ${r=Number(s.toFixed(1)),10===r?"ten-stars":r<10&&r>8?"nine-stars":8===r?"eight-stars":r<8&&r>6?"seven-stars":6===r?"six-stars":r<6&&r>4?"five-stars":4===r?"four-stars":r<4&&r>2?"three-stars":2===r?"two-stars":r<2&&r>0?"one-star":0===r?"zero-star":r?void 0:"No rating"}">\n          </div>\n        </li>`;var r})).join(""),o.innerHTML=e}catch(e){console.log(e)}var e}(),a("2yFDX");l=a("2shzp"),s=a("g5NAz");a("3Nna8");var u=a("3Nna8");const m=document.querySelector("[data-close-modal]"),p=document.querySelector("[data-backdrop]"),v=(document.querySelector(".modal"),document.querySelector(".wrap"));!function(){if(localStorage.getItem("library"))return;localStorage.setItem("library","[]")}();const g=new class{async fetchMovieDetails(e){try{return(await l.default.get(`${s.BASE_URL}/movie/${e}?api_key=${s.API_KEY}&language=en-US`)).data}catch(e){console.error(e)}}constructor(){}};let f;function h(){p.classList.add("backdrop--hidden")}async function y(e){try{const t=await g.fetchMovieDetails(e);!function({poster_path:e,original_title:t,vote_average:n,vote_count:a,popularity:s,genres:i,overview:r}){f=`\n    <div class='container-image-wrap'>${e?`<img src="https://image.tmdb.org/t/p/w342/${e}" alt="tizer">`:""}</div>\n    <div class='container-content-wrap'>\n      <h3 class='title'>${t}</h3>\n      <div class='content-wrap'>\n        <div class='features-wrap'>\n          <p class='feature-name'>Vote / Votes</p>\n          <p class='feature-name'>Popularity</p>\n          <p class='feature-name'>Genre</p>\n        </div>\n        <div class='features-values-wrap'>\n          <p class='feature-value'><span class="vote-numbers">${n}</span><span class="slash"> / </span><span class="vote-numbers">${a}</span></p>\n          <p class='feature-value'>${s}</p>\n          <p class='feature-value'>${Object.values(i).map((e=>e.name)).join(" ")}</p>\n        </div>\n      </div>\n      <p class='feature-name feature-name-uppercase'>About</p>\n      <p class='feature-value feature-value-description'>${r}</p>\n      <button class="add-to-library" type="button">Add to my library</button>\n    </div>\n    `,v.innerHTML=f}(t),console.log(t.id);const n=document.querySelector(".add-to-library"),a=localStorage.getItem("library"),s=a?JSON.parse(a):[];for(let e=0;e<s.length;e++){s[e].id===t.id&&(console.log("Match found!"),n.innerText="Delete from my library")}n.addEventListener("click",(()=>{if("Add to my library"===n.innerText)s.push(t),localStorage.setItem("library",JSON.stringify(s)),n.innerText="Delete from my library";else{const e=s.findIndex((e=>e.id===t.id));-1!==e&&(s.splice(e,1),localStorage.setItem("library",JSON.stringify(s)),n.innerText="Add to my library")}})),console.log("Лог після циклу"),console.log(t),p.classList.remove("backdrop--hidden")}catch(e){console.dir(e)}}function b(e){if("LI"===e.target.nodeName){const t=e.target.dataset.id;console.log("Это LI!!!"),y(t)}}m.addEventListener("click",h),p.addEventListener("click",(function(e){const t=e.target;if(console.log("You click on:",t),t!==p)return;h()})),document.addEventListener("keydown",(function(e){"Escape"===e.key&&h()})),u.galleryEl.addEventListener("click",b),o.addEventListener("click",b);var _=a("evq3T");const L=document.querySelector(".hero"),$=document.querySelector(".iframe-trailer"),w=document.querySelector(".trailer-modal__backdrop"),E=document.querySelector(".trailer-modal__button-colse"),k=document.querySelector(".trailer-container"),S=document.querySelector(".no-movie-container");function A(e){"Escape"===e.code&&R()}function N(e){e.target.classList.contains("trailer-modal__backdrop")&&R()}function R(){document.body.classList.remove("show-trailer-modal"),$.src="",window.removeEventListener("keydown",A),w.removeEventListener("click",N),E.removeEventListener("click",R),k.classList.add("trailer-is-hidden"),S.classList.remove("trailer-is-hidden")}L.addEventListener("click",(async function(e){const t=e.target;if(t.classList.contains("hero__btn")){document.body.classList.add("show-trailer-modal"),window.addEventListener("keydown",A),w.addEventListener("click",N),E.addEventListener("click",R),k.classList.remove("trailer-is-hidden"),S.classList.add("trailer-is-hidden");!async function(e){let t=await async function(e){var t;const n=await(0,_.getMovieTrailer)(e),a=0,s=n.results.length,i=Math.floor(Math.random()*(s-a+1))+a,r=null===(t=n.results[i])||void 0===t?void 0:t.key;if(!r)return k.classList.add("trailer-is-hidden"),void S.classList.remove("trailer-is-hidden");return r}(e);$.src=`https://www.youtube.com/embed/${t}`}(t.dataset.id)}}));
//# sourceMappingURL=index.e04d87fc.js.map
