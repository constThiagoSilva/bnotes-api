import { databaseSpy } from "../../mocks/repository/helper/instanceDatabaseSpy";
import { SaveNotesRepository } from "../SaveNotesRepository";

export const instanceSaveNotesRepository = () => {
  const saveNotesRepository = new SaveNotesRepository(databaseSpy);

  return saveNotesRepository;
};

const saveNotesRepository = instanceSaveNotesRepository()


export {saveNotesRepository}