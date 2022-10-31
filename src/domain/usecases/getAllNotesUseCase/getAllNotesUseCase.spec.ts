import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";

interface IGetAllNotes {
  getAll(author: string): Promise<{ notes: Note[]; error: IError | null }>;
}

class GetAllNotes implements IGetAllNotes {
  async getAll(
    author: string
  ): Promise<{ notes: Note[]; error: IError | null }> {
    if (!author) {
      return {
        notes: [],
        error: {
          code: 500,
          message: new ProvidedParamsError("author parameter not provided"),
        },
      };
    }

    return {
      notes: [],
      error: null,
    };
  }
}

describe("Get All Notes Use Case", () => {
  it("should get all notes of a one author", async () => {
    const sut = new GetAllNotes();
    const author = 'any_author'
    const MOCK_AUTHOR_NOTES: Note[] = [
      {
        author: "any_author",
        id: "1",
        title: "any_title",
        content: "any_content",
        createAt: new Date("2022-31-10"),
        updateAt: new Date("2022-31-10"),
      },
      {
        author: "any_author",
        id: "2",
        title: "any_title",
        content: "any_content",
        createAt: new Date("2022-31-10"),
        updateAt: new Date("2022-31-10"),
      },
    ];

    const {notes} = await sut.getAll(author)

    expect(notes).toEqual(MOCK_AUTHOR_NOTES)
  });

  it("should return an 500 error if author not provided", async () => {
    const sut = new GetAllNotes();

    const { error } = await sut.getAll("");

    expect(error?.code).toBe(500);
  });
});
