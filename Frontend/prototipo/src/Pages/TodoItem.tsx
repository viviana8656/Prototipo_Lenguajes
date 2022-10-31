import React from 'react'

export default function TodoItem({todo, onComplete, onDeleteItem}:any) {
    const getStyle = () => {
        return {
            textDecoration: todo.completed ? 'line-through': 'none',
            margin: '20px',
            border: '1px solid #ffffff',
            backgroundColor: '#ffffff'
        }
    }
  return (
    <div style = {getStyle()}>
        <input className='form-check-input' type = 'checkbox' checked = {todo.completado}
        onChange = {() => onComplete(todo.nombre, todo.fechaFin, todo.completado)}/>
        <b>{todo.nombre}: {todo.fechaFin}</b> <br />
        <p>{todo.descripción}    
        <button className = 'add-btn' onClick = {() => onDeleteItem(todo.nombre)}> X </button></p>  
    </div>
  )
}
