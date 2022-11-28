import { IError } from "../../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../../models/Note";
import { NewNote } from "../iNewNote";

export interface ISaveNotesUseCase {
  save(newNote: NewNote, id?: string): Promise<{ note: Note | null; error: IError | null}>;
}
