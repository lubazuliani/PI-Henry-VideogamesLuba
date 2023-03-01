const {getVideogameById} = require("../controllers/getVideogameById");
const {postVideogame} = require("../controllers/postVideogame");
const {getAllGenres} = require("../controllers/getGenres");
const {getAllVideogamesByName} = require("../controllers/getByName");
const {getAllVideogames} = require("../controllers/getAllVideogames");


const getVideogamesHandler = async (req, res) => {
    const {name} = req.query;

    try {
        if (name) {
            const videogameByName = await getAllVideogamesByName(name);
            res.status(200).json(videogameByName);
        } else {
            const allVideogames = await getAllVideogames();
            res.status(200).json(allVideogames);
        }
    } catch (error) {
        //next(error);
        res.status(400).json({error: error.message});
    }
};

const getVideogameHandler = async (req, res) => {
    const {id} = req.params;
    const source = isNaN(id) ? "db" : "api";
    
    try {
        const videogame = await getVideogameById(id, source);
        res.status(200).json(videogame);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getGenresHandler = async (req, res) => {

    try {
        const genres = await getAllGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const postVideogameHandler = async (req, res) => {
    const {name,description, released, rating, genres, platforms, image} = req.body;

    try {
        //{...req.body}
        //Librería JOI
        const newVideogame = await postVideogame(name,description, released, rating, genres, platforms, image);
        res.status(200).json(newVideogame);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


module.exports = {
    getVideogamesHandler,
    getVideogameHandler,
    getGenresHandler,
    postVideogameHandler
};