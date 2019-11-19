import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import Cookies from "js-cookie";

import Home from "./Components/Home";
import Chat from "./Components/Chat";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Signout from "./Components/Auth/Signout";

import { loadUser } from "./redux/actions/user";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { connect } from "react-redux";
import setAuthToken from "./util/setAuthToken";

const App = ({ loadUser, loading, isAuth }) => {
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);
    if (token) {
      setAuthToken(token);
    }
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
      <Route exact path="/chat" component={Chat} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/signout" component={Signout} />
    </Switch>
  );
};

const mapStateToProps = state => ({
  loading: state.user.loading,
  isAuth: state.user.isAuth
});

export default connect(mapStateToProps, { loadUser })(App);
