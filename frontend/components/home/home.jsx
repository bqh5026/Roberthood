import React from 'react';
import {Link} from 'react-router-dom'; 

export default () => (
  <div>
    <nav className="landing-page-nav-bar">
      <div className="landing-page-logo">
        <h3>Roberthood</h3>
        <Link to="/">
          <img className="black-feather" src={blackFeatherURL} />
        </Link>
      </div>

      <Link className="landing-page-menu-item" to="#">
        Products
      </Link>
      <Link className="landing-page-menu-item" to="#">
        Learn
      </Link>
      <Link className="landing-page-menu-item" to="#">
        Support
      </Link>

      <div>
        <Link to="/login">Sign In</Link>
      </div>

      <div>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>

    <div className="content-1">
      <div className="container-1">
        <div className="landing-page-signup">
          <h1>It's Time to Do Money</h1>
          <p>
            Roberthood, a pioneer of commission-free investing, gives you more
            ways to make your money work harder.
          </p>
          <Link className="content-signup-btn " to="/signup">
            Sign Up
          </Link>
        </div>

        <div>
          <img className="cash-management-photo" src={cashManagementURL} />
        </div>
      </div>
    </div>

    <div className="content-2">
      <div>
        <h2>Break Free from Commission Fees</h2>
      </div>
    </div>
  </div>
);

