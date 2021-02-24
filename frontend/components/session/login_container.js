import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/session";
import Login from "./login";

const msp = state => ({
  currentUser: state.session.currentUser
})

const mdp = (dispatch) => ({
  login: (formUser) => dispatch(login(formUser)),
});

export default connect(msp, mdp)(Login);
