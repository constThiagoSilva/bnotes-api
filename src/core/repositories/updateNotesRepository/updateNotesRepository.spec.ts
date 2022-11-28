import { Note } from "../../models/Note";
import { NewNote } from "../../usecases/saveNotesUseCase/interfaces/iNewNote";
import { makeSut } from "./factories/sutFactory";

describe("Update Notes Repository", () => {
  it("should update a exist note", async () => {
    const { sut, databaseSpy } = makeSut();
    const mockNoteId = "1";
    const mockNewNote: NewNote = {
      author: "any_author",
      content: "any_content",
      title: "any_title",
    };
    const mockUpdateNote: NewNote = {
      author: "any_author",
      content: "other_content",
      title: "other_title",
    };
    const mockUpdatedNote: Note = {
      id: "1",
      author: "any_author",
      content: "other_content",
      title: "other_title",
      status: "Active",
      createAt: new Date("2022-10-31"),
      updateAt: new Date("2022-10-31"),
    };

    await databaseSpy.create(mockNewNote);
    const { updatedNote } = await sut.updateNote(mockNoteId, mockUpdateNote);

    expect(updatedNote).toEqual(mockUpdatedNote);
  });
  it("should return a 500 if author param is not provided correctly", async () => {
    const { sut, databaseSpy } = makeSut();
    const mockNoteId = "1";
    const mockNewNote: NewNote = {
      author: "any_author",
      content: "any_content",
      title: "any_title",
    };
    const mockUpdateNote: NewNote = {
      author: "",
      content: "other_content",
      title: "other_title",
    };

    await databaseSpy.create(mockNewNote);
    const { error } = await sut.updateNote(mockNoteId, mockUpdateNote);

    expect(error?.message.message).toBe("parameter: author, not provided");
    expect(error?.code).toBe(500);
  });
  it("should return a 500 if content param is not provided correctly", async () => {
    const { sut, databaseSpy } = makeSut();
    const mockNoteId = "1";
    const mockNewNote: NewNote = {
      author: "any_author",
      content: "any_content",
      title: "any_title",
    };
    const mockUpdateNote: NewNote = {
      author: "any_author",
      content: "",
      title: "other_title",
    };

    await databaseSpy.create(mockNewNote);
    const { error } = await sut.updateNote(mockNoteId, mockUpdateNote);

    expect(error?.message.message).toBe("parameter: content, not provided");
    expect(error?.code).toBe(500);
  });
  it("should return a 500 if title param is not provided correctly", async () => {
    const { sut, databaseSpy } = makeSut();
    const mockNoteId = "1";
    const mockNewNote: NewNote = {
      author: "any_author",
      content: "any_content",
      title: "any_title",
    };
    const mockUpdateNote: NewNote = {
      author: "any_author",
      content: "other_author",
      title: "",
    };

    await databaseSpy.create(mockNewNote);
    const { error } = await sut.updateNote(mockNoteId, mockUpdateNote);

    expect(error?.message.message).toBe("parameter: title, not provided");
    expect(error?.code).toBe(500);
  });
});
