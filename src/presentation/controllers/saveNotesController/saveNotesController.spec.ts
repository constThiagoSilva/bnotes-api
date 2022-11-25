import { IError } from "../../../domain/helpers/errors/saveNotesUseCaseError/interfaces/IError"
import { ProvidedParamsError } from "../../../domain/helpers/errors/saveNotesUseCaseError/ProviedParamsError"
import { Note } from "../../../domain/models/Note"
import { SaveNotesRepositorySpy } from "../../../domain/usecases/saveNotesUseCase/mocks/repository/saveNotesRepositorySpy/SaveNotesRepositorySpy"
import { UpdateNotesRepositorySpy } from "../../../domain/usecases/saveNotesUseCase/mocks/repository/updateNotesRepositorySpy/UpdateNotesRepositorySpy"
import { SaveNotesUseCase } from "../../../domain/usecases/saveNotesUseCase/SaveNotesUseCase"

interface HttpResponseError {
    message: Error
}

interface HttpRequest {
    body: any
}
interface HttpResponse {
    response: {note: Note | null},
    code: number,
    error: HttpResponseError | null
}

class SaveNotesController {
    async route(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { author, title, content } = httpRequest.body

        if (!author) {
            return {
                response: {
                    note: null
                },
                code: 500,
                error: {
                    message: new ProvidedParamsError('author')
                }
            }
        } else if (!title) {
            return {
                response: {
                    note: null
                },
                code: 500,
                error: {
                    message: new ProvidedParamsError('title')
                }
            }
        } else if (!content) {
            return {
                response: {
                    note: null
                },
                code: 500,
                error: {
                    message: new ProvidedParamsError('content')
                }
            }
        }

        const {note} = await new SaveNotesUseCase(new SaveNotesRepositorySpy(), new UpdateNotesRepositorySpy()).save({author,content,title})

        return {
            response: {note},
            code: 200,
            error: null
        }
    }
}


describe('Save Notes Controller', () => {
    it('should return a created note in response, with 200 code', async () => {
        const sut = new SaveNotesController()
        const requestBody = {
            body: {
                author: 'any_author',
                title: 'any_title',
                content: 'any_content',
            }
        }
        const responseBody = {
            id: '1',
            author: 'any_author',
            title: 'any_title',
            content: 'any_content',
            updateAt: null,
            createAt: new Date('2022-10-10'),
            status: "Active"
        }


        const response = await sut.route(requestBody)

        expect(response.response.note).toEqual(responseBody)
    })

    it('should return error 500 if author is not provided, and error with message: parameter: author, not provided', async () => {
        const sut = new SaveNotesController()
        const requestBody = {
            body: {
                author: '',
                title: 'any_title',
                content: 'any_content',
            }
        }

        const response = await sut.route(requestBody)

        expect(response.code).toBe(500)
        expect(response.error?.message.message).toBe('parameter: author, not provided')
    })
    it('should return error 500 if title is not provided, and error with message: parameter: author, not provided', async () => {
        const sut = new SaveNotesController()
        const requestBody = {
            body: {
                author: 'any_author',
                title: '',
                content: 'any_content',
            }
        }

        const response = await sut.route(requestBody)

        expect(response.code).toBe(500)
        expect(response.error?.message.message).toBe('parameter: title, not provided')
    })
    it('should return error 500 if content is not provided, and error with message: parameter: author, not provided', async () => {
        const sut = new SaveNotesController()
        const requestBody = {
            body: {
                author: 'any_author',
                title: 'any_title',
                content: '',
            }
        }

        const response = await sut.route(requestBody)

        expect(response.code).toBe(500)
        expect(response.error?.message.message).toBe('parameter: content, not provided')
    })
})