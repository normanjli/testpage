import React, { useState } from "react";
import axios from "axios";
import CreateAcct from "../components/createAcct/createAcct";
import LoginEle from "../components/loginEle/LoginEle";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
const Login = () => {
  const [message, setMessage] = useState(``);
  const navigate = useNavigate();
  const onCreate = async (data) => {
    try {
      setMessage(`Creating Account`);
      let res = await axios.post(`/api/createacct`, data);
      if (+res.status === 200) {
        setMessage(`Account created! Please login`);
      }
      return;
    } catch (error) {
      return setMessage(error.response);
    }
  };
  const onLogin = async (data) => {
    try {
      setMessage(`Attempting login`);
      let res = await axios.post(`/api/login/auth`, data);
      if (+res.status === 200) {
        localStorage.setItem(`username`, res.data);
        setMessage(`Login Successful`);
        navigate("/", { replace: true });
      }
    } catch (error) {
      setMessage(`Login Failed`);
    }
  };
  const [loginOrCreate, setLoginOrCreate] = useState(
    <LoginEle onSubmit={onLogin} onClick={(data, e) => changeType(data, e)} />
  );
  const changeType = (event) => {
    event.preventDefault();
    setMessage(``);
    return event.target.value === "login"
      ? setLoginOrCreate(
          <LoginEle onSubmit={onLogin} onClick={(data) => changeType(data)} />
        )
      : setLoginOrCreate(
          <CreateAcct
            onSubmit={onCreate}
            onClick={(data) => changeType(data)}
          />
        );
  };
  return (
    <>
      <Navbar title="Login to your account" />
      <div style={{ height: 3 + `em`, textAlign: `center`, marginTop: "5em" }}>
        <h1>{message}</h1>
      </div>
      {loginOrCreate}
    </>
  );
};

export default Login;
