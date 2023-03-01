import axios from "axios";
import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { validation } from "./validations";
// import { getAllVideogames, getGenres, getPlatforms, postVideogames, changeLoader } from "../../redux/actions";

const Form = () => {

    // Formulario y estado tienen que ser reflejos uno del otro.
    const [form, setForm] = useState({
        prop1: '',
        email: '',
        prop3: ''
    });

    const [errors, setErrors] = useState({
        prop1: "",
        email: "",
        prop3: "",
    });


    const changeHandler = (e) => {
        // e.preventDefault(); -> Sirve para prevenir el comportamiento por defecto de OTRO elemento, NO onChange.
        const prop = e.target.name;
        const value = e.target.value;

        // La ejecuto para que valide a medida que voy aescribiendo.
        validate({...form, [prop]: value});

        setForm({...form, [prop]: value});
         
    }

    // Va a recibir el ESTADO del FORM.
    const validate = (form) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)){
            setErrors({...errors, email: ""})
        } else {
            setErrors({...errors, email: "Hay un error en el email"})
        };
        if (form.email==="") setErrors({...errors, email:"Email no puede ser un campo vacío"});

    }

    const submitHandler = (e) => {
        e.preventDefault();
        const response = axios.post({})
    } 

    //onSubmit va en form porque es el formulario quien dispara el evento, no el button.
    return (
        <form onSubmit={submitHandler}>  
            <div>
                <label></label>
                <input type="text" value={form.prop1} onChange={changeHandler} name=""></input>
            </div>
            <div>
                <label></label>
                <input type="text" value={form.email} onChange={changeHandler} name="email"></input>
                {errors.emai && <span>{errors.email}</span>}
            </div>
            <div>
                <label></label>
                <input type="text" value={form.prop3} onChange={changeHandler} name=""></input>
            </div>

            <button>Submit</button>        
        </form>
        
    )
};

// la prop "name" en cada input es para que el event pueda decirle a la función changeHandler, quién disparó el evento.
// El input es el reflejo del estado y el estado, del evento. 



// Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Descripción
// Fecha de lanzamiento
// Rating
// Posibilidad de seleccionar/agregar varios géneros
// Posibilidad de seleccionar/agregar varias plataformas
// Botón/Opción para crear un nuevo videojuego