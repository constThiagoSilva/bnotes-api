import { ProvidedParamsError } from "./ProviedParamsError"

describe('ProvidedParamsError Class Error', () => {
    it.only('should throw an error', () => {
        const sut = () => {throw new ProvidedParamsError('any')}

        expect(sut).toThrowError(new ProvidedParamsError('any'))
    })
})