import { ChangeStatusNotesToTrash } from "../../../repositories/changeStatusNotesToTrashRepository/ChangeStatusNotesToTrashRepository";
import { changeStatusNotesToTrashUseCase } from "../changeStatusNotesToTrashUseCase";

export const makeSut = () => {
  const changeStatusNotesToTrashRepository = new ChangeStatusNotesToTrash();
  const sut = new changeStatusNotesToTrashUseCase(changeStatusNotesToTrashRepository);

  return { sut, changeStatusNotesToTrashRepository };
};
