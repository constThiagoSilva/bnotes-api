import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";
import { DatabaseSpy } from "../mocks/repository/DatabaseSpy";
import { Database } from "../mocks/repository/interfaces/Database";
import { IChangeStatusNotesToTrashRepository } from "./interfaces/IChangeStatusNotesToTrashRepository";

export class ChangeStatusNotesToTrashRepository
  implements IChangeStatusNotesToTrashRepository
{
  constructor(private databaseSpy: Database) {}

  async changeStatusToTrash(
    noteId: string
  ): Promise<{ trashedNote: Note | null; error: IError | null }> {
    if (!noteId) {
      return {
        error: {
          code: 500,
          message: new ProvidedParamsError("noteId"),
        },
        trashedNote: null,
      };
    }

    const trashedNote = await this.databaseSpy.changeStatusToTrash(noteId);

    if (!trashedNote) {
      return {
        error: {
          code: 400,
          message: new Error("note not exists!"),
        },
        trashedNote: null,
      };
    }

    return {
      trashedNote,
      error: null,
    };
  }
}
