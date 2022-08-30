import React, { useState } from 'react'
import '../Pages/Todo.css';
import data from './data.json'
import TodoList from './TodoList';
import TodoForm from './TodoForm';

/*import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";*/

export default function Todo(){
    const [todos, setTodos] = useState(data);

    const onComplete = (id : any) => {
        /*console.log('task', id);*/

        setTodos(todos.map((todo) => {
            return todo.id === Number(id) ? {...todo, completed: !todo.completed} : {...todo};
        }))
    }

    const onDeleteItem = (id : any)  => {
        setTodos([...todos].filter(todo => todo.id !== id))
        console.log('delete', id);
    }

    const addTodo = (newTodo: any, newDescription: string) => {
        console.log('newTodo', newTodo);
        let newItem = {id: +new Date(), task: newTodo, description:newDescription, completed: false};

        setTodos([...todos, newItem])
    }

    return (
        <div className = "container">
            <TodoForm addTodo = {addTodo}/>
            <TodoList todos = {todos} onComplete = {onComplete} onDeleteItem = {onDeleteItem}/>
        </div>
    );
}

