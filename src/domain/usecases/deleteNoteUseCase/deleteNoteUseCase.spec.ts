import { DeleteNoteUseCase } from "./deleteNoteUseCase";
import { DeleteNoteRepositorySpy } from "./mocks/repository/SaveNoteRepositorySpy";

const makeSut = () => {
  const deleteNoteRepository = new DeleteNoteRepositorySpy();
  const sut = new DeleteNoteUseCase(deleteNoteRepository);

  return { sut, deleteNoteRepository };
};

describe("Delete Note Use Case", () => {
  it("should change the status of note 'Active' to 'Trash'", async () => {
    const { sut } = makeSut();
    const MOCK_NOTE_ID = "1";

    const { deleteNote } = await sut.delete(MOCK_NOTE_ID);

    expect(deleteNote?.status).toBe("Trash");
  });

  it("should return 500 if no id of note is provided", async () => {
    const { sut } = makeSut();

    const { error } = await sut.delete("");

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: id, not provided");
  });
});
