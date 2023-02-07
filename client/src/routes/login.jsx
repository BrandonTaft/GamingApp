import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [message, setMessage] = useState('');
    const handleLoginChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    const handleLogin = () => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => response.json())
            .then(result => {
                if (result.success === true) {
                    Cookies.set('token', true)
                    navigate('/profile')    
                }
                else {
                    setMessage(result.message)
                }
            })
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <input className="textbox" type="text" name="name" onChange={handleLoginChange} placeholder="User name" />
                <input className="textbox" type="password" name="password" onChange={handleLoginChange} placeholder="Password" />
                <div className="warning auth-error">
                    {message && <span>{message}</span>}
                </div>
                <button className="btn mb-1" onClick={handleLogin}>LOGIN</button>
            <Link to={"/register"}>REGISTER</Link>
        </div>
    )
}

export default Login