import React from "react";
import style from "./Detail.module.css";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../../redux/actions";


const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getVideogameDetail(id));
      }, [dispatch, id]);

    
    const videogameDetail = useSelector((state) => state.videogameDetail);
    const videogameDetailObj = videogameDetail[0];

    let newGenres;
    let newPlatforms;
    if (videogameDetailObj){
      if (typeof videogameDetailObj.genres[0] !== 'string') {
        const arrayGenres = videogameDetailObj.genres.map(g => {
          return g.name;
        });
        newGenres = arrayGenres.join(', ');
      } else {
        newGenres = videogameDetailObj.genres.join(', ');
      }

      if (Array.isArray(videogameDetailObj.platforms)){
        newPlatforms = videogameDetailObj?.platforms.join(', ');
      } else {
        newPlatforms = videogameDetailObj?.platforms;
      }
    };
    
    
    if (videogameDetailObj){
    return (
      <div className={style.mainContainer}>
        
          <img
            className={style.image}
            src={videogameDetailObj.image}
            alt={videogameDetailObj.name}
          />
          
            <h3 className={style.mainTitle}>{videogameDetailObj.name}</h3>

            <div className={style.title}>
              Description:
              <span className={style.content}>
                {videogameDetailObj.description}
              </span>
            </div>

            <div className={style.title}>
              Released:
              <span className={style.content}>{videogameDetailObj.released}</span>
            </div>

            <div className={style.title}>
              Genres:
              <span className={style.content}>{newGenres}</span>
            </div>
            
            <div className={style.title}>
              Platforms:
              <span className={style.content}>{newPlatforms}</span>
            </div>

            <div className={style.title}>
              Rating:
              <span className={style.content}>{videogameDetailObj.rating}</span>
            </div>

        <NavLink to="/videogames">
          <button className={style.button} type="submit">Back Home</button>
        </NavLink>

      </div>
    );
  } else {
    return (
    <div>Loading</div>
  )}
};

export default Detail;


//Note to self:
      //Para el condicional, sí necesito el índice 0 para que vea si el value es un array pero con el map, 
      // no necesito acceder al índice aunque se trate de un array, quizás porque tiene un sólo valor? 
      //ChatGTP me dice que estoy intentando mapear el primer carácter, no primer value del array.