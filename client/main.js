import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { routes, onAuthChange } from '../imports/routes/routes';
import { browserHistory } from 'react-router';
import '../imports/startup/simple-schema-config';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  ReactDOM.render(routes, document.getElementById('app'));
});
