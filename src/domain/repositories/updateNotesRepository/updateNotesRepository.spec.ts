import { Note } from "../../models/Note"
import { NewNote } from "../../usecases/saveNotesUseCase/interfaces/iNewNote"
import { DatabaseSpy } from "../mocks/repository/DatabaseSpy"
import { Database } from "../mocks/repository/interfaces/Database"

interface IUpdateNotesRepository {
    updateNote(noteId: string, newNote: NewNote): Promise<Note | null>
}

class UpdateNotesRepository implements IUpdateNotesRepository{
    constructor (private databaseSpy: Database) {}

    async updateNote(noteId: string, newNote: NewNote): Promise<Note | null> {
        const updatedNote = await this.databaseSpy.update(noteId, newNote)

        return updatedNote
    }
}

describe('Update Notes Repository', () => {
    it('should update a exist note', async () => {
        const databaseSpy = new DatabaseSpy()
        const sut = new UpdateNotesRepository(databaseSpy)
        const mockNoteId = '1'
        const mockNewNote: NewNote = {
            author: 'any_author',
            content: 'any_content',
            title: 'any_title'
        }
        const mockUpdateNote: NewNote = {
            author: 'any_author',
            content: 'other_content',
            title: 'other_title'
        }
        const mockUpdatedNote: Note = {
            id: '1',
            author: 'any_author',
            content: 'other_content',
            title: 'other_title',
            status: 'Active',
            createAt: new Date("2022-10-31"),
            updateAt: new Date("2022-10-31"),
        }

        await databaseSpy.create(mockNewNote)
        const updatedNote = await sut.updateNote(mockNoteId, mockUpdateNote)

        expect(updatedNote).toEqual(mockUpdatedNote)
    })
})