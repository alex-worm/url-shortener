import React, {useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

export const AuthPage = () => {
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

    const changeHandler = ev => {
        setForm({...form, [ev.target.name]: ev.target.value});
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (ex) {
            ///////////////////////////////////////////
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message);
        } catch (ex) {
            ///////////////////////////////////////////
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
                                       onChange={changeHandler}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input className="white-text"
                                       placeholder="Enter password"
                                       id="password"
                                       type="password"
                                       name="password"
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
