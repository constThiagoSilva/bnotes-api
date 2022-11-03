import { Note } from "../../../../../models/Note";

export interface Database {
  changeStatusToTrash(noteId: string): Promise<Note | null>;
}
