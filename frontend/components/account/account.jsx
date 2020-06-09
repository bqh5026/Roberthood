import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  YAxis,
} from "recharts";

import axios from '../axios-quotes';

export default ({ currentUser, logout }) => {
    const [searchValue, setSearchValue] = useState("");
    const [quote, setQuote] = useState("");
    console.log("currentUser", currentUser); 
     const [chartData, setChartData] = useState([]);
     const [news, setNews] = useState([]);
     const [show, setShow] = useState(false); 
     const [portfolioValue, setPortfolioValue] = useState([]);
     const [stock, setStock] = useState([]);

  useEffect(() => {
    if (news.length < 1) {
      search();
      $.ajax("/api/news/new").done((res) => {
        setNews(news.concat(res.articles));
      });
    }
  });

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://roberthood-edcdd.firebaseio.com/portfolios/${currentUser.username}.json`})
      .then((res) => {
        const total = [];
        for (let stock in res.data) {
          total.push({ ...res.data[stock], firebaseID: stock })
        }
        setPortfolioValue(total);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://roberthood-edcdd.firebaseio.com/portfolios/${currentUser.username}.json`})
      .then((res) => {
        const portfolio = [];
        for (let stock in res.data) {
          portfolio.push({ ...res.data[stock], firebaseID: stock })
        }
        setStock(portfolio);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const search = () => {
    $.ajax(`/api/stocks/quote/${searchValue}`).done((res) => {
      // console.log(res);
      setQuote(res);
    });

    $.ajax(`/api/stocks/chart/${searchValue}`).done((res) => {
      // console.log(res);
      setChartData(res);
    });
  };

  const handleOnChange = (event) => {
      setSearchValue(event.target.value);
    };

  const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        search();
      }
    };

  const operation = () => {
      setShow(!show);
    };

  const postDataHandler = () => {
    axios
      .post(`./portfolios/${currentUser.username}.json`, quote)
      // .then(response => console.log(response))
      .catch((error) => console.log(error));
  };

  const buyStockHandler = () => {
    axios
      .post(`./portfolios/${currentUser.username}.json`, quote)
      // .then(response => console.log(response))
      .then((document.querySelector(".buy-stock").textContent = "Bought"))
      .catch((error) => console.log(error));
  };

  const sellStockHandler = (stock) => {
    return (event) => {
      event.preventDefault();
      axios
        .delete(`./portfolios/${currentUser.username}/${stock.firebaseID}.json`)
        .then(
          window.alert(
            `${JSON.stringify(stock.symbol).replace(
              /['"]+/g,
              ""
            )} sold! Refresh page to see update.`
          )
        )
        .catch((error) => console.log(error));
    };
  };
    
    return (
      <div>
        <div className="header">
          <div className="navbar-left">
            <div>
              <Link to="/dashboard">
                <img
                  className="dashboard-roberthood-hat"
                  src={roberthoodHatURL}
                />
              </Link>
            </div>

            <div className="search-box">
              <form>
                <button onClick={search} className="search-btn">
                  <i className="fas fa-search"></i>
                </button>
                <input
                  className="search-txt"
                  type="text"
                  name=""
                  placeholder="Search"
                  onChange={(event) => {
                    handleOnChange(event);
                  }}
                  value={searchValue}
                  onKeyPress={handleKeyPress}
                  alt="search"
                />
              </form>
            </div>
          </div>

          <div>
            <nav className="nav-bar">
              <span className="nav-menu-item">Free Stocks</span>
              <Link to="/dashboard">
                <span className="nav-menu-item">Portfolio</span>
              </Link>
              <span className="nav-menu-item">Cash</span>
              <span className="nav-menu-item" to="#">
                Messages
              </span>
              <div className="dropdown">
                <button className="nav-menu-item dropdown" onClick={operation}>
                  Account
                </button>
                {show && (
                  <ul className="dropdown-menu">
                    <li>
                      <div>Ben Hsieh</div>
                      <hr className="horizontal-bar" />
                    </li>
                    <li className="dropdown-list">
                      <img className="rg-logo" src={roberthoodGoldURL} />
                      <span className="gold">Roberthood Gold</span>
                    </li>
                    <li className="dropdown-list">
                      <i className="fas fa-gift menu-icon"></i>
                      <span className="dropdown-menu-item">Free Stock</span>
                    </li>
                    <li className="dropdown-list">
                      <i className="fas fa-briefcase menu-icon"></i>
                      <Link to="/dashboard">
                        <span className="dropdown-menu-item">Account</span>
                      </Link>
                    </li>

                    <li className="dropdown-list">
                      <i className="fas fa-university menu-icon"></i>
                      <span className="dropdown-menu-item">Banking</span>
                    </li>
                    <li className="dropdown-list">
                      <i className="fas fa-history menu-icon"></i>
                      <span className="dropdown-menu-item">History</span>
                    </li>
                    <li className="dropdown-list">
                      <i className="fas fa-file-alt menu-icon"></i>
                      <span className="dropdown-menu-item">Documents</span>
                    </li>
                    <li className="dropdown-list">
                      <i className="fas fa-cog menu-icon"></i>
                      <span className="dropdown-menu-item">Settings</span>
                    </li>
                    <hr />
                    <li className="dropdown-list">
                      <i className="far fa-life-ring menu-icon"></i>
                      <span className="dropdown-menu-item">Help Center</span>
                    </li>
                    <li className="dropdown-list">
                      <i className="fas fa-comment-dots menu-icon"></i>
                      <span className="dropdown-menu-item">Contact Us</span>
                    </li>
                    <li className="dropdown-list">
                      <i className="far fa-file-pdf menu-icon"></i>
                      <span className="dropdown-menu-item">Disclosure</span>
                    </li>
                    <li className="dropdown-list">
                      <i className="fas fa-sign-out-alt menu-icon"></i>
                      <span className="dropdown-menu-item logout" onClick={logout}>
                        Log Out
                      </span>
                    </li>
                  </ul>
                )}
              </div>
            </nav>
          </div>
        </div>

        <br />
        <br />
        <br />
        {quote ? (
          <div className="account-page">
            <div className="left">
              <div className="Quote">
                <div>
                  <ul className="ticker-results">
                    <li>
                      <h1>
                        {JSON.stringify(quote.company_name).replace(
                          /['"]+/g,
                          ""
                        )}
                      </h1>
                    </li>
                    <li>
                      <span>Ticker:</span>{" "}
                      {JSON.stringify(quote.symbol).replace(/['"]+/g, "")}
                    </li>
                    <li>
                      <span>Latest Price:</span>$
                      {JSON.stringify(quote.latest_price)}
                    </li>
                    <li>
                      ${JSON.stringify(quote.change)}(
                      {JSON.stringify(quote.change_percent_s).replace(
                        /['"]+/g,
                        ""
                      )}
                      ) <span className="today">Today </span>
                    </li>
                    <li>
                      <span>PE ratio:</span>
                      {JSON.stringify(quote.pe_ratio)}
                    </li>
                    <li>
                      <span>YTD change:</span>{" "}
                      {JSON.stringify(
                        (quote.ytd_change * 100).toFixed(2)
                      ).replace(/['"]+/g, "")}
                      %
                    </li>
                  </ul>
                  <button className="watchlist_btn" onClick={postDataHandler}>
                    Add to Watchlist
                  </button>
                </div>
              </div>

              <div className="Chart">
                <LineChart width={800} height={400} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="minute" />
                  <YAxis type="number" domain={["auto", "auto"]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="close" stroke="#8884d8" />
                </LineChart>
              </div>

              <div className="news-header">
                <h4>News</h4>
                <hr></hr>
              </div>

              <div className="news">
                <ul>
                  {news.map((item, idx) => {
                    return (
                      <li key={idx} className="news-item">
                        <div>
                          <i className="fas fa-bolt"></i>
                          {"\u00A0"}
                          {"\u00A0"}
                          <strong>{item.source.name}</strong>
                          {"\u00A0"}
                          {"\u00A0"}
                          {item.publishedAt}
                        </div>
                        <div className="news-title">
                          <div>
                            <a
                              className="news-title-header"
                              href={item.url}
                              target="_blank"
                            >
                              {item.title}
                            </a>
                          </div>
                          <div>
                            <img className="news-image" src={item.urlToImage} />
                          </div>
                        </div>
                        <hr />
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="footer">
                <p className="footer-paragraph">
                  For more information, see our
                  <span className="privacy-policy"> Privacy Policy</span>.
                </p>
              </div>
            </div>

            <div className="right">
              <div className="trade">
                <strong>
                  {JSON.stringify(quote.company_name).replace(/['"]+/g, "")}
                </strong>
                <hr />
                <div>Market Price:</div>
                <br />
                <div className="market-price">
                  ${quote.latest_price.toFixed(2)}
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <button className="buy-stock" onClick={buyStockHandler}>
                  Buy
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="user-account">
              <h1>{currentUser.first_name} {currentUser.last_name}</h1>
              <nav className="user-nav-bar">
                <li className="user-nav-item">Account</li>
                <li className="user-nav-item">Banking</li>
                <li className="user-nav-item">History</li>
                <li className="user-nav-item">Documents</li>
                <li className="user-nav-item">Free Stocks</li>
                <li className="user-nav-item">Settings</li>
                <div className="animation start-account"></div>
              </nav>
            </div>

            <hr />

            <div>
              <li className="portfolio-value-header">Total Portfolio Value</li>
              <div className="portfolio-container">
                {stock.length === 0 ? (
                  <div>
                    <span className="total-portfolio-value">$0</span>
                  </div>
                ) : (
                  <div>
                  <br />
                  <div className="total-portfolio-value">
                    ${
                      portfolioValue.map(a => a.latest_price).reduce((a, b) => a + b, 0)
                    }
                  </div>
                
                    <br />
                    <br />
                    <br />
                    <span className="stocks-section">Stocks</span>
                    {stock.map((item, idx) => (
                      <div key={idx} className="portfolio">
                        <ul className="portfolio-item">
                          <li>{item.symbol}</li>
                          <li>{item.latest_price}</li>
                          <li>{item.change_percent_s}</li>
                        </ul>
                        <button
                          className="sell-stock"
                          onClick={sellStockHandler(item)}
                        >
                          Sell stock
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
}



// {
//   quote ? (
//     <div className="trade">
//       <strong>
//         {JSON.stringify(quote.company_name).replace(/['"]+/g, "")}
//       </strong>
//       <hr />
//       <div>Market Price:</div>
//       <br />
//       <div className="market-price">${quote.latest_price.toFixed(2)}</div>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <button className="buy-stock" onClick={buyStockHandler}>
//         Buy
//       </button>
//     </div>
//   ) : (
//     <div>
//       <span className="watchlist-header">Watchlist</span>
//       <hr />
//       <div>
//         {stock.map((item, idx) => (
//           <div key={idx} className="watchlist">
//             <ul className="watchlist_item">
//               <li>{item.symbol}</li>
//               <li>{item.latest_price}</li>
//               <li>{item.change_percent_s}</li>
//             </ul>
//             <button
//               className="remove_from_watchlist"
//               onClick={deleteWatchlistItemHandler(item)}
//             >
//               Remove from Watchlist
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

