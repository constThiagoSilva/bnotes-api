import { saveNotesUseCase } from "../../../../core/usecases/saveNotesUseCase/helper/instanceSaveNotesUseCase";
import { SaveNotesController } from "../SaveNotesController";

export const instanceSaveNotesController = () => {
  const saveNotesController = new SaveNotesController(saveNotesUseCase);

  return saveNotesController;
};

const saveNotesController = instanceSaveNotesController();

export { saveNotesController };
