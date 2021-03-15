import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {
            message(e.message);
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e) {
            message(e.message);
        }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten the link</h1>
                <div className="card deep-purple darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input className="white-text"
                                       placeholder="Enter email"
                                       id="email"
                                       type="text"
                                       name="email"
                                       value={form.email}
                                       onChange={changeHandler}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input className="white-text"
                                       placeholder="Enter password"
                                       id="password"
                                       type="password"
                                       name="password"
                                       value={form.password}
                                       onChange={changeHandler}/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn cyan darken-1"
                                style={{marginRight: 10}}
                                onClick={loginHandler}
                                disabled={loading}>
                            Sign In
                        </button>
                        <button className="btn black lighten-4"
                                onClick={registerHandler}
                                disabled={loading}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
