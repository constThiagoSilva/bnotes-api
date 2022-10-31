import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";

interface IGetAllNotes {
  getAll(author: string): Promise<{ notes: Note[]; error: IError | null }>;
}

interface GetAllNotesRepository {
    getAll(author: string): Promise<Note[]>
}

class GetAllNotesRepositorySpy implements GetAllNotesRepository{
    async getAll(author: string): Promise<Note[]> {
        const MOCK_AUTHOR_NOTES: Note[] = [
            {
              author: "any_author",
              id: "1",
              title: "any_title",
              content: "any_content",
              createAt: new Date("2022-10-31"),
              updateAt: new Date("2022-10-31"),
            },
            {
              author: "any_author",
              id: "2",
              title: "any_title",
              content: "any_content",
              createAt: new Date("2022-10-31"),
              updateAt: new Date("2022-10-31"),
            },
          ];

        return MOCK_AUTHOR_NOTES
    }
}

class GetAllNotes implements IGetAllNotes {
    constructor(private getAllNotesRepository: GetAllNotesRepository) {}

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

    const notes = await this.getAllNotesRepository.getAll(author)

    return {
      notes: notes,
      error: null,
    };
  }
}

const makeSut = () => {
    const getAllNotesRepository = new GetAllNotesRepositorySpy()
    const sut = new GetAllNotes(getAllNotesRepository)

    return {sut, getAllNotesRepository}
}

describe("Get All Notes Use Case", () => {
  it("should get all notes of a one author", async () => {
    const {sut} = makeSut();
    const author = 'any_author'
    const MOCK_AUTHOR_NOTES: Note[] = [
      {
        author: "any_author",
        id: "1",
        title: "any_title",
        content: "any_content",
        createAt: new Date("2022-10-31"),
        updateAt: new Date("2022-10-31"),
      },
      {
        author: "any_author",
        id: "2",
        title: "any_title",
        content: "any_content",
        createAt: new Date("2022-10-31"),
        updateAt: new Date("2022-10-31"),
      },
    ];

    const {notes} = await sut.getAll(author)

    expect(notes).toEqual(MOCK_AUTHOR_NOTES)
  });
  it("should return the message: no notes yet, if the author no have notes", async () => {
    const {sut} = makeSut();
    const author = 'any_author'

    const {message} = await sut.getAll(author)

    expect(message).toEqual('no notes yet')
  });

  it("should return an 500 error if author not provided", async () => {
    const {sut} = makeSut();

    const { error } = await sut.getAll("");

    expect(error?.code).toBe(500);
  });
});
