import jwtDecode from "jwt-decode";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { getData } from "../redux/action/userAction";
import NoAuthRoute from "../routes/NoAuthRoute";
import AuthRoute from "../routes/AuthRoute";
import Admin from "./admin/Admin";

import Doctor from "./doctor/Doctor";
import Footer from "./Footer";
import Header from "./Header";
import history from "./history";
import Forgot from "./home/Forgot";
import LoginForm from "./home/LoginForm";
import Logout from "./home/Logout";
import Register from "./home/Register";
import Patient from "./patient/Patient";

import store from "../redux/store";
import Bot from "./ChatBot";

const App = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwtDecode(token);
    store.dispatch(getData(token, decode.role));
  }

  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <NoAuthRoute exact path="/login" component={LoginForm} />
        <NoAuthRoute exact path="/register" component={Register} />
        <NoAuthRoute exact path="/forgot" component={Forgot} />
        <Route path="/logout" component={Logout} />
        <AuthRoute path="/patient/*" isRole="patient" component={Patient} />
        <AuthRoute path="/doctor/*" isRole="doctor" component={Doctor} />
        <AuthRoute path="/admin/*" isRole="admin" component={Admin} />
      </Switch>
      <Bot />
      <Footer />
    </Router>
  );
};

export default App;
