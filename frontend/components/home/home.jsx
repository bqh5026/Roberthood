import React from 'react';
import {Link} from 'react-router-dom'; 

export default () => (
  <div>
    <div className="landing-page-menu">
      <div>
        <h3>Roberthood</h3>
        <img className="black-feather" src={blackFeatherURL} />
      </div>

      <div className="landing-page-menu-items">
        <a className="landing-page-menu-item" href="#">
          Products
        </a>
        <a className="landing-page-menu-item" href="#">
          Learn
        </a>
        <a className="landing-page-menu-item" href="#">
          Support
        </a>
      </div>

      <div>
        <Link to="/login">Sign In</Link>
      </div>

      <div>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>

    <div>
      <div>
        <header>
          <h2>Break Free from Commission Fees</h2>
        </header>
      </div>
      <div>
        <img src={cashManagementURL} />
      </div>
    </div>
  </div>
);

