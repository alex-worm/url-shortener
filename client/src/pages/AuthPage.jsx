import React, { useCallback, useContext, useRef, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const password = useRef();
    const {loading, request} = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    const validatePassword = useCallback(() => {
        if (!password.current?.value) {
            return;
        }

        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g.test(password.current.value)) {
            password.current.classList.remove("invalid");
            password.current.classList.add("valid");
        } else {
            password.current.classList.remove("valid");
            password.current.classList.add("invalid");
        }
    }, [password, form]);

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

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Link shortener</h1>
                <form className="card">
                    <div className="card-content">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input id="email"
                                       className="validate"
                                       type="email"
                                       name="email"
                                       value={form.email}
                                       onChange={changeHandler}/>
                                <label htmlFor="email">Enter email</label>
                                <span className="helper-text" data-error="not an email" data-success="correct"/>
                            </div>
                            <div className="input-field">
                                <input id="password"
                                       className="validate"
                                       type="password"
                                       name="password"
                                       value={form.password}
                                       ref={password}
                                       onBlur={validatePassword}
                                       onChange={changeHandler}/>
                                <label htmlFor="password">Enter password</label>
                                <span className="helper-text"
                                      data-error="password must contain minimum 8 characters,
                                        at least 1 uppercase letter,
                                        1 lowercase letter and 1 number"
                                      data-success="correct"/>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="waves-effect waves-light btn"
                                type="submit"
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
                </form>
            </div>
        </div>
    );
};
