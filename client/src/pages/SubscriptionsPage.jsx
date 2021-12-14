import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { SubscriptionsList } from '../components/SubscriptionsList';

export const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const {loading, request} = useHttp();
  const message = useMessage();
  const {token} = useContext(AuthContext);

  const fetchSubscriptions = useCallback(async () => {
    try {
      const data = await request('/api/subscription', 'GET', null, {
        auth: `Bearer ${token}`
      });
      message(data.message);

      setSubscriptions(data);
    } catch (error) {
    }
  }, [token, request, message]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      {!loading && <SubscriptionsList subscriptions={subscriptions}/>}
    </>
  );
};
