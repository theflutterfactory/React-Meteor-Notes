import { Meteor } from "meteor/meteor";
import expect from 'expect';
import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function () {

    const noteOne = {
      _id: 'testNoteId',
      title: 'testTitle',
      body: 'testBody',
      updatedAt: 0,
      userId: 'testUserId'
    }

    beforeEach(() => {
      Notes.remove({});
      Notes.insert(noteOne)
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
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

      expect(Notes.findOne({ _id: noteOne._id })).toNotExist();
    });

    it('should not remove note if unathenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note with invalid note id', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    it('should update note', () => {
      const title = "Updated Title";
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [noteOne._id, { title }]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: noteOne.body
      });
    });

    it('should throw error if note updates with unexpected extras', () => {
      const title = "Updated Title";

      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: "noteOne.userId"
        }, [noteOne._id, { title, extraKey: "Extra" }]);
      }).toThrow();
    });
  });
}