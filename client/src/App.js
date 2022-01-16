import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import User from "./components/User";
import NotFound from "./components/NotFound";
import Calander from "./components/Calander";
class App extends Component {
  state = {
    isAuthenticated: false,
  };
  verifyAuth = () => {
    this.setState({ isAuthenticated: true });
  };

  render() {
    return (
      <Router>
        <NavBar isAuthenticated={this.state.isAuthenticated} />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/user" component={User} />
          <Route exact path="/calander" component={Calander} />


          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} verifyAuth={this.verifyAuth} />
            )}
          />

          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
