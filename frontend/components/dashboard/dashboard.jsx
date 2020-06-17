import React, {useState, useEffect} from 'react'; 
import { Link, useHistory } from 'react-router-dom';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, YAxis } from "recharts";

import axios from '../axios-quotes'; 


export default ({ currentUser, logout }) => {
  const [searchValue, setSearchValue] = useState('qqq')
  const [quote, setQuote] = useState('')
  // console.log("currentUser", currentUser); 
  const [chartData, setChartData] = useState([]);
  const [news, setNews] = useState([]);
  const [show, setShow] = useState(false); 
  const [portfolioValue, setPortfolioValue] = useState([]);
  const [stock, setStock] = useState([]); 

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
      console.log(res);
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
    .then(document.querySelector('.watchlist_btn').disabled=true)
    .catch(error => console.log(error)); 
}

const history = useHistory();
const routeChange = () => {
  let path = `/account`;
  history.push(path);
}; 

const buyStockHandler = () => {
  axios.post(`./portfolios/${currentUser.username}.json`, quote)
  // .then(response => console.log(response))
  .then(document.querySelector('.buy-stock')
  .textContent = 'Bought'
  .then(routeChange())
  )
  .catch(error => console.log(error)); 
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
                //  value={searchValue}
                 onKeyPress={handleKeyPress}
                 alt="search"
               />
             </form>
           </div>
         </div>

         <div>
           <nav className="nav-bar">
             <span className="nav-menu-item">Free Stocks</span>
             <Link to="/signup">
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
                     <div>
                       {currentUser.first_name} {currentUser.last_name}
                     </div>
                     <hr />
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
                     <Link to="/account">
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
             {(searchValue !== 'qqq') ? (
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
                     .map((a) => a.latest_price)
                     .reduce((a, b) => a + b, 0)
                     .toFixed(2)}
                 </h2>
                 <strong>
                   $
                   {portfolioValue
                     .map((a) => a.change)
                     .reduce((a, b) => a + b, 0)
                     .toFixed(2)}
                   (
                   {(
                     portfolioValue
                       .map((a) => parseInt(a.change_percent_s))
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
             <p className="footer-paragraph">
               For more information, see our
               <span className="privacy-policy"> Privacy Policy</span>.
             </p>
           </div>
         </div>

         <div className="right">
           {(searchValue !== 'qqq') ? (
             <div>
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
               <br />
               <button className="watchlist_btn" onClick={postDataHandler}>
                 Add to Watchlist
               </button>
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