import React from 'react';
import { connect } from 'react-redux';
import Stocks from './stock';
import { logout } from '../../actions/session.js';

const msp = (state) => {
    return {currentUser: state.session.currentUser}
}

const mdp = dispatch => ({
    logout: () => dispatch(logout()), 
});

export default connect(msp, mdp)(Stocks); 