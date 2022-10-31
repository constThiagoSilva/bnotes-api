import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError"
import { Note } from "../../models/Note"

interface IGetAllNotes {
    getAll(author: string): Promise<{notes: Promise<Note[]>, error: IError}>
}

class GetAllNotes implements IGetAllNotes {
    async getAll(author: string): Promise<{notes: Promise<Note[]>, error: string}> {
        throw new Error("Method not implemented.")
    }
}

describe('Get All Notes Use Case', () => {
    it('should return an 500 error if author not provided', async () => {
        const sut = new GetAllNotes()
        // const MOCK_AUTHOR_NOTES: Note[]  = [
        //     {author: 'any_author', id: '1', title: 'any_title', content: 'any_content', createAt: new Date('2022-31-10'), updateAt: new Date('2022-31-10')},
        //     {author: 'any_author', id: '2', title: 'any_title', content: 'any_content', createAt: new Date('2022-31-10'), updateAt: new Date('2022-31-10')},
        // ]

        const {error} = await sut.getAll('')

        expect(error.code).toBe(500)
    })
})