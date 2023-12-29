const apiKey = '1bfdbff05c2698dc917dd28c08d41096';
const apiUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

async function getUpcomingMovies() {
    const response = await fetch(`${apiUrl}/movie/upcoming?api_key=${apiKey}`);
    const data = await response.json();
    displayMovies(data.results, 'movieContainer');
    updateMoviesTitle('Upcoming Movies');
}

async function searchMovie(query) {
    const response = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`);
    const data = await response.json();
    displayMovies(data.results, 'movieContainer');
    updateMoviesTitle(`Search Results for "${query}"`);
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('a'); // Change from 'div' to 'a'
        movieElement.classList.add('movie');
        movieElement.href = `moviedetails.html?id=${movie.id}`; // Link to moviedetails.html
        movieElement.innerHTML = `
                    <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                `;
        container.appendChild(movieElement);
    });
}

function updateMoviesTitle(title) {
    const moviesTitle = document.getElementById('moviesTitle');
    moviesTitle.textContent = title;
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