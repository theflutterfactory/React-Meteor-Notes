import React from "react";
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { Notes } from "../api/notes";
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem'

export const NoteList = (props) => {
  if (props.notes.length !== 0) {
    return (
      <div>
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
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  }
}, NoteList);