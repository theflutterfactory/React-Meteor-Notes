import React from "react";
import PrivateHeader from "./PrivateHeader";
import NoteList from './NoteList';
import NoteListHeader from './NoteListHeader';

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
        <NoteListHeader />
        <NoteList />
      </div>
    </div>
  );
};
