import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { Redirect } from 'react-router-dom';
import './Login.css';

const errorMessages = {
    'username': 'You must enter a username!',
    'password': 'You must enter a password!',
    'no-numbers': 'Your username cannot contain any special characters or numbers!'
};

export default function Login() {
    const [formData, setFormData] = useState({
        'username': '',
        'password': ''
    });

    const [formError, setFormError] = useState({
        'username': '',
        'password': ''
    });

    const [globalErrorMessage, setGlobalError] = useState('');
    const [isSuccessfull, setSuccessfull] = useState(false);
    const [isDirty, setDirty] = useState(false);
    const { setUserName } = useContext(AuthContext);

    async function handlerSubmit(e) {
        e.preventDefault();
        setGlobalError('');
        setSuccessfull(false);
        const isInvalid = validateFormData()
        if (!isInvalid) {
            setDirty(false);
            let res;
            try {
                res = await axios.get('http://localhost:3200/users?username=' + formData['username'] + '&password=' + formData['password']);
                console.log('res data json', JSON.stringify(res.data));

                if(res.data.length) {
                    setUserName(res.data[0].username);
                    localStorage.setItem('userName', res.data[0].username)
                    setSuccessfull(true);
                } else {
                    setGlobalError("The user don't exist!");
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    function validateFormData() {
        const inputs = ['username', 'password'];
        const newError = { ...formError };
        let isInvalid = false;

        for (const input of inputs) {
            if (!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        if (!(/^[a-z 0-9]+$/i.test(formData.username))) {
            newError.username = errorMessages['no-numbers'];
            isInvalid = true;
        }

        if (!formData.password) {
            newError.password = errorMessages.password;
            isInvalid = true;
        }

        setFormError(newError);
        return isInvalid;
    }

    function handleInputChange(e) {
        setDirty(true);
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

        const newError = {
            ...formError,
            [e.currentTarget.id]: '',
        };
        setFormError(newError);
    }

    return (
        <>
        <div className="main">
            <div className="login-container">
                <img alt="Logo" src="lotr-login.jpg" width="40%"/>
                <h3>Login</h3>
                    {(globalErrorMessage ?
                        <div className="alert alert-danger" role="alert">
                            {globalErrorMessage}
                        </div>
                        : null)}

                    {(isSuccessfull ?
                        <div className="alert alert-success" role="alert">
                            Your have been succesfully logged in!
                            <Redirect to="/movies" />
                        </div>

                        : null)}
                <form className="form-wrapper" onSubmit={handlerSubmit} >
                    <div className="form-group">
                        <label htmlFor="username">Full Name</label>
                        <input
                            type="text"
                            id="username"
                            className={'form-item' + (formError.username ? ' is-invalid' : '')}
                            onChange={handleInputChange}
                            value={formData.username}
                            placeholder="Full Name">
                        </input>
                        <div className="invalid-feedback">
                            {formError.username}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={'form-item' + (formError.password ? ' is-invalid' : '')}
                            onChange={handleInputChange}
                            value={formData.password}
                            placeholder="Password">
                        </input>
                        <div className="invalid-feedback">
                            {formError.password}
                        </div>
                    </div>
                    <button type="submit" className="btn_submit" disabled={ !isDirty }>Login</button>
                </form>
            </div>
        </div>
        </>
    )
}
