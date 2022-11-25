import { NewNote } from "../../usecases/saveNotesUseCase/interfaces/iNewNote";
import { SaveNotesRepository } from "./SaveNotesRepository";
import { SaveNotesRepositorySpy } from "./mocks/SaveNotesRepositorySpy";

const makeSut = () => {
  const saveNotesRepositorySpy = new SaveNotesRepositorySpy();
  const sut = new SaveNotesRepository(saveNotesRepositorySpy);

  return { sut, saveNotesRepositorySpy };
};

describe("Save Notes Repository", () => {
  it("should save a note into database", async () => {
    const { sut } = makeSut();
    const mockFakeNewNote: NewNote = {
      author: "any_auhtor",
      content: "any_content",
      title: "any_title",
    };

    const { savedNote } = await sut.saveNote(mockFakeNewNote);
    const savedNoteId = String(savedNote?.id);
    const storageNote = await sut.getNoteById(savedNoteId);

    expect(savedNote).toEqual(storageNote);
  });
  it("should return a 500 if author param is not provided correctly", async () => {
    const { sut } = makeSut();
    const mockFakeIncorrectlyNewNote: NewNote = {
      author: "",
      content: "any_content",
      title: "any_title",
    };

    const { error } = await sut.saveNote(mockFakeIncorrectlyNewNote);

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: author, not provided");
  });
  it("should return a 500 if content param is not provided correctly", async () => {
    const { sut } = makeSut();
    const mockFakeIncorrectlyNewNote: NewNote = {
      author: "any_author",
      content: "",
      title: "any_title",
    };

    const { error } = await sut.saveNote(mockFakeIncorrectlyNewNote);

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: content, not provided");
  });
  it("should return a 500 if content param is not provided correctly", async () => {
    const { sut } = makeSut();
    const mockFakeIncorrectlyNewNote: NewNote = {
      author: "any_author",
      content: "any_content",
      title: "",
    };

    const { error } = await sut.saveNote(mockFakeIncorrectlyNewNote);

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: title, not provided");
  });
  it("should return an error returned from dependecies", async () => {
    const { sut } = makeSut();
    const mockFakeNewNote: NewNote = {
      author: "any_auhtor",
      content: "any_content",
      title: "any_title",
    };

    const { error } = await sut.saveNote(mockFakeNewNote);

    expect(error?.message.message).toBe("any_error");
  });
});
