import React from 'react';
import { Provider } from 'react-redux';
import { Route,
         Switch
} from "react-router-dom";
import Home from './home/home';
import SignupContainer from "./session/signup_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";


export default () => (
  <div>
    <Switch>
      <AuthRoute exact Path="/login" component={LoginContainer} />
      <AuthRoute exact Path="/signup" component={SignupContainer} />
      <Route exact Path="/" component={Home} />
    </Switch>
  </div>
);

//    <Route Path="/" component={NavBarContainer} />

  