import { DatabaseSpy } from "../../mocks/repository/DatabaseSpy";
import { GetAllNotesRepository } from "../GetAllNotesRepository";

export const makeSut = () => {
  const databaseSpy = new DatabaseSpy();
  const sut = new GetAllNotesRepository(databaseSpy);

  return { sut, databaseSpy };
};
