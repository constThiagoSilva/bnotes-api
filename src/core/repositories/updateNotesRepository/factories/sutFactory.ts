import { DatabaseSpy } from "../../mocks/repository/DatabaseSpy";
import { UpdateNotesRepository } from "../UpdateNotesRepository";

export const makeSut = () => {
  const databaseSpy = new DatabaseSpy();
  const sut = new UpdateNotesRepository(databaseSpy);

  return { sut, databaseSpy };
};
