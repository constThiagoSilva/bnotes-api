import { IError } from "../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../models/Note";
import { NewNote } from "../../../usecases/saveNotesUseCase/interfaces/iNewNote";
import { ISaveNotesRepositorySpy } from "./interfaces/ISaveNotesRepositorySpy";

export class SaveNotesRepositorySpy implements ISaveNotesRepositorySpy {
  private note: Note | null = null;

  async create(
    newNote: NewNote
  ): Promise<{ note: Note | null; error: IError | null }> {
    this.note = {
      id: "1",
      author: newNote.author,
      content: newNote.content,
      title: newNote.title,
      status: "Active",
      createAt: new Date("2022-10-10"),
      updateAt: new Date("2022-10-10"),
    };

    return {
      note: this.note,
      error: {
        code: 400,
        message: new Error("any_error"),
      },
    };
  }
  async findById(noteId: string): Promise<Note | null> {
    if (this.note?.id !== noteId) {
      return null;
    }
    return this.note;
  }
}
