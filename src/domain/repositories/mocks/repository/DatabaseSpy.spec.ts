import { Note } from "../../../models/Note";
import { NewNote } from "../../../usecases/saveNotesUseCase/interfaces/iNewNote";
import { DatabaseSpy } from "./DatabaseSpy";

describe("Database Spy", () => {
  it("should create a new note", async () => {
    const sut = new DatabaseSpy();
    const mockFakeNewNote: NewNote = {
      author: "any_author",
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
    };

    const note = await sut.create(mockFakeNewNote);

    expect(note).toEqual(mockCreatedNote);
  });

  it('should change status of note to "trash"', async () => {
    const sut = new DatabaseSpy();
    const mockFakeNewNote: NewNote = {
      author: "any_auhtor",
      content: "any_content",
      title: "any_title",
    };
    const mockIdNote = "1";

    await sut.create(mockFakeNewNote);
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
    const mockFakeNewNote: NewNote = {
      author: mockAuthor,
      content: "any_content",
      title: "any_title",
    };
    const mockNotes: Note[] = [
      {
        id: "1",
        author: mockAuthor,
        content: "any_content",
        title: "any_title",
        status: "Active",
        createAt: new Date("2022-10-31"),
        updateAt: new Date("2022-10-31"),
      },
      {
        id: "2",
        author: mockAuthor,
        content: "any_content",
        title: "any_title",
        status: "Active",
        createAt: new Date("2022-10-31"),
        updateAt: new Date("2022-10-31"),
      },
    ];

    await sut.create(mockFakeNewNote);
    await sut.create(mockFakeNewNote);
    const notes = await sut.getAllNotes(mockAuthor);

    expect(notes).toEqual(mockNotes);
  });
  it("should return null if author not exists", async () => {
    const sut = new DatabaseSpy();
    const mockAuthor = "not exists_author";

    const nullNotes = await sut.getAllNotes(mockAuthor);

    expect(nullNotes).toBeFalsy();
  });
  it("should update a note", async () => {
    const sut = new DatabaseSpy();
    const mockAuthor = "any_author";
    const mockFakeNewNote: NewNote = {
      author: mockAuthor,
      content: "any_content",
      title: "any_title",
    };
    const mockUpdateNote: NewNote = {
      author: mockAuthor,
      content: "other_content",
      title: "other_title",
    };
    const mockUpdatedNote: Note = {
      id: "1",
      author: mockAuthor,
      content: "other_content",
      title: "other_title",
      status: "Active",
      createAt: new Date("2022-10-31"),
      updateAt: new Date("2022-10-31"),
    };

    await sut.create(mockFakeNewNote);
    const updatedNote = await sut.update(mockAuthor, mockUpdateNote);

    expect(updatedNote).toEqual(mockUpdatedNote);
  });
});
