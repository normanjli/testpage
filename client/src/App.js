import './App.css';
import React from 'react'
// import Login from './routes/Login';
import Home from './routes/Home';
import Drinks from './routes/Drinks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  
  return (
    <>
      <div className='content'>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            {/* <Route path='/login' element={<Login/>}/> */}
            <Route path='/drinks' element={<Drinks/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
