import React from 'react';
import Navbar from '../components/NavBar/Navbar';
import {useForm} from 'react-hook-form'
const Login = () => {
    const { register, handleSubmit, watch, formState: { errors }, validate } = useForm();
    const onSubmit = data =>console.log(data)
    return (
        <div>
            <Navbar title='Login to your account'/>
            <form onSubmit={handleSubmit(onSubmit)} className='login'>
                <div>
                    <label>Username </label>
                    <input {...register("username",{required:true})} type='text' placeholder='Username'></input>
                </div>
                {errors.username && <span>This field is required</span>}
                <div>
                    <label>Password </label>
                    <input {...register("password",{required:true})} id='password' type='password' placeholder='Password'></input>
                </div>
                {errors.password && <span>This field is required</span>}
                <div className='loginbtns'><button>Login</button><button>Create User</button></div>
            </form>
        </div>
    );
};

export default Login;