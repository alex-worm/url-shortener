import React from 'react';
import { SubscriptionCard } from './SubscriptionCard';

export const SubscriptionsList = ({subscriptions}) => {
  if (!subscriptions.length) {
    return <h1 className="center">No subscriptions yet</h1>;
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{paddingTop: '2rem', display: 'flex',}}>
        {subscriptions.map((subscription, index) => {
          return (
            <SubscriptionCard
              key={index}
              name={subscription.name}
              description={subscription.description}
              transactionLink={subscription.transactionLink}
              imageUrl={subscription.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
};
