class SaveNotesUseCase implements ISaveNotesUseCase{
    constructor(private saveNotesRepository: SaveNotesRepository) {}

    async save(newNote: NewNote) { 
        await this.saveNotesRepository.save(newNote)
    }
}
class SaveNotesRepositorySpy implements SaveNotesRepository {
    private note: Note | null = null;

    async save(newNote: NewNote): Promise<void> {
        this.note = {
            author: newNote.author,
            title: newNote.title,
            content: newNote.content,
            createAt: new Date()
        }
    }

    getNote() {
        return this.note
    }
}


interface ISaveNotesUseCase {
    save(newNote: NewNote): Promise<void>
}

interface SaveNotesRepository {
    save(newNote: NewNote): Promise<void>
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
        const {sut, saveNotesRepository} = makeSut()
        const aNewNote: NewNote = {
            author: 'any_author',
            title: 'any_title',
            content: 'any_content',
        }

        await sut.save(aNewNote)

        expect(saveNotesRepository.getNote).not.toBe(null)
    })
})