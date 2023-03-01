import React from "react";
import { NavLink } from "react-router-dom";
import style from "../Landing Page/Landing2.module.css";


const Landing = () => {
    return (
        <div className={style.body}>
            <div className={style.textContainer}>
                <p>Welcome!</p>
            </div>
            <NavLink to="/videogames" className={style.navLink}>
                <button className={style.button}>Get started</button>
            </NavLink>
        </div>
    )
};

export default Landing;