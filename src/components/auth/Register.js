import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import './Register.css';



const errorMessages = {
    'username': 'You must enter a username!',
    'password': 'You must enter a password!',
    'retype-password': 'You must retype the password!',
    'confirm-password': 'You must enter the same password twice!',
    'no-numbers': 'Your username cannot contain any special characters or numbers!',
    'email': 'Email address is invalid!'
};

function Register() {
    const [formData, setFormData] = useState({
        'username': '',
        'email': '',
        'password': '',
        'confirm-password': ''
    });

    const [formError, setFormError] = useState({
        'username': '',
        'email': '',
        'password': '',
        'confirm-password': ''
    });

    const [globalErrorMessage, setGlobalError] = useState('');
    const [isSuccessfull, setSuccessfull] = useState(false);
    const [isDirty, setDirty] = useState(false);
    const { setUserName } = useContext(AuthContext);

    async function handlerSubmit(e) {
        e.preventDefault();
        setGlobalError('');
        setSuccessfull(false);
        const isInvalid = validateFormData() || await checkUser();
        if (!isInvalid) {
            setDirty(false);
            let res;
            try {
                res = await axios.post('http://localhost:3200/users/', formData);
                setUserName(res.data.username);
                localStorage.setItem('userName', res.data.username)
                setSuccessfull(true);
                console.log(res.data.username);
            } catch(e) {
                console.log(e.res.data.message, res)
            }
        }
    }

    async function checkUser() {
        const user = await axios.get('http://localhost:3200/users?username=' + formData.username)
                                .then(res => res.data);
        if(user.length) {
            setGlobalError("User already exists!");
            return true;
        }
        return false;
    }

    function validateFormData() {
        const inputs = ['username', 'email', 'password', 'confirm-password'];
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

        if (/\S+@\S+\.\+/.test(formData.email)) {
            newError.email = errorMessages['email'];
            isInvalid = true;
        }

        if (formData.password !== formData['confirm-password']) {
            newError['confirm-password'] = errorMessages['confirm-password'];
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

        if (e.currentTarget.id === 'password' || e.currentTarget.id === 'confirm-password') {
            newError['confirm-password'] = '';
        }
        setFormError(newError);
    }

    return (
        <>
            <div className="main-wrapper">
                <div className="register-container">
                    <img alt="Logo" src="lotr-login.jpg" width="40%" />
                    <h3>Create your new account</h3>
                    {(globalErrorMessage ?
                        <div className="alert alert-danger" role="alert">
                            {globalErrorMessage}
                        </div>
                        : null)
                    }
                    {(isSuccessfull ?

                    <div className="alert alert-success" role="alert">
                            Your username was created successfully!
                    </div>
                        : null)
                    }

                    <form className="form-wrapper" onSubmit={handlerSubmit}>
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
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={'form-item' + (formError.email ? ' is-invalid' : '')}
                                onChange={handleInputChange}
                                value={formData.email}
                                placeholder="Email">
                            </input>
                            <div className="invalid-feedback">
                                {formError.email}
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
                        <div className="form-group">
                            <label htmlFor="confirm-password">Re-enter Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                className={'form-item' + (formError['confirm-password'] ? ' is-invalid' : '')}
                                onChange={handleInputChange}
                                value={formData["confirm-password"]}
                                placeholder="Re-enter Password">
                            </input>
                            <span className="invalid-feedback">{}
                                {formError['confirm-password'] ? formError['confirm-password'] : ''}
                            </span>
                        </div>
                        <button type="submit" className="btn_submit" disabled ={!isDirty }>Submit</button>
                    </form>
                        {/* {(isSuccessfull ? <Redirect to="/movies" /> : <Register />) } */}
                </div>
            </div>
        </>
    )
};

export default Register;
