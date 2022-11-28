import { Note } from "../../models/Note";
import { saveNotesRepository } from "../saveNotesRepository/helper/instanceSaveNotesRepository";
import {makeSut} from './factories/makeSut'

describe("Get All Notes Repository", () => {
  it("should return all notes of author", async () => {
    const {sut} = makeSut()
    const insertNewNotesToMock: Note[] = [
        {
          id: "1",
          author: "correct_author",
          content: "any_content",
          title: "any_title",
          status: "Active",
          createAt: new Date("2022-10-31"),
          updateAt: new Date("2022-10-31"),
        },
        {
          id: "2",
          author: "correct_author",
          content: "any_content",
          title: "any_title",
          status: "Active",
          createAt: new Date("2022-10-31"),
          updateAt: new Date("2022-10-31"),
        },
      ]
    const author = "correct_author";

    await saveNotesRepository.saveNote(insertNewNotesToMock[0]);
    await saveNotesRepository.saveNote(insertNewNotesToMock[1]);
    const { notes } = await sut.getAllNotes(author);

    expect(notes?.length).toBeGreaterThan(0);
    expect(notes).toEqual(insertNewNotesToMock)
  });
  it("should return the message: no notes yet, if author no have notes", async () => {
    const {sut} = makeSut()

    const { error } = await sut.getAllNotes("any_author_with_no_notes");

    expect(error?.message.message).toBe("no notes yet");
  });
  it("if author not provided, retrun error 500", async () => {
    const {sut} = makeSut()

    const { error } = await sut.getAllNotes("");

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: author, not provided");
  });
});
