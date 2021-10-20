import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';
import { useMessage } from '../hooks/message.hook';

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request, error, clearError} = useHttp();
    const message = useMessage();
    const {token} = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const data = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            message(data.message);

            setLinks(data);
        } catch (error) {
        }
    }, [token, request, message]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    );
};
