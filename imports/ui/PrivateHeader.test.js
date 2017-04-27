import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { PrivateHeader } from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', () => {
    it('should set button text to logout', () => {
      const wrapper = mount(<PrivateHeader title='Test Title' handleLogout={() => { }} />);
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should should use title prop as h1 text', () => {
      const title = 'Test Title';
      const wrapper = mount(<PrivateHeader title={title} handleLogout={() => { }} />);
      const titleText = wrapper.find('h1').text();

      expect(titleText).toBe(title);
    });

    it('should call handleLogout on click', () => {
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title='title' handleLogout={spy} />);

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalled();
    });
  });
}
