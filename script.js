const apiKey = '1bfdbff05c2698dc917dd28c08d41096';
const apiUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

let selectedGenre = '';

async function getUpcomingMovies() {
    const response = await fetch(`${apiUrl}/movie/upcoming?api_key=${apiKey}`);
    const data = await response.json();
    displayMovies(data.results, 'movieContainer');
    updateMoviesTitle('Upcoming Movies');
}

async function searchMovie(query, genre) {
    const genreFilter = genre ? `&with_genres=${genre}` : '';
    const response = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}${genreFilter}`);
    const data = await response.json();
    displayMovies(data.results, 'movieContainer');
    updateMoviesTitle(`Search Results for "${query}"`);
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    movies.forEach(movie => {
        // Check if the selected genre matches the movie's genre
        if (!selectedGenre || movie.genre_ids.includes(parseInt(selectedGenre))) {
            const movieElement = document.createElement('a');
            movieElement.classList.add('movie');
            movieElement.href = `moviedetails.html?id=${movie.id}`;
            movieElement.innerHTML = `
                <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            container.appendChild(movieElement);
        }
    });
}

function updateMoviesTitle(title) {
    const moviesTitle = document.getElementById('moviesTitle');
    moviesTitle.textContent = title;
}

function applyGenreFilter() {
    const genreSelect = document.getElementById('genreFilter');
    selectedGenre = genreSelect.value;
    // Call the searchMovie function with the selected genre
    searchMovie(searchInput.value, selectedGenre);
}

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query !== '') {
        searchMovie(query);
    } else {
        getUpcomingMovies();
    }
});

getUpcomingMovies();