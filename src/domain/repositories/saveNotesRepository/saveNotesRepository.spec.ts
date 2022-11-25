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
  create(newNote: NewNote): Promise<{note: Note | null, error: IError | null}>;
}

class SaveNotesRepositorySpy implements ISaveNotesRepositorySpy {
  private note: Note | null = null;

  async create(newNote: NewNote): Promise<{note: Note | null, error: IError | null}> {
    this.note = {
      id: "1",
      author: newNote.author,
      content: newNote.content,
      title: newNote.title,
      status: "Active",
      createAt: new Date("2022-10-10"),
      updateAt: new Date("2022-10-10"),
    };

    return {
      note: this.note,
      error: {
        code: 400,
        message: new Error('any_error')
      }
    };
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
    if (!newNote.author) {
      return {
        error: {
          code: 500,
          message: new ProvidedParamsError('author')
        },
        savedNote: null
      }
    } else if (!newNote.content) {
      return {
        error: {
          code: 500,
          message: new ProvidedParamsError('content')
        },
        savedNote: null
      }
    } else if (!newNote.title) {
      return {
        error: {
          code: 500,
          message: new ProvidedParamsError('title')
        },
        savedNote: null
      }
    }


    const {note, error} = await this.saveNotesRepositorySpy.create(newNote);

    if (error) {
      return {
        error: error,
        savedNote: null
      }
    }

    return {
      savedNote: note,
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
  it('should return a 500 if author param is not provided correctly', async () => {
    const saveNotesRepositorySpy = new SaveNotesRepositorySpy();
    const sut = new SaveNotesRepository(saveNotesRepositorySpy);
    const mockFakeIncorrectlyNewNote: NewNote = {
      author: "",
      content: "any_content",
      title: "any_title",
    };

    const {error} = await sut.saveNote(mockFakeIncorrectlyNewNote)

    expect(error?.code).toBe(500)
    expect(error?.message.message).toBe('parameter: author, not provided')
  })
  it('should return a 500 if content param is not provided correctly', async () => {
    const saveNotesRepositorySpy = new SaveNotesRepositorySpy();
    const sut = new SaveNotesRepository(saveNotesRepositorySpy);
    const mockFakeIncorrectlyNewNote: NewNote = {
      author: "any_author",
      content: "",
      title: "any_title",
    };

    const {error} = await sut.saveNote(mockFakeIncorrectlyNewNote)

    expect(error?.code).toBe(500)
    expect(error?.message.message).toBe('parameter: content, not provided')
  })
  it('should return a 500 if content param is not provided correctly', async () => {
    const saveNotesRepositorySpy = new SaveNotesRepositorySpy();
    const sut = new SaveNotesRepository(saveNotesRepositorySpy);
    const mockFakeIncorrectlyNewNote: NewNote = {
      author: "any_author",
      content: "any_content",
      title: "",
    };

    const {error} = await sut.saveNote(mockFakeIncorrectlyNewNote)

    expect(error?.code).toBe(500)
    expect(error?.message.message).toBe('parameter: title, not provided')
  })
  it('should return an error returned from dependecies', async () => {
    const saveNotesRepositorySpy = new SaveNotesRepositorySpy();
    const sut = new SaveNotesRepository(saveNotesRepositorySpy);
    const mockFakeNewNote: NewNote = {
      author: "any_auhtor",
      content: "any_content",
      title: "any_title",
    };

    const {error} = await sut.saveNote(mockFakeNewNote)

    expect(error?.message.message).toBe('any_error')
  })

});
