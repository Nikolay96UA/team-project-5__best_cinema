const movieListContainer = document.querySelector('.movie-list');

document.addEventListener('DOMContentLoaded', () => {
  const errorContainer = document.querySelector('.library__error-message');
  const buttonContainer = document.querySelector('.container-button');
  const movieListContainer = document.querySelector('.movie-list');
  const storedMovies = localStorage.getItem('library');
  const movies = storedMovies ? JSON.parse(storedMovies) : [];
  console.log(movies);
  if (movies.length > 0) {
    errorContainer.remove();
    buttonContainer.remove();
    renderMovies(movies);
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-line');
    errorMessage.innerHTML = `
      OOPS...<br />
      We are very sorry!<br />
      You don’t have any movies at your library.
    `;
    errorContainer.appendChild(errorMessage);
  }
  function renderMovies(movies) {
    movieListContainer.innerHTML = '';
    movies.forEach((movie, index) => {
      const movieElement = document.createElement('li');
      movieElement.classList.add('movie');
      movieElement.innerHTML = renderDetailMarkup(movie);
      movieListContainer.appendChild(movieElement);
      if ((index + 1) % 3 === 0) {
        movieElement.classList.add('last-in-row');
      }
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
    const posterImage = poster_path
      ? `<img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Poster">`
      : '';
    let urlPoster = `url('https://image.tmdb.org/t/p/w500${poster_path}')`;
    const genreNames = genres.map(genre => genre.name).join(' ');
    return `
    <div class="lib-gallery-item" style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 63.48%, rgba(0, 0, 0, 0.9) 92.16%), ${urlPoster}" data-id=${id}>
    <div class="lib-gallery-item__about">
    <h3 class="lib-gallery-item__about__title">${title}</h3>
    <p class="lib-gallery-item__about__p">${genreNames} | ${release_date.slice(
      0,
      4
    )}</p>
    </div>
    <div class="vote-cinemas ${stars(Number(vote_average.toFixed(1)))}"></div>
    </div>`;
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
