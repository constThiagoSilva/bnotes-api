import { Note } from "../../../../../models/Note";
import { NewNote } from "../../../interfaces/iNewNote";

export interface SaveNotesRepository {
  save(newNote: NewNote): Promise<Note | null>;
}
