import React, { useState } from "react";
import axios from "axios";
import CreateAcct from "../components/createAcct/createAcct";
import LoginEle from "../components/loginEle/LoginEle";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import Message from "../components/Message/Message";
const Login = () => {
  const [message, setMessage] = useState(``);
  const navigate = useNavigate();
  const onLogin = async (data) => {
    try {
      setMessage(`Attempting login`);
      let res = await axios.post(`/api/login/auth`, data);
      if (+res.status === 200) {
        localStorage.setItem(`username`, res.data[0]);
        localStorage.setItem('likedDrinks',res.data[1])
        setMessage(`Login Successful`);
        navigate("/user", { replace: true });
      }
    } catch (error) {
      setMessage(`Login Failed`);
      setTimeout(()=>setMessage(``),1500)
    }
  };
  const onCreate = async (data) => {
    try {
      setMessage(`Creating Account`);
      let res = await axios.post(`/api/createacct`, data);
      if (+res.status === 200) {
        setMessage(`Account created! Logging you in`);
        await onLogin(data)
      }
    } catch (error) {
      setMessage(error.response.data);
      setTimeout(()=>setMessage(``),1500)
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
      <div style={{marginTop:'5em'}}>
      {loginOrCreate}
      <Message message={message}/>
      </div>
    </>
  );
};

export default Login;
