import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";
import { IGetAllNotesRepository } from "../../repositories/getAllNotesRepository/interfaces/IGetAllNotesRepository";
import { IGetAllNotesUseCase } from "./interfaces/IGetAllNotesUseCase";

export class GetAllNotesUseCase implements IGetAllNotesUseCase {
  constructor(private getAllNotesRepository: IGetAllNotesRepository) {}

  async getAllNotes(
    author: string
  ): Promise<{ notes: Note[] | null; error: IError | null; }> {
    if (!author) {
      return {
        notes: [],
        error: {
          code: 500,
          message: new ProvidedParamsError("author parameter not provided"),
        },
      };
    }

    const {notes, error} = await this.getAllNotesRepository.getAllNotes(author);

    if (error) {
      return {
        notes: [],
        error: error,
      };
    }

    return {
      notes: notes,
      error: null,
    };
  }
}
