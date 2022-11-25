import { Note } from "../../../../models/Note";
import { NewNote } from "../../../../usecases/saveNotesUseCase/interfaces/iNewNote";

export interface Database {
  create(newNote: NewNote): Promise<Note | null>
  changeStatusToTrash(noteId: string): Promise<Note | null>;
  getAllNotes(author: string): Promise<Note[] | null>
  update(noteId: string, oldNote: NewNote): Promise<Note | null>
  findById(noteId: string): Promise<Note | null>
}
