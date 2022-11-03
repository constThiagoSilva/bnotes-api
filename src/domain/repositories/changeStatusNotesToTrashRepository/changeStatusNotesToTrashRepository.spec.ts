import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError";
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../models/Note"

interface IChangeStatusNotesToTrash {
    changeStatusToTrash(noteId: string): Promise<{trashedNote: Note | null, error: IError | null}>
}
interface Database {
    changeStatusToTrash(noteId: string): Promise<Note | null>
}

class DatabaseSpy implements Database{
    private notes: Note[] = [
        {
            id: '1',
            author: 'any_author',
            content: 'any_content',
            title: 'any_title',
            status: 'Active',
            createAt: new Date('2020-01-10'),
            updateAt: new Date('2020-01-10'),
        },
        {
            id: '2',
            author: 'any_author',
            content: 'any_content',
            title: 'any_title',
            status: 'Active',
            createAt: new Date('2020-01-10'),
            updateAt: new Date('2020-01-10'),
        }
    ]


    async changeStatusToTrash(noteId: string): Promise<Note | null> {
        const note = this.notes.find(note => note.id === noteId);

        if (!note) {
            return null
        }

        note.status = 'Trash'

        return note
    }
}

class ChangeStatusNotesToTrash implements IChangeStatusNotesToTrash{
    async changeStatusToTrash(noteId: string): Promise<{trashedNote: Note | null, error: IError | null}> {
        if (!noteId) {
            return {
                error: {
                    code: 500,
                    message: new ProvidedParamsError('noteId')
                },
                trashedNote: null
            }
        }

        const trashedNote = await new DatabaseSpy().changeStatusToTrash(noteId)

        return {
            trashedNote,
            error: null,
        }
    }
}

describe('Change Status Notes To Trash Repository', () => {
    it('should change status note to trash with id', async () => {
        const sut = new ChangeStatusNotesToTrash()
        const MOCK_NOTE: Note = {
            id: '1',
            author: 'any_author',
            content: 'any_content',
            title: 'any_title',
            status: 'Active',
            createAt: new Date('2020-01-10'),
            updateAt: new Date('2020-01-10'),
        }

        const {trashedNote} = await sut.changeStatusToTrash(MOCK_NOTE.id)

        expect(trashedNote?.status).toBe('Trash')
    })
    it('should return 500 if noteId not provided', async () => {
        const sut = new ChangeStatusNotesToTrash()

        const {error} = await sut.changeStatusToTrash('')

        expect(error?.code).toBe(500)
        expect(error?.message.message).toBe('parameter: noteId, not provided')
    })
})