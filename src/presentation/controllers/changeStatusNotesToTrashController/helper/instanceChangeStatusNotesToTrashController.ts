import { ChangeStatusNotesToTrashRepository } from "../../../../domain/repositories/changeStatusNotesToTrashRepository/ChangeStatusNotesToTrashRepository";
import { DatabaseSpy } from "../../../../domain/repositories/mocks/repository/DatabaseSpy";
import { SaveNotesRepository } from "../../../../domain/repositories/saveNotesRepository/SaveNotesRepository";
import { UpdateNotesRepository } from "../../../../domain/repositories/updateNotesRepository/UpdateNotesRepository";
import { ChangeStatusNotesToTrashUseCase } from "../../../../domain/usecases/changeStatusNotesToTrashUseCase/ChangeStatusNotesToTrashUseCase";
import { SaveNotesUseCase } from "../../../../domain/usecases/saveNotesUseCase/SaveNotesUseCase";
import { SaveNotesController } from "../../saveNotesController/SaveNotesController";
import { StatusNoteToTrashController } from "../ChangeStatusNotesToTrash";

export const makeSut = () => {
  const databaseSpy = new DatabaseSpy();
  const changeStatusNotesToTrashRepository =
    new ChangeStatusNotesToTrashRepository(databaseSpy);
  const changeStatusNotesToTrashUseCase = new ChangeStatusNotesToTrashUseCase(
    changeStatusNotesToTrashRepository
  );
  const statusNoteToTrashControllert = new StatusNoteToTrashController(changeStatusNotesToTrashUseCase);

  return statusNoteToTrashControllert ;
};
