import { ChangeStatusNotesToTrash } from "../../../repositories/changeStatusNotesToTrashRepository/ChangeStatusNotesToTrashRepository";
import { DeleteNoteUseCase } from "../deleteNoteUseCase";

export const makeSut = () => {
  const changeStatusNotesToTrashRepository = new ChangeStatusNotesToTrash();
  const sut = new DeleteNoteUseCase(changeStatusNotesToTrashRepository);

  return { sut, changeStatusNotesToTrashRepository };
};
