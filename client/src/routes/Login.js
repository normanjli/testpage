import React, { useState } from 'react';
import Navbar from '../components/NavBar/Navbar';
// import {useForm} from 'react-hook-form'
import axios from 'axios'
import CreateAcct from '../components/createAcct';
import LoginEle from '../components/LoginEle';

const Login = () => {
    const onCreate = (data) =>{
        axios.post(`/createacct`, data)
    }
    const onLogin = (data) =>{
        axios.post(`/login/auth`, data)
    }    
    const [loginOrCreate, setLoginOrCreate] = useState(<LoginEle onSubmit={onLogin} onClick={(e)=>changeType(e)}/>)
    const changeType = (event) =>{
        event.preventDefault()
        console.log(event.target.value)
        return event.target.value==='login'?setLoginOrCreate(<LoginEle onSubmit={onLogin} onClick={(e)=>changeType(e)}/>):setLoginOrCreate(<CreateAcct onSubmit={onCreate} onClick={(e)=>changeType(e)}/>);
    }
    return (
        <div>
            <Navbar title='Login to your account'/>
            {loginOrCreate}
        </div>
    );
};

export default Login;