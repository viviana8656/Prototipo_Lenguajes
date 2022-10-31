import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({todos, onComplete, onDeleteItem}:any){
    const getStyle = () => {
        return {
            textDecoration: todos.completed ? 'line-through': 'none',
            margin: '20px',
            border: '1px solid #ffffff',
            backgroundColor: '#ffffff'
        }
    }
    const getUnCompletedTaks = (list:Array<any>):Array<any> =>{
        return list.filter((todo:any) => todo.completado == false)
    }
    const getCompletedTaks = (list:any):Array<any> =>{
        return list.filter((todo:any) => todo.completado == true)
    }
    if (getUnCompletedTaks(todos).length != 0){
        if (getCompletedTaks(todos).length != 0){
            return(
                <div>
                    <h1 className='title'>Tareas por completar</h1>
                    {
                        getUnCompletedTaks(todos).map((todo: any, index: any) =>(
                            <TodoItem key = {`todo-${index}`} todo = {todo} onComplete = {onComplete} onDeleteItem = {onDeleteItem}/>             
                        ))
                    }
                    <h1 className='title'>Tareas completadas</h1>
                    {
                        getCompletedTaks(todos).map((todo: any, index: any) =>(
                            <TodoItem key = {`todo-${index}`} todo = {todo} onComplete = {onComplete} onDeleteItem = {onDeleteItem}/>                
                        ))
                    }
                </div>
            )
        }
        return(
            <div>
                <h1 className='title'>Tareas por completar</h1>
                {
                    getUnCompletedTaks(todos).map((todo: any, index: any) =>(
                        <TodoItem key = {`todo-${index}`} todo = {todo} onComplete = {onComplete} onDeleteItem = {onDeleteItem}/>             
                    ))
                }
            </div>
        )
    }
    else{
        if (getCompletedTaks(todos).length != 0){
            return(
                <div>
                    <h1 className='title'>Tareas completadas</h1>
                    {
                        getCompletedTaks(todos).map((todo: any, index: any) =>(
                            <TodoItem key = {`todo-${index}`} todo = {todo} onComplete = {onComplete} onDeleteItem = {onDeleteItem}/>                
                        ))
                    }
                </div>
            )
        }
        return(
            <div>
                <h4 className='title'>No hay tareas creadas</h4>
            </div>
        )
    }

}