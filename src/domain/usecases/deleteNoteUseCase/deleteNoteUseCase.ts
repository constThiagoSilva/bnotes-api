import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";
import { IDeleteNoteUseCase } from "./interfaces/ISaveNotesUseCase";
import { DeleteNoteRepository } from "./mocks/repository/interfaces/SaveNotesRepository";

export class DeleteNoteUseCase implements IDeleteNoteUseCase {
  constructor(private deleteNoteRepository: DeleteNoteRepository) {}

  async delete(
    id: string
  ): Promise<{ error: IError | null; deleteNote: Note | null }> {
    if (!id) {
      return {
        error: {
          code: 500,
          message: new ProvidedParamsError("id"),
        },
        deleteNote: null,
      };
    }

    const isDeleted = await this.deleteNoteRepository.delete(id);

    return {
      deleteNote: isDeleted,
      error: null,
    };
  }
}
