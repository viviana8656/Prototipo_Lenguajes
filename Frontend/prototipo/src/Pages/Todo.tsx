import React, { useEffect, useState } from 'react'
import '../Pages/Todo.css';
import data from './data.json'
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Todo(){
    const [todos, setTodos] = useState<string[]>([]); //En el useState para TS tenemos que definir que tipo va a guardar
                                                      //Acá definimos que guardará un array de string

    const baseUrl: string = 'http://localhost:4000/api/prototipo/';

    //En los cookies están almacenados los datos del usuario
    const cookies = new Cookies();
	const navigate = useNavigate();

    //Pedimos la lista de tareas del usuario
    const peticionGet=async()=>{
        axios.get(baseUrl+`getTasks/:carnet?carnet=${cookies.get("carnet")}`)
        .then(response=>{
            setTodos(response.data)
        }).catch(error=>{
            console.log(error);
        })
    }

    const cerrarSesion=()=>{
        cookies.remove("carnet",{path:'/'});
        cookies.remove("nombre",{path:'/'});
        cookies.remove("apellidos",{path:'/'});
        cookies.remove("contraseña",{path:'/'});
        navigate("/")

    }
    const onComplete = (nombre : any) => {
        /*console.log('task', id);*/

        setTodos(todos.map((todo:any) => {
            return todo.nombre === nombre ? {...todo, completed: !todo.completed} : {...todo};
        }))
    }

    const onDeleteItem = (nombre : any)  => {
        setTodos([...todos].filter((todo:any) => todo.nombre !== nombre))
        console.log('delete', nombre);
    }

    const addTodo = async(newTodo: any, newDescription: string, fecha:string) => {
        let newItem = {carnet:cookies.get("carnet"),nombre: newTodo, descripcion:newDescription, fecha:'30-08-22'};
        console.log('newTodo', newItem);
       await axios.post(baseUrl+`createTask`,newItem);

    }
    const actualizar=()=>{
        peticionGet();
    }

    useEffect(()=>{ //Renderiza
        peticionGet();
    })

    return (
        <div className = "container">
            <br></br>
            <button style={{'left':'5rem'}} className='btn btn-primary' onClick={()=>cerrarSesion()}>Cerrar sesión</button>
             <TodoForm addTodo = {addTodo}/> 
            <TodoList todos = {todos} onComplete = {onComplete} onDeleteItem = {onDeleteItem}/>
            {/* <button className='btn btn-primary' onClick={()=>actualizar()}>actualizar</button> */}
        </div>
    );
}

