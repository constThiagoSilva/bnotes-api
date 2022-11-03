import { IError } from "../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../models/Note";

export interface IDeleteNoteUseCase {
  delete(
    id: string
  ): Promise<{ error: IError | null; deleteNote: Note | null }>;
}
