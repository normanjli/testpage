import React, {useState} from 'react';
import { Link } from 'react-router-dom';
const Navbar = ({title}) => {
    const [clicked, setClicked] = useState(false)
    const clickHandler = ()=>{
        return clicked?setClicked(false):setClicked(true)
    }
    const links = [
    <Link to='/'>Home</Link>,
    // <Link to='/login'>Login</Link>,
    <Link to='/drinks'>Drinks</Link>
]
    return (
        <nav className='navbar'>
            <h1>{title}</h1>
            <div className='links'>
                <button className="icon" onClick={()=>clickHandler()}>
                    <i className="fa fa-bars"/>
                </button>
                {clicked?links:null}
            </div>
                <div className= "responsive">
                    {links}
                </div>
        </nav>
    );
};

export default Navbar;