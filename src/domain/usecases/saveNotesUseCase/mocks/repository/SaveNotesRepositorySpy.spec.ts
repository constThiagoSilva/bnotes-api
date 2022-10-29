import { NewNote } from "../../interfaces/iNewNote"
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
})