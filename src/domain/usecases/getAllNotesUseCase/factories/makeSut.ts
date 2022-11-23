import { GetAllNotesUseCase } from "../GetAllNotesUseCase";
import { GetAllNotesRepositorySpy } from "../mocks/GetAllNotesRepositorySpy/GetAllNotesRepositorySpy";

export const makeSut = () => {
    const getAllNotesRepository = new GetAllNotesRepositorySpy();
    const sut = new GetAllNotesUseCase(getAllNotesRepository);
  
    return { sut, getAllNotesRepository };
  };