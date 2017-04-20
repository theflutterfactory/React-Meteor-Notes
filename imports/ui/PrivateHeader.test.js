import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import PrivateHeader from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', () => {
    it('should set button text to logout', () => {
      const wrapper = mount(<PrivateHeader title="Test Title" />);
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe("Logout");
    });

    it('should should use title prop as h1 text', () => {
      const title = "Test Title";
      const wrapper = mount(<PrivateHeader title={title} />);
      const titleText = wrapper.find('h1').text();

      expect(titleText).toBe(title);
    });
  });
}