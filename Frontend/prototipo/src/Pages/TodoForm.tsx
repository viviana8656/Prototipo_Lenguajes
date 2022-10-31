import React, { useState } from 'react'

export default function TodoForm({addTodo}: any) {

    const [userInput, setUserInput] = useState('');
    const [userInput2, setUserInput2] = useState('');
    const [fecha,setFecha] = useState('');
    let intento = 0;

    const handleOnChangeTask = (e : any) => { 
        setUserInput(e.currentTarget.value)
    }

    const handleOnChangeDescription = (e : any) => { 
        setUserInput2(e.currentTarget.value)
    }
    const handleOnChangeFecha = (e : any) => { 
        setFecha(e.currentTarget.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(userInput.trim() !== ''){
            addTodo(userInput, userInput2,fecha);
        }

    }
  return (
    <div style = {{margin:20}} className = "col-sm-8">
        <form className='input-group' onSubmit = {handleSubmit}>
        <input className='form-control' type = 'text' placeholder='Nombre'  onChange = {handleOnChangeTask}/>
        <input className='form-control' type = 'text' placeholder='Descripción'  onChange = {handleOnChangeDescription}/>
        <input className='form-control' type = 'text' placeholder ='Fecha' onChange={handleOnChangeFecha}/>
        <button className='btn btn-warning'> Agregar </button>
        </form>

        
    </div>

  )
}
