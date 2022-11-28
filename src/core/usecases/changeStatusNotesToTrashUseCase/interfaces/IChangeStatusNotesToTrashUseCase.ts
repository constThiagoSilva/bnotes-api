import { IError } from "../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../models/Note";

export interface IChangeStatusNotesToTrashUseCase {
  changeStatusNotesToTrashUseCase(
    id: string
  ): Promise<{ error: IError | null; trashedNote: Note | null }>;
}
