import React from 'react';

const Login = () => {
    // const [user, setUser] = useState({
    //     username: '',
    //     password: ''
    // })

    return (
        <div>
            <form className='login'>
                <h1>TODO make it go boom</h1>
                <div>
                    <label>Username </label>
                    <input id='username' type='text' placeholder='Username'></input>
                </div>
                <div>
                    <label>Password </label>
                    <input id='password' type='password' placeholder='Password'></input>
                </div>
                <div className='loginbtns'><button>Login</button><button>Create User</button></div>
            </form>
        </div>
    );
};

export default Login;