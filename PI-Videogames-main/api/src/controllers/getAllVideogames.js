const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const {Videogame} = require('../db.js');
const {Genre} = require('../db.js');

const getDBVideogames = async () =>{
    let dbVgs = await Videogame.findAll({
        //  attributes: ["id", "name", "image"],
        include: [{
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }]
    })
    
    //  Es una instancia de sequelize - No es un array de objetos. Array de instancias de la db
   /*  const dbVgs2 = await dbVgsRaw.map(game => ({
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        image: game.images,
        genres: game.genre.map(g => g.name),
    }))
 */
    return dbVgs;
};

const getApiVideogames = async () => {
    let apiVgs = [];

    for (let i=1; i<=5; i++) {
        let apiVgsRaw = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        apiVgs = apiVgs.concat(apiVgsRaw.data.results);
    }

    //Await??
    const videogames = apiVgs.map(game => {
            return {    
                id: game.id,
                name: game.name,
                description: game.description,
                released: game.released,
                rating: game.rating,
                platforms: game.platforms.map(p => p.platform.name),
                image: game.background_image,
                genres: game.genres.map(g => g.name),
            }});

    return videogames;
}


const getAllVideogames = async () => {
    const allDbVgs = await getDBVideogames();
    const allApiVgs = await getApiVideogames();
    return [...allDbVgs,...allApiVgs]; 
};

module.exports = {
    getAllVideogames
}