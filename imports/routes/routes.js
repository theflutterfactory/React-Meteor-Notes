import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import Dashboard from './../ui/Dashboard';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

const onEnterNotePage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  } else {
    Session.set('selectedNoteId', nextState.params.id);
  }
};

export const onAuthChange = isAuthenticated => {
  const pathName = browserHistory.getCurrentLocation().pathname;
  const isUnAuthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isUnAuthenticatedPage && isAuthenticated) {
    browserHistory.push('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.push('/');
  }

  console.log('isAuthenticated', isAuthenticated);
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};

export const routes = (
  <Router history={browserHistory}>
    <div>
      <Route onEnter={globalOnEnter} onChange={globalOnChange}>
        <Route exact path='/' component={Login} privacy='unauth' onEnter={onEnterPublicPage} />
        <Route exact path='/signup' component={Signup} privacy='unauth' onEnter={onEnterPublicPage} />
        <Route exact path='/dashboard' component={Dashboard} privacy='auth' onEnter={onEnterPrivatePage} />
        <Route exact path='/dashboard/:id' component={Dashboard} privacy='auth' onEnter={onEnterNotePage} />
        <Route path='*' component={NotFound} />
      </Route>
    </div>
  </Router>
);
