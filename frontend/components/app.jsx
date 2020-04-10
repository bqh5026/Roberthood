import React from 'react';
import SignupContainer from './session/signup_container';
import Home from './home/home';
import { Route } from 'react-router-dom';


export default () => (
    <div>
        <Route exact Path="/" component={Home} />
        <Route exact Path="/signup" component={SignupContainer} />

    </div>
)

//    <Route Path="/" component={NavBarContainer} />