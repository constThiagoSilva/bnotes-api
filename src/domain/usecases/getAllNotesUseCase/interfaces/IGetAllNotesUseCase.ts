import { IError } from "../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../models/Note";

export interface IGetAllNotesUseCase {
  getAllNotes(
    author: string
  ): Promise<{ notes: Note[] | null; error: IError | null; message: string }>;
}
