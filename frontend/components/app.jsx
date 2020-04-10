import React from 'react';
import { Provider } from 'react-redux';
import { Route,
         Switch
} from "react-router-dom";
import NavBarContainer from './nav_bar/nav_bar_container';
import LoginContainer from './session/login_container'; 
import SignupContainer from './session/signup_container';
// import UserProfile from './user_profile/user_profile';
import Home from "./home/home";
import { AuthRoute, ProtectedRoute } from "../utils/route_util";



export default () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <AuthRoute path="/signup" component={SignupContainer} />
      <AuthRoute path="/login" component={LoginContainer} />
    </Switch>
  </div>
);
  //  <Route Path="/" component={NavBarContainer} />;


      // <Route path="/api/users/" component={UserProfile} />;
  