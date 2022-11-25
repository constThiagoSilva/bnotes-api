import { Note } from "../../../../../models/Note";
import { NewNote } from "../../../interfaces/iNewNote";
import { SaveNotesRepositorySpy } from "./SaveNotesRepositorySpy";

describe("Save Notes Repository Spy", () => {
  it("should getNote return same note passed in parameters", async () => {
    const sut = new SaveNotesRepositorySpy();
    const mockFakeNewNote: NewNote = {
      author: "any_author",
      title: "any_title",
      content: "any_content",
    };
    const mockFakeStorageNote: Note = {
      id: "1",
      author: "any_author",
      title: "any_title",
      content: "any_content",
      updateAt: null,
      createAt: new Date(),
      status: "Active",
    };

    const { note } = await sut.save(mockFakeNewNote);
    const noteId = String(note?.id);

    expect(sut.getNoteById(noteId)?.id).toBe(mockFakeStorageNote.id);
    expect(sut.getNoteById(noteId)?.author).toBe(mockFakeStorageNote.author);
    expect(sut.getNoteById(noteId)?.title).toBe(mockFakeStorageNote.title);
    expect(sut.getNoteById(noteId)?.content).toBe(mockFakeStorageNote.content);
  });
  it("should return a note with passed in parameters", async () => {
    const sut = new SaveNotesRepositorySpy();
    const mockFakeNewNote: NewNote = {
      author: "any_author",
      title: "any_title",
      content: "any_content",
    };
    const mockFakeStorageNote: Note = {
      id: "1",
      author: "any_author",
      title: "any_title",
      content: "any_content",
      updateAt: null,
      createAt: new Date('2022-10-10'),
      status: "Active",
    };

    const { note } = await sut.save(mockFakeNewNote);

    expect(note?.id).toBe(mockFakeStorageNote.id);
    expect(note?.author).toBe(mockFakeStorageNote.author);
    expect(note?.title).toBe(mockFakeStorageNote.title);
    expect(note?.content).toBe(mockFakeStorageNote.content);
  });
  it("should return 500 if author parameter is not provided correctly", async () => {
    const sut = new SaveNotesRepositorySpy();
    const mockFakeNote: NewNote = {
      author: "",
      title: "any_title",
      content: "any_content",
    };

    const { error } = await sut.save(mockFakeNote);

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("Parameter author not provided");
  });
  it("should return 500 if title parameter is not provided correctly", async () => {
    const sut = new SaveNotesRepositorySpy();
    const mockFakeNote: NewNote = {
      author: "any_author",
      title: "",
      content: "any_content",
    };

    const { error } = await sut.save(mockFakeNote);

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("Parameter title not provided");
  });
  it("should return 500 if content parameter is not provided correctly", async () => {
    const sut = new SaveNotesRepositorySpy();
    const mockFakeNote: NewNote = {
      author: "any_author",
      title: "any_title",
      content: "",
    };

    const { error } = await sut.save(mockFakeNote);

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("Parameter content not provided");
  });
});
