import { Note } from "../../models/Note"

interface IChangeStatusNotesToTrash {
    changeStatusToTrash(noteId: string): Promise<Note | null>
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
    changeStatusToTrash(noteId: string): Promise<Note | null> {
        const trashedNote = new DatabaseSpy().changeStatusToTrash(noteId)

        return trashedNote
    }
}

describe('Delete Notes Repository', () => {
    it('should delete a note with id', async () => {
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

        const trashedNote = await sut.changeStatusToTrash(MOCK_NOTE.id)

        expect(trashedNote?.status).toBe('Trash')
    })
})