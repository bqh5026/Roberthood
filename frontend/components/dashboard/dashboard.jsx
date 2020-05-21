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
  const [show, setShow] = useState(true); 

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
      // debugger
      const watchlist = [];
      for(let stock in res.data) {
        watchlist.push({...res.data[stock], firebaseID: stock})
      }
      setStock(watchlist);
      console.log(res.data); 
    }) 
    .catch(error => console.log(error));  
  }, [setStock]);

  const search = () => {
    $.ajax(`/api/stocks/quote/${searchValue}`).done(res => {
      console.log(res); 
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


 const operation = () => {
    setShow(
       !show
    )
  }
    
const postDataHandler = () => {
  // axios.post('./stocks.json', quote)
  axios.post(`./${currentUser.username}.json`, quote)
    .then(response => console.log(response))
    .catch(error => console.log(error)); 
}


const deleteWatchlistItemHandler = (watchlistItem) => {
  return (
    (event) => {
      event.preventDefault();
      console.log(watchlistItem);
      // debugger
      axios
      //this.props.deleteWatchlistItem(watclistItem.firebaseID)
        .delete(`./${currentUser.username}/${watchlistItem.firebaseID}.json`)
        .then((response) => console.log(response))
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
             <i className="fas fa-search"></i>
             <input
               className="search-txt"
               type="text"
               name=""
               placeholder="Search"
               onChange={(event) => {
                 handleOnChange(event);
               }}
               value={searchValue}
             />
             <button onClick={search} className="search-btn">
               Search
             </button>
           </div>
         </div>

         <div>
           <nav className="nav-bar">
             <Link className="nav-menu-item" to="#">
               Free Stocks
             </Link>
             <Link className="nav-menu-item" to="#">
               Portfolio
             </Link>
             <Link className="nav-menu-item" to="#">
               Cash
             </Link>
             <Link className="nav-menu-item" to="#">
               Messages
             </Link>
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
                     <Link className="gold" to="#">
                       Roberthood Gold
                     </Link>
                   </li>
                   <li className="dropdown-list">
                     <i className="fas fa-gift menu-icon"></i>
                     <Link className="dropdown-menu-item" to="#">
                       Free Stock
                     </Link>
                   </li>
                   <li className="dropdown-list">
                     <i className="fas fa-briefcase menu-icon"></i>
                     <Link className="dropdown-menu-item" to="#">
                       Account
                     </Link>
                   </li>
                   <li className="dropdown-list">
                     <i className="fas fa-university menu-icon"></i>
                     <Link className="dropdown-menu-item" to="#">
                       Banking
                     </Link>
                   </li>
                   <li className="dropdown-list">
                     <i className="fas fa-history menu-icon"></i>
                     <Link className="dropdown-menu-item" to="#">
                       History
                     </Link>
                   </li>
                   <li className="dropdown-list">
                     <i className="fas fa-file-alt menu-icon"></i>
                     <Link className="dropdown-menu-item" to="#">
                       Documents
                     </Link>
                   </li>
                   <li className="dropdown-list">
                     <i className="fas fa-cog menu-icon"></i>
                     <Link className="dropdown-menu-item" to="#">
                       Settings
                     </Link>
                   </li>
                   <hr />
                   <li className="dropdown-list">
                     <i className="far fa-life-ring menu-icon"></i>
                     <Link className="dropdown-menu-item" to="#">
                       Help Center
                     </Link>
                   </li>
                   <li className="dropdown-list">
                     <i className="fas fa-comment-dots menu-icon"></i>
                     <Link className="dropdown-menu-item" to="#">
                       Contact Us
                     </Link>
                   </li>
                   <li className="dropdown-list">
                     <i className="far fa-file-pdf menu-icon"></i>
                     <Link className="dropdown-menu-item" to="#">
                       Disclosure
                     </Link>
                   </li>
                   <li className="dropdown-list">
                     <i className="fas fa-sign-out-alt menu-icon"></i>
                     <Link
                       className="dropdown-menu-item"
                       to="#"
                       onClick={logout}
                     >
                       Log Out
                     </Link>
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
             <ul className="ticker-results">
               <li>
                 <span>Company Name:</span>{" "}
                 {quote ? JSON.stringify(quote.company_name) : ""}
               </li>
               <li>
                 <span>Ticker:</span>{" "}
                 {quote ? JSON.stringify(quote.symbol) : ""}
               </li>
               <li>
                 <span>Latest Price:</span>{" "}
                 {quote ? JSON.stringify(quote.latest_price) : ""}
               </li>
               <li>
                 <span>PE ratio:</span>{" "}
                 {quote ? JSON.stringify(quote.pe_ratio) : ""}
               </li>
               <li>
                 <span>YTD change:</span>{" "}
                 {quote ? JSON.stringify(quote.ytd_change) : ""}
               </li>
             </ul>
             <button onClick={postDataHandler}>Add</button>
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

           <div className="fund-account">
             <span className="funds">Fund Your Account</span>
             <p className="funds-message">
               Your bank account is ready! Fund your Roberthood account to begin
               trading.
             </p>
             <span className="add-funds-message">Add Funds</span>
           </div>

           <div className="popular-collections">
             <h4>Popular Collections</h4>
             <span className="show-more-collections">Show More</span>
           </div>

           <div className="news-header">
             <h4>News</h4>
             <span className="show-more-news">Show More</span>
           </div>

           <div className="news">
             <ul>
               {news.map((item, idx) => {
                 return (
                   <li key={idx} className="news-item">
                     <div>
                       <i className="fas fa-bolt"></i> {item.source.name}
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
                 <ul>
                   <li>
                     {item.symbol}
                     {item.latest_price}
                     {item.change_percent_s}
                   </li>
                 </ul>
                 <button onClick={deleteWatchlistItemHandler(item)}>
                   Delele from watchlist
                 </button>
               </div>
             ))}
           </div>
         </div>
       </div>
     </div>
   );
}
     
 

//  {
//    stock ? JSON.stringify(stock) : "";
//  }

  
  
