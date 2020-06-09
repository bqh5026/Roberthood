import React from "react";
import { connect } from "react-redux";
import Account from './account'; 
import { logout } from "../../actions/session";

const msp = (state) => {
  return {currentUser: state.session.currentUser}
};

const mdp = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(msp, mdp)(Account);
