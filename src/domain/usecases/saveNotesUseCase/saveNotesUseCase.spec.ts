class SaveNotesUseCase implements ISaveNotesUseCase{
    constructor(private saveNotesRepository: SaveNotesRepository) {}

    async save(newNote: string) {
        const savedNote = this.saveNotesRepository.save(newNote)

        return savedNote
    }
}
class SaveNotesRepositorySpy implements SaveNotesRepository {
    async save(newNote: string): Promise<Note> {
        return {
            content: newNote,
            createAt: new Date()
        }
    }
}


interface ISaveNotesUseCase {
    save(newNote: string): Promise<Note>
}

interface SaveNotesRepository {
    save(newNote: string): Promise<Note>
}

interface Note {
    content: string;
    createAt: Date;
}

const makeSut = () => {
    const saveNotesRepository = new SaveNotesRepositorySpy()
    const sut = new SaveNotesUseCase(saveNotesRepository)

    return {sut, saveNotesRepository}
}

describe('Save Notes Use Case', () => {
    it('should save a new note', async () => {
        const {sut} = makeSut()
        const aNewNote = 'aNewNote'

        const aSavedNewNote = await sut.save(aNewNote)

        expect(aSavedNewNote.content).toBe(aNewNote)
    })
})