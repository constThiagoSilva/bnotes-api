import { Note } from "../../../../../models/Note";
import { UpdateNote } from "../../../interfaces/IUpdateNote";
import { UpdateNotesRepository } from "../interfaces/UpdateNotesRepository";

export class UpdateNotesRepositorySpy implements UpdateNotesRepository {
  private note: Note | null = null;

  async update(id: string, updatedNote: UpdateNote): Promise<Note | null> {
    this.note = {
      id: "1",
      author: "same_author",
      title: updatedNote.title,
      content: updatedNote.content,
      updateAt: new Date(),
      createAt: new Date(),
      status: "Active"
    };
    const newNote = this.getNote();

    return newNote;
  }
  public getNote() {
    return this.note;
  }
}
