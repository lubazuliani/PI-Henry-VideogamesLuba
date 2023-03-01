import style from "../SearchBar/SearchBar.module.css";
import React from "react";
import { useState } from "react";
import { getVideogamesByName, changeLoader } from "../../redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = ({setPageBoolean}) => {
    const [games, setGames] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setGames(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch(changeLoader());
        dispatch(getVideogamesByName(games));
        setPageBoolean(true);
        setGames("");
    }

    return (
        <div className={style.searchbar}>
        <input
          value={games}
          onChange={(e) => changeHandler(e)}
          placeholder="Search by game name"
          //className={style.input}
          type="text"
        />
        <button
          onClick={(e) => submitHandler(e)}
          type="submit"
          //className={style.btn}
        >
          Search
        </button>
      </div>
    );
};

export default SearchBar;