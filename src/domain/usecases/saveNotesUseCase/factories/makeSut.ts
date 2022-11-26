import { DatabaseSpy } from "../../../repositories/mocks/repository/DatabaseSpy";
import { SaveNotesRepository } from "../../../repositories/saveNotesRepository/SaveNotesRepository";
import { UpdateNotesRepository } from "../../../repositories/updateNotesRepository/UpdateNotesRepository";
import { SaveNotesUseCase } from "../SaveNotesUseCase";

export const makeSut = () => {
    const databaseSpy = new DatabaseSpy()
    const saveNotesRepository = new SaveNotesRepository(databaseSpy)
    const updateNotesRepository = new UpdateNotesRepository(databaseSpy)
    const sut = new SaveNotesUseCase(saveNotesRepository, updateNotesRepository);
  
    return { sut, saveNotesRepository };
  };