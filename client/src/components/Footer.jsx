import React from 'react';

export const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Batanix finest creation</h5>
            <p className="grey-text text-lighten-4">Currently this text doesn't mean anything. It just works.</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Socials</h5>
            <ul>
              <li><a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/alexander-batan-aa14401a9/" target="_blank">LinkedIn</a></li>
              <li><a className="grey-text text-lighten-3" href="https://www.instagram.com/alex__worm/" target="_blank">Instagram</a></li>
              <li><a className="grey-text text-lighten-3" href="https://www.youtube.com/channel/UCEwR-cSS1Bdf_vsY7-8oUlw/videos" target="_blank">Youtube</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2021 Don't try me
          <a className="grey-text text-lighten-4 right" href="https://github.com/alex-worm" target="_blank">More apps</a>
        </div>
      </div>
    </footer>
  );
};
