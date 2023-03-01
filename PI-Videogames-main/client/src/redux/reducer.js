import { 
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAMES_BYNAME,  
  GET_GENRES, 
  GET_VIDEOGAME_DETAILS,
  FILTER_GENRE,
  FILTER_BY_SOURCE, 
  FILTER_ORDER } from "../redux/actions";



const initialState = {
    videogames: [],
    allVideoGames: [],
    videogameDetail: [],
    genres: [],
    platforms: [],
}; 

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideoGames: action.payload,
      };


    case GET_VIDEOGAMES_BYNAME:
      return {
        ...state,
        videogames: action.payload,
      };


    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };


    case GET_VIDEOGAME_DETAILS:
      return {
        ...state,
        videogameDetail: action.payload,
      };


    case FILTER_GENRE:
      const allVideoGames = state.allVideoGames;
      const filteredbyGenre = 
          action.payload === "All"
          ? allVideoGames
          : allVideoGames.filter((e) => e.genres.includes(action.payload));
      return {
        ...state,
        videogames: filteredbyGenre,
      };


    case FILTER_BY_SOURCE:
      const allVideoGamesSource = state.allVideoGames;
      const filteredBySource =
        action.payload === "db"
          ? allVideoGamesSource.filter((el) => el.createdInDb)
          : allVideoGamesSource.filter((el) => !el.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "all" ? allVideoGamesSource : filteredBySource,
      };

    case FILTER_ORDER:
      const filtered = state.videogames;
      if (action.payload === "Z-A") {
        return {
          ...state,
          videogames: filtered.sort((ant, next) => next.name.localeCompare(ant.name)),
        };
      }
      if (action.payload === "A-Z") {
        return {
          ...state,
          videogames: filtered.sort((ant, next) => ant.name.localeCompare(next.name)),
        };
      }
      if (action.payload === "higher") {
        const x = filtered.sort((a, b) => {
          if (a.rating > b.rating) {
            return -1;
          }
          if (b.rating > a.rating) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          videogames: x,
        };
      }
      if (action.payload === "lower") {
        return {
          ...state,
          videogames: filtered.sort((a, b) => {
            if (a.rating < b.rating) {
              return -1;
            }
            if (b.rating < a.rating) {
              return 1;
            }
            return 0;
          }),
        };
      }

        default: 
            return {...state};
    }
};

export default rootReducer;
