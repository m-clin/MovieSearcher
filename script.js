const apiKey = '1bfdbff05c2698dc917dd28c08d41096';
const apiUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

async function searchMovie(query) {
    const response = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`);
    const data = await response.json();
    displayMovies(data.results, 'movies-container');
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
                    <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}">
                    <p>${movie.title}</p>
                `;
        movieElement.addEventListener('click', () => {
            getMovieDetails(movie.id);
            getSimilarMovies(movie.id);
        });
        container.appendChild(movieElement);
    });
}