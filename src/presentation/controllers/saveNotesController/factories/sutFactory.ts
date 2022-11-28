import { saveNotesController } from "../helper/instanceSaveNotesController";

export const makeSut = () => {
  const sut = saveNotesController

  return {sut};
};
