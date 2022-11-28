import { changeStatusNotesToTrashRepository } from "../../../repositories/changeStatusNotesToTrashRepository/helper/instanceChangeStatusNotesToTrashRepository";
import { ChangeStatusNotesToTrashUseCase } from "../ChangeStatusNotesToTrashUseCase";

const instanceChangeStatusNotesToTrashUseCase = () => {
  const changeStatusNotesToTrashUseCase = new ChangeStatusNotesToTrashUseCase(
    changeStatusNotesToTrashRepository
  );

  return changeStatusNotesToTrashUseCase;
};

const changeStatusNotesToTrashUseCase =
  instanceChangeStatusNotesToTrashUseCase();

export { changeStatusNotesToTrashUseCase };
