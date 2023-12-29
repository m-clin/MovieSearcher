const apiKey = '1bfdbff05c2698dc917dd28c08d41096';
const apiUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const movieId = new URLSearchParams(window.location.search).get('id');

async function getMovieDetails() {
    const response = await fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`);
    const data = await response.json();
    return data;
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
