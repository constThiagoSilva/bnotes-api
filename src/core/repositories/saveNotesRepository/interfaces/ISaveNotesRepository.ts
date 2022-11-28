import { IError } from "../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../models/Note";
import { NewNote } from "../../../usecases/saveNotesUseCase/interfaces/iNewNote";

export interface ISaveNotesRepository {
  saveNote(
    newNote: NewNote
  ): Promise<{ savedNote: Note | null; error: IError | null }>;
  getNoteById(noteId: string): Promise<Note | null>;
}
