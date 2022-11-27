import { databaseSpy } from "../../../repositories/mocks/repository/helper/instanceDatabaseSpy";
import { saveNotesRepository } from "../../../repositories/saveNotesRepository/helper/instanceSaveNotesRepository";
import { updateNotesRepository } from "../../../repositories/updateNotesRepository/helper/instanceUpdateNotesRepository";
import { SaveNotesUseCase } from "../SaveNotesUseCase";

const instanceSaveNotesUseCase = () => {
  const saveNotesUseCase = new SaveNotesUseCase(
    saveNotesRepository,
    updateNotesRepository
  );

  return saveNotesUseCase;
};

const saveNotesUseCase = instanceSaveNotesUseCase();

export { saveNotesUseCase };
