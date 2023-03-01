import React from "react";
import style from "./Pagination.module.css";
import { useSelector } from "react-redux";

//Recibe de Home
const Pagination = ({ page, setPage }) => {
  const allVideogames = useSelector((state) => state.videogames);

  let maxPage = Math.ceil(allVideogames.length / 15);
  // console.log(maxPage);

  const handlerNext = () => {
    setPage(page + 1);
  };

  const handlerPreview = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className={style.pagination}>
      <button
        onClick={() => { handlerPreview() }}
        className={page > 1 ? style.button : style.none}
      >
        Prev
      </button>
      <p>{page}</p>
      <button
        onClick={() => {handlerNext();}}
        className={page < maxPage ? style.button : style.none}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
