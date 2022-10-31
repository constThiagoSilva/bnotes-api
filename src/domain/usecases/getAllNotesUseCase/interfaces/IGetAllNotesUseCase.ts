import { IError } from "../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../models/Note";

export interface IGetAllNotesUseCase {
  getAll(
    author: string
  ): Promise<{ notes: Note[]; error: IError | null; message: string }>;
}
