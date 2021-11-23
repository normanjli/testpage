import React, { useCallback, useEffect, useState } from "react";
import Links from "../Links/Links";
const Navbar = () => {
  const [title, setTitle] = useState(``);
  const [displayed, setDisplayed] = useState(false);
  const [url, setUrl] = useState(window.location.href);
  useEffect(() => {
    setUrl(window.location.href);
    if (url.includes("login")) {
        setTitle("Login to your account");
    } else if (url.includes("drinks")) {
        setTitle("Search for Drinks");
    } else {
        setTitle(`Welcome to the drink getter`);
    }
  }, [url]);
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
