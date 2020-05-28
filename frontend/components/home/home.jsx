import React from 'react';
import {Link} from 'react-router-dom'; 

export default () => (
  <div>
    <nav className="landing-page-nav-bar">
      <div className="navbar-container-1">
        <div className="landing-page-logo">
          <h3 className="roberthood">Roberthood</h3>
          <Link to="/">
            <img className="roberthood-hat" src={roberthoodHatURL} />
          </Link>
        </div>

        <div className="landing-page-menu-items">
          <Link className="landing-page-menu-item" to="#">
            Products
          </Link>
          <Link className="landing-page-menu-item" to="#">
            Learn
          </Link>
          <Link className="landing-page-menu-item" to="#">
            Support
          </Link>
        </div>
      </div>

      <div className="navbar-container-2">
        <div>
          <Link className="nav-bar-signin" to="/login">
            <button className="signin-btn">Sign In</button>
          </Link>
        </div>
        <div>
          <Link className="nav-bar-signup" to="/signup">
            <button className="splash-signup-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>

    <div className="container-1">
      <div className="content-1">
        <div>
          <h1 className="signup-message">It's Time to Do Money</h1>
          <p className="paragraph-1">
            Roberthood, a pioneer of commission-free investing, gives you more
            ways to make your money work harder.
          </p>
          <Link to="/signup">
            <button className="content-signup-btn">Sign Up</button>
          </Link>
        </div>
        <div>
          <img className="cash-management-photo" src={cashManagementURL} />
        </div>
      </div>
    </div>

    <div className="container-2">
      <br />
      <br />
      <br />
      <div className="content-2">
        <h2 className="content-2-header">Break Free from Commission Fees</h2>
        <p className="content-2-body">
          Make unlimited commission-free trades in stocks, funds, and options
          with Robinhood Financial. The same goes for buying and selling
          cryptocurrencies with Robinhood Crypto. Zero commission fees.
        </p>
        <div className="content-2-footer">
          <i className="fas fa-info-circle"></i>
          <p> Commissions Disclosure</p>
        </div>
      </div>
    </div>

    <div className="container-3">
      <div className="container-3-full">
        <div className="container-3-left">
          <div className="content-3">
            <div className="content-3-box1">
              <h2 className="content-3-header">
                Introducing Fractional Shares
              </h2>
              <p>Invest in thousands of stocks with as little as $1.</p>
            </div>

            <div className="content-3-box2">
              <div className="content-3-box2A">
                <h3>Invest Any Amount</h3>
                <p>
                  Choose how much you want to invest, and we’ll convert from
                  dollars to parts of a whole share.
                </p>
              </div>
              <div className="content-3-box2B">
                <h3>Build a Balanced Portfolio</h3>
                <p>
                  Customize your portfolio with pieces of different companies
                  and funds to help reduce risk.
                </p>
              </div>
              <div className="content-3-box2C">
                <h3>Trade in Real Time</h3>
                <p>
                  Investing in fractional shares is real-time and, as always,
                  commission-free.
                </p>
              </div>
            </div>

            <div className="content-3-search">
              <button>Get Early Access</button>
            </div>
          </div>
        </div>

        <div className="container-3-right">
          <img
            className="abstract_image"
            src={abstractURL}
            alt="abstract image"
          />
        </div>
      </div>
    </div>

    <div className="container-4">
      <div className="content-4">
        <div className="content-4-box1">
          <ul>
            <li>
              <Link className="learn" to="#">
                Learn
              </Link>
            </li>
            <li>
              <Link className="manage" to="#">
                Manage
              </Link>
            </li>
            <li>
              <Link className="customize" to="#">
                Customize
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <img className="learn-image" src={learnAsYouGrowURL} />
        </div>
        <div className="social-media">
          <a
            class="sm-icon"
            href="https://angel.co/u/ben-hsieh-6"
            target="_blank"
          >
            <i class="fab fa-angellist fa-5x"></i>
          </a>
          <a
            class="sm-icon"
            href="https://www.facebook.com/beenchi.hsieh"
            target="_blank"
          >
            <i class="fab fa-facebook-f fa-5x"></i>
          </a>
          <a
            class="sm-icon"
            href="https://www.linkedin.com/in/ben-hsieh-05522542/"
            target="_blank"
          >
            <i class="fab fa-linkedin-in fa-5x"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
);


  // <div className="container-5">
  //     <img className="our-products-image" src={ourProductsURL} />
  //   </div>

  //   <div className="container-6">
  //     <img className="landing-page-footer" src={landingPageFooterURL} />
  //   </div>
