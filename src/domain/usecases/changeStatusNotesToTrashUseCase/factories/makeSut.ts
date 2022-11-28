import { changeStatusNotesToTrashUseCase } from "../helper/instanceChangeStatusNotesToTrashUseCase";

export const makeSut = () => {
  const sut = changeStatusNotesToTrashUseCase

  return { sut};
};
