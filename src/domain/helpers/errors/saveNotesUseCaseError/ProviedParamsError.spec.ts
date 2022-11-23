import { ProvidedParamsError } from "./ProviedParamsError"

describe('ProvidedParamsError Class Error', () => {
    it('should throw an error', () => {
        const sut = () => {throw new ProvidedParamsError('any')}

        expect(sut).toThrowError(new ProvidedParamsError('any'))
    })
    it('should return a message: parameter: any, not provided', () => {
        const sut = new ProvidedParamsError('any')

        expect(sut.message).toBe("parameter: any, not provided")
    })
})