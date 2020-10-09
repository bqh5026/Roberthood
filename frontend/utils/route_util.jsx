import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";

// console.log(state.session.currentUser); //testings

const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser),
});

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
        <Redirect to="/dashboard" />
      )
  )} />
)

const Protected = ({ component: Component, path, loggedIn }) => (
  <Route
    path={path}
    render={(props) =>
      loggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(
  connect(mapStateToProps)(Protected)
);
