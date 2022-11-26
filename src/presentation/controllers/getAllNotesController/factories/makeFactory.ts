import { GetAllNotesRepository } from "../../../../domain/repositories/getAllNotesRepository/GetAllNotesRepository";
import { DatabaseSpy } from "../../../../domain/repositories/mocks/repository/DatabaseSpy";
import { SaveNotesRepository } from "../../../../domain/repositories/saveNotesRepository/SaveNotesRepository";
import { UpdateNotesRepository } from "../../../../domain/repositories/updateNotesRepository/UpdateNotesRepository";
import { GetAllNotesUseCase } from "../../../../domain/usecases/getAllNotesUseCase/GetAllNotesUseCase";
import { SaveNotesUseCase } from "../../../../domain/usecases/saveNotesUseCase/SaveNotesUseCase";
import { SaveNotesController } from "../../saveNotesController/SaveNotesController";
import { GetAllNotesController } from "../GetAllNotesController";

export const makeSut = () => {
  const databaseSpy = new DatabaseSpy();
  const saveNotesController = new SaveNotesController(
    new SaveNotesUseCase(
      new SaveNotesRepository(databaseSpy),
      new UpdateNotesRepository(databaseSpy)
    )
  );
  const getAllNotesUseCase = new GetAllNotesUseCase(
    new GetAllNotesRepository(databaseSpy)
  );

  const sut = new GetAllNotesController(getAllNotesUseCase);

  return { sut, saveNotesController };
};
