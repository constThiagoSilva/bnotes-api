class SaveNotesUseCase implements ISaveNotesUseCase{
    constructor(private saveNotesRepository: SaveNotesRepository) {}

    async save(newNote: NewNote) { 
        const savedNote = this.saveNotesRepository.save(newNote)

        return savedNote
    }
}
class SaveNotesRepositorySpy implements SaveNotesRepository {
    async save(newNote: NewNote): Promise<Note> {
        return {
            author: newNote.author,
            title: newNote.title,
            content: newNote.content,
            createAt: new Date(),

        }
    }
}


interface ISaveNotesUseCase {
    save(newNote: NewNote): Promise<Note>
}

interface SaveNotesRepository {
    save(newNote: NewNote): Promise<Note>
}

interface Note {
    author: string,
    title: string,
    content: string
    createAt: Date
}

interface NewNote {
    author: string,
    title: string,
    content: string
}

const makeSut = () => {
    const saveNotesRepository = new SaveNotesRepositorySpy()
    const sut = new SaveNotesUseCase(saveNotesRepository)

    return {sut, saveNotesRepository}
}

describe('Save Notes Use Case', () => {
    it('should save a new note', async () => {
        const {sut} = makeSut()
        const aNewNote: NewNote = {
            author: 'any_author',
            title: 'any_title',
            content: 'any_content',
        }

        const aSavedNewNote = await sut.save(aNewNote)

        expect(aSavedNewNote.content).toBe(aNewNote.content)
    })
})