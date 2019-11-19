import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import Home from "./Components/Home";
import Chat from "./Components/Chat";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Signout from "./Components/Auth/Signout";
import PrivateRoute from "./Components/Hoc/PrivateRoute";
import { loadUser } from "./redux/actions/user";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { connect } from "react-redux";

const App = ({ loadUser, loading, isAuth }) => {
  const history = useHistory();

  useEffect(() => {
    loadUser();
    if (isAuth) {
      history.push("/chat");
    }
  }, [loadUser, history, isAuth]);

  return loading ? (
    <Loader active />
  ) : (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/signout" component={Signout} />
      <PrivateRoute exact path="/chat" component={Chat} />
    </Switch>
  );
};

const mapStateToProps = state => ({
  loading: state.user.loading,
  isAuth: state.user.isAuth
});

export default connect(mapStateToProps, { loadUser })(App);
