import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')
    const handleRegisterChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleRegisterButton = () => {
        if (user.password.length < 6) {
            setMessage("Password must be at least 6 characters")
        } else if (user.password !== user.passwordCopy) {
            setMessage("Passwords Must Match")
        } else {
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(response => response.json())
                .then(result => {
                    if (result.success) {
                        navigate('/login')
                    }
                    else {
                        setMessage(result.message)
                    }
                })
        }
    }
    return (
            <div className=''>
                <h2>REGISTER</h2>
                <div className="warning auth-error">
                    {message && <span>{message}</span>}
                </div>
                <input className="textbox" type="text" name="name" onChange={handleRegisterChange} placeholder="*Enter Desired User name" />
                <input className="textbox" type="password" name="password" onChange={handleRegisterChange} placeholder="*Enter Desired Password" />
                <input className="textbox" type="password" name="passwordCopy" onChange={handleRegisterChange} placeholder="*Re-Enter Desired Password" />
                <button onClick={handleRegisterButton}>SUBMIT</button>
                <Link to={"/login"} className='highlight'>Back To Login</Link>
            </div>
    )
}

export default Register

