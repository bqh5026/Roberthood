import React from 'react';
import { Provider } from 'react-redux';
import { Route,
         Switch
} from "react-router-dom";
import SignupContainer from './session/signup_container';
import Home from './home/home';


export default () => (
  <div>
    <Switch>
      <Route Path="/signup" component={SignupContainer} />
      <Route exact Path="/" component={Home} />
    </Switch>
  </div>
);

//    <Route Path="/" component={NavBarContainer} />
  