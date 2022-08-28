import React from 'react';

import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Login from './LoginUser/Login'
import Home from './Home'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}/>
        <Route path="/home" element={<Home></Home>}/>
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;
