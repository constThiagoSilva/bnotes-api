import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";

interface IDeleteNoteUseCase {
  delete(id: string): Promise<{ error: IError | null; isDeleted: boolean }>;
}

interface DeleteNoteRepository {
    delete(id: string): Promise<boolean>
}

class DeleteNoteRepositorySpy implements DeleteNoteRepository{
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

class DeleteNoteUseCase implements IDeleteNoteUseCase {
    constructor(private deleteNoteRepository: DeleteNoteRepository) {}

  async delete(id: string): Promise<{ error: IError | null; isDeleted: boolean }> {
    if (!id) {
        return {
            error: {
                code: 500,
                message: new ProvidedParamsError("id"),
            },
            isDeleted: false,
        };
    }

    const isDeleted = await this.deleteNoteRepository.delete(id)


    return {
        isDeleted: true,
        error: null
    }
  }
}

describe("Delete Note Use Case", () => {
    it("should change the status of note 'Active' to 'Trash'", async () => {
        const sut = new DeleteNoteUseCase();
        const MOCK_NOTE_ID = '1'

        const {isDeleted} = await sut.delete(MOCK_NOTE_ID)

        expect(isDeleted).toBeTruthy()
    })

  it("should return 500 if no id of note is provided", async () => {
    const sut = new DeleteNoteUseCase();

    const { error } = await sut.delete("");

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: id, not provided");
  });
});
