import { Note } from "../../../domain/models/Note";
import { IHttpRequest } from "../../helpers/http/IHttpRequest";
import { IHttpResponse } from "../../helpers/http/IHttpResponse";
import { IController } from "../interfaces/IController";

class StatusNoteToTrashController implements IController {
  async route(request: IHttpRequest): Promise<IHttpResponse> {
    return {
      response: {
        id: "1",
        author: "any_author",
        title: "any_title",
        content: "any_content",
        updateAt: new Date("2022-10-31"),
        createAt: new Date("2022-10-31"),
        status: "Trash",
      },
      code: 200,
      error: null,
    };
  }
}

describe("Change Status Note to Trash Controller", () => {
  it("should change status notes to trash and return a note in response, with code 200", async () => {
    const sut = new StatusNoteToTrashController();
    const request: IHttpRequest = {
      body: null,
      params: {
        noteId: "1",
      },
    };
    const responseResult: Note = {
      id: "1",
      author: "any_author",
      title: "any_title",
      content: "any_content",
      updateAt: new Date("2022-10-31"),
      createAt: new Date("2022-10-31"),
      status: "Trash",
    };

    const response = await sut.route(request);

    expect(response.response).toEqual(responseResult);
    expect(response.code).toBe(200)
  });
});
