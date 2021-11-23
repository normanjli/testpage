import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
const Links = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await axios.get(`/api/logout`,{withCredentials:true});
    setTimeout(() => navigate("/", { replace: true }), 1000);
  };
  return (
    <>
      <Link key="home" to="/">
        Home
      </Link>
      <Link key="login" to="/login">
        Login
      </Link>
      <Link key="drink" to="/drinks">
        Drinks
      </Link>
      <Link key ='user'to="/user">
        User
      </Link>
      <Link onClick={logout} to="/logout">
        Logout
      </Link>
    </>
  );
};

export default Links;
