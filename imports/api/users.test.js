import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { validateNewUser } from '../../imports/api/users';

if (Meteor.isServer) {
  describe('users', () => {
    it('should allow valid email address', () => {
      const testUser = {
        emails: [
          {
            address: 'julian.currie@gmail.com'
          }
        ]
      };

      const result = validateNewUser(testUser);

      expect(result).toBe(true);
    });
  });
}
