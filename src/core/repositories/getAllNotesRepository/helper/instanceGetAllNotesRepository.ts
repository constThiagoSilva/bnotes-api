import { databaseSpy } from "../../mocks/repository/helper/instanceDatabaseSpy";
import { GetAllNotesRepository } from "../GetAllNotesRepository";

export const instanceGetAllNotesRepository = () => {
  const getAllNotesRepository = new GetAllNotesRepository(databaseSpy);

  return getAllNotesRepository;
};

const getAllNotesRepository = instanceGetAllNotesRepository()

export {getAllNotesRepository}
