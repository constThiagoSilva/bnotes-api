import { Note } from "../../../../../models/Note";

export interface DeleteNoteRepository {
  delete(id: string): Promise<Note | null>;
}
