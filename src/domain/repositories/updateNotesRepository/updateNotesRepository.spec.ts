import { Note } from "../../models/Note"
import { NewNote } from "../../usecases/saveNotesUseCase/interfaces/iNewNote"

class UpdateNotesRepository {
    async updateNote(noteId: string, newNote: NewNote): Promise<Note | null> {
        return {
            id: '1',
            author: 'other_author',
            content: 'other_content',
            title: 'other_title',
            status: 'Active',
            createAt: new Date("2022-10-31"),
            updateAt: new Date("2022-10-31"),
        }
    }
}

describe('Update Notes Repository', () => {
    it('should update a exist note', async () => {
        const sut = new UpdateNotesRepository()
        const mockNoteId = '1'
        const mockUpdateNote: NewNote = {
            author: 'other_author',
            content: 'other_content',
            title: 'other_title'
        }
        const mockUpdatedNote: Note = {
            id: '1',
            author: 'other_author',
            content: 'other_content',
            title: 'other_title',
            status: 'Active',
            createAt: new Date("2022-10-31"),
            updateAt: new Date("2022-10-31"),
        }

        const updatedNote = await sut.updateNote(mockNoteId, mockUpdateNote)

        expect(updatedNote).toEqual(mockUpdatedNote)
    })
})