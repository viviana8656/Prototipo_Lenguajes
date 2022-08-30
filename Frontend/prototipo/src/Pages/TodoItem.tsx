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
        <input type = 'checkbox' checked = {todo.completed}
        onChange = {() => onComplete(todo.id)}/>
        <b>Tarea</b>: {todo.task} 
        {' '}
        <b>Descripción</b>: {todo.description}
        {' '}
        <b>Fecha</b>: {todo.date}
        <button className = 'add-btn' onClick = {() => onDeleteItem(todo.id)}>X</button> 
    </div>
  )
}
