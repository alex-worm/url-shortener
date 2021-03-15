import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHistory} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link, setLink] = useState('');

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                });

                history.push(`/detail/${data.link._id}`);
            } catch (e) {

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
                    <input placeholder="Paste the link"
                           id="link"
                           type="text"
                           value={link}
                           onChange={event => setLink(event.target.value)}
                           onKeyPress={pressHandler}/>
                    <label htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>
    );
};
