import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";
import { NewNote } from "../../usecases/saveNotesUseCase/interfaces/iNewNote";
import { DatabaseSpy } from "../mocks/repository/DatabaseSpy";
import { Database } from "../mocks/repository/interfaces/Database";

interface IUpdateNotesRepository {
  updateNote(
    noteId: string,
    newNote: NewNote
  ): Promise<{ updatedNote: Note | null; error: IError | null }>;
}

class UpdateNotesRepository implements IUpdateNotesRepository {
  constructor(private databaseSpy: Database) {}

  async updateNote(
    noteId: string,
    newNote: NewNote
  ): Promise<{ updatedNote: Note | null; error: IError | null }> {
    if (!newNote.author) {
      return {
        updatedNote: null,
        error: {
          message: new ProvidedParamsError("author"),
          code: 500,
        },
      };
    } else if (!newNote.content) {
      return {
        updatedNote: null,
        error: {
          message: new ProvidedParamsError("content"),
          code: 500,
        },
      };
    } else if (!newNote.title) {
      return {
        updatedNote: null,
        error: {
          message: new ProvidedParamsError("title"),
          code: 500,
        },
      };
    }

    const updatedNote = await this.databaseSpy.update(noteId, newNote);

    return {
      updatedNote,
      error: null,
    };
  }
}

const makeSut = () => {
  const databaseSpy = new DatabaseSpy();
  const sut = new UpdateNotesRepository(databaseSpy);

  return { sut, databaseSpy };
};

describe("Update Notes Repository", () => {
  it("should update a exist note", async () => {
    const { sut, databaseSpy } = makeSut();
    const mockNoteId = "1";
    const mockNewNote: NewNote = {
      author: "any_author",
      content: "any_content",
      title: "any_title",
    };
    const mockUpdateNote: NewNote = {
      author: "any_author",
      content: "other_content",
      title: "other_title",
    };
    const mockUpdatedNote: Note = {
      id: "1",
      author: "any_author",
      content: "other_content",
      title: "other_title",
      status: "Active",
      createAt: new Date("2022-10-31"),
      updateAt: new Date("2022-10-31"),
    };

    await databaseSpy.create(mockNewNote);
    const { updatedNote } = await sut.updateNote(mockNoteId, mockUpdateNote);

    expect(updatedNote).toEqual(mockUpdatedNote);
  });
  it("should return a 500 if author param is not provided correctly", async () => {
    const { sut, databaseSpy } = makeSut();
    const mockNoteId = "1";
    const mockNewNote: NewNote = {
      author: "any_author",
      content: "any_content",
      title: "any_title",
    };
    const mockUpdateNote: NewNote = {
      author: "",
      content: "other_content",
      title: "other_title",
    };

    await databaseSpy.create(mockNewNote);
    const { error } = await sut.updateNote(mockNoteId, mockUpdateNote);

    expect(error?.message.message).toBe("parameter: author, not provided");
    expect(error?.code).toBe(500);
  });
  it("should return a 500 if content param is not provided correctly", async () => {
    const { sut, databaseSpy } = makeSut();
    const mockNoteId = "1";
    const mockNewNote: NewNote = {
      author: "any_author",
      content: "any_content",
      title: "any_title",
    };
    const mockUpdateNote: NewNote = {
      author: "any_author",
      content: "",
      title: "other_title",
    };

    await databaseSpy.create(mockNewNote);
    const { error } = await sut.updateNote(mockNoteId, mockUpdateNote);

    expect(error?.message.message).toBe("parameter: content, not provided");
    expect(error?.code).toBe(500);
  });
  it("should return a 500 if title param is not provided correctly", async () => {
    const { sut, databaseSpy } = makeSut();
    const mockNoteId = "1";
    const mockNewNote: NewNote = {
      author: "any_author",
      content: "any_content",
      title: "any_title",
    };
    const mockUpdateNote: NewNote = {
      author: "any_author",
      content: "other_author",
      title: "",
    };

    await databaseSpy.create(mockNewNote);
    const { error } = await sut.updateNote(mockNoteId, mockUpdateNote);

    expect(error?.message.message).toBe("parameter: title, not provided");
    expect(error?.code).toBe(500);
  });
});
