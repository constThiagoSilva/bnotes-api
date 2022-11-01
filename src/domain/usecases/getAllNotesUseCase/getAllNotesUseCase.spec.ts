import { Note } from "../../models/Note";
import { GetAllNotesUseCase } from "./GetAllNotesUseCase";
import { GetAllNotesRepositorySpy } from "./mocks/GetAllNotesRepositorySpy/GetAllNotesRepositorySpy";

const makeSut = () => {
  const getAllNotesRepository = new GetAllNotesRepositorySpy();
  const sut = new GetAllNotesUseCase(getAllNotesRepository);

  return { sut, getAllNotesRepository };
};

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

    const { notes } = await sut.getAll(author);

    expect(notes).toEqual(MOCK_AUTHOR_NOTES);
  });
  it("should return the message: no notes yet, if the author no have notes", async () => {
    const { sut } = makeSut();
    const author = "author_no_notes";

    const { message } = await sut.getAll(author);

    expect(message).toBe("no notes yet");
  });

  it("should return an 500 error if author not provided", async () => {
    const { sut } = makeSut();

    const { error } = await sut.getAll("");

    expect(error?.code).toBe(500);
  });
});
