import React from "react";
import style from "../Home/Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VdgContainer from "../../components/VideogameContainer/VideogameContainer";
import Pagination from "../../components/Pagination/Pagination";

import {
  getAllVideogames,
  filterByGenre,
  getGenres,
  filterBySource,
  filterGames,
} from "../../redux/actions";


const Home = () => {
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.genres);
  
    //paginado
    const [page, setPage] = useState(1);
    const [pageBoolean, setPageBoolean] = useState(false); 
    const [order, setOrder] = useState("");


    useEffect(() => {
      if (order === "") {
      dispatch(getGenres());
      dispatch(getAllVideogames());
      setPageBoolean(false);
      } else {
        dispatch(filterGames(order));
      }
    }, [dispatch]);

    
    const genreFilterHandler = (e) => {
      setPage(1);
      if (e.target.value) dispatch(filterByGenre(e.target.value));
    };


    const sourceFilterHandler = (e) => {
      setPageBoolean(false);
      setPage(1);
      if (e.target.value) dispatch(filterBySource(e.target.value));
    };


    const handlerOrden = (e) => {
      setOrder(e.target.value);
      dispatch(filterGames(e.target.value));
      setPage(1);
    };


    const resetHandler= (e) =>{
      setPageBoolean(false);
      window.location.reload();
    }


  return (
      <div className={style.body}>
        <div>
          <h1 className={style.title}>VIDEOGAMES</h1>

          <div className={style.filter}>

            <div className={style.selectContainer}>
              <div>Sort</div>
              <select
                onChange={(e) => {
                  handlerOrden(e);
                }}
                id= "order"
                name= "order"
                className={style.select}
              >
                <option value="-">-</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="higher">Higher Rating</option>
                <option value="lower">Lower Rating</option>
              </select>
            </div>

            <div className={style.selectContainer}>
              <div>Filter by Gender</div>
              <select
                onChange={(e) => genreFilterHandler(e)}
                name="order"
                id="order"
                className={style.select}
              >
                <option value="All">All</option>
                {allGenres?.map((el) => {
                  return (
                    <option key={el.id} value={el.name}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            </div>
    
            <div className={style.selectContainer}>
              <div>Filter by Source</div>
              <select
                onChange={(e) => sourceFilterHandler(e)}
                name="order"
                id="order"
                className={style.select}
              >
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="db">DB</option>
              </select>
            </div>
            <button onClick={(e)=>resetHandler(e)} className={style.button}>
              Refresh
            </button>
          </div>
        </div>

        <div className={style.divVdg}><VdgContainer page={page} /></div>

        {pageBoolean === false ? (
            <Pagination page={page} setPage={setPage} />
          ) : null}

      </div>
    )
}

export default Home;