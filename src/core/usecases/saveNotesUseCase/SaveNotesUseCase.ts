import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ThrowSaveNotesError } from "../../helpers/errors/saveNotesUseCaseError/ThrowSaveNotesError";
import { Note } from "../../models/Note";
import { ISaveNotesRepository } from "../../repositories/saveNotesRepository/interfaces/ISaveNotesRepository";
import { IUpdateNotesRepository } from "../../repositories/updateNotesRepository/interfaces/IUpdateNotesRepository";
import { NewNote } from "./interfaces/iNewNote";
import { ISaveNotesUseCase } from "./interfaces/usecases/ISaveNotesUseCase";

export class SaveNotesUseCase implements ISaveNotesUseCase {
  constructor(private saveNotesRepository: ISaveNotesRepository, private updateNotesRepository: IUpdateNotesRepository) {}

  async save(
    newNote: NewNote,
    id?: string
  ): Promise<{ note: Note | null; error: IError | null }> {
    const isThrowSaveNotesError = ThrowSaveNotesError(newNote);

    if (isThrowSaveNotesError) {
      return {
        error: isThrowSaveNotesError,
        note: null,
      };
    }

    if (await this.saveNotesRepository.getNoteById(String(id))) {
      const {updatedNote} = await this.updateNotesRepository.updateNote(String(id), {
        author: newNote.author,
        title: newNote.title,
        content: newNote.content,
      });

      return {
        note: updatedNote,
        error: null,
      };
    }

    const { savedNote } = await this.saveNotesRepository.saveNote(newNote);

    return {
      note: savedNote,
      error: null,
    };
  }
}
