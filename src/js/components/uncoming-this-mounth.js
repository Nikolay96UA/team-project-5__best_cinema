import {
  API_KEY,
  BASE_URL,
  URL_TREND_DAY,
  URL_TREND_WEEK,
} from '../constants/api';

const upcoming = document.querySelector('#uncoming-this-mounth');

fetch(`${BASE_URL}${URL_TREND_DAY}?api_key=${API_KEY}&page=1`)
  .then(response => {
    return response.json();
  })
  .then(movies => {
    const popMovie = movies.results[0];
    return popMovie.id;
  })
  .then(movieId => {
    fetch(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        return response.json();
      })
      .then(renderMovieCard);
  });

function renderMovieCard(movieWithGenre) {
  const markup = `<div class="img-div">
    <img class="muvie-image-poster"
        src="https://image.tmdb.org/t/p/original/${movieWithGenre.poster_path}"
        alt="" width="805" height="458">
    <img class="muvie-image-backdrop"
        src="https://image.tmdb.org/t/p/original/${
          movieWithGenre.backdrop_path
        }"
        alt="" width="805" height="458">
</div>

<div class="meta-items-div">
    <h2 class="muvie-name">${movieWithGenre.title}</h2>
    <div class="meta-div">
        <div class="meta-left">
            <ul class="muvie-meta-left-criterions">
                <li class="muvie-meta-item">
                    <b class="criterion">Release date</b>
                </li>
                <li class="muvie-meta-item">
                    <b class="criterion">Vote / Votes</b>
                </li>
            </ul>
            <ul class="muvie-meta-left-data">
                <li class="muvie-meta-item">
                    <span class="date-number">${
                      movieWithGenre.release_date
                    }</span>
                </li>
                <li class="muvie-meta-item">
                    <span class="vote-numbers">${
                      movieWithGenre.vote_average
                    }</span><span class="slash"> / </span><span
                        class="vote-numbers">${movieWithGenre.vote_count}</span>
                </li>
            </ul>
        </div>
        <div class="meta-right">
            <ul class="muvie-meta-right-criterions">
                <li class="muvie-meta-item">
                    <b class="criterion">Popularity</b>
                </li>
                <li class="muvie-meta-item">
                    <b class="criterion">Genre</b>
                </li>
            </ul>
            <ul class="muvie-meta-right-data">
                <li class="muvie-meta-item">
                    <span class="data">${movieWithGenre.popularity}</span>
                </li>
                <li class="muvie-meta-item">
                    <span class="data">${movieWithGenre.genres.map(
                      genre => `${genre.name}`
                    )}</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="muvie-description-item">
        <b class="criterion about">About</b>
        <p class="description">${movieWithGenre.overview}</p>
    </div>

    <button type="button" class="remind-btn">Remind me</button>
</div>`;
  upcoming.insertAdjacentHTML('beforeend', markup);
}
