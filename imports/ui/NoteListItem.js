import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
  const className = props.note.selected ? 'item item--selected' : 'item';

  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
    }}>
      <h5>{props.note.title || 'Untitled Note'}</h5>
      <p>{moment(props.note.updatedAt).format('M/DD/YY')}</p>
    </div>
  );
};

NoteListItem.propThpes = {
  note: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session };
}, NoteListItem);
