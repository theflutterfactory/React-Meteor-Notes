import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import Dashboard from './../ui/Dashboard';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';

const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id);
};

const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
};

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnAuthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

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
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route exact path='/' component={Login} privacy='unauth' />
      <Route exact path='/signup' component={Signup} privacy='unauth' />
      <Route exact path='/dashboard' component={Dashboard} privacy='auth' />
      <Route exact path='/dashboard/:id' component={Dashboard} privacy='auth'
        onEnter={onEnterNotePage} onLeave={onLeaveNotePage} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
);
