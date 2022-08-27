import React from 'react';

import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Login from './LoginUser/Login'
import './App.css';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Login></Login>}/>
    //   </Routes>
    // </BrowserRouter>
    <Login/>
  );
}

export default App;
