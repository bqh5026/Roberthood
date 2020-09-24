import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  YAxis,
} from "recharts";

import axios from "../axios-quotes";

import { TickerSymbols } from "../../../public/tickers";

export default ({currentUser, logout}) => {

   const { ticker } = useParams(); 

   const [searchValue, setSearchValue] = useState(ticker);
   const [quote, setQuote] = useState("");
   // console.log("currentUser", currentUser);
   const [chartData, setChartData] = useState([]);
   const [news, setNews] = useState([]);
   const [show, setShow] = useState(false);
   const [portfolioValue, setPortfolioValue] = useState([]);
   const [stock, setStock] = useState([]);
   const [shares, setShares] = useState(0);
   const [availableShares, setAvailableShares] = useState(0);
   const [sharesError, setSharesError] = useState(null);


  const history = useHistory();
  const routeChange = () => {
     let path = `/account`;
     history.push(path);
   }; 
  

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
         url: `https://roberthood-edcdd.firebaseio.com/portfolios/${currentUser.username}.json`,
       })
         .then((res) => {
           const total = [];
           for (let stock in res.data) {
             total.push({ ...res.data[stock], firebaseID: stock });
           }
           setPortfolioValue(total);
          //  console.log(res.data);
         })
         .catch((error) => console.log(error));
     }, [portfolioValue]);

     useEffect(() => {
       axios({
         method: "GET",
         url: `https://roberthood-edcdd.firebaseio.com/${currentUser.username}.json`,
       })
         .then((res) => {
           const watchlist = [];
           for (let stock in res.data) {
             watchlist.push({ ...res.data[stock], firebaseID: stock });
           }
           setStock(watchlist);
           // console.log(res.data);
         })
         .catch((error) => console.log(error));
     });

     const search = () => {
       $.ajax(`/api/stocks/quote/${searchValue}`).done((res) => {
        //  console.log(res);
         setQuote(res);
       });

       $.ajax(`/api/stocks/chart/${searchValue}`).done((res) => {
         // console.log(res);
         setChartData(res);
       });
       setSearchValue(''); 
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
           .post(`./${currentUser.username}.json`, quote)
           .then(
             (document.querySelector(".watchlist_btn").textContent =
               "Added to Watchlist")
           )
           .catch((error) => console.log(error));
       };

       const buyStockHandler = () => {
         const total = shares * quote.latest_price;
         for (const stock of portfolioValue) {
           if (stock.Company.symbol === quote.symbol) {
             axios
               .patch(
                 `./portfolios/${currentUser.username}/${stock.firebaseID}.json`,
                 {
                   Quantity: parseInt(stock.Quantity) + parseInt(shares),
                 }
               )
               .then(
                 (document.querySelector(".buy-stock").textContent = "Bought")
               )
               .then((document.querySelector(".buy-stock").disabled = true));
             return;
           }
         }

         if (shares >= 1) {
           axios
             .post(`./portfolios/${currentUser.username}.json`, {
               Company: quote,
               Quantity: shares,
               Total: total,
             })
             // .then(response => console.log(response))
             .then(
               (document.querySelector(".buy-stock").textContent = "Bought")
             )
             .then(setSharesError(null))
             .then((document.querySelector(".buy-stock").disabled = true))
             // .then(routeChange())
             .catch((error) => console.log(error));
         } else {
           setSharesError("Please enter valid number of shares.");
         }
       };


      useEffect(() => {
        console.log('hello');
        console.log(stock);
        console.log(JSON.stringify(quote)); 
        for (const item of stock) {
          if (item.Company.symbol === quote.symbol)
            setAvailableShares(parseInt(stock.Quantity));
        }
      }, [availableShares])


      const sellStockHandler = () => {
        const total = shares * quote.latest_price;
          for (const stock of portfolioValue) {
            if (
              stock.Company.symbol === quote.symbol &&
              shares <= stock.Quantity
            ) {
              axios
                .patch(
                  `./portfolios/${currentUser.username}/${stock.firebaseID}.json`,
                  {
                    Quantity: parseInt(stock.Quantity) - parseInt(shares),
                  }
                )
                .then(
                  (document.querySelector(".stocks-sell-stock").textContent =
                    "Sold")
                )
                .then(
                  (document.querySelector(".stocks-sell-stock").disabled = true)
                )
                .then(routeChange());
                return;
            }
          }
         };

      const watchlistChecker = () => {
           for (let watchlistItem of stock) {
             if (watchlistItem.symbol === quote.symbol) {
               return (
                 <button
                   className="watchlist_btn"
                   onClick={deleteWatchlistItemHandler(watchlistItem)}
                 >
                   Remove from Watchlist
                 </button>
               );
             }
           }

           return (
             <button className="watchlist_btn" onClick={postDataHandler}>
               Add to Watchlist
             </button>
           );
         };

      const deleteWatchlistItemHandler = (watchlistItem) => {
        return (event) => {
          event.preventDefault();
          axios
            .delete(
              `./${currentUser.username}/${watchlistItem.firebaseID}.json`
            )
            .catch((error) => console.log(error));
        };
      };

        const predictiveSearch = (item) => {
          setSearchValue(item.symbol);
          search();
          setSearchValue("");
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
                <div className="predictive-search">
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
                  <div className="auto-suggestions">
                    <ul>
                      {TickerSymbols.map((name) => {
                        if (searchValue.length !== 0) {
                          if (
                            name.symbol
                              .toLowerCase()
                              .startsWith(searchValue.toLowerCase())
                          ) {
                            return (
                              <li
                                key={name.symbol}
                                onClick={() => predictiveSearch(name)}
                              >
                                <strong style={{ paddingRight: "3rem" }}>
                                  {name.symbol}
                                </strong>
                                {name.name}
                              </li>
                            );
                          } else {
                            return null;
                          }
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <nav className="nav-bar">
                  {/* <span className="nav-menu-item">Free Stocks</span> */}
                  <a href="https://angel.co/u/ben-hsieh-6">
                    <span className="nav-menu-item">AngelList</span>
                  </a>
                  <a href="https://github.com/benhsieh-dev">
                    <span className="nav-menu-item">GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/ben-hsieh-05522542/">
                    <span className="nav-menu-item">Linkedin</span>{" "}
                  </a>
                  <Link to="/dashboard">
                    <span className="nav-menu-item">Portfolio</span>
                  </Link>
                  <div className="dropdown">
                    <button
                      className="nav-menu-item dropdown"
                      onClick={operation}
                    >
                      Account
                    </button>
                    {show && (
                      <ul className="dropdown-menu">
                        <li>
                          <div>Ben Hsieh</div>
                          <hr className="horizontal-bar" />
                        </li>
                        <li className="dropdown-list">
                          <i class="fab fa-angellist menu-icon"></i>
                          <a href="https://angel.co/u/ben-hsieh-6">
                            <span className="dropdown-menu-item">
                              AngelList
                            </span>
                          </a>
                        </li>
                        <li className="dropdown-list">
                          <i class="fab fa-github menu-icon"></i>
                          <a href="https://github.com/benhsieh-dev">
                            <span className="dropdown-menu-item">GitHub</span>
                          </a>
                        </li>
                        <li className="dropdown-list">
                          <i class="fab fa-linkedin-in menu-icon"></i>
                          <a href="https://www.linkedin.com/in/ben-hsieh-05522542/">
                            <span className="dropdown-menu-item">Linkedin</span>
                          </a>
                        </li>
                        <li className="dropdown-list">
                          <i className="fas fa-briefcase menu-icon"></i>
                          <Link to="/dashboard">
                            <span className="dropdown-menu-item">Account</span>
                          </Link>
                        </li>
                        <li className="dropdown-list">
                          <i className="fas fa-sign-out-alt menu-icon"></i>
                          <span
                            className="dropdown-menu-item logout"
                            onClick={logout}
                          >
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
            <div className="stocks-page">
              <div className="stocks-left">
                <div>
                  <h2>{JSON.stringify(quote.company_name)}</h2>
                  <p>
                    ${JSON.stringify(quote.latest_price)}
                    <br />${JSON.stringify(quote.change)}(
                    {JSON.stringify(quote.change_percent_s)}) Today
                  </p>
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
                              <img
                                className="news-image"
                                src={item.urlToImage}
                              />
                            </div>
                          </div>
                          <hr />
                        </li>
                      );
                    })}
                  </ul>
                </div>

              </div>

              <div className="stocks-right">
                <div className="stocks-trade">
                  <strong>Sell {quote.symbol}</strong>
                  <div className="account-stock-purchase">
                    Shares{" "}
                    <input
                      value={shares}
                      className="account-purchase-shares"
                      type="number"
                      min="0"
                      step="1"
                      onChange={(e) => setShares(e.target.value)}
                    ></input>
                  </div>
                  <br />
                  <hr />
                  <div>Market Price:</div>
                  <br />
                  <div className="market-price">${quote.latest_price}</div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <button
                    className="stocks-sell-stock"
                    onClick={sellStockHandler}
                  >
                    Sell
                  </button>
                  <br />
                  <hr />
                  <br />
                  <br />
                  <div className="available-shares">
                    {/* checkAvailableShares() */}
                    {availableShares} Shares Available - Sell All
                  </div>
                  <br />
                  <div className="account-purchase-shares-error">
                    {sharesError}
                  </div>
                  <br />
                  {watchlistChecker()}
                </div>
                <br />
              </div>
            </div>
          </div>
        );

 
     
}

 