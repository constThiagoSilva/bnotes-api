import { Database } from "./interfaces/Database";
import { Note } from "../../../models/Note";
import { NewNote } from "../../../usecases/saveNotesUseCase/interfaces/iNewNote";

export class DatabaseSpy implements Database {
  private notes: Note[] = [];
  private idGenerate = 0

  async create(newNote: NewNote): Promise<Note | null> {
    this.idGenerate++

    const createdNote: Note = {
      id: String(this.idGenerate),
      author: newNote.author,
      content: newNote.content,
      title: newNote.title,
      status: "Active",
      createAt: new Date("2022-10-31"),
      updateAt: new Date("2022-10-31"),
    }

    this.notes.push(createdNote)

    return createdNote
  }
  async changeStatusToTrash(noteId: string): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === noteId);

    if (!note) {
      return null;
    }
    
    note.status = "Trash";
    
    return note;
  }
  async getAllNotes(author: string): Promise<Note[] | null> {
    const notes = this.notes.filter(note => note.author === author)

    if (notes.length < 1 || !notes) return null

    return notes
  }

  //helper method to mock
  setNotes(notes: Note[]) {
    this.notes.push(...notes)
  }
}
