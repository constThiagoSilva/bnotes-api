import { Note } from "../../../../models/Note";

export interface GetAllNotesRepository {
  getAll(author: string): Promise<Note[] | null>;
}
