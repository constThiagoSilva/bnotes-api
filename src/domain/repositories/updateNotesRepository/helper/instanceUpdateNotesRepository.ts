import { databaseSpy } from "../../mocks/repository/helper/instanceDatabaseSpy";
import { UpdateNotesRepository } from "../UpdateNotesRepository";

export const instanceUpdateNotesRepository = () => {
  const updateNotesRepository = new UpdateNotesRepository(databaseSpy);
}

const updateNotesRepository = instanceUpdateNotesRepository()

export {updateNotesRepository}