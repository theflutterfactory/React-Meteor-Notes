import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor', () => {
    let browserHistory;
    let call;

    beforeEach(() => {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('should render pick note message', () => {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started');
    });

    it('should render not found message', () => {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]} />);
      expect(wrapper.find('p').text()).toBe('Note not found');
    });

    it('should removeNote', () => {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]} note={notes[0]} />);
      wrapper.find('button').simulate('click');

      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
    });
  });
}
