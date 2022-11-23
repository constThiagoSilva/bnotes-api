import { NewNote } from "../../../usecases/saveNotesUseCase/interfaces/iNewNote"
import { ThrowSaveNotesError } from "./ThrowSaveNotesError"

const makeSut = (fakeNote: NewNote) => {
    const sut = ThrowSaveNotesError(fakeNote)

    return {sut}
}

describe('Throw Save Notes Error', () => {
    it('should return an error 500 with message: parameter: author, not provided, if author is not provided', () => {
        const {sut} = makeSut({author: '', content: 'any_content', title: 'any_title'})

        expect(sut?.code).toBe(500)
        expect(sut?.message.message).toBe("parameter: author, not provided")
    })
    it('should return an error 500 with message: parameter: content, not provided, if content is not provided', () => {
        const {sut} = makeSut({author: 'any_author', content: '', title: 'any_title'})

        expect(sut?.code).toBe(500)
        expect(sut?.message.message).toBe("parameter: content, not provided")
    })
})