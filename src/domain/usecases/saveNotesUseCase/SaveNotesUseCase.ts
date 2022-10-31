import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ThrowSaveNotesError } from "../../helpers/errors/saveNotesUseCaseError/ThrowSaveNotesError";
import { Note } from "../../models/Note";
import { NewNote } from "./interfaces/iNewNote";
import { ISaveNotesUseCase } from "./interfaces/usecases/ISaveNotesUseCase";
import { SaveNotesRepository } from "./mocks/repository/interfaces/SaveNotesRepository";
import { UpdateNote, UpdateNotesRepository } from "./saveNotesUseCase.spec";

export class SaveNotesUseCase implements ISaveNotesUseCase {
  constructor(private saveNotesRepository: SaveNotesRepository, private updateNotesRepository: UpdateNotesRepository) {}

  async save(
    newNote: NewNote,
  ): Promise<{ note: Note | null; error: IError | null }> {
    const isThrowSaveNotesError = ThrowSaveNotesError(newNote);

    if (isThrowSaveNotesError) {
      return {
        error: isThrowSaveNotesError,
        note: null,
      };
    }

    if (this.saveNotesRepository.getNote()) {
      const note = await this.updateNotesRepository.update({
        author: newNote.author,
        title: newNote.title,
        content: newNote.content,
      });

      return {
        note: note,
        error: null,
      };
    }

    const { note } = await this.saveNotesRepository.save(newNote);

    return {
      note: note,
      error: null,
    };
  }
}
