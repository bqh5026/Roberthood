import React, {useState, useEffect} from 'react'; 
import {Link} from 'react-router-dom'; 
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, YAxis } from "recharts";

import axios from '../axios-quotes'; 

export default ({ currentUser, logout }) => {
  // const [username, setUsername] = useState('')
  // const [last_name, setLastname] = useState('')
  // const [first_name, setFirstname] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [quote, setQuote] = useState('')
  // console.log("currentUser", currentUser); 
  const [chartData, setChartData] = useState([]);
  const [news, setNews] = useState([]);
  const [show, setShow] = useState(false); 

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
  }, [setStock]);

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
    
const postDataHandler = () => {
  axios.post(`./${currentUser.username}.json`, quote)
    // .then(response => console.log(response))
    .then(response => window.alert("Added to watchlist"))
    .catch(error => console.log(error)); 
}


const deleteWatchlistItemHandler = (watchlistItem) => {
  return (
    (event) => {
      event.preventDefault();
      // console.log(watchlistItem);
      // debugger
      axios
      //this.props.deleteWatchlistItem(watclistItem.firebaseID)
        .delete(`./${currentUser.username}/${watchlistItem.firebaseID}.json`)
        // .then((response) => console.log(response))
        .then((response) => window.alert("Removed from watchlist"))
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
             <span className="nav-menu-item">Portfolio</span>
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
                     <span className="dropdown-menu-item">Account</span>
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
                     <span className="dropdown-menu-item" onClick={logout}>
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
             {quote ? (
               <div>
                 <ul className="ticker-results">
                   <li>
                     <h1>
                       {JSON.stringify(quote.company_name).replace(/['"]+/g,"")}
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
                     {JSON.stringify(quote.change_percent_s).replace(/['"]+/g, "")}) <span className="today">Today </span>
                   </li>
                   <li>
                     <span>PE ratio:</span>
                     {JSON.stringify(quote.pe_ratio)}
                   </li>
                   <li>
                     <span>YTD change:</span> {JSON.stringify((quote.ytd_change * 100).toFixed(2)).replace(/['"]+/g, "")}%
                   </li>
                 </ul>
                 <button className="watchlist_btn" onClick={postDataHandler}>
                   Add to Watchlist
                 </button>
               </div>
             ) : (
               <div className="default_quote">
                 <h2>$0.00</h2>
                 <strong>$0.00(0.00%)</strong>{" "}
                 <span className="today">Today</span>
               </div>
             )}
           </div>

           <div className="Chart">
             <LineChart width={800} height={400} data={chartData}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="date" />
               <YAxis />
               <Tooltip />
               <Line type="monotone" dataKey="close" stroke="#8884d8" />
             </LineChart>
           </div>

           <div className="news-header">
             <h4>News</h4>
             <span className="show-more-news">Show More</span>
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

  
  
