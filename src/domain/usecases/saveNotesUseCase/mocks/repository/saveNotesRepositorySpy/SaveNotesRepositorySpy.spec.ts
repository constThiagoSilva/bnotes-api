import { Note } from "../../../../../models/Note"
import { NewNote } from "../../../interfaces/iNewNote"
import { SaveNotesRepositorySpy } from "./SaveNotesRepositorySpy"

describe('Save Notes Repository Spy',() => {
    it('should return 500 if author parameter is not provided correctly', async () => {
        const sut = new SaveNotesRepositorySpy()
        const MOCK_NOTE: NewNote = {
            author: '',
            title: 'any_title',
            content: 'any_content'
        }

        const {error} = await sut.save(MOCK_NOTE)

        expect(error?.code).toBe(500)
        expect(error?.message.message).toBe('Parameter author not provided')
    })
    it('should return 500 if title parameter is not provided correctly', async () => {
        const sut = new SaveNotesRepositorySpy()
        const MOCK_NOTE: NewNote = {
            author: 'any_author',
            title: '',
            content: 'any_content'
        }

        const {error} = await sut.save(MOCK_NOTE)

        expect(error?.code).toBe(500)
        expect(error?.message.message).toBe('Parameter title not provided')
    })
    it('should return 500 if content parameter is not provided correctly', async () => {
        const sut = new SaveNotesRepositorySpy()
        const MOCK_NOTE: NewNote = {
            author: 'any_author',
            title: 'any_title',
            content: ''
        }

        const {error} = await sut.save(MOCK_NOTE)

        expect(error?.code).toBe(500)
        expect(error?.message.message).toBe('Parameter content not provided')
    })
    it('should getNote return same note passed in parameters', async () => {
        const sut = new SaveNotesRepositorySpy()
        const MOCK_NOTE: NewNote = {
            author: 'any_author',
            title: 'any_title',
            content: 'any_content'
        }

        const MOCK_NEW_NOTE: Note = {
            id: '1',
            author: 'any_author',
            title: 'any_title',
            content: 'any_content',
            updateAt: null,
            createAt: new Date(),
            status: "Active"
        }

        const {note} = await sut.save(MOCK_NOTE)
        const noteId = String(note?.id)

        
        expect(sut.getNoteById(noteId)?.id).toBe(MOCK_NEW_NOTE.id)
        expect(sut.getNoteById(noteId)?.author).toBe(MOCK_NEW_NOTE.author)
        expect(sut.getNoteById(noteId)?.title).toBe(MOCK_NEW_NOTE.title)
        expect(sut.getNoteById(noteId)?.content).toBe(MOCK_NEW_NOTE.content)
    })
    it('should return a note with passed in parameters', async () => {
        const sut = new SaveNotesRepositorySpy()
        const MOCK_NOTE: NewNote = {
            author: 'any_author',
            title: 'any_title',
            content: 'any_content'
        }

        const MOCK_NEW_NOTE: Note = {
            id: '1',
            author: 'any_author',
            title: 'any_title',
            content: 'any_content',
            updateAt: null,
            createAt: new Date(),
            status: 'Active'
        }
        
        const {note} = await sut.save(MOCK_NOTE)
        

        expect(note?.id).toBe(MOCK_NEW_NOTE.id)
        expect(note?.author).toBe(MOCK_NEW_NOTE.author)
        expect(note?.title).toBe(MOCK_NEW_NOTE.title)
        expect(note?.content).toBe(MOCK_NEW_NOTE.content)
    })
})