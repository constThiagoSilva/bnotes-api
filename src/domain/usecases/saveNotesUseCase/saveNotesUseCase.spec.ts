class SaveNotesUseCase implements ISaveNotesUseCase{
    async save(newNote: string) {
        const saveNotesRepository = new SaveNotesRepositorySpy()

        const savedNote = saveNotesRepository.save(newNote)

        return savedNote
    }
}
class SaveNotesRepositorySpy implements SaveNotesRepository {
    save(newNote: string): Promise<Note> {
        throw new Error("Method not implemented.")
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

describe('Save Notes Use Case', () => {
    it('should save a new note', async () => {
        const sut = new SaveNotesUseCase()
        const aNewNote = 'aNewNote'

        const aSavedNewNote = await sut.save(aNewNote)

        expect(aSavedNewNote).toBe(aNewNote)
    })
})