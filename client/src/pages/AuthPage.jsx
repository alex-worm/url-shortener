import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (error) {
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (error) {
        }
    };

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten the link</h1>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input id="email"
                                       type="text"
                                       name="email"
                                       value={form.email}
                                       onChange={changeHandler}/>
                                <label htmlFor="email">Enter email</label>
                            </div>
                            <div className="input-field">
                                <input id="password"
                                       type="password"
                                       name="password"
                                       value={form.password}
                                       onChange={changeHandler}/>
                                <label htmlFor="password">Enter password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="waves-effect waves-light btn"
                                style={{marginRight: 10}}
                                onClick={loginHandler}
                                disabled={loading}>
                            Sign In
                        </button>
                        <button className="waves-effect btn white black-text"
                                onClick={registerHandler}
                                disabled={loading}>
                            Sign Up
                        </button>
                        {loading && <Loader/>}
                    </div>
                </div>
            </div>
        </div>
    );
};
