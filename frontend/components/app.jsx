import React from 'react';
import { Provider } from 'react-redux';
import { Route,
         Switch,
         Redirect
} from "react-router-dom";
// import NavBarContainer from './nav_bar/nav_bar_container';
import LoginContainer from './session/login_container'; 
import SignupContainer from './session/signup_container';
import DashboardContainer from './dashboard/dashboard_container'; 
import Portfolio from './portfolio/portfolio'; 
import Home from "./home/home";
import { AuthRoute, ProtectedRoute } from "../utils/route_util";



export default () => (
  <div>
      <AuthRoute exact path="/" component={Home} />
      <AuthRoute path="/signup" component={SignupContainer} />
      <AuthRoute path="/login" component={LoginContainer} />
      <ProtectedRoute path="/dashboard" component={DashboardContainer} />
      <ProtectedRoute path="/portfolio" component={Portfolio} />
  </div>
);


// <Route exact path="/" render={(this.props.currentUser ? <Home /> : <Redirect to="/login" />)} />

  //  <Route path="/" component={NavBarContainer} />;
  // <header>
  //   <Route
  //     exact
  //     path={["/", "/login", "/signup"]}
  //     component={NavBarContainer}
  //   />
  // </header>;


   
  