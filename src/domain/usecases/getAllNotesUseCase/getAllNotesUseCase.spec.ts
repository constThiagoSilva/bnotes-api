import { Note } from "../../models/Note";
import { saveNotesRepository } from "../../repositories/saveNotesRepository/helper/instanceSaveNotesRepository";
import { saveNotesUseCase } from "../saveNotesUseCase/helper/instanceSaveNotesUseCase";
import {makeSut} from './factories/makeSut'

describe("Get All Notes Use Case", () => {
  it("should get all notes of a one author", async () => {
    const { sut } = makeSut();
    const author = "any_author";
    const MOCK_AUTHOR_NOTES: Note[] = [
      {
        author: "any_author",
        id: "1",
        title: "any_title",
        content: "any_content",
        createAt: new Date("2022-10-31"),
        updateAt: new Date("2022-10-31"),
        status: 'Active',
      },
      {
        author: "any_author",
        id: "2",
        title: "any_title",
        content: "any_content",
        createAt: new Date("2022-10-31"),
        updateAt: new Date("2022-10-31"),
        status: 'Active'
      },
    ];


    await saveNotesUseCase.save(MOCK_AUTHOR_NOTES[0])
    await saveNotesUseCase.save(MOCK_AUTHOR_NOTES[1])
    const { notes } = await sut.getAllNotes(author);

    expect(notes).toEqual(MOCK_AUTHOR_NOTES);
  });
  it("should return the message: no notes yet, if the author no have notes", async () => {
    const { sut } = makeSut();
    const author = "author_no_notes";

    const { error } = await sut.getAllNotes(author);

    expect(error?.message.message).toBe("no notes yet");
  });

  it("should return an 500 error if author not provided", async () => {
    const { sut } = makeSut();

    const { error } = await sut.getAllNotes("");

    expect(error?.code).toBe(500);
  });
});
