import { GetAllNotesRepository } from "../../../../domain/repositories/getAllNotesRepository/GetAllNotesRepository";
import { DatabaseSpy } from "../../../../domain/repositories/mocks/repository/DatabaseSpy";
import { GetAllNotesUseCase } from "../../../../domain/usecases/getAllNotesUseCase/GetAllNotesUseCase";
import { GetAllNotesController } from "../GetAllNotesController";

export const makeSut = () => {
  const databaseSpy = new DatabaseSpy();
  const getAllNotesUseCase = new GetAllNotesUseCase(
    new GetAllNotesRepository(databaseSpy)
  );

  const getAllNotesController = new GetAllNotesController(getAllNotesUseCase);

  return getAllNotesController;
};
