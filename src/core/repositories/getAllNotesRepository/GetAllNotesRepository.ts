import { IGetAllNotesRepository } from "./interfaces/IGetAllNotesRepository";
import { Database } from "../mocks/repository/interfaces/Database";
import { Note } from "../../models/Note";
import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProvidedParamsError";

export class GetAllNotesRepository implements IGetAllNotesRepository {
  constructor(private database: Database) {}

  async getAllNotes(author: string): Promise<{
    notes: Note[] | null;
    error: IError | null;
  }> {
    if (!author) {
      return {
        error: {
          code: 500,
          message: new ProvidedParamsError("author"),
        },
        notes: null,
      };
    }

    const notes = await this.database.getAllNotes(author);

    if (!notes) {
      return {
        notes: [],
        error: {
          code: 400,
          message: new Error("no notes yet"),
        },
      };
    }

    return {
      notes: notes,
      error: null,
    };
  }
}
