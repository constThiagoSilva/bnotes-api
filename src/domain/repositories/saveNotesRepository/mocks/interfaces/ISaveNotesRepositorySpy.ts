import { IError } from "../../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../../models/Note";
import { NewNote } from "../../../../usecases/saveNotesUseCase/interfaces/iNewNote";

export interface ISaveNotesRepositorySpy {
  create(
    newNote: NewNote
  ): Promise<{ note: Note | null; error: IError | null }>;
  findById(noteId: string): Promise<Note | null>;
}
