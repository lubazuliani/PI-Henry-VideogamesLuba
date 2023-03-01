const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const {Videogame} = require('../db.js');
const {Genre} = require('../db.js');


const getDbVideogameById = async (id) => {
    // Con método findByPK
/*     const dbVdgById = await Videogame.findByPk(id, {
        include: [{
            attributes: ['name', 'description', 'released', 'rating', 'platforms', 'image']
        },  
        {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }]
    }); */

    const dbVdgById = await Videogame.findAll({
        where :{
            id: id,
        }, 
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        },
    });

    return dbVdgById;
}


const getApiVideogameById = async (id) => {
    const apiVdgById = [];
    const apiVdgByIdRaw = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

    apiVdgById.push({
        name: apiVdgByIdRaw.data.name,
        // Description tiene símbolos, recordar quitarlos (removeAll?)
        description: apiVdgByIdRaw.data.description.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
        released: apiVdgByIdRaw.data.released,
        rating: apiVdgByIdRaw.data.rating,
        platforms: apiVdgByIdRaw.data.platforms.map(p => p.platform.name),
        image: apiVdgByIdRaw.data.background_image,
        genres: apiVdgByIdRaw.data.genres.map(g => g.name),
    });

    return apiVdgById;
}


const getVideogameById = async (id, source) => {
    const videogame = 
    source === 'api'
        ? await getApiVideogameById(id)
        : await getDbVideogameById(id);

    return videogame;
}


module.exports = {getVideogameById};