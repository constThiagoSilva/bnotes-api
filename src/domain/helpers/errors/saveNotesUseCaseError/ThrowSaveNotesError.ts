import { NewNote } from "../../../usecases/saveNotesUseCase/interfaces/iNewNote";
import { IError } from "./interfaces/IError";
import { ProvidedParamsError } from "./ProvidedParamsError";

export const ThrowSaveNotesError = (newNote: NewNote): IError | null => {
  if (!newNote.author) {
    return {
      code: 500,
      message: new ProvidedParamsError("author"),
    };
  } else if (!newNote.title) {
    return {
      code: 500,
      message: new ProvidedParamsError("title"),
    };
  } else if (!newNote.content) {
    return {
      code: 500,
      message: new ProvidedParamsError("content"),
    };
  }

  return null;
};
