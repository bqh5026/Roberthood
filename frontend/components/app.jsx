import React from 'react';
import { Provider } from 'react-redux';
import { Route,
         Switch
} from "react-router-dom";
// import NavBarContainer from './nav_bar/nav_bar_container';
import LoginContainer from './session/login_container'; 
import SignupContainer from './session/signup_container';
import UserProfileContainer from './user_profile/user_profile_container'; 
import Home from "./home/home";
// import { AuthRoute, ProtectedRoute } from "../utils/route_util";



export default () => (
  <div>

  
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignupContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/api/users/" component={UserProfileContainer} />;
  
  </div>
);

  //  <Route path="/" component={NavBarContainer} />;
  // <header>
  //   <Route
  //     exact
  //     path={["/", "/login", "/signup"]}
  //     component={NavBarContainer}
  //   />
  // </header>;


   
  