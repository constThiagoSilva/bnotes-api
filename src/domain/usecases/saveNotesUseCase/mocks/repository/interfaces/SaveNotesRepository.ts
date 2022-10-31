import { IError } from "../../../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../../../models/Note";
import { NewNote } from "../../../interfaces/iNewNote";

export interface SaveNotesRepository {
  save(newNote: NewNote): Promise<{note: Note | null, error: IError | null}>;
  getNote(): Note | null;
}
