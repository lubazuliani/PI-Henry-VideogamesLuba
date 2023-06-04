import style from "../Videogame/Videogame.module.css";
import React from "react";
import {NavLink} from "react-router-dom";

// Ojo acá con el tema del nonbre de la prop.
const Videogame = ({id, image, name, genres }) => {

  let newGenres;
  if (typeof genres[0] !== 'string') {
    const arrayGenres = genres.map(g => {
      return g.name;
    });
    newGenres = arrayGenres.join(', ');
  } else {
    newGenres = genres.join(', ');
  }

    return (
          <div className={style.mainContainer}>
            <div className={style.text}>
              <h2 className={style.name}>{name}</h2>
              <NavLink to={`/videogames/${id}`} className={style.navLink}>
                <img className={style.img} src={image} alt={name} />
              </NavLink>
              <h2 className={style.genres}>Genres: {newGenres}</h2>
              {/* <NavLink to={`/videogames/${id}`} className={style.navLink}> See More Details </NavLink> */}
            </div>
            
          </div>
      );
}

export default Videogame;

// Silbordon usa spans entre los h2 y h1. 