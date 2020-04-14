import React, {useState, useEffect} from 'react'; 
import {Link} from 'react-router-dom'; 
// import { LineChart, Line } from "recharts";




export default ({ currentUser, logout }) => {
  const [username, setUsername] = useState('')
  const [last_name, setLastname] = useState('')
  console.log("currentUser", currentUser); 

  const [news, setNews] = useState([]);
  console.log("currentUser", currentUser);
  useEffect(() => {
    if (news.length < 1) {
      $.ajax('/api/news/new').done(res => {
        setNews(news.concat(res.articles));
      });
    }
  });

  


   return (
     <div>
       <div>
         <nav className="nav-bar">
           <Link to="/dashboard">
             <img className="dashboard-green-feather" src={greenFeatherURL} 
             />

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
             <ul>
              <li>
                 <Link className="dropdown-menu-item" to="#">Robinhood Gold</Link>
              </li>
              <li>
                 <Link className="dropdown-menu-item" to="#">Free Stock</Link>
              </li>
              <li>
                 <Link className="dropdown-menu-item" to="#">Account</Link>
              </li>
              <li>
                 <Link className="dropdown-menu-item" to="#">Banking</Link>
              </li>
              <li>
                 <Link className="dropdown-menu-item" to="#">History</Link>
              </li>
              <li>
                 <Link className="dropdown-menu-item" to="#">Documents</Link>
              </li>
              <li>
                 <Link className="dropdown-menu-item" to="#">Settings</Link>
              </li>
              <li>
                 <Link className="dropdown-menu-item" to="#">Help Center</Link>
              </li>
              <li>
                 <Link className="dropdown-menu-item" to="#">Contact Us</Link>
              </li>
              <li>
                 <Link className="dropdown-menu-item" to="#">Disclosure</Link>
              </li>
              <li>
                 <Link className="dropdown-menu-item" to="#">Log Out</Link>
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
               {news.map((item) => {
                 return (<li>{item.title}</li>)
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
           <span>Watchlist</span>
         </div>
       </div>

       <br />

       <button className='logout-btn' onClick={logout}>Logout</button>
     </div>
   );
}
     
       
// <header>
//   <h1>Roberthood</h1>
//   <h3>Welcome {currentUser.username}</h3>
//   <p>{currentUser.last_name}</p>
// </header>


// import React from 'react'; 
// import {Link} from 'react-router-dom'; 

// class Dashboard extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     this.props.fetchUser(); 
//   }
//   render() {
//     return (
//       <div>
//       <h1>Hello</h1>
//       </div>
//     );
//   }
// }

// export default Dashboard; 