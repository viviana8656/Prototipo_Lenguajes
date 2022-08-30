import React from 'react';

import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Login from './LoginUser/Login'
import Home from './Pages/Home'
import TodoForm from './Pages/Todo'
import Registro from './Pages/Registro'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/" element={<Login></Login>}/>
        <Route path="/home" element={<Home></Home>}/>
        <Route path = "/TodoForm" element = {<TodoForm></TodoForm>}/>
        <Route path='/registro' element={<Registro></Registro>}/>
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;
