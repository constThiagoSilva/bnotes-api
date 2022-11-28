import { ChangeStatusNotesToTrashRepository } from "../../../repositories/changeStatusNotesToTrashRepository/ChangeStatusNotesToTrashRepository";
import { DatabaseSpy } from "../../../repositories/mocks/repository/DatabaseSpy";
import { ChangeStatusNotesToTrashUseCase } from "../ChangeStatusNotesToTrashUseCase";
import { changeStatusNotesToTrashUseCase } from "../helper/instanceChangeStatusNotesToTrashUseCase";

export const makeSut = () => {
  const sut = changeStatusNotesToTrashUseCase

  return { sut};
};
