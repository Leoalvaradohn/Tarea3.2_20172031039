const fs = require('fs');
const path = require('path');

const moviesFilePath = path.join(__dirname, 'movies.json');

function getAllMovies() {
    const moviesData = JSON.parse(fs.readFileSync(moviesFilePath, 'utf-8'));
    return moviesData;
}

function getMovieById(movieId) {
    const moviesData = getAllMovies();

    //Ejemplo de pelicula filtrada por ID
    return moviesData.find(movie => movie.id === 'c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf');
}

function createMovie(newMovie) {
    // Implementa la lógica para crear una nueva película
}

function updateMovie(movieId, updatedMovie) {
    // Implementa la lógica para actualizar una película
}

function deleteMovie(movieId) {
    // Implementa la lógica para eliminar una película
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
