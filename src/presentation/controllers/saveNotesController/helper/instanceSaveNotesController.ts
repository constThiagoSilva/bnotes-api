import { DatabaseSpy } from "../../../../domain/repositories/mocks/repository/DatabaseSpy";
import { SaveNotesRepository } from "../../../../domain/repositories/saveNotesRepository/SaveNotesRepository";
import { UpdateNotesRepository } from "../../../../domain/repositories/updateNotesRepository/UpdateNotesRepository";
import { SaveNotesUseCase } from "../../../../domain/usecases/saveNotesUseCase/SaveNotesUseCase";
import { SaveNotesController } from "../SaveNotesController";

export const instanceSaveNotesController = () => {
  const saveNotesController = new SaveNotesController(
    new SaveNotesUseCase(
      new SaveNotesRepository(new DatabaseSpy()),
      new UpdateNotesRepository(new DatabaseSpy())
    )
  );

  return saveNotesController;
};
