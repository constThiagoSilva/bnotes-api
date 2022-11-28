import { DatabaseSpy } from "../../mocks/repository/DatabaseSpy";
import { GetAllNotesRepository } from "../GetAllNotesRepository";
import { getAllNotesRepository } from "../helper/instanceGetAllNotesRepository";

export const makeSut = () => {
  const sut = getAllNotesRepository;

  return { sut };
};
