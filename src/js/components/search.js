// Оголошення змінних
const searchInput = document.getElementById("searchInput");
const yearSelect = document.getElementById("yearSelect");
const genreSelect = document.getElementById("genreSelect");
const countrySelect = document.getElementById("countrySelect");
const searchBtn = document.getElementById("searchBtn");
const resultBlock = document.getElementById("search-movies");

const apiKey = "e228a48ce493c266d1ac0e25cdb4d9c4";

function searchMovies() {
  // Отримуємо ключове слово для пошуку, вибраний рік, жанр, країну та мову з введених користувачем даних
  const keyword = searchInput.value;
  const year = yearSelect.value ? `&year=${yearSelect.value}` : '';
  const genre = genreSelect.value ? `&with_genres=${genreSelect.value}` : '';
  const country = countrySelect.value ? `&region=${countrySelect.value}` : '';
  const language = document.documentElement.lang;

  // Очистити попередні результати пошуку з блоку результатів
  resultBlock.innerHTML = "";

  // Створення URL-адресу API за допомогою ключового слова пошуку та вибраних фільтрів
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}${year}${genre}&with_original_language=${language}${country}`;

  // Отримаємо дані з API і передайте їх у функцію displayMovies для відтворення фільмів
  fetch(url)
    .then(response => response.json())
    .then(displayMovies)
    .catch(error => {
      // Якщо виникла помилка, відобража повідомлення в блоці результатів і зареєструє помилку на консолі
      resultBlock.innerHTML = "<p>Oops, something went wrong.</p>";
      console.error(error);
    });
}


function displayMovies(data) {
  // Отримуємо масив фільмів з об'єкта даних
  const movies = data.results;

  // Якщо масив фільмів порожній, виводимо повідомлення про відсутність результатів
  if (movies.length === 0) {
    resultBlock.innerHTML = "<p>No results found.</p>";
  } else {
    // Виводимо кожен фільм з масиву фільмів на сторінку
    movies.forEach(movie => {
      // Деструктуризація об'єкта фільму для отримання необхідних даних
      const { title, poster_path, release_date, vote_average, overview } = movie;

      // Формуємо посилання на зображення фільму, якщо доступно
      const imgSrc = poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : "https://via.placeholder.com/185x278?text=No+Poster";

      // Формуємо рік випуску фільму, якщо доступно
      const releaseYear = release_date ? `(${new Date(release_date).getFullYear()})` : "";

      // Формуємо оцінку фільму, якщо доступно
      const rating = vote_average ? `<p class="rating">${vote_average.toFixed(1)}</p>` : "";

      // Формуємо HTML-код для відображення фільму на сторінці
      const movieBlock = `
        <div class="movie">
          <img src="${imgSrc}" alt="${title}">
          <div class="movie-info">
            <h3>${title} ${releaseYear}</h3>
            ${rating}
            <p>${overview}</p>
          </div>
        </div>
      `;

      // Додаємо HTML-код фільму до сторінки
      resultBlock.insertAdjacentHTML("beforeend", movieBlock);
    });
  }
}



searchBtn.addEventListener("click", event => {
  event.preventDefault();
  searchMovies();
});
