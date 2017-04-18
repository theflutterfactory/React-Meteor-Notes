import { Meteor } from "meteor/meteor";
import expect from 'expect';
import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function () {
    it('should insert a new note', function () {
      const userId = 'testid';

      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      expect(Notes.findOne({ _id, userId })).toExist();
    });

    it('should not insert note if not authenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });
  });
}