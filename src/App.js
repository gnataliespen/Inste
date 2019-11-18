import React, { useEffect, useState } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import firebase from "./firebase";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Signout from "./Components/Auth/Signout";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { setUser, clearUser } from "./redux/actions/index";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

const App = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch(setUser(user));
        history.push("/chat");
      } else {
        store.dispatch(clearUser());
      }
      setLoading(false);
    });
  }, [history]);

  return loading ? (
    <Loader active />
  ) : (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/signout" component={Signout} />
      </Switch>
    </Provider>
  );
};

export default App;
