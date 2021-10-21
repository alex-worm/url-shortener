import React from 'react';

const styleForLink = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

export const LinkCard = ({link}) => {
    return (
        <>
            <h2>Link</h2>
            <p style={{display: 'flex', alignItems: 'center'}}>
                Icon:&nbsp;
                <img src={`https://www.google.com/s2/favicons?domain_url=${link.from}`} alt=' '/>
            </p>
            <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p style={styleForLink}>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks count: <strong>{link.clicks}</strong></p>
            <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    );
};
