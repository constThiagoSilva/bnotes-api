import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";

interface IDeleteNoteUseCase {
  delete(id: string): Promise<{ error: IError; isDeleted: boolean }>;
}

class DeleteNoteUseCase implements IDeleteNoteUseCase {
  async delete(id: string): Promise<{ error: IError; isDeleted: boolean }> {
    if (!id) {
    }
    return {
      error: {
        code: 500,
        message: new ProvidedParamsError("id"),
      },
      isDeleted: false,
    };
  }
}

describe("Delete Note Use Case", () => {
  it("should return 500 if no id of note is provided", async () => {
    const sut = new DeleteNoteUseCase();

    const { error } = await sut.delete("");

    expect(error.code).toBe(500);
    expect(error.message.message).toBe("parameter: id, not provided");
  });
});
