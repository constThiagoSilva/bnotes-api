import { Note } from "../../models/Note";
import { saveNotesRepository } from "../../repositories/saveNotesRepository/helper/instanceSaveNotesRepository";
import { makeSut } from "./factories/makeSut";

describe("Delete Note Use Case", () => {
  //UNIT
  it("should change the status of note 'Active' to 'Trash'", async () => {
    const { sut } = makeSut();
    const mockFakeNote: Note = {
      id: "1",
      author: "any_author",
      content: "any_content",
      title: "any_title",
      status: "Active",
      createAt: new Date("2020-01-10"),
      updateAt: new Date("2020-01-10"),
    };

    const createdNote = await saveNotesRepository.saveNote(mockFakeNote);
    const { trashedNote } = await sut.changeStatusNotesToTrashUseCase(
      String(createdNote?.savedNote?.id)
    );

    expect(trashedNote?.status).toBe("Trash");
  });

  it("should return 500 if no id of note is provided", async () => {
    const { sut } = makeSut();

    const { error } = await sut.changeStatusNotesToTrashUseCase("");

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: id, not provided");
  });

  //INTEGRATION
  it("should return error if repository thowrs an error", async () => {
    const { sut } = makeSut();
    const mockNotExistingId = "not exist id";

    const changeStatusNotesToTrashUseCaseNotExistingIdThrowError =
      await sut.changeStatusNotesToTrashUseCase(mockNotExistingId);

    expect(
      changeStatusNotesToTrashUseCaseNotExistingIdThrowError.error?.message
        .message
    ).toBe("note not exists!");

    const mockNullId = "";
    const changeStatusNotesToTrashUseCaseIdNotProvidedThrowError =
      await sut.changeStatusNotesToTrashUseCase(mockNullId);

    expect(
      changeStatusNotesToTrashUseCaseIdNotProvidedThrowError.error?.message
        .message
    ).toBe("parameter: id, not provided");
  });
});
