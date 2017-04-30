import React from 'react';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import NoteListHeader from './NoteListHeader';
import Editor from './Editor';

export default () => {
  return (
    <div>
      <PrivateHeader title='Dashboard' />
      <div className='page-content'>
        <div className='page-content--sidebar'>
          <NoteListHeader />
          <NoteList />
        </div>
        <div className='page-content--main'>
          <Editor />
        </div>
      </div>
    </div>
  );
};
