const {Videogame} = require('../db.js');
const {Genre} = require('../db.js');

// cómo hostias era para pasar todo junto?
const postVideogame = async (name,description, released, rating, genres, platforms, image) => {
    
        const platformToString = platforms.join(', ');

        const newVdg = await Videogame.create({
            name, 
            description, 
            released, 
            rating, 
            //genres, 
            platforms: platformToString, 
            image});

        genres.forEach(async g => {
            const [genre, created] = await Genre.findOrCreate({
                where: {
                    name: [g],
                }
            });
            await newVdg.addGenre(genre);
        })

        return newVdg;
};

module.exports = {postVideogame}