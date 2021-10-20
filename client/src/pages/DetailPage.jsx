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
    const {request, loading, error, clearError} = useHttp();
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

    const onDelete = async () => {
        try {
            await request(`/api/link/delete/${linkId}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            });

            history.push(`/links`);
        } catch (error) {
        }
    }

    useEffect(() => {
        getLink();
    }, [getLink]);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            {!loading && link &&
                <>
                    <LinkCard link={link}/>
                    <button className="waves-effect red btn" onClick={onDelete}>Delete</button>
                </>
            }
        </>
    );
};
