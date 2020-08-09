import React from "react";
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      rest.loggedIn === false
      ? <Redirect to="/session" />
      : <Component {...props} />
    )} />
  )
}

export const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      rest.loggedIn === true
      ? <Redirect to="/" />
      : <Component {...props} />
    )} />
  )
}