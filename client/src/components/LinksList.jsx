import React from 'react';

export const LinksList = ({links}) => {
    if (!links.length) {
        return <h1 className="center">No links yet</h1>;
    }

    return (
        <table className="striped container">
            <thead>
            <tr>
                <th>#</th>
                <th>Icon</th>
                <th>Original link</th>
                <th>Shortened link</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td style={{lineHeight: '0'}}>
                            <img src={`https://www.google.com/s2/favicons?domain_url=${link.from}`} alt=' '/>
                        </td>
                        <td className="originalLink">{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <a className="waves-effect waves-light btn-small" href={`/detail/${link._id}`}>Open</a>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};
