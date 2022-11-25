import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";
import { NewNote } from "../../usecases/saveNotesUseCase/interfaces/iNewNote";
import { DatabaseSpy } from "../mocks/repository/DatabaseSpy";

interface ISaveNotesRepository {
  saveNote(newNote: NewNote): Promise<{savedNote: Note | null, error: IError | null}>;
  getNoteById(noteId: string): Promise<Note | null>;
}
interface ISaveNotesRepositorySpy {
  create(newNote: NewNote): Promise<Note | null>;
}

class SaveNotesRepositorySpy implements ISaveNotesRepositorySpy {
  private note: Note | null = null;

  async create(newNote: NewNote): Promise<Note | null> {
    this.note = {
      id: "1",
      author: newNote.author,
      content: newNote.content,
      title: newNote.title,
      status: "Active",
      createAt: new Date("2022-10-10"),
      updateAt: new Date("2022-10-10"),
    };

    return this.note;
  }
  async findById(noteId: string): Promise<Note | null> {
    if (this.note?.id !== noteId) {
        return null
    }
    return this.note
  }
}

class SaveNotesRepository implements ISaveNotesRepository {
  constructor(private saveNotesRepositorySpy: SaveNotesRepositorySpy) {}

  async saveNote(newNote: NewNote): Promise<{savedNote: Note | null, error: IError | null}> {
    const savedNote = await this.saveNotesRepositorySpy.create(newNote);

    return {
      savedNote,
      error: {
        code: 400,
        message: new ProvidedParamsError('author')
      }
    };
  }
  async getNoteById(noteId: string): Promise<Note | null> {
    const note = this.saveNotesRepositorySpy.findById(noteId)

    return note
  }
}

describe("Save Notes Repository", () => {
  it("should save a note into database", async () => {
    const saveNotesRepositorySpy = new SaveNotesRepositorySpy();
    const sut = new SaveNotesRepository(saveNotesRepositorySpy);
    const mockFakeNewNote: NewNote = {
      author: "any_auhtor",
      content: "any_content",
      title: "any_title",
    };

    const {savedNote} = await sut.saveNote(mockFakeNewNote);
    const savedNoteId = String(savedNote?.id);
    const storageNote = await sut.getNoteById(savedNoteId);

    expect(savedNote).toEqual(storageNote);
  });
  it('should return a 500 if params are not provided correctly', async () => {
    const saveNotesRepositorySpy = new SaveNotesRepositorySpy();
    const sut = new SaveNotesRepository(saveNotesRepositorySpy);
    const mockFakeIncorrectlyNewNote: NewNote = {
      author: "",
      content: "any_content",
      title: "any_title",
    };

    const {error} = await sut.saveNote(mockFakeIncorrectlyNewNote)

    expect(error?.code).toBe(400)
    expect(error?.message.message).toBe('parameter: author, not provided')
  })

});
