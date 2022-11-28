import { getAllNotesRepository } from "../helper/instanceGetAllNotesRepository";

export const makeSut = () => {
  const sut = getAllNotesRepository;

  return { sut };
};
