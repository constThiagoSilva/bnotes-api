import { saveNotesUseCase } from "../helper/instanceSaveNotesUseCase";

export const makeSut = () => {
    const sut = saveNotesUseCase;
  
    return { sut };
  };