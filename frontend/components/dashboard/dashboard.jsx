import React, {useState} from 'react'; 
import {Link} from 'react-router-dom'; 


export default ({ currentUser, logout }) => {
  const [username, setUsername] = useState('')
  const [last_name, setLastname] = useState('')
  console.log("currentUser", currentUser); 
  // if (!currentUser) {
  //   return (
  //     <div>Loading...</div>
  //   )
  // }
   return (
     <div>

        <div>
           <nav className='nav-bar'>
           <img className='dashboard-green-feather' src={greenFeatherURL} />
           <div className='search-box'>
             <i className="fas fa-search"></i>
             <input className='search-txt' type='text' name='' placeholder='Search' />
             <Link to='#' className='search-btn'></Link>
           </div>
           <Link to="#">Free Stocks</Link>
           <Link to="#">Portfolio</Link>
           <Link to="#">Cash</Link>
           <Link to="#">Messages</Link>
           <Link to="#">Account</Link>
         </nav>
        </div>

    
      <div className='content'>

         <div className='popular-collections'>
           <h4>Popular Collections</h4>
           <span className='show-more-collections'>Show More</span>
         </div>

          <div className='news'>
            <h4>News</h4>
            <span className='show-more-news'>Show More</span>
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
