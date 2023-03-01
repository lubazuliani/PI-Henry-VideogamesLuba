import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { validation } from "./validations";
import { getGenres, postVideogames } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import style from "../Form/Form.module.css";


const Form = () => {
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.genres);
  
    const allPlatforms = [
      "PC",
      "Linux",
      "Xbox One",
      "PlayStation 5",
      "PlayStation 4",
      "Wii U",
      "Nintendo Switch",
      "macOS",
      "iOS",
      "Nintendo 3DS",
      "Android",
      "Steam Deck",
    ];


    const [form, setForm] = useState({
        name: "",
        description: "",
        released: "",
        image: "",
        rating: "",
        genres: [],
        platforms: [],
      });


    const [errors, setErrors] = useState({
      /*   name: "",
        description: "",
        released: "",
        image: "",
        rating: "",
        // Puedo simplemente ponerlos como strings?
        genres: [],
        platforms: [], */
    });


    useEffect(() => {
        dispatch(getGenres());
      }, [dispatch]);


    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors(

        // La ejecuto para que valide a medida que voy escribiendo.
        validation({
            ...form,
            [e.target.name]: e.target.value,
        })
        );
    };


    const platformHandler = (e) => {
      if (e.target.checked) {
        setForm({
          ...form,
          [e.target.name]: [...form.platforms, e.target.value],
        });
      } else {
        setForm({
          ...form,
          [e.target.name]: form.platforms.filter((a) => a !== e.target.value),
        });
      }
    };


    const genderHandler = (e) => {
      if (e.target.checked) {
        setForm({
          ...form,
          [e.target.name]: [...form.genres, e.target.value],
        });
      } else {
        setForm({
          ...form,
          [e.target.name]: form.genres.filter((a) => a !== e.target.value),
        });
      }
    };
     


      const submitHandler = (e) => {
        e.preventDefault();

        dispatch(postVideogames(form));
        e.target.reset();
        setForm({
          name: "",
          description: "",
          released: "",
          image: "",
          rating: "",
          genres: [],
          platforms: [],
        });
        
        window.location.href='/videogames'
      };

     console.log(Object.entries(errors).length);
     console.log(Object.entries(errors))
     
     
    return (
        <div className={style.maincontainer}>
          <div className={style.container}>

            <h2>Create New Videogame</h2>
            <form onSubmit={(e) => { submitHandler(e); }} className={style.form}>
              
            <div className={style.container}>

                <div className={style.divTitles}>

                  <div className={style.divTitle}>
                    <label htmlFor="name">Name: </label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={form.name}
                      type="text"
                      className={`${style.input} ${form.name && style.completed}`}
                      onChange={(e) => changeHandler(e)}
                    />
                    {errors.name && <p>{errors.name}</p>}
                  </div>
                
                  <div className={style.divTitle}>
                    <label htmlFor="released">Release Date: </label>
                    <input
                      name="released"
                      placeholder="YYYY-MM-DD"
                      value={form.released}
                      // Está bien que sea texto a pesar de que el modelo toma DATEONLY format solamnte?
                      type="text"
                      className={`${style.input} ${form.released && style.completed}`}
                      onChange={(e) => changeHandler(e)}
                    />
                    {errors.released && <p>{errors.released}</p>}
                  </div>
                
                  <div className={style.divTitle}>
                    <label htmlFor="rating">Rating: </label>
                    <input
                      name="rating"
                      placeholder='4.92'
                      value={form.rating}
                      type="number"
                      className={`${style.input} ${form.rating && style.completed}`}
                      onChange={(e) => changeHandler(e)}
                    />
                    {errors.rating && <p>{errors.rating}</p>}
                  </div>
                
                  <div className={style.divTitle}>
                    <label htmlFor="description">Description: </label>
                    <textarea
                      name="description"
                      maxLength="100"
                      placeholder="Brief description of the game (100 characters)"
                      value={form.description}
                      type="text"
                      className={`${style.input} ${form.description && style.completed}`}
                      onChange={(e) => changeHandler(e)}
                    />
                    {errors.description && <p>{errors.description}</p>}
                  </div>

                </div>

                <div className={style.imagediv}>
                    <label htmlFor="image">Image URL: </label>
                    <input
                      name="image"
                      placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9G"
                      value={form.image}
                      type="text"
                      className={`${style.imagein} ${form.image && style.completed}`}
                      onChange={(e) => changeHandler(e)}
                    />
                    {errors.image && <p>{errors.image}</p>}
                </div>


                <div classname={style.divFlex}>

                    <div className= {style.divFlex2}>
                    <label htmlFor="genres">Genres</label>
                            {allGenres.map((gen) => (
                              <div className={style.checks} key={gen.name}>
                                <input
                                type="checkbox"
                                name="genres"
                                value={gen.name}
                                onChange={(e) => genderHandler(e)}
                                ></input> 
                                <label name={gen}>{gen.name}</label>
                              </div>
                              ))}
                          {errors.genres && <p>{errors.genres}</p>}
                     </div>

                    <div className= {style.divFlex2}>
                    <label htmlFor="platforms">Platforms</label>
                            {allPlatforms.map((P) => (
                            <div className={style.checks} key={P}>
                                <input
                                type="checkbox"
                                name="platforms"
                                value={P}
                                onChange={(e) => platformHandler(e)}
                                ></input>
                                <label name={P}>{P}</label>
                            </div>
                            ))}
                        {errors.platforms && <p>{errors.platforms}</p>}
                      </div>
                 
                 </div>
             
              <div>
                {/* <button 
                className={form.name === "" || Object.entries(errors).length !== 0 ? style.none : style.button} 
                type="submit">
                  Create
                </button> */}

                {form.name !== "" && Object.entries(errors).length === 0 ? (
                  <button className={style.button} type="submit">
                    Create
                  </button>
                ) : (
                  <button className={style.none}>Create</button>
                )}

                <NavLink to="/videogames">
                  <button className={style.button} type="submit">Cancel</button>
                </NavLink>
              </div>

            </div>
          </form>
          </div>
        </div>
      );
    };
    

export default Form;