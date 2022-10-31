import { Note } from "../../../../../models/Note";
import { UpdateNote } from "../../../interfaces/IUpdateNote";

export interface UpdateNotesRepository {
  update(id: string, updatedNote: UpdateNote): Promise<Note | null>;
}
