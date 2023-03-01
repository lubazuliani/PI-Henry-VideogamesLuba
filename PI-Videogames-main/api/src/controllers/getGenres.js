const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const {Genre} = require('../db.js');

 const getAllGenres = async () => {
    const apiGenresRaw = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    apiGenresRaw.data.results.map(async g => {
        const [apiGenres, created] = await Genre.findOrCreate({
            // Si le saco el array, se me rompe porque no puede mapear
            where: {name: [g.name]}
        });
        return apiGenres;
    })

    const allGenres = await Genre.findAll();
    return allGenres;
 }; 

 module.exports = {getAllGenres};