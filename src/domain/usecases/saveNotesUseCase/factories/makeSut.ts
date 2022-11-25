import { DatabaseSpy } from "../../../repositories/mocks/repository/DatabaseSpy";
import { SaveNotesRepository } from "../../../repositories/saveNotesRepository/SaveNotesRepository";
import { UpdateNotesRepositorySpy } from "../mocks/repository/updateNotesRepositorySpy/UpdateNotesRepositorySpy";
import { SaveNotesUseCase } from "../SaveNotesUseCase";

export const makeSut = () => {
    const databaseSpy = new DatabaseSpy()
    const saveNotesRepository = new SaveNotesRepository(databaseSpy)
    const updateNotesRepository = new UpdateNotesRepositorySpy()
    const sut = new SaveNotesUseCase(saveNotesRepository, updateNotesRepository);
  
    return { sut, saveNotesRepository };
  };