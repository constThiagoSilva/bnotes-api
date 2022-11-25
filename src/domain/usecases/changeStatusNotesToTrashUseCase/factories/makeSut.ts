import { ChangeStatusNotesToTrashRepository } from "../../../repositories/changeStatusNotesToTrashRepository/ChangeStatusNotesToTrashRepository";
import { DatabaseSpy } from "../../../repositories/mocks/repository/DatabaseSpy";
import { changeStatusNotesToTrashUseCase } from "../changeStatusNotesToTrashUseCase";

export const makeSut = () => {
  const databaseSpy = new DatabaseSpy();
  const changeStatusNotesToTrashRepository =
    new ChangeStatusNotesToTrashRepository(databaseSpy);
  const sut = new changeStatusNotesToTrashUseCase(
    changeStatusNotesToTrashRepository
  );

  return { sut, changeStatusNotesToTrashRepository, databaseSpy };
};
