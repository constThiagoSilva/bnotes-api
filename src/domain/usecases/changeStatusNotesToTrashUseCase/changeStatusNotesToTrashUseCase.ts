import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";
import { ChangeStatusNotesToTrash } from "../../repositories/changeStatusNotesToTrashRepository/ChangeStatusNotesToTrashRepository";
import { IChangeStatusNotesToTrashUseCase } from "./interfaces/IChangeStatusNotesToTrashUseCase";

export class changeStatusNotesToTrashUseCase implements IChangeStatusNotesToTrashUseCase {
  constructor(private changeStatusNotesToTrash: ChangeStatusNotesToTrash) {}

  async changeStatusNotesToTrashUseCase(
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

    const isDeleted = await this.changeStatusNotesToTrash.changeStatusToTrash(id);

    return {
      deleteNote: isDeleted.trashedNote,
      error: null,
    };
  }
}
