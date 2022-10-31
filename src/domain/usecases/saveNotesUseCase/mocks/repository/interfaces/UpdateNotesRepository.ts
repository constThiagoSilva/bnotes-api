import { Note } from "../../../../../models/Note";
import { UpdateNote } from "../../../interfaces/IUpdateNote";

export interface UpdateNotesRepository {
  update(updatedNote: UpdateNote): Promise<Note | null>;
}
