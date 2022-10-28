class SaveNotesUseCase implements ISaveNotesUseCase{
    async save(newNote: string) {
        throw new Error('not implmented')
    }
}

interface ISaveNotesUseCase {
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