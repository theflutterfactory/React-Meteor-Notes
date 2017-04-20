import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', () => {

    it('should show/hide error messages', () => {
      const error = 'Test Error msg';
      const wrapper = mount(<Login loginWithPassword={() => { }} />);

      wrapper.setState({ error });
      const errorText = wrapper.find('p').text();
      expect(errorText).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });
  });
}