import { DatabaseSpy } from "./DatabaseSpy";

describe("Database Spy", () => {
  it('should change status of note to "trash"', async () => {
    const sut = new DatabaseSpy();
    const mockIdNote = '1'

    const noteChangedStatus = await  sut.changeStatusToTrash(mockIdNote)

    expect(noteChangedStatus?.status).toBe('Trash')
  });
});
