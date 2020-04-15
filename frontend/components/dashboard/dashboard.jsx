import React, {useState, useEffect} from 'react'; 
import {Link} from 'react-router-dom'; 
// import { LineChart, Line } from "recharts";




export default ({ currentUser, logout }) => {
  const [username, setUsername] = useState('')
  const [last_name, setLastname] = useState('')
  const [first_name, setFirstname] = useState('')
  console.log("currentUser", currentUser); 

  const [news, setNews] = useState([]);
  useEffect(() => {
    if (news.length < 1) {
      search(); 
      $.ajax('/api/news/new').done(res => {
        setNews(news.concat(res.articles));
      });
    }
  });

  const search = () => {
    $.ajax('/api/stocks/fb').done(res => {
      // setNews(news.concat(res.articles));
      console.log(res); 
    });
  }
  
   return (
     <div>
       <div>
         <nav className="nav-bar">
           <Link to="/dashboard">
             <img className="dashboard-roberthood-hat" src={roberthoodHatURL} />

           </Link>
           <div className="search-box">
             <i className="fas fa-search"></i>
             <input
               className="search-txt"
               type="text"
               name=""
               placeholder="Search"
             />
             <Link to="#" className="search-btn"></Link>
           </div>
           <Link className="nav-menu-item" to="#">Free Stocks</Link>
           <Link className="nav-menu-item" to="#">Portfolio</Link>
           <Link className="nav-menu-item" to="#">Cash</Link>
           <Link className="nav-menu-item" to="#">Messages</Link>
           <div className="dropdown">
             <button className="nav-menu-item dropdown">Account</button>
             <ul className='dropdown-menu'>
              <li>
                <div>
                  {currentUser.first_name} {currentUser.last_name}
                </div>
                <hr />
              </li>
              <li className='dropdown-list'>
                 <img className="rg-logo" src={roberthoodGoldURL} />
                 <Link className="gold" to="#">Roberthood Gold</Link>
              </li>
              <li className='dropdown-list'>
                 <i className="fas fa-gift menu-icon"></i>
                 <Link className="dropdown-menu-item" to="#">Free Stock</Link>
              </li>
              <li className='dropdown-list'>
                 <i className="fas fa-briefcase menu-icon"></i>
                 <Link className="dropdown-menu-item" to="#">Account</Link>
              </li>
              <li className='dropdown-list'>
                 <i className="fas fa-university menu-icon"></i>
                 <Link className="dropdown-menu-item" to="#">Banking</Link>
              </li>
              <li className='dropdown-list'>
                 <i className="fas fa-history menu-icon"></i>
                 <Link className="dropdown-menu-item" to="#">History</Link>
              </li>
              <li className='dropdown-list'>
                 <i className="fas fa-file-alt menu-icon"></i>
                 <Link className="dropdown-menu-item" to="#">Documents</Link>
              </li>
              <li className='dropdown-list'>
                 <i className="fas fa-cog menu-icon"></i>
                 <Link className="dropdown-menu-item" to="#">Settings</Link>
              </li>
              <hr />
              <li className='dropdown-list'>
                 <i className="far fa-life-ring menu-icon"></i>
                 <Link className="dropdown-menu-item" to="#">Help Center</Link>
              </li>
              <li className='dropdown-list'>
                 <i className="fas fa-comment-dots menu-icon"></i>
                 <Link className="dropdown-menu-item" to="#">Contact Us</Link>
              </li>
              <li className='dropdown-list'>
                 <i className="far fa-file-pdf menu-icon"></i>
                 <Link className="dropdown-menu-item" to="#">Disclosure</Link>
              </li>
              <li className='dropdown-list'>
                 <i className="fas fa-sign-out-alt menu-icon"></i>
                 <Link className="dropdown-menu-item" to="#" onClick={logout}>Log Out</Link>
              </li>
             </ul>
           </div>
         </nav>
       </div>

       <br />
       <div className="content">
         <br />
         <br />
         <div className="left">
           <div className="fund-account">
             <span className="funds">Fund Your Account</span>
             <p className="funds-message">
               Your bank account is ready! Fund your Robinhood account to begin
               trading.
             </p>
             <span className="add-funds-message">Add Funds</span>
           </div>

           <div className="popular-collections">
             <h4>Popular Collections</h4>
             <span className="show-more-collections">Show More</span>
           </div>

           <div className="news">
              <h4>News</h4>
             <ul>
               {news.map((item, idx) => {
                 return (<li key={idx} className='news-item'>
                   <div><i className="fas fa-bolt"></i> {item.source.name}</div>
                   <div className='news-title'>

                     <div>
                       <a href={item.url} target="_blank">{item.title}</a>
                     </div>
                     <div>
                       <img className="news-image" src={item.urlToImage} />
                     </div>

                   </div>       
                  <hr />
                  </li>)
               })}
             </ul> 
             <span className="show-more-news">Show More</span>  
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
           <hr/>
         </div>
       </div>

     </div>
   );
}
     
       
// <header>
//   <h1>Roberthood</h1>
//   <h3>Welcome {currentUser.username}</h3>
//   <p>{currentUser.last_name}</p>
// </header>



