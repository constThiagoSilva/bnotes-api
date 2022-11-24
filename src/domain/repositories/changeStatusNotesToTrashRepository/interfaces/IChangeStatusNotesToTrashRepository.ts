import { IError } from "../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../models/Note";

export interface IChangeStatusNotesToTrashRepository {
  changeStatusToTrash(
    noteId: string
  ): Promise<{ trashedNote: Note | null; error: IError | null }>;
}
