import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useDispatch } from "react-redux";
import { setAuthorizationHeader } from "src/configs/axios";

import "./assets/css/style.css";

import GuestRoute from "./components/Routes/GuestRoute";
import MemberRoute from "./components/Routes/MemberRoute";

import NotFound from "./pages/404";
import Unauthenticated from "./pages/401";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyClass from "./pages/MyClass";
import DetailsClass from "./pages/DetailsClass";
import Settings from "./pages/Settings.js";
import Transactions from "./pages/Transactions.js";

import { populateProfile } from "src/store/actions/users";

import users from "src/constans/api/users";
import Joined from "./pages/Joined";

export default function App() {
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });
  const dispatch = useDispatch();

  useEffect(() => {
    let session = null;
    if (localStorage.getItem("LEARNINGIT:token")) {
      session = JSON.parse(localStorage.getItem("LEARNINGIT:token"));
      setAuthorizationHeader(session.token);

      users.details().then((details) => {
        dispatch(populateProfile(details.data));
      });
    }
  }, [dispatch]);
  return (
    <>
      <Router history={history}>
        <Switch>
          <GuestRoute path="/login" component={Login}></GuestRoute>
          <GuestRoute path="/register" component={Register}></GuestRoute>
          <GuestRoute path="/private" component={Unauthenticated}></GuestRoute>

          <MemberRoute exact path="/" component={MyClass}></MemberRoute>
          <MemberRoute exact path="/joined/:class" component={Joined}></MemberRoute>

          <MemberRoute
            exact
            path="/courses/:class/:chapter/:uid"
            component={DetailsClass}
          ></MemberRoute>
          <MemberRoute exact path="/courses/:class/" component={DetailsClass}></MemberRoute>
          <MemberRoute path="/settings" component={Settings}></MemberRoute>
          <MemberRoute path="/transactions" component={Transactions}></MemberRoute>

          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </>
  );
}
