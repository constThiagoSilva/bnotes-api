import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";
import { IChangeStatusNotesToTrashRepository } from "../../repositories/changeStatusNotesToTrashRepository/interfaces/IChangeStatusNotesToTrashRepository";
import { IChangeStatusNotesToTrashUseCase } from "./interfaces/IChangeStatusNotesToTrashUseCase";

export class changeStatusNotesToTrashUseCase implements IChangeStatusNotesToTrashUseCase {
  constructor(private changeStatusNotesToTrash: IChangeStatusNotesToTrashRepository) {}

  async changeStatusNotesToTrashUseCase(
    id: string
  ): Promise<{ error: IError | null; trashedNote: Note | null }> {
    if (!id) {
      return {
        error: {
          code: 500,
          message: new ProvidedParamsError("id"),
        },
        trashedNote: null,
      };
    }

    const trashedNote = await this.changeStatusNotesToTrash.changeStatusToTrash(id);

    if (trashedNote.error) {
      return {
        trashedNote: null,
        error: trashedNote.error
      }
    }

    return {
      trashedNote: trashedNote.trashedNote,
      error: null,
    };
  }
}
