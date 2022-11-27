import { databaseSpy } from "../../mocks/repository/helper/instanceDatabaseSpy";
import { UpdateNotesRepository } from "../UpdateNotesRepository";

export const instanceUpdateNotesRepository = () => {
  const updateNotesRepository = new UpdateNotesRepository(databaseSpy);

  return updateNotesRepository
}

const updateNotesRepository = instanceUpdateNotesRepository()

export {updateNotesRepository}