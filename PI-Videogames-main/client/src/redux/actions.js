import axios from "axios";

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAMES_BYNAME = "GET_VIDEOGAMES_BYNAME";
export const GET_GENRES = "GET_GENRES";
export const GET_VIDEOGAME_DETAILS = "GET_VIDEOGAME_DETAILS";
export const FILTER_GENRE = "FILTER_GENRE";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const CHANGE_LOADER = "CHANGE_LOADER";
export const FILTER_ORDER = "FILTER_ORDER";


export const getAllVideogames = () => {
  return async function (dispatch) {
      let res = await axios.get("http://localhost:3001/videogames");
      return dispatch({
        type: GET_ALL_VIDEOGAMES,
        payload: res.data,
      });
  };
};

export const getVideogamesByName = (name) => {
  return async function (dispatch) {
      let res = await axios.get(`http://localhost:3001/videogames?name=${name}`);
      return dispatch({
        type: GET_VIDEOGAMES_BYNAME,
        payload: res.data,
      });
  };
};

export const getGenres = () => {
  return async function (dispatch) {
      let res = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: GET_GENRES,
        payload: res.data,
      });
  };
};


export const getVideogameDetail = (id) => {
  return async (dispatch) => {
      const res = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({ 
        type: GET_VIDEOGAME_DETAILS, 
        payload: res.data 
      });
  };
};

// No entiendo muy bien el post, por qué ambos en este sí hicieron un try-catch?
export const postVideogames = (payload) => {
  return async function () {
    try {
      let res = await axios.post("http://localhost:3001/videogames", payload);
      alert("Videogame successfully created");
      console.log(res);
      return res;
    } catch (err) {
      alert("ERROR: " + err);
    }
  };
};

export const filterByGenre = (payload) => {
  return {
    type: FILTER_GENRE,
    payload,
  };
};

export const filterBySource = (payload) => {
  return {
    type: FILTER_BY_SOURCE,
    payload,
  };
};

export const filterGames = (payload)=>{
  return{
      type: FILTER_ORDER,
      payload,
  }
}


// Puede que necesite modificar modelo Videogames y crear el request get platforms.
/* export const getPlatforms = () => {
  return async function (dispatch) {
      let res = await axios.get(`http://localhost:3001/platforms`);
      return dispatch({
        type: GET_PLATFORMS,
        payload: res.data,
      });
  };
}; */

/* export const orderAlphabetically = (payload) => {
  return {
    type: ORDER_ALPHABETICALLY,
    payload,
  };
};

export const orderRating = (payload) => {
  return {
    type: ORDER_BY_RATING,
    payload,
  };
}; */

// export const filterByPlatforms = (payload) => {
//   return {
//     type: FILTER_PLATFORM,
//     payload,
//   };
// };

/* export const changeLoader = () => {
  return {
    type: CHANGE_LOADER,
    payload: true,
  };
}; */


//const FILTER_PLATFORM = " FILTER_PLATFORM";
//export const GET_PLATFORMS = "GET_PLATFORMS";