import React, { useState } from "react";
import axios from "axios";
import CreateAcct from "../components/createAcct";
import LoginEle from "../components/LoginEle";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [message, setMessage]=useState(``)
  const navigate = useNavigate();
  const onCreate = async (data) => {
    try{
      setMessage(`Creating Account`)
      let res= await axios.post(`/api/createacct`, data);
      if (+res.status===200){
        setMessage(`Account created! Please login`)
        navigate(`/user`, {replace:true})
      }else{
        throw res.status
      }
    }catch(error){
      setMessage(`Could not create Account`)
    }
  };
  const onLogin = async (data) => {
    try{
      setMessage(`Attempting login`)
      let res = await axios.post(`/api/login/auth`, data);
      if(+res.status===200){
        setMessage(`Login Successful`)
        navigate("/", { replace: true })
      }else{
        throw res.status
      }
    } catch(error) {
      setMessage(`Login Failed`)
    }
    
  };
  const [loginOrCreate, setLoginOrCreate] = useState(
    <LoginEle onSubmit={onLogin} onClick={(data, e) => changeType(data, e)} />
  );
  const changeType = (event) => {
    event.preventDefault();
    setMessage(``)
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
    <div>
      <p>{message}</p>
      {loginOrCreate}
    </div>
  );
};

export default Login;
