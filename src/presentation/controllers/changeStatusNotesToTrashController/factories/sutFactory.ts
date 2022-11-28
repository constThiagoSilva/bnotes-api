import { statusNoteToTrashControllert } from "../helper/instanceChangeStatusNotesToTrashController";

export const makeSut = () => {
  const sut = statusNoteToTrashControllert;

  return { sut };
};
