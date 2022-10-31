import { IError } from "../../../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { Note } from "../../../../models/Note";
import { UpdateNote } from "../../saveNotesUseCase.spec";
import { NewNote } from "../iNewNote";

export interface ISaveNotesUseCase {
  save(newNote?: NewNote, updatedNote?: UpdateNote): Promise<{ note: Note | null; error: IError | null}>;
}
