import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css"


function Register(props) {
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
        console.log(user)
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    navigate('/')
                }
                else {
                    setMessage(result.message)
                }
            })
    }
    return (
        <div className="full-page flex-column">
            <div className='login-container flex-column'>
                <h2>REGISTER</h2>
                <div className="warning auth-error">
                    {message && <span>{message}</span>}
                </div>
                <input className="textbox" type="text" name="name" onChange={handleRegisterChange} placeholder="*Enter Desired User name" />
                <input className="textbox" type="password" name="password" onChange={handleRegisterChange} placeholder="*Enter Desired Password" />
                <input className="textbox" type="password" name="passwordCopy" onChange={handleRegisterChange} placeholder="*Re-Enter Desired Password" />
                {user.password !== user.passwordCopy
                    ?
                    <>
                    <span className='highlight password-message'>Passwords Must Match</span>
                    <button disabled>SUBMIT</button>
                    </>
                    :
                    <button onClick={handleRegisterButton}>SUBMIT</button>
                }
                <NavLink to="/" className='highlight'>Back To Login</NavLink>
            </div>
        </div>
    )
}

export default Register

