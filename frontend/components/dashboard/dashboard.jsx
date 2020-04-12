import React, {useState} from 'react'; 
import {Link} from 'react-router-dom'; 


export default ({ currentUser, logout }) => {
  const [username, setUsername] = useState('')
  const [last_name, setLastname] = useState('')
  console.log("currentUser", currentUser); 
  if (!currentUser) {
    return (
      <div>Loading...</div>
    )
  }
   return (
     <div>
        <div>
           <nav className='nav-bar'>
           <img className='dashboard-green-feather' src={greenFeatherURL} />
           <Link to="#">Free Stocks</Link>
           <Link to="#">Portfolio</Link>
           <Link to="#">Cash</Link>
           <Link to="#">Messages</Link>
           <Link to="#">Account</Link>
         </nav>
        
        </div>
        <header>
         <h1>Roberthood</h1>
         <h3>Welcome {currentUser.username}</h3>
         <p>{currentUser.last_name}</p>
       </header>
       <button onClick={logout}>Logout</button>
     </div>
   );
}
     
       
