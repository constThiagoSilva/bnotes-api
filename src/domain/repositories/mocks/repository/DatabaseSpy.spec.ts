import { Note } from "../../../models/Note";
import { NewNote } from "../../../usecases/saveNotesUseCase/interfaces/iNewNote";
import { DatabaseSpy } from "./DatabaseSpy";

describe("Database Spy", () => {
  it('should create a new note', async () => {
    const sut = new DatabaseSpy();
    const mockFakeNewNote: NewNote = {
      author: "any_auhtor",
      content: "any_content",
      title: "any_title",
    };
    const mockCreatedNote = {
      id: "1",
      author: "any_author",
      content: "any_content",
      title: "any_title",
      status: "Active",
      createAt: new Date("2022-10-31"),
      updateAt: new Date("2022-10-31"),
    }

    const note = await sut.create(mockFakeNewNote)
    

    expect(note).toEqual(mockCreatedNote)
  })
  
  it('should change status of note to "trash"', async () => {
    const sut = new DatabaseSpy();
    const mockIdNote = "1";

    const noteChangedStatus = await sut.changeStatusToTrash(mockIdNote);

    expect(noteChangedStatus?.status).toBe("Trash");
  });
  it('should return a null if note with id provided is not exist, in method "changeStatusToTrash"', async () => {
    const sut = new DatabaseSpy();
    const mockIdNote = "not id existing";

    const noteChangedStatus = await sut.changeStatusToTrash(mockIdNote);

    expect(noteChangedStatus?.status).toBeFalsy();
  });

  it("should return all notes of author", async () => {
    const sut = new DatabaseSpy();
    const mockAuthor = "correct_author";
    const mockNotes: Note[] = [
      {
        id: "3",
        author: mockAuthor,
        content: "any_content",
        title: "any_title",
        status: "Active",
        createAt: new Date("2020-01-10"),
        updateAt: new Date("2020-01-10"),
      },
      {
        id: "4",
        author: mockAuthor,
        content: "any_content",
        title: "any_title",
        status: "Active",
        createAt: new Date("2020-01-10"),
        updateAt: new Date("2020-01-10"),
      },
    ];

    sut.setNotes(mockNotes)
    const notes = await sut.getAllNotes(mockAuthor);

    expect(notes).toEqual(mockNotes);
  });
  it('should return null if author not exists', async () => {
    const sut = new DatabaseSpy();
    const mockAuthor = "not exists_author";

    const nullNotes = await sut.getAllNotes(mockAuthor);

    expect(nullNotes).toBeFalsy()
  })
});
