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

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'testTitle2',
      body: 'Table',
      updatedAt: 0,
      userId: 'testUserId2'
    }

    beforeEach(() => {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
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

    it('should not update note if user is not creator', () => {
      const title = "Updated Title";
      Meteor.server.method_handlers['notes.update'].apply({
        userId: "some random user"
      }, [noteOne._id, { title }]);

      const note = Notes.findOne(noteOne._id);

      expect(note).toInclude(noteOne);
    });

    it('should not update note if unathenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note with invalid note id', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    it('should return a users notes', function () {
      const result = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
      const notes = result.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return 0 notes for user without any notes', function () {
      const result = Meteor.server.publish_handlers.notes.apply({ userId: "randomId" });
      const notes = result.fetch();

      expect(notes.length).toBe(0);
    });
  });
}