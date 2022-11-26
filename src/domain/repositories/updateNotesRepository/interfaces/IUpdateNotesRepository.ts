import { IError } from "../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../models/Note";
import { NewNote } from "../../../usecases/saveNotesUseCase/interfaces/iNewNote";

export interface IUpdateNotesRepository {
  updateNote(
    noteId: string,
    newNote: NewNote
  ): Promise<{ updatedNote: Note | null; error: IError | null }>;
}
