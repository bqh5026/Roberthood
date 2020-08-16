import React, { useState, useEffect, useRef } from 'react'; 
import { Link, useHistory } from 'react-router-dom';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, YAxis } from "recharts";

import axios from '../axios-quotes'; 

import { TickerSymbols } from '../../../public/tickers.js';

export default ({ currentUser, logout }) => {
  const [searchValue, setSearchValue] = useState('qqq')
  const [quote, setQuote] = useState('')
  // console.log("currentUser", currentUser); 
  const [chartData, setChartData] = useState([]);
  const [news, setNews] = useState([]);
  const [show, setShow] = useState(false); 
  const [portfolioValue, setPortfolioValue] = useState([]);
  const [stock, setStock] = useState([]); 
  const [shares, setShares] = useState(0);
  const [sharesError, setSharesError] = useState(null);

  useEffect(() => {
    if (news.length < 1) {
      search(); 
      $.ajax('/api/news/new').done(res => {
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
          // console.log(res.data);
        })
        .catch((error) => console.log(error));
    }, []);


  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://roberthood-edcdd.firebaseio.com/${currentUser.username}.json`})
    .then(res => { 
      const watchlist = [];
      for(let stock in res.data) {
        watchlist.push({...res.data[stock], firebaseID: stock})
      }
      setStock(watchlist);
      // console.log(res.data); 
    }) 
    .catch(error => console.log(error));  
  });

  const search = () => {
    $.ajax(`/api/stocks/quote/${searchValue}`).done(res => {
      // console.log(res); 
      setQuote(res); 
    });

    $.ajax(`/api/stocks/chart/${searchValue}`).done(res => {
      // console.log(res);
      setChartData(res);
    });
  };

  const handleOnChange = event => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = event => {
    if(event.key === 'Enter') {
      search();
    }
  }

 const operation = () => {
    setShow(
       !show
    )
  }
    

// const reload = () => {
//   window.location.reload(true);
// };

// const dashboardRoute = () => {
//   let path= `/dashboard`;
//   history.push(path);
// }

const postDataHandler = () => {
  axios.post(`./${currentUser.username}.json`, quote)
    .then(document.querySelector('.watchlist_btn')
    .textContent = "Added to Watchlist")
    .catch(error => console.log(error)); 
}

const history = useHistory();
const routeChange = () => {
  let path = `/account`;
  history.push(path);
}; 

const buyStockHandler = () => {
  const total = shares * quote.latest_price; 
    for (const stock of portfolioValue) {
        if (stock.Company.symbol === quote.symbol) {
          axios
            .patch(`./portfolios/${currentUser.username}/${stock.firebaseID}.json`, {
              Quantity: parseInt(stock.Quantity) + parseInt(shares),
            })
            .then((document.querySelector(".buy-stock").textContent = "Bought"))
            .then((document.querySelector(".buy-stock").disabled = true));
          return
        } 
    }

  if (shares >= 1) {
    axios
      .post(`./portfolios/${currentUser.username}.json`, {Company: quote, Quantity: shares, Total: total})
      // .then(response => console.log(response))
      .then(setSharesError(null))
      .then(document.querySelector(".buy-stock").textContent = "Bought")
      .then(routeChange())
      .catch((error) => console.log(error)); 
  } else {
    // window.alert("Please enter valid number of shares")
    setSharesError("Please enter valid number of shares.");
  }
};

