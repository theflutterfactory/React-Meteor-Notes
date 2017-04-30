import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../api/notes';
import { Session } from 'meteor/session';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import NoteListHeader from './NoteListHeader';

export const NoteList = (props) => {
  if (props.notes.length !== 0) {
    return (
      <div>
        <NoteListHeader />
        {props.notes.map((note) => {
          return <NoteListItem key={note._id} note={note} />;
        })}
      </div>
    );
  } else {
    return <NoteListEmptyItem />;
  }
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  };
}, NoteList);
