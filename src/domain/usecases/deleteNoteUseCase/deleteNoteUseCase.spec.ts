import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note";

interface IDeleteNoteUseCase {
  delete(id: string): Promise<{ error: IError | null; deleteNote: Note | null }>;
}

interface DeleteNoteRepository {
    delete(id: string): Promise<Note | null>
}

class DeleteNoteRepositorySpy implements DeleteNoteRepository{
    async delete(id: string): Promise<Note | null> {
        return {
            author: 'any_author',
            content: 'any_content',
            id: '1',
            title: 'any_title',
            status: 'Trash',
            updateAt: new Date('2022-10-31'),
            createAt: new Date('2022-10-31'),
        }
    }
}

class DeleteNoteUseCase implements IDeleteNoteUseCase {
    constructor(private deleteNoteRepository: DeleteNoteRepository) {}

  async delete(id: string): Promise<{ error: IError | null; deleteNote: Note | null }> {
    if (!id) {
        return {
            error: {
                code: 500,
                message: new ProvidedParamsError("id"),
            },
            deleteNote: null,
        };
    }

    const isDeleted = await this.deleteNoteRepository.delete(id)


    return {
        deleteNote: isDeleted,
        error: null
    }
  }
}

const makeSut = () => {
    const deleteNoteRepository = new DeleteNoteRepositorySpy()
    const sut = new DeleteNoteUseCase(deleteNoteRepository);

    return {sut, deleteNoteRepository}
}

describe("Delete Note Use Case", () => {
    it("should change the status of note 'Active' to 'Trash'", async () => {
        const {sut} = makeSut()
        const MOCK_NOTE_ID = '1'

        const {deleteNote} = await sut.delete(MOCK_NOTE_ID)

        expect(deleteNote?.status).toBe('Trash')
    })

  it("should return 500 if no id of note is provided", async () => {
    const {sut} = makeSut()

    const { error } = await sut.delete("");

    expect(error?.code).toBe(500);
    expect(error?.message.message).toBe("parameter: id, not provided");
  });
});
