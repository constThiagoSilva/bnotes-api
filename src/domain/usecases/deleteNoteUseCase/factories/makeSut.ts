import { DeleteNoteUseCase } from "../deleteNoteUseCase";
import { DeleteNoteRepositorySpy } from "../mocks/repository/SaveNoteRepositorySpy";

export const makeSut = () => {
  const deleteNoteRepository = new DeleteNoteRepositorySpy();
  const sut = new DeleteNoteUseCase(deleteNoteRepository);

  return { sut, deleteNoteRepository };
};
