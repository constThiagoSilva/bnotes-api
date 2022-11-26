import { Note } from "../../../domain/models/Note"
import { IHttpRequest } from "../../helpers/http/IHttpRequest"

class GetAllNotesController {
    async route(request: IHttpRequest) {
        const {author} = request.params

        return [
            {
                author: author,
                id: "1",
                title: "any_title",
                content: "any_content",
                createAt: new Date("2022-10-31"),
                updateAt: new Date("2022-10-31"),
                status: 'Active',
              },
              {
                author: author,
                id: "2",
                title: "any_title",
                content: "any_content",
                createAt: new Date("2022-10-31"),
                updateAt: new Date("2022-10-31"),
                status: 'Active'
              },
        ]
    }
}

describe('Get All Notes Controller', () => {
    it('should return a list of notes in response, with 200 code', async () => {
        const sut = new GetAllNotesController()
        const request: IHttpRequest = {
            params: {
                author: 'any_author'
            },
            body: null
        }
        const mockCreateNotes: Note[] = [
            {
                author: request.params.author,
                id: "1",
                title: "any_title",
                content: "any_content",
                createAt: new Date("2022-10-31"),
                updateAt: new Date("2022-10-31"),
                status: 'Active',
              },
              {
                author: request.params.author,
                id: "2",
                title: "any_title",
                content: "any_content",
                createAt: new Date("2022-10-31"),
                updateAt: new Date("2022-10-31"),
                status: 'Active'
              },
        ]
        const responseResult = [
            {
                author: request.params.author,
                id: "1",
                title: "any_title",
                content: "any_content",
                createAt: new Date("2022-10-31"),
                updateAt: new Date("2022-10-31"),
                status: 'Active',
              },
              {
                author: request.params.author,
                id: "2",
                title: "any_title",
                content: "any_content",
                createAt: new Date("2022-10-31"),
                updateAt: new Date("2022-10-31"),
                status: 'Active'
              },
        ]

        const response = await sut.route(request)

        expect(response).toEqual(responseResult)

    })
})