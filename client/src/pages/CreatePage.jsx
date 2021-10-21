import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { Loader } from '../components/Loader';

export const CreatePage = () => {
    const history = useHistory();
    const message = useMessage();
    const auth = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [link, setLink] = useState('');
    const linkInput = useRef();

    const pressHandler = async event => {
        if (event.key === 'Enter' || event.type === 'click') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                });
                message(data.message);

                history.push(`/detail/${data.link._id}`);
            } catch (error) {
            }
        }
    };

    const clearHandler = () => {
        setLink('');
        setTimeout(() => window.M.updateTextFields());
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input id="link"
                           type="text"
                           value={link}
                           onChange={event => setLink(event.target.value.trim())}
                           onKeyPress={pressHandler}
                           ref={linkInput}/>
                    <label htmlFor="link">Paste the link</label>
                </div>
                <button className="waves-effect waves-light btn"
                        style={{marginRight: 10}}
                        onClick={pressHandler}>
                    Create
                </button>
                <button className="waves-effect white btn black-text" onClick={clearHandler}>Clear</button>
                {loading && <Loader/>}
            </div>
        </div>
    );
};
