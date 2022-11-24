import { GetAllNotesRepository } from "../../../repositories/getAllNotesRepository/GetAllNotesRepository";
import { DatabaseSpy } from "../../../repositories/mocks/repository/DatabaseSpy";
import { GetAllNotesUseCase } from "../GetAllNotesUseCase";

export const makeSut = () => {
    const getAllNotesRepository = new GetAllNotesRepository(new DatabaseSpy());
    const sut = new GetAllNotesUseCase(getAllNotesRepository);
  
    return { sut, getAllNotesRepository };
  };