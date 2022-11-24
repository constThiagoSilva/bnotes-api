import { ChangeStatusNotesToTrashRepository } from "./ChangeStatusNotesToTrashRepository"
import { Note } from "../../models/Note"

describe('Change Status Notes To Trash Repository', () => {
    it('should change status note to trash with id', async () => {
        const sut = new ChangeStatusNotesToTrashRepository()
        const mockFakeNote: Note = {
            id: '1',
            author: 'any_author',
            content: 'any_content',
            title: 'any_title',
            status: 'Active',
            createAt: new Date('2020-01-10'),
            updateAt: new Date('2020-01-10'),
        }

        const {trashedNote} = await sut.changeStatusToTrash(mockFakeNote.id)

        expect(trashedNote?.status).toBe('Trash')
    })
    it('should return 500 if noteId not provided', async () => {
        const sut = new ChangeStatusNotesToTrashRepository()

        const {error} = await sut.changeStatusToTrash('')

        expect(error?.code).toBe(500)
        expect(error?.message.message).toBe('parameter: noteId, not provided')
    })
    it('should an error with message: note not exists, if note-id provided not exist', async () => {
        const sut = new ChangeStatusNotesToTrashRepository()
        const mockNotExistingNoteId = 'not_exists_note_id'

        const {error} = await sut.changeStatusToTrash(mockNotExistingNoteId)

        expect(error?.message.message).toBe('note not exists!')
    })
})