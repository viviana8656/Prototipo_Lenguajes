import React, { ChangeEvent, useState } from 'react'

import '../Pages/Registro.css'

import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Registo() {

  const baseUrl: string = 'http://localhost:4000/api/prototipo/createUser';

  const cookies = new Cookies();
  const navigate = useNavigate();

  const [form, setForm] = useState({
		carnet: '',
    	nombre: '',
    	apellidos: '',
		contraseña: ''
	});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { //EN TS hay que especificar el e es de tipo evento de un form
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value
		});
		console.log(form);
	}


  const registrarUsuario = async () => {
	try{

	
	const { data } = await axios.post(baseUrl, form)
	alert("Usuario Registrado");
	navigate("/");
	}catch(error){
		alert('No se pudo crear el usuario')
	}	
	}
  
  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card" style={{ "top": "15rem" }}>
        <div className="card-header">
				<h3>Registro</h3>
			</div>
          <div className="card-body">
            
            <div className="input-group form-group ">
				<div className="input-group-prepend">
					<span className="input-group-text p-3"><i className="fas fa-id-card"></i></span>
				</div>
				<input name="carnet" type="number" className="form-control " placeholder="Carné" onChange={handleChange}/>
			</div>

            <br></br>

            <div className="input-group form-group ">
				<div className="input-group-prepend">
					<span className="input-group-text p-3"><i className="fas fa-user"></i></span>
				</div>
				<input name="nombre" type="text" className="form-control " placeholder="Nombre" onChange={handleChange}/>
			</div>

            <br></br>

            <div className="input-group form-group ">
				<div className="input-group-prepend">
					<span className="input-group-text p-3"><i className="fas fa-align-justify"></i></span>
				</div>
				<input name="apellidos" type="text" className="form-control " placeholder="Apellidos" onChange={handleChange}/>
			</div>

            <br></br>

            <div className="input-group form-group">
				<div className="input-group-prepend">
					<span className="input-group-text p-3"><i className="fas fa-key"></i></span>
				</div>
				<input name="contraseña" type="password" className="form-control" placeholder="Contraseña" onChange={handleChange}/>
			</div>
			<br></br>
            <br></br>

            <div className="form-group">
				<input type="submit" value="Registrar" className="btn float-right login_btn" onClick={() => registrarUsuario()} />
			</div>

          </div>
        </div>
      </div>
    </div>
  )
}
