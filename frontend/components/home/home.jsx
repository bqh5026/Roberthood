import React from 'react';
import {Link} from 'react-router-dom'; 

export default () => (
  <div>

    <nav className="landing-page-nav-bar">
      <div className="landing-page-logo">
        <h3 className='.roberthood'>Roberthood</h3>
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
      <div >
        <Link className='nav-bar-signin' to="/login">Sign In</Link>
      </div>

      <div>
        <Link className='nav-bar-signup' to="/signup">Sign Up</Link>
      </div>
    </nav>

    <div className="container-1">
      
      <div className="content-1">

        <div>
          <h1>It's Time to Do  Money</h1>
          <p>
            Roberthood, a pioneer of commission-free 
            investing, gives you more
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

    <div className="container-2">

      <div className="content-2">
          <h4 className='content-2-header'>Break Free from Commission Fees</h4>
          <p className='content-2-body'>
            Make unlimited commission-free trades in stocks, funds, and options with Robinhood Financial. The same goes for buying and selling cryptocurrencies with Robinhood Crypto. Zero commission fees.
          </p>
         <div className='content-2-footer'>
          <i className="fas fa-info-circle"></i><p> Commissions Disclosure</p>
          </div>
      </div>

    </div>

    <div className="container-3">
    <div className='container-3-full'>

      <div className='container-3-left'>
      <div className='content-3'>

        <div className='content-3-box1'>
          <h4>Introducing Fractional Shares</h4>
          <p>Invest in thousands of stocks with as little as $1.</p>
        </div>

        <div className='content-3-box2'>
          <div className='content-3-box2A'>
            <h5>Invest Any Amount</h5>
            <p>
              Choose how much you want to invest, and we’ll convert from dollars to parts of a whole share.
            </p>
          </div> 
          <div className='content-3-box2B'>
            <h5>Build a Balanced Portfolio</h5>
            <p>
              Customize your portfolio with pieces of different companies and funds to help reduce risk.
            </p>
          </div>
          <div className='content-3-box2C'>
            <h5>Trade in Real Time</h5>
            <p>
              Investing in fractional shares is real-time and, as always, commission-free.
            </p>
          </div>
          </div>

          <div className='content-3-search'>
            <button>Get Early Access</button>
          </div>
        </div>
      </div>

        <div className='container-3-right'>
          <img className='abstract_image' src={abstractURL} alt='abstract image' />
        </div>
     
    </div>
    </div>
  </div>
);

