import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', () => {
    it('should render title and timestamp', () => {
      const title = 'Title goes here';
      const updatedAt = 1493103689059;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('4/25/17');
    });

    it('should set default title if no title set', () => {
      const title = '';
      const updatedAt = 1493103689059;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

      expect(wrapper.find('h5').text()).toBe('Untitled Note');

    });
  });
}