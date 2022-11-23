import { SaveNotesRepositorySpy } from "../mocks/repository/saveNotesRepositorySpy/SaveNotesRepositorySpy";
import { UpdateNotesRepositorySpy } from "../mocks/repository/updateNotesRepositorySpy/UpdateNotesRepositorySpy";
import { SaveNotesUseCase } from "../SaveNotesUseCase";

export const makeSut = () => {
    const saveNotesRepository = new SaveNotesRepositorySpy()
    const updateNotesRepository = new UpdateNotesRepositorySpy()
    const sut = new SaveNotesUseCase(saveNotesRepository, updateNotesRepository);
  
    return { sut, saveNotesRepository };
  };