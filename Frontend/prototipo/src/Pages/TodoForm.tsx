import React, { useState } from 'react'

export default function TodoForm({addTodo}: any) {

    const [userInput, setUserInput] = useState('Tarea');
    const [userInput2, setUserInput2] = useState('Descripción');

    const handleOnChangeTask = (e : any) => { 
        setUserInput(e.currentTarget.value)
    }

    const handleOnChangeDescription = (e : any) => { 
        setUserInput2(e.currentTarget.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(userInput.trim() !== ''){
            addTodo(userInput, userInput2);
            setUserInput('Tarea');
            setUserInput2('Descripción');
        }

    }
  return (
    <div style = {{margin:20}}>
        <form onSubmit = {handleSubmit}>
        <input type = 'text' value = {userInput} onChange = {handleOnChangeTask}/>
        <input type = 'text' value = {userInput2} onChange = {handleOnChangeDescription}/>
        <input type = 'date'/>
        <button> Agregar </button>
        </form>

        
    </div>

  )
}
