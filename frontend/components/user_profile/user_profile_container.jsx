import React from 'react';
import { connect } from 'react-redux';
import UserProfile from './user_profile';
import { logout } from '../../actions/session';

const msp = state => ({
    currentUser: state.session.currentUser
});

const mdp = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(msp, mdp)(UserProfile); 