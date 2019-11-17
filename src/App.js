import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Signout from "./Components/Auth/Signout";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/signout" component={Signout} />
      </Switch>
    </Router>
  );
};

export default App;
