import { getAllNotesUseCase } from "../../../../core/usecases/getAllNotesUseCase/helper/instanceGetAllNotesUseCase";
import { GetAllNotesController } from "../GetAllNotesController";

export const instanceGetAllNotesController = () => {
  const getAllNotesController = new GetAllNotesController(getAllNotesUseCase);

  return getAllNotesController;
};

const getAllNotesController = instanceGetAllNotesController();

export { getAllNotesController };
