const { Router } = require('express');
const {
    getVideogamesHandler,
    getVideogameHandler,
    getGenresHandler,
    postVideogameHandler
} = require('../handlers/handlers.js');


const router = Router();

router.get('/videogames', getVideogamesHandler);

router.get('/videogames/:id', getVideogameHandler);

router.get('/genres', getGenresHandler);

router.post('/videogames', postVideogameHandler);


module.exports = router;
