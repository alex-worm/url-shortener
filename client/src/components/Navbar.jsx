import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
    };

    return (
        <nav>
            <div className="nav-wrapper" style={{padding: '0 2rem'}}>
                <a href="/" className="brand-logo">Link shortener</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><NavLink className="flow-text" to={"/subscriptions"}>Subscriptions</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Log out</a></li>
                </ul>
            </div>
        </nav>
    );
};
