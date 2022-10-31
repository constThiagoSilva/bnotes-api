import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";
import { IGetAllNotesUseCase } from "./interfaces/IGetAllNotesUseCase";
import { GetAllNotesRepository } from "./mocks/interfaces/GetAllNotesRepository";

export class GetAllNotesUseCase implements IGetAllNotesUseCase {
  constructor(private getAllNotesRepository: GetAllNotesRepository) {}

  async getAll(
    author: string
  ): Promise<{ notes: Note[]; error: IError | null; message: string }> {
    if (!author) {
      return {
        notes: [],
        error: {
          code: 500,
          message: new ProvidedParamsError("author parameter not provided"),
        },
        message: "",
      };
    }

    const notes = await this.getAllNotesRepository.getAll(author);

    if (!notes) {
      return {
        notes: [],
        error: null,
        message: "no notes yet",
      };
    }

    return {
      notes: notes as Note[],
      error: null,
      message: "",
    };
  }
}
