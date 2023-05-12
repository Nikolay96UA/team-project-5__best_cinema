// import * as basicLightbox from 'basiclightbox';
// import SimpleLightbox from 'simplelightbox';
// import Pagination from 'tui-pagination';

document.addEventListener('DOMContentLoaded', () => {
  const movieListContainer = document.querySelector('.library__cards');
  const buttonContainer = document.querySelector('.container-button');
  const storedMovies = localStorage.getItem('library');
  const movies = storedMovies ? JSON.parse(storedMovies) : [];
  console.log(movies);

  if (movies.length > 0) {
    // movieListContainer.remove();
    buttonContainer.remove();
    renderMovies(movies);
  } else {
    movieListContainer.innerHTML = `<p class="library__message">
      OOPS...<br />
      We are very sorry!<br />
      You don’t have any movies at your library.
    </p>`;
  }

  function renderMovies(movies) {
    movieListContainer.innerHTML = '';
    movies.forEach(movie => {
      movieListContainer.innerHTML += renderDetailMarkup(movie);
    });
  }
  function renderDetailMarkup({
    poster_path,
    original_title,
    vote_average,
    vote_count,
    popularity,
    genres,
    overview,
    title,
    genre_ids,
    release_date,
    id,
  }) {
    // const posterImage = poster_path
    //   ? `<img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Poster">`
    //   : '';
    let urlPoster = `url('https://image.tmdb.org/t/p/w500${poster_path}')`;
    const genreNames = genres.map(genre => genre.name).join(' ');
    return `
    <article class="library__card" style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 63.48%, rgba(0, 0, 0, 0.9) 92.16%), ${urlPoster}" data-id=${id}>
      <div class="library__about">
        <h3 class="lib-gallery-item__about__title">${title}</h3>
        <p class="lib-gallery-item__about__p">${genreNames} | ${release_date.slice(
      0,
      4
    )}</p>
      </div>
      <div class="vote-cinemas ${stars(Number(vote_average.toFixed(1)))}"></div>
    </article>`;
  }
});
function getGenreForCard(genreIds) {
  const genreArr = [];
  for (let i = 0; i <= genreIds.length; i += 1) {
    if (idsArray.includes(genreIds[i])) {
      const indx = idsArray.indexOf(genreIds[i]);
      genreArr.push(categorysArray[indx]);
    }
  }
  while (genreArr.length > 2) {
    genreArr.pop();
  }
  return genreArr.join(', ');
}
function stars(vote) {
  if (vote === 10) {
    return 'ten-stars';
  } else if (vote < 10 && vote > 8) {
    return 'nine-stars';
  } else if (vote === 8) {
    return 'eight-stars';
  } else if (vote < 8 && vote > 6) {
    return 'seven-stars';
  } else if (vote === 6) {
    return 'six-stars';
  } else if (vote < 6 && vote > 4) {
    return 'five-stars';
  } else if (vote === 4) {
    return 'four-stars';
  } else if (vote < 4 && vote > 2) {
    return 'three-stars';
  } else if (vote === 2) {
    return 'two-stars';
  } else if (vote < 2 && vote > 0) {
    return 'one-star';
  } else if (vote === 0) {
    return 'zero-star';
  } else if (!vote) {
    return 'No rating';
  }
}
