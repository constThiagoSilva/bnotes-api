import { Note } from "../../models/Note";
import {makeSut} from './factories/makeSut'

describe("Get All Notes Repository", () => {
  it("should return all notes of author", async () => {
    const {sut, databaseSpy} = makeSut()
    const insertNewNotesToMock: Note[] = [
        {
          id: "3",
          author: "correct_author",
          content: "any_content",
          title: "any_title",
          status: "Active",
          createAt: new Date("2020-01-10"),
          updateAt: new Date("2020-01-10"),
        },
        {
          id: "4",
          author: "correct_author",
          content: "any_content",
          title: "any_title",
          status: "Active",
          createAt: new Date("2020-01-10"),
          updateAt: new Date("2020-01-10"),
        },
      ]
    const author = "correct_author";

    databaseSpy.setNotes(insertNewNotesToMock);
    const { notes } = await sut.getAllNotes(author);

    expect(notes?.length).toBeGreaterThan(0);
    expect(notes).toEqual(insertNewNotesToMock)
  });
  it("should return the message: no notes yet, if author no have notes", async () => {
    const {sut} = makeSut()

    const { message } = await sut.getAllNotes("any_author_with_no_notes");

    expect(message?.message).toBe("no notes yet");
  });
  it("if author not provided, retrun error 500", async () => {
    const {sut} = makeSut()

    const { error } = await sut.getAllNotes("");

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: author, not provided");
  });
});
