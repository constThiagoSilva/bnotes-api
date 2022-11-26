import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";
import { NewNote } from "../../usecases/saveNotesUseCase/interfaces/iNewNote";
import { Database } from "../mocks/repository/interfaces/Database";
import { IUpdateNotesRepository } from "./interfaces/IUpdateNotesRepository";

export class UpdateNotesRepository implements IUpdateNotesRepository {
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
