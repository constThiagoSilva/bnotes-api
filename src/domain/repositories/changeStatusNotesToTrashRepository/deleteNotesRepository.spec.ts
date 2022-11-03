class ChangeStatusNotesToTrash {

}

describe('Delete Notes Repository', () => {
    it('should delete a note with id', async () => {
        const sut = new ChangeStatusNotesToTrash()
        const MOCK_NOTE_ID = '1'

        sut.delete()
    })
})