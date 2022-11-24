import { IGetAllNotesRepository } from "./interfaces/IGetAllNotesRepository";
import { Database } from "../mocks/repository/interfaces/Database";
import { Note } from "../../models/Note";
import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";

export class GetAllNotesRepository implements IGetAllNotesRepository {
  constructor(private database: Database) {}

  async getAllNotes(author: string): Promise<{
    notes: Note[] | null;
    error: IError | null;
    message: Error | null;
  }> {
    if (!author) {
      return {
        error: {
          code: 500,
          message: new ProvidedParamsError("author"),
        },
        notes: null,
        message: null,
      };
    }

    const notes = await this.database.getAllNotes(author);

    if (!notes)
      return {
        notes: [],
        error: null,
        message: new Error("no notes yet"),
      };

    return {
      notes: notes,
      error: null,
      message: null,
    };
  }
}
