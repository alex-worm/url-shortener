import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHistory} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link, setLink] = useState('');

    const pressHandler = async ev => {
        if (ev.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                });

                history.push(`/detail/${data.link._id}`);
            } catch (e) {
                ///////////////////////////////
            }
        }
    };

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input className="white-text"
                           placeholder="Paste the link"
                           id="link"
                           type="text"
                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}/>
                    <label htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>
    );
};