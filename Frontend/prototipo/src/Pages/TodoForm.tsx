import React, { useState } from 'react'

export default function TodoForm({addTodo}: any) {

    const [userInput, setUserInput] = useState('');
    const [userInput2, setUserInput2] = useState('');
    const [fecha,setFecha] = useState('');

    const handleOnChangeTask = (e : any) => { 
        setUserInput(e.currentTarget.value)
    }

    const handleOnChangeDescription = (e : any) => { 
        setUserInput2(e.currentTarget.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(userInput.trim() !== ''){
            addTodo(userInput, userInput2,fecha);
            // setUserInput('Tarea');
            // setUserInput2('Descripción');
            // setFecha('fecha');
        }

    }
  return (
    <div style = {{margin:20}} className = "col-sm-8">
        <form className='input-group' onSubmit = {handleSubmit}>
        <input className='form-control' type = 'text' placeholder='Nombre'  onChange = {handleOnChangeTask}/>
        <input className='form-control' type = 'text' placeholder='Descripción'  onChange = {handleOnChangeDescription}/>
        <input className='form-control' type = 'date'/>
        <button className='btn btn-warning'> Agregar </button>
        </form>

        
    </div>

  )
}
