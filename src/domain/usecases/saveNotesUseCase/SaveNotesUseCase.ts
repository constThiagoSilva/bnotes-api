import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ThrowSaveNotesError } from "../../helpers/errors/saveNotesUseCaseError/ThrowSaveNotesError";
import { Note } from "../../models/Note";
import { NewNote } from "./interfaces/iNewNote";
import { ISaveNotesUseCase } from "./interfaces/usecases/ISaveNotesUseCase";
import { SaveNotesRepository } from "./mocks/repository/interfaces/SaveNotesRepository";

export class SaveNotesUseCase implements ISaveNotesUseCase {
  constructor(private saveNotesRepository: SaveNotesRepository) {}

  async save(newNote: NewNote): Promise<{ note: Note | null; error: IError |  null}> {
    const isThrowSaveNotesError = ThrowSaveNotesError(newNote);

    if (isThrowSaveNotesError) {
      return {
        error: isThrowSaveNotesError,
        note: null,
      };
    }
    const {note} = await this.saveNotesRepository.save(newNote);

    return {
      note: note,
      error: null
    };
  }
}
