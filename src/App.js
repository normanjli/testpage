import './App.css';
import React from 'react'
import Navbar from './components/NavBar/Navbar';
import Login from './components/Login/Login';
import Home from './components/home/Home';
import Drinks from './components/drinks/Drinks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//TODO useeffect hook

function App() {
  
  return (
    <>
      <Navbar/>
      <div className='content'>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/drinks' element={<Drinks/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
