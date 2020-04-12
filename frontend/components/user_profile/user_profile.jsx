import React, {useState} from 'react'; 


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
       <header className="nav-bar">
         <h1 className="logo">Roberthood</h1>
         <h3>Welcome {currentUser.username}</h3>
         <p>{currentUser.last_name}</p>
       </header>
       <button onClick={logout}>Logout</button>
     </div>
   );
}
     
       