const watchlistChecker = () => {
  for(let watchlistItem of stock){
    if (watchlistItem.symbol === quote.symbol) {
      return (
        <button className="watchlist_btn" onClick={deleteWatchlistItemHandler(watchlistItem)}>
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
}

const deleteWatchlistItemHandler = (watchlistItem) => {
  return (
    (event) => {
      event.preventDefault();
      axios
        .delete(`./${currentUser.username}/${watchlistItem.firebaseID}.json`)
        .catch((error) => console.log(error)); 
    } 
  )
}
 
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

           <div className="dashboard-search-container">
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
                   //  value={searchValue}
                   onKeyPress={handleKeyPress}
                   alt="search"
                 />
               </form>
             </div>
             <div className="dashboard-search-suggestions">
               {/* {searchValue ? <strong>Stocks</strong> : ""} */}
               <ul>
                 {TickerSymbols.map((name) => {
                   if (searchValue.length !== 0 && searchValue !== "qqq") {
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
             <a href="https://angel.co/u/ben-hsieh-6">
               <span className="nav-menu-item">AngelList</span>
             </a>
             <a href="https://github.com/benhsieh-dev">
               <span className="nav-menu-item">GitHub</span>
             </a>
             <a href="https://www.linkedin.com/in/ben-hsieh-05522542/">
               <span className="nav-menu-item">Linkedin</span>{" "}
             </a>

             <Link to="/signup">
               <span className="nav-menu-item">Portfolio</span>
             </Link>
             <div className="dropdown">
               <button className="nav-menu-item dropdown" onClick={operation}>
                 Account
               </button>
               {show && (
                 <ul className="dropdown-menu">
                   <li>
                     <div className="user-information">
                       <strong>
                         {currentUser.first_name} {currentUser.last_name}
                       </strong>
                       <div className="dropdown-portfolio-value">
                         <h4>
                           $
                           {portfolioValue
                             .map((a) => a.Total)
                             .reduce((a, b) => a + b, 0)
                             .toFixed(2)
                             .toString()
                             .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                         </h4>
                         <span>Portfolio Value</span>
                       </div>
                     </div>
                     <hr />
                   </li>
                   {/* <li className="dropdown-list">
                     <img className="rg-logo" src={roberthoodGoldURL} />
                     <span className="gold">Roberthood Gold</span>
                   </li>
                   <li className="dropdown-list">
                     <i className="fas fa-gift menu-icon"></i>
                     <span className="dropdown-menu-item">Free Stock</span>
                   </li> */}

                   <li className="dropdown-list">
                     <i className="fab fa-angellist menu-icon"></i>
                     <a href="https://angel.co/u/ben-hsieh-6">
                       <span className="dropdown-menu-item">AngelList</span>
                     </a>
                   </li>
                   <li className="dropdown-list">
                     <i className="fab fa-github menu-icon"></i>
                     <a href="https://github.com/benhsieh-dev">
                       <span className="dropdown-menu-item">GitHub</span>
                     </a>
                   </li>
                   <li className="dropdown-list">
                     <i className="fab fa-linkedin-in menu-icon"></i>
                     <a href="https://www.linkedin.com/in/ben-hsieh-05522542/">
                       <span className="dropdown-menu-item">Linkedin</span>
                     </a>
                   </li>

                   <li className="dropdown-list">
                     <i className="fas fa-briefcase menu-icon"></i>
                     <Link to="/account">
                       <span className="dropdown-menu-item">Account</span>
                     </Link>
                   </li>
                   {/* 
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
                   </li> */}
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
       <div className="content">
         <br />
         <br />
         <div className="left">
           <div className="Quote">
             {searchValue !== "qqq" ? (
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
               </div>
             ) : (
               <div className="default_quote">
                 <h2>
                   $
                   {portfolioValue
                     .map((a) => a.Total)
                     .reduce((a, b) => a + b, 0)
                     .toFixed(2)
                     .toString()
                     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                 </h2>
                 <strong>
                   $
                   {portfolioValue
                     .map((a) => a.Company.change)
                     .reduce((a, b) => a + b, 0)
                     .toFixed(2)}
                   (
                   {(
                     portfolioValue
                       .map((a) => parseInt(a.Company.change_percent_s))
                       .reduce((a, b) => a + b, 0) / portfolioValue.length
                   ).toFixed(2)}
                   %)
                 </strong>{" "}
                 <span className="today">Today</span>
               </div>
             )}
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
           </div>
           <hr></hr>

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
             {/* <p className="footer-paragraph">
               For more information, see our
               <span className="privacy-policy"> Privacy Policy</span>.
              </p> */}
           </div>
         </div>

         <div className="right">
           {searchValue !== "qqq" ? (
             <div>
               <div className="dashboard-trade">
                 <strong>
                   {/* JSON.stringify(quote.company_name).replace(/['"]+/g, "")*/}
                   Buy {quote.symbol.toUpperCase()}
                 </strong>
                 <div className="dashboard-stock-purchase">
                   Shares
                   <input
                     value={shares}
                     className="dashboard-purchase-shares"
                     type="number"
                     placeholder="0"
                     min="0"
                     step="1"
                     onChange={(e) => setShares(e.target.value)}
                   />
                 </div>
                 <br />
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
                 <br />
                 <br />
                 <div className="dashboard-purchase-shares-error">
                    {sharesError}
                 </div>
               </div>
               <br />
               {watchlistChecker()}
             </div>
           ) : (
             <div>
               <span className="watchlist-header">Watchlist</span>
               <hr />
               <div>
                 {stock.map((item, idx) => (
                   <div key={idx} className="watchlist">
                     <ul className="watchlist_item">
                       <li>{item.symbol}</li>
                       <li>{item.latest_price}</li>
                       <li>{item.change_percent_s}</li>
                     </ul>
                     <button
                       className="remove_from_watchlist"
                       onClick={deleteWatchlistItemHandler(item)}
                     >
                       Remove from Watchlist
                     </button>
                   </div>
                 ))}
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
   );
}
     
 


// <div className="fund-account">
//              <span className="funds">Fund Your Account</span>
//              <p className="funds-message">
//                Your bank account is ready! Fund your Roberthood account to begin
//                trading.
//              </p>
//              <span className="add-funds-message">Add Funds</span>
//            </div>

//            <div className="popular-collections">
//              <h4>Popular Collections</h4>
//              <span className="show-more-collections">Show More</span>
//            </div>

//  {
//    stock ? JSON.stringify(stock) : "";
//  }

  
  

          // {
          //   quote ? (
          //     <div>
          //       <strong>
          //         Buy {JSON.stringify(quote.symbol).replace(/['"]+/g, "")}
          //       </strong>
          //       <hr />
          //       <form>
          //         <label>
          //           Shares
          //           <input></input>
          //         </label>
          //         <label>
          //           Market Price
          //           <input value="${quote.latest_price}"></input>
          //         </label>
          //       </form>
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