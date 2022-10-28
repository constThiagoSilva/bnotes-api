import { Note } from "../../../../models/Note";
import { NewNote } from "../../interfaces/iNewNote";
import { SaveNotesRepository } from "./interfaces/SaveNotesRepository";

export class SaveNotesRepositorySpy implements SaveNotesRepository {
  private note: Note | null = null;

  async save(newNoteParameter: NewNote): Promise<Note | null> {
    this.note = {
      author: newNoteParameter.author,
      title: newNoteParameter.title,
      content: newNoteParameter.content,
      createAt: new Date(),
    };
    const newNote = this.getNote();

    return newNote;
  }

  getNote() {
    return this.note;
  }
}
