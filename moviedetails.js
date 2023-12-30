const apiKey = '1bfdbff05c2698dc917dd28c08d41096';
const apiUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const movieId = new URLSearchParams(window.location.search).get('id');

async function getMovieDetails() {
    const response = await fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`);
    const data = await response.json();
    return data;
}

async function getSimilarMovies() {
    const response = await fetch(`${apiUrl}/movie/${movieId}/similar?api_key=${apiKey}`);
    const data = await response.json();
    console.log('Similar Movies Data:', data); // Log similar movies data to the console
    displayMovies(data.results, 'similarMovies');
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('similar-movie');
        movieElement.innerHTML = `
        <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        `;
        container.appendChild(movieElement);
    });
}

function displayMovieDetails(movie) {
    const detailsContainer = document.getElementById('movieDetails');
    detailsContainer.style.display = 'block';
    detailsContainer.innerHTML = `
<h3>${movie.title}</h3>
<img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}"> <!-- Add movie poster -->
<p>${movie.overview}</p>
<p>Release Date: ${movie.release_date}</p>
<p>Vote Average: ${movie.vote_average}</p>
<p>Popularity: ${movie.popularity}</p>
`;
}

function hideMovieDetails() {
    const detailsContainer = document.getElementById('movieDetails');
    detailsContainer.style.display = 'none';
}

async function init() {
    const movieDetails = await getMovieDetails();
    displayMovieDetails(movieDetails);
    getSimilarMovies();
}

init();