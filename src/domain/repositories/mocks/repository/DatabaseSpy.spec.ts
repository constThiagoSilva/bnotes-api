import { DatabaseSpy } from "./DatabaseSpy";

describe("Database Spy", () => {
  it('should change status of note to "trash"', async () => {
    const sut = new DatabaseSpy();
    const mockIdNote = '1'

    const noteChangedStatus = await  sut.changeStatusToTrash(mockIdNote)

    expect(noteChangedStatus?.status).toBe('Trash')
  });
  it('should return a null if note with id provided is not exist, in method "changeStatusToTrash"', async () => {
    const sut = new DatabaseSpy();
    const mockIdNote = 'not id existing'

    const noteChangedStatus = await  sut.changeStatusToTrash(mockIdNote)

    expect(noteChangedStatus?.status).toBeFalsy()
  });
});
