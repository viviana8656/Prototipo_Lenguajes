import React from 'react'
import '../LoginUser/Login.css'
export default function Login() {
  return (
	<div className="container">
	<div className="d-flex justify-content-center h-100">
		<div className="card" style={{"top":"15rem"}}>
			<div className="card-header">
				<h3>Iniciar Sesión</h3>
			</div>
			<div className="card-body ">
				<form>
					<div className="input-group form-group ">
						<div className="input-group-prepend">
							<span className="input-group-text p-3"><i className="fas fa-user"></i></span>
						</div>
						<input type="text" className="form-control " placeholder="Carné"/>
		
					</div>
					<br></br>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text p-3"><i className="fas fa-key"></i></span>
						</div>
						<input type="password" className="form-control" placeholder="Contraseña"/>
					</div>
					<br></br>

					<div className="form-group">
						<input type="submit" value="Entrar" className="btn float-right login_btn"/>
					</div>
				</form>
			</div>
			<div className="card-footer">
				<div className="d-flex justify-content-center links">
					No tienes cuenta?<a href="#"> Crear una ya mismo!</a>
				</div>

			</div>
		</div>
	</div>
</div>
  )
}
