import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Signup } from './Signup';

if (Meteor.isClient) {
  describe('Signup', () => {

    it('should show/hide error messages', () => {
      const error = 'Test Error msg';
      const wrapper = mount(<Signup createUser={() => { }} />);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser method with form data', () => {
      const email = 'julian@test.com';
      const password = 'password123'
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />)

      wrapper.ref('emailRef').node.value = email;
      wrapper.ref('passwordRef').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error with short password', () => {
      const email = 'julian@test.com';
      const password = 'test                    '
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />)

      wrapper.ref('emailRef').node.value = email;
      wrapper.ref('passwordRef').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toNotBe(0);
    });

    it('should set createUser callback errors', () => {
      const password = 'password123'
      const reason = 'Failure reason';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />)

      wrapper.ref('passwordRef').node.value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({ reason });
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error').length).toBe(0);
    });
  });
}