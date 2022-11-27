import { changeStatusNotesToTrashUseCase } from "../../../../domain/usecases/changeStatusNotesToTrashUseCase/helper/instanceChangeStatusNotesToTrashUseCase";
import { StatusNoteToTrashController } from "../ChangeStatusNotesToTrash";

export const instanceStatusNoteToTrashController = () => {
  const statusNoteToTrashControllert = new StatusNoteToTrashController(
    changeStatusNotesToTrashUseCase
  );

  return statusNoteToTrashControllert;
};

const statusNoteToTrashControllert = instanceStatusNoteToTrashController();

export { statusNoteToTrashControllert };
