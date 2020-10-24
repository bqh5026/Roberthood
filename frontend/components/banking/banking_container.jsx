import React from "react";
import { connect } from "react-redux";
import Banking from "./banking";
import { logout } from "../../actions/session";

const msp = (state) => {
  return { currentUser: state.session.currentUser };
};

const mdp = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(msp, mdp)(Banking);