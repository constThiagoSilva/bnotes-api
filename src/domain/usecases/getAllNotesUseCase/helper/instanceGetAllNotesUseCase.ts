import { getAllNotesRepository } from "../../../repositories/getAllNotesRepository/helper/instanceGetAllNotesRepository";
import { GetAllNotesUseCase } from "../GetAllNotesUseCase";

const instanceGetAllNotesUseCase = () => {
  const getAllNotesUseCase = new GetAllNotesUseCase(getAllNotesRepository);

  return getAllNotesUseCase;
};

const getAllNotesUseCase = instanceGetAllNotesUseCase();

export { getAllNotesUseCase };
