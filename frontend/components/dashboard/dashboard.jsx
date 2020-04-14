import React, {useState} from 'react'; 
import {Link} from 'react-router-dom'; 
// import { LineChart, Line } from "recharts";


export default ({ currentUser, logout }) => {
  const [username, setUsername] = useState('')
  const [last_name, setLastname] = useState('')
  console.log("currentUser", currentUser); 

   return (
     <div>

       <div>
         <nav className="nav-bar">
           <img className="dashboard-green-feather" src={greenFeatherURL} />
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
           <Link to="#">Free Stocks</Link>
           <Link to="#">Portfolio</Link>
           <Link to="#">Cash</Link>
           <Link to="#">Messages</Link>
           <Link to="#">Account</Link>
         </nav>
       </div>

        <div className="content">

          <br />
          <br />
          <div className='left'>
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
              <span className="show-more-news">Show More</span>
            </div>

            <div className="footer">
              <p className="footer-paragraph">
                For more information, see our
                <span className="privacy-policy"> Privacy Policy</span>.
              </p>
            </div>

          </div>

       </div>

       <br />

       <button onClick={logout}>Logout</button>
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