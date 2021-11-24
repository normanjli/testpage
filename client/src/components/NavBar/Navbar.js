import React, { useCallback, useEffect, useState } from "react";
import Links from "../Links/Links";
const Navbar = ({title}) => {
  const [displayed, setDisplayed] = useState(false);
  const clickHandler = () => {
    displayed
      ? setDisplayed(false)
      : setDisplayed(
          <div>
            <Links key="dropdown" />
          </div>
        );
  };
  const close = useCallback(()=>{
      setDisplayed(false)
  },[])
  useEffect(()=>{
      if (displayed!==false){
          window.addEventListener(`click`,close)
      }else{
          window.removeEventListener(`click`,close)
      }
  })
  return (
    <nav className="navbar">
      <h1>{title}</h1>
      <div className="links">
        <button className="icon" onClick={clickHandler}>
          <i className="fa fa-bars" />
        </button>
        {displayed}
      </div>
      <div className="responsive">
        <Links key="permanent" />
      </div>
    </nav>
  );
};

export default Navbar;
