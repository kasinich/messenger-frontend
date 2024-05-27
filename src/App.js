import React from "react";
import { Auth, Home } from "pages";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

const App = props => {
  const { isAuth } = props;
  return (
    <div className="wrapper">
      <Switch>
        <Route
          exact
          path={["/singin", "/singup", "/singup/verify"]}
          component={Auth} />
        <Route
          exact
          path={["/", "/dialog/:id"]}
          render={() => isAuth ? <Home /> : <Redirect to="/singin" />}
        />
      </Switch>
    </div>
  );
};

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);