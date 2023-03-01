const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const {Videogame} = require('../db.js');
const {Genre} = require('../db.js');
const { Op } = require('sequelize');


const searchDBVideogamesByName = async (name) => { 
    const dbVideogamesRaw = await Videogame.findAll({
        where: {
            // Por qué los % concatenados al inicio y final?
            name: {[Op.iLike]: name}
        },
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    }); 
        
    const dbVideogames = await dbVideogamesRaw.map(game => ({ // Tendría que ir un return acá?
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        image: game.images,
        genres: game.genres.map(g => g.name),
    }));

    return dbVideogames;

};


const searchAPIVideogamesByName = async (name) => {
    const apiGamesByName = [];

    const apiGamesByNameRaw = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
    // Si no funciona, probar encerrar entre paréntesis lo que va luego de la flecha
    await apiGamesByNameRaw.data.results.map(game => {
        if (apiGamesByName.length < 15) {
            apiGamesByName.push({
                id: game.id,
                name: game.name,
                description: game.description,
                released: game.released,
                rating: game.rating,
                platforms: game.platforms.map(p => p.platform.name),
                image: game.background_image,
                genres: game.genres.map(g => g.name),
            })
        }
    });
    return apiGamesByName;
}

const getAllVideogamesByName = async (name) => {
    const dbVgs = await searchDBVideogamesByName(name);
    const apiVgs = await searchAPIVideogamesByName(name);
    const allGames = dbVgs.concat(apiVgs).slice(0,15);

    if (allGames.length === 0) {
        throw new Error('No games found');
    }

    return allGames;
}

module.exports= {getAllVideogamesByName};