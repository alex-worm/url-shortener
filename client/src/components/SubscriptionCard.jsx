import React from 'react';

export const SubscriptionCard = ({name, description, transactionLink, imageUrl}) => {
  return (
      <div style={{padding: '0 2rem'}}>
        <div className="card" style={{maxWidth: '350px'}}>
          <div className="card-image">
            <img src={imageUrl} alt="" style={{width: '350px', height: '350px'}}/>
            <a className="btn-floating btn-large halfway-fab waves-effect waves-light red" href={transactionLink} target="_blank">
              <i className="material-icons">attach_money</i>
            </a>
          </div>
          <div className="card-content" style={{height: '200px'}}>
            <span className="card-title">{name}</span>
            <p>{description}</p>
          </div>
        </div>
      </div>
  );
};
