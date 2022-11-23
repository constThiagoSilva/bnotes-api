import { ProvidedParamsError } from "./ProviedParamsError"
import { ThrowSaveNotesError } from "./ThrowSaveNotesError"

describe('Throw Save Notes Error', () => {
    it('should return an error 500 with message: parameter: author, not provided, if author is not provided', () => {
        const sut = ThrowSaveNotesError({author: '', content: 'any_content', title: 'any_title'})

        expect(sut?.code).toBe(500)
        expect(sut?.message.message).toBe("parameter: author, not provided")
    })
})