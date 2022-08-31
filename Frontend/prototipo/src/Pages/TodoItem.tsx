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
        <input className='form-check-input' type = 'checkbox' checked = {todo.completed}
        onChange = {() => onComplete(todo.nombre)}/>
        <b>Tarea</b>: {todo.nombre} 
        {' '}
        <b>Descripción</b>: {todo.descripción}
        {' '}
        <b>Fecha</b>: {todo.fechaFin}
        <button className = 'add-btn' onClick = {() => onDeleteItem(todo.nombre)}>X</button> 
    </div>
  )
}
