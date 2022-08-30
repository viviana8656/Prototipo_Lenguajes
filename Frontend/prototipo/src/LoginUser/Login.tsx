import React, { ChangeEvent, useState } from 'react'
import '../LoginUser/Login.css'
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";




export default function Login() {
	//URL para la peticion al backend
	const baseUrl: string = 'http://localhost:4000/api/prototipo/login';
	const cookies = new Cookies();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		carnet: '',
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


	const iniciarSesion = async () => {

		try {
			const { data } = await axios.post(baseUrl, form)
			if (data) {
				cookies.set("nombre", data.nombre, { path: "/" })
				cookies.set("apellidos", data.apellidos, { path: "/" })
				cookies.set("carnet", data.carnet, { path: "/" })
				cookies.set("contraseña", data.contraseña, { path: "/" })
				alert("Bienvenid@: " + cookies.get('nombre') + " " + data.apellidos);
				navigate("/todoForm");
			}
			else{
				alert("Usuario no existe")
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log('error message: ', error.message);
				return error.message;
			}
		}

	}

	const goRegistro=()=>{
		navigate("/registro");
	}

	return (
		<div className="container">
			<div className="d-flex justify-content-center h-100">
				<div className="card" style={{ "top": "15rem" }}>
					<div className="card-header">
						<h3>Iniciar Sesión</h3>
					</div>
					<div className="card-body ">
						<div className="input-group form-group ">
							<div className="input-group-prepend">
								<span className="input-group-text p-3"><i className="fas fa-user"></i></span>
							</div>
							<input name="carnet" type="number" className="form-control " placeholder="Carné" onChange={handleChange} />

						</div>
						<br></br>
						<div className="input-group form-group">
							<div className="input-group-prepend">
								<span className="input-group-text p-3"><i className="fas fa-key"></i></span>
							</div>
							<input name="contraseña" type="password" className="form-control" placeholder="Contraseña" onChange={handleChange} />
						</div>
						<br></br>

						<div className="form-group">
							<input type="submit" value="Entrar" className="btn float-right login_btn" onClick={() => iniciarSesion()} />
						</div>

					</div>
					<div className="card-footer">
						<div className="d-flex justify-content-center links" onClick={()=>goRegistro()}>
							No tienes cuenta?<a href="#"> Crear una ya mismo!</a>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}
