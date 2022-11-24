import { Note } from "../../models/Note";
import { NewNote } from "../../usecases/saveNotesUseCase/interfaces/iNewNote";

interface ISaveNotesRepository {
  saveNote(newNote: NewNote): Promise<Note | null>;
  getNoteById(noteId: string): Promise<Note | null>;
}

class SaveNotesRepository implements ISaveNotesRepository {
  async saveNote(newNote: NewNote): Promise<Note | null> {
    return {
      id: "1",
      author: "any_auhtor",
      content: "any_content",
      title: "any_title",
      status: "Active",
      createAt: new Date("2022-10-10"),
      updateAt: new Date("2022-10-10"),
    };
  }
  async getNoteById(noteId: string): Promise<Note | null> {
    return {
        id: "1",
        author: "any_auhtor",
        content: "any_content",
        title: "any_title",
        status: "Active",
        createAt: new Date("2022-10-10"),
        updateAt: new Date("2022-10-10"),
      };
  }
}

describe("Save Notes Repository", () => {
  it("should save a note into database", async () => {
    const sut = new SaveNotesRepository();
    const mockFakeNewNote: NewNote = {
      author: "any_auhtor",
      content: "any_content",
      title: "any_title",
    };

    const savedNote = await sut.saveNote(mockFakeNewNote);
    const savedNoteId = String(savedNote?.id)
    const storageNote = await sut.getNoteById(savedNoteId);

    expect(savedNote).toEqual(storageNote);
  });
});
