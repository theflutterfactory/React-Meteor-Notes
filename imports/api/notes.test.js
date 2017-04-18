import { Meteor } from "meteor/meteor";
import expect from 'expect';
import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function () {

    beforeEach(() => {
      Notes.remove({});
      Notes.insert({
        _id: 'testNoteId',
        title: 'testTitle',
        body: 'testBody',
        updatedAt: 0,
        userId: 'testUserId'
      })
    });

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

    it('should remove note', () => {
      Meteor.server.method_handlers['notes.remove'].apply({ 'userId': 'testUserId' }, ['testNoteId']);

      expect(Notes.findOne({ _id: 'testNoteId' })).toNotExist();
    });

    it('should not remove note if unathenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, ['testNoteId']);
      }).toThrow();
    });

    it('should not remove note with invalid note id', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ 'userId': 'testUserId' });
      }).toThrow();
    });
  });
}