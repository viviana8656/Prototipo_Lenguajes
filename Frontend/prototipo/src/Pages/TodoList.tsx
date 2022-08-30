import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({todos, onComplete, onDeleteItem}:any){
    return(
        <div>
            {
                todos.map((todo: any, index: any) =>(
                    <TodoItem key = {`todo-${index}`} todo = {todo} onComplete = {onComplete} onDeleteItem = {onDeleteItem}/>                
                ))
            }
        </div>
    )
}