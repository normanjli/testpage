import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className='navbar'>
            <h1>Welcome to Norman's Test App</h1>
            <div className='links'>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/drinks'>Drinks</Link>
            </div>
        </nav>
    );
};

export default Navbar;