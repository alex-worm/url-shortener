import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';
import { useMessage } from '../hooks/message.hook';

export const DetailPage = () => {
    const history = useHistory();
    const message = useMessage();
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });

            setLink(fetched);
        } catch (error) {
            history.push(`/links`);
        }
    }, [token, linkId, request, history]);

    const onCopy = async () => {
        await navigator.clipboard.writeText(link.to);
        message('Copied to clipboard');
    }

    const onDelete = async () => {
        try {
            await request(`/api/link/delete/${linkId}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            });

            message('Deleted');
            history.push(`/links`);
        } catch (error) {
        }
    }

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            {!loading && link &&
                <>
                    <LinkCard link={link}/>
                    <button className="waves-effect btn"
                            style={{marginRight: 10}}
                            onClick={onCopy}>
                        Copy
                    </button>
                    <button className="waves-effect red btn" onClick={onDelete}>Delete</button>
                </>
            }
        </>
    );
};
