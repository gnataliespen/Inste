import React, { useEffect } from "react";
import { useHistory, Switch, Route } from "react-router-dom";

import firebase from "./firebase";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Signout from "./Components/Auth/Signout";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

const App = () => {
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push("/chat");
      }
    });
  }, [history]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/chat" component={Chat} />

      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/signout" component={Signout} />
    </Switch>
  );
};

export default App;
