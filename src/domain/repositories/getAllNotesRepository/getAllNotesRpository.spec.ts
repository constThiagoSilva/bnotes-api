import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError"
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError"
import { Note } from "../../models/Note"

interface IGetAllNotesRepository {
    getAllNotes(author: string): Promise<{notes: Note[] | null, error: IError | null}>
}

class GetAllNotesRepository implements IGetAllNotesRepository{
    async getAllNotes(author: string): Promise<{notes: Note[] | null, error: IError | null}> {
        return {
            error: {
                code: 500,
                message: new ProvidedParamsError('author')
            },
            notes: null
        }
    }
}

describe('Get All Notes Repository', () => {
    it('if author not provided, retrun error 500', async () => {
        const sut = new GetAllNotesRepository()

        const {error} = await sut.getAllNotes('')

        expect(error?.code).toBe(500)
        expect(error?.message.message).toBe('parameter: author, not provided')
    })
})