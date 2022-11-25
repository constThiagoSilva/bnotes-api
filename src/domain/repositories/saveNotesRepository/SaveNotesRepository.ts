import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";
import { NewNote } from "../../usecases/saveNotesUseCase/interfaces/iNewNote";
import { DatabaseSpy } from "../mocks/repository/DatabaseSpy";
import { ISaveNotesRepository } from "./interfaces/ISaveNotesRepository";

export class SaveNotesRepository implements ISaveNotesRepository {
  constructor(private databaseSpy: DatabaseSpy) {}

  async saveNote(
    newNote: NewNote
  ): Promise<{ savedNote: Note | null; error: IError | null }> {
    if (!newNote.author) {
      return {
        error: {
          code: 500,
          message: new ProvidedParamsError("author"),
        },
        savedNote: null,
      };
    } else if (!newNote.content) {
      return {
        error: {
          code: 500,
          message: new ProvidedParamsError("content"),
        },
        savedNote: null,
      };
    } else if (!newNote.title) {
      return {
        error: {
          code: 500,
          message: new ProvidedParamsError("title"),
        },
        savedNote: null,
      };
    }

    const note = await this.databaseSpy.create(newNote);

    // if (error) {
    //   return {
    //     error: error,
    //     savedNote: null,
    //   };
    // }

    return {
      savedNote: note,
      error: {
        code: 400,
        message: new ProvidedParamsError("author"),
      },
    };
  }
  async getNoteById(noteId: string): Promise<Note | null> {
    const note = await this.databaseSpy.findById(noteId);

    return note;
  }
}
