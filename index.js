const express = require('express');
const bodyParser = require('body-parser');
const movies = require('./movies');
const { validarPelicula } = require('./schemas/peliculas');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.disable('x-powered-by');

app.use(cors({
    origin: [
        'http://127.0.0.1:5500',
        'https://midomino.com',
        'https://dev.midomino.com'
    ]
}));

// Obtener todas las películas
app.get('/movies', (req, res) => {
    res.json(movies.getAllMovies());
});

// Obtener información de una película por su ID
app.get('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    const movie = movies.getMovieById(movieId);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ error: 'No encontrada', message: 'Pelicula no encontrada' });
    }
});

// Crear una nueva película
app.post('/movies', (req, res) => {
    const newMovie = req.body;
    const validacion = validarPelicula(newMovie);
    if (validacion.success) {
        const createdMovie = movies.createMovie(newMovie);
        res.status(201).json(createdMovie);
    } else {
        res.status(400).json({
            error: true,
            message: 'Datos invalidos'
        });
    }
});

// Modificar una película
app.put('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    const updatedMovie = req.body;
    const validacion = validarPelicula(updatedMovie);
    if (validacion.success) {
        const result = movies.updateMovie(movieId, updatedMovie);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'No encontrada', message: 'Pelicula no encontrada' });
        }
    } else {
        res.status(400).json({
            error: true,
            message: 'Datos invalidos'
        });
    }
});

// Eliminar una película
app.delete('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    const result = movies.deleteMovie(movieId);
    if (result) {
        res.status(204).end();
    } else {
        rres.status(404).json({ error: 'No encontrada', message: 'Pelicula no encontrada' });
    }
});

// Manejador de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'No encontrado', message: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
