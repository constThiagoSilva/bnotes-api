import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";

interface IGetAllNotes {
  getAll(
    author: string
  ): Promise<{ notes: Note[]; error: IError | null; message: string }>;
}

interface GetAllNotesRepository {
  getAll(author: string): Promise<Note[] | null>;
}

class GetAllNotesRepositorySpy implements GetAllNotesRepository {
  private notes: Note[] = [
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
  async getAll(author: string): Promise<Note[] | null> {
    const isTheAuthorHaveNotes = this.notes.find(note => note.author === author)

    if (!isTheAuthorHaveNotes) {
        return null
    }

    const notes: Note[] = this.notes.filter(note => note.author === author)

    

    return notes;
  }
}

class GetAllNotes implements IGetAllNotes {
  constructor(private getAllNotesRepository: GetAllNotesRepository) {}

  async getAll(
    author: string
  ): Promise<{ notes: Note[]; error: IError | null; message: string }> {
    if (!author) {
      return {
        notes: [],
        error: {
          code: 500,
          message: new ProvidedParamsError("author parameter not provided"),
        },
        message: "",
      };
    }

    const notes = await this.getAllNotesRepository.getAll(author);

    if (!notes) {
      return {
        notes: [],
        error: null,
        message: "no notes yet",
      };
    }

    return {
      notes: notes as Note[],
      error: null,
      message: "",
    };
  }
}

const makeSut = () => {
  const getAllNotesRepository = new GetAllNotesRepositorySpy();
  const sut = new GetAllNotes(getAllNotesRepository);

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
