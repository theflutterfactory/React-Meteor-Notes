import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, browserHistory } from "react-router";
import Dashboard from "./../ui/Dashboard"
import Login from "../ui/Login";
import Signup from "../ui/Signup";
import NotFound from "../ui/NotFound";

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/dashboard"];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace("/dashboard");
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace("/");
  }
};

export const onAuthChange = isAuthenticated => {
  const pathName = browserHistory.getCurrentLocation().pathname;
  const isUnAuthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isUnAuthenticatedPage && isAuthenticated) {
    browserHistory.push("/dashboard");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.push("/");
  }

  console.log("isAuthenticated", isAuthenticated);
};

export const routes = (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={Login} onEnter={onEnterPublicPage} />
      <Route
        exact
        path="/signup"
        component={Signup}
        onEnter={onEnterPublicPage}
      />
      <Route
        exact
        path="/dashboard"
        component={Dashboard}
        onEnter={onEnterPrivatePage}
      />
      <Route
        exact
        path="/dashboard:id"
        component={Dashboard}
        onEnter={onEnterPrivatePage}
      />
      <Route path="*" component={NotFound} />
    </div>
  </Router>
);
