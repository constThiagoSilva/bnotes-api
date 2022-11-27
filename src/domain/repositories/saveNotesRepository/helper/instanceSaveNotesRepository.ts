import { instanceDatabaseSpy } from "../../mocks/repository/helper/instanceDatabaseSpy";
import { SaveNotesRepository } from "../SaveNotesRepository";

export const instanceSaveNotesRepository = () => {
  const saveNotesRepository = new SaveNotesRepository(instanceDatabaseSpy());

  return saveNotesRepository;
};
