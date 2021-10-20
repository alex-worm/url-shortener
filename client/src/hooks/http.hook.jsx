import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useMessage } from './message.hook';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = useContext(AuthContext);
    const message = useMessage();

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            setLoading(true);

            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something wrong...');
            }

            setLoading(false);

            return data;
        } catch (error) {
            setLoading(false);
            setError(error.message);

            message(error);

            if (error.message === 'No authorization') {
                auth.logout();
            }

            throw error;
        }
    }, [auth, message]);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError};
};
