import { getAllNotesController } from "../helper/instanceGetAllNotesController";

export const makeSut = () => {
  const sut = getAllNotesController;

  return { sut };
};
