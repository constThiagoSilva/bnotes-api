import { changeStatusNotesToTrashUseCase } from "../../../../domain/usecases/changeStatusNotesToTrashUseCase/helper/instanceChangeStatusNotesToTrashUseCase";
import { ChangeStatusNoteToTrashController } from "../ChangeStatusNotesToTrash";

export const instanceStatusNoteToTrashController = () => {
  const statusNoteToTrashControllert = new ChangeStatusNoteToTrashController(
    changeStatusNotesToTrashUseCase
  );

  return statusNoteToTrashControllert;
};

const statusNoteToTrashControllert = instanceStatusNoteToTrashController();

export { statusNoteToTrashControllert };
