import { Note } from "../../models/Note";
import { NewNote } from "./interfaces/iNewNote";
import { SaveNotesRepositorySpy } from "./mocks/repository/SaveNotesRepositorySpy";
import { SaveNotesUseCase } from "./SaveNotesUseCase";

export interface UpdateNote {
  author: string;
  title: string;
  content: string;
}

export interface UpdateNotesRepository {
  update(updatedNote: UpdateNote): Promise<Note | null>
}

export class UpdateNotesRepositorySpy implements UpdateNotesRepository {
  private note: Note | null = null;

  async update(updatedNote: UpdateNote): Promise<Note | null> {
    this.note = {
      id: '1',
      author: 'same_author',
      title: updatedNote.title,
      content: updatedNote.content,
      updateAt: new Date(),
      createAt: new Date(),
    };
    const newNote = this.getNote();

    return newNote;
  }
  public getNote() {
    return this.note
  }
}


const makeSut = () => {
  const saveNotesRepository = new SaveNotesRepositorySpy()
  const updateNotesRepository = new UpdateNotesRepositorySpy()
  const sut = new SaveNotesUseCase(saveNotesRepository, updateNotesRepository);

  return { sut, saveNotesRepository };
};

describe("Save Notes Use Case", () => {

  //UNIT
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
  it("should return a note with same properties of parameters", async () => {
    const { sut } = makeSut();
    const aNewNote: NewNote = {
      author: "any_author",
      title: "any_title",
      content: "any_content",
    };

    const { note } = await sut.save(aNewNote);

    expect(note?.author).toBe(aNewNote.author);
    expect(note?.title).toBe(aNewNote.title);
    expect(note?.content).toBe(aNewNote.content);
  });
  it('should update a exist note', async () => {
    const { sut } = makeSut();
    const aNewNote: NewNote = {
      author: "any_author",
      title: "any_title",
      content: "any_content",
    };

    await sut.save(aNewNote);

    const aUpdatedNote: UpdateNote = {
      author: 'same_author',
      title: 'updated_title',
      content: 'updated_content',
    }

    const {note} = await sut.save(aUpdatedNote);

    expect(note?.author).toBe(aUpdatedNote.author)    
    expect(note?.title).toBe(aUpdatedNote.title)
    expect(note?.content).toBe(aUpdatedNote.content)
  })

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
