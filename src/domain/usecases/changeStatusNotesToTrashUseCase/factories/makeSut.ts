import { ChangeStatusNotesToTrashRepository } from "../../../repositories/changeStatusNotesToTrashRepository/ChangeStatusNotesToTrashRepository";
import { changeStatusNotesToTrashUseCase } from "../changeStatusNotesToTrashUseCase";

export const makeSut = () => {
  const changeStatusNotesToTrashRepository = new ChangeStatusNotesToTrashRepository();
  const sut = new changeStatusNotesToTrashUseCase(changeStatusNotesToTrashRepository);

  return { sut, changeStatusNotesToTrashRepository };
};
