import React from 'react';
import { SubscriptionCard } from '../components/SubscriptionCard';

export const SubscriptionsPage = () => {
  return (
    <div style={{display: 'flex'}}>
      <div style={{paddingTop: '2rem', display: 'flex'}}>
        <SubscriptionCard
          imageLink="https://www.meme-arsenal.com/memes/c91726eb9d06d0bb777d951a18a38888.jpg"
          title="Free"
          description="You get nothing. You lose. Good day sir."
        />
        <SubscriptionCard
          imageLink="https://www.meme-arsenal.com/memes/c91726eb9d06d0bb777d951a18a38888.jpg"
          title="Premium"
          description="Nothing."
          linkForTransfer="https://prior.by/web/transferForMe?target=STIBR21DezcNS+H+vpIY9EfSW9NZinyNa/0dGyws53D6Q1HDf+K9zGF8ShKteiV+Q2yg38+D9K0aOr/NeFIS8cCuxLw/MxMZcALe040XmgZ7WwU=&amount=2,50&curr=BYN"
        />
        <SubscriptionCard
          imageLink="https://www.meme-arsenal.com/memes/c91726eb9d06d0bb777d951a18a38888.jpg"
          title="Pro"
          description="Nothing."
          linkForTransfer="https://prior.by/web/transferForMe?target=STIBR21DezcNS+H+vpIY9EfSW9NZinyNa/0dGyws53D6Q1HDf+K9zGF8ShKteiV+Q2yg38+D9K0aOr/NeFIS8cCuxLw/MxMZcALe040XmgZ7WwU=&amount=6,30&curr=BYN"
        />
        <SubscriptionCard
          imageLink="https://www.meme-arsenal.com/memes/c91726eb9d06d0bb777d951a18a38888.jpg"
          title="Premium Pro +"
          description="Nothing."
          linkForTransfer="https://prior.by/web/transferForMe?target=STIBR21DezcNS+H+vpIY9EfSW9NZinyNa/0dGyws53D6Q1HDf+K9zGF8ShKteiV+Q2yg38+D9K0aOr/NeFIS8cCuxLw/MxMZcALe040XmgZ7WwU=&amount=150&curr=BYN"
        />
      </div>
    </div>
  );
};
