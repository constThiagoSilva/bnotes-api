import { IError } from "../../../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../../../models/Note";
import { NewNote } from "../../../interfaces/iNewNote";
import { SaveNotesRepository } from "../interfaces/SaveNotesRepository";

const ThrowSaveNotesRepositorySpy = (newNoteParameter: NewNote): IError| null => {
  if (!newNoteParameter?.author) {
    return {
        code: 500,
        message: new Error('Parameter author not provided')
    }
  } else if (!newNoteParameter?.title) {
    return {
        code: 500,
        message: new Error('Parameter title not provided')
    }
  } else if (!newNoteParameter?.content) {
    return {
        code: 500,
        message: new Error('Parameter content not provided')
    }
  }

  return null
}

export class SaveNotesRepositorySpy implements SaveNotesRepository {
  private note: Note | null = null;

  async save(newNoteParameter: NewNote): Promise<{note: Note | null, error: IError | null}> {
    const isThrowError = ThrowSaveNotesRepositorySpy(newNoteParameter)

    if (isThrowError) {
      return {
        error: {
          code: isThrowError.code,
          message: isThrowError.message
        },
        note: null
      }
    }

    this.note = {
      id: '1',
      author: newNoteParameter.author,
      title: newNoteParameter.title,
      content: newNoteParameter.content,
      updateAt: null,
      createAt: new Date(),
      status: "Active"
    };
    const newNote = this.getNote();

    return {note: newNote, error: null};
  }

  public getNote() {
    return this.note;
  }
}
