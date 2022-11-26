import { ChangeStatusNotesToTrashRepository } from "../../../repositories/changeStatusNotesToTrashRepository/ChangeStatusNotesToTrashRepository";
import { DatabaseSpy } from "../../../repositories/mocks/repository/DatabaseSpy";
import { ChangeStatusNotesToTrashUseCase } from "../ChangeStatusNotesToTrashUseCase";

export const makeSut = () => {
  const databaseSpy = new DatabaseSpy();
  const changeStatusNotesToTrashRepository =
    new ChangeStatusNotesToTrashRepository(databaseSpy);
  const sut = new ChangeStatusNotesToTrashUseCase(
    changeStatusNotesToTrashRepository
  );

  return { sut, changeStatusNotesToTrashRepository, databaseSpy };
};
