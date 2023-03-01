import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import React from "react";
import { useState } from "react";

const NavBar = (props) => {
    const [pageBoolean, setPageBoolean] = useState(false); 

    return (
        <div className={style.mainContainer}>
            <div className="home">
                <Link to="/videogames">
                    <h3>Home</h3>
                </Link>
            </div>
            <div className="searchbar">
                <SearchBar setPageBoolean={setPageBoolean} />
            </div>
            <div className="form">
                <Link to="/form">
                    <h3>Create</h3>
                </Link>
            </div>
        </div>
    );
}


export default NavBar;

