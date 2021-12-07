import React from 'react';

export const SubscriptionCard = ({imageLink, title, description, linkForTransfer}) => {
  return (
      <div style={{padding: '0 2rem'}}>
        <div className="card">
          <div className="card-image">
            <img src={imageLink} alt=""/>
            <a className="btn-floating btn-large halfway-fab waves-effect waves-light red" href={linkForTransfer}>
              <i className="material-icons">attach_money</i>
            </a>
          </div>
          <div className="card-content">
            <span className="card-title">{title}</span>
            <p>{description}</p>
          </div>
        </div>
      </div>
  );
};
