import { getAllNotesUseCase } from "../helper/instanceGetAllNotesUseCase";

export const makeSut = () => {
    const sut = getAllNotesUseCase;
  
    return { sut };
  };