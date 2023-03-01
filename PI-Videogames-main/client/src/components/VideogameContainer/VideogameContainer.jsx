import React from "react";
import { useSelector } from "react-redux";
import Videogame from "../../components/Videogame/Videogame";
import style from "../VideogameContainer/VideogameContainer.module.css";


// Recibe prop de Home
const VdgContainer = ({page}) => {

    const videogames = useSelector(state => state.videogames);

    const paginatedVgs = paginate(videogames, page);

    return (
        <div className={style.showing}>
                {paginatedVgs.map(el => {
                    return (
                        <Videogame
                            key = {el.id}
                            id = {el.id}
                            image = {el.image}
                            name = {el.name}
                            genres = {el.genres}
                            />
                    )})}
        </div>
    )
};

const paginate = (videogames, page) => {
    let start = (page - 1) * 15;
    let end = start + 15;
    return videogames.slice(start, end);
  };

export default VdgContainer;