import { GetAllNotesRepository } from "../../../repositories/getAllNotesRepository/GetAllNotesRepository";
import { DatabaseSpy } from "../../../repositories/mocks/repository/DatabaseSpy";
import { GetAllNotesUseCase } from "../GetAllNotesUseCase";

export const makeSut = () => {
    const databaseSpy = new DatabaseSpy()
    const getAllNotesRepository = new GetAllNotesRepository(databaseSpy);
    const sut = new GetAllNotesUseCase(getAllNotesRepository);
  
    return { sut, getAllNotesRepository, databaseSpy };
  };