class SaveNotesUseCase implements ISaveNotesUseCase {
  constructor(private saveNotesRepository: SaveNotesRepository) {}

  async save(newNote: NewNote): Promise<{ ok?: string; error?: IError }> {
    const isThrowSaveNotesError = ThrowSaveNotesError(newNote);

    if (isThrowSaveNotesError) {
      return {
        error: isThrowSaveNotesError,
      };
    }

    await this.saveNotesRepository.save(newNote);

    return {
      ok: "ok",
    };
  }
}
class SaveNotesRepositorySpy implements SaveNotesRepository {
  private note: Note | null = null;

  async save(newNote: NewNote): Promise<void> {
    this.note = {
      author: newNote.author,
      title: newNote.title,
      content: newNote.content,
      createAt: new Date(),
    };
  }

  getNote() {
    return this.note;
  }
}

const ThrowSaveNotesError = (newNote: NewNote): IError | null => {
  if (!newNote.author) {
    return {
      code: 500,
      message: new ProvidedParamsError("author"),
    };
  } else if (!newNote.title) {
    return {
      code: 500,
      message: new ProvidedParamsError("title"),
    };
  } else if (!newNote.content) {
    return {
      code: 500,
      message: new ProvidedParamsError("content"),
    };
  }

  return null;
};

class ProvidedParamsError extends Error {
  constructor(incorrectlyParameterProvided: string) {
    super(`parameter: ${incorrectlyParameterProvided}, not provided`);
  }
}

interface ISaveNotesUseCase {
  save(newNote: NewNote): Promise<{ ok?: string; error?: IError }>;
}

interface SaveNotesRepository {
  save(newNote: NewNote): Promise<void>;
}

interface Note {
  author: string;
  title: string;
  content: string;
  createAt: Date;
}

interface NewNote {
  author: string;
  title: string;
  content: string;
}

interface IError {
  code: number;
  message: ProvidedParamsError;
}
interface SaveNotesError {
  code: number;
  message: string;
}

const makeSut = () => {
  const saveNotesRepository = new SaveNotesRepositorySpy();
  const sut = new SaveNotesUseCase(saveNotesRepository);

  return { sut, saveNotesRepository };
};

describe("Save Notes Use Case", () => {
  it("should save a new note", async () => {
    const { sut, saveNotesRepository } = makeSut();
    const aNewNote: NewNote = {
      author: "any_author",
      title: "any_title",
      content: "any_content",
    };

    await sut.save(aNewNote);

    expect(saveNotesRepository.getNote).not.toBe(null);
  });

  it("should return 500 if author require parameter is not provided", async () => {
    const { sut } = makeSut();
    const aNewNote: NewNote = {
      author: "",
      title: "any_title",
      content: "any_content",
    };

    const { error } = await sut.save(aNewNote);

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: author, not provided");
  });
  it("should return 500 if title require parameter is not provided", async () => {
    const { sut } = makeSut();
    const aNewNote: NewNote = {
      author: "any_author",
      title: "",
      content: "any_content",
    };

    const { error } = await sut.save(aNewNote);

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: title, not provided");
  });
  it("should return 500 if content require parameter is not provided", async () => {
    const { sut } = makeSut();
    const aNewNote: NewNote = {
      author: "any_author",
      title: "any_title",
      content: "",
    };

    const { error } = await sut.save(aNewNote);

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: content, not provided");
  });
});
