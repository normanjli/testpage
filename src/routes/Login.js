import React from 'react';

const Login = () => {
    return (
        <div>
            <form className='login'>
                <div>
                    <label>Username </label>
                    <input type='text' placeholder='Username'></input>
                </div>
                <div>
                    <label>Password </label>
                    <input type='password' placeholder='Password'></input>
                </div>
                <div className='loginbtns'><button>Login</button><button>Create User</button></div>
            </form>
        </div>
    );
};

export default Login;