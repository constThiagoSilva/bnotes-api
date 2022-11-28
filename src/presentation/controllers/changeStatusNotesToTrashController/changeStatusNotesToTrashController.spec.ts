import { Note } from "../../../core/models/Note";
import { IHttpRequest } from "../../helpers/http/IHttpRequest";
import { saveNotesController } from "../saveNotesController/helper/instanceSaveNotesController";
import {makeSut} from './factories/sutFactory'

describe("Change Status Note to Trash Controller", () => {
  it("should change status notes to trash and return a note in response, with code 200", async () => {
    const {sut} = makeSut()
    const request: IHttpRequest = {
      body: null,
      params: {
        noteId: "1",
      },
    };
    const mockCreateNotes: IHttpRequest = {
        body: {
          author: "any_author",
          title: "any_title",
          content: "any_content",
        },
        params: {},
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

    await saveNotesController.route(mockCreateNotes)
    const response = await sut.route(request);

    expect(response.response.trashedNote).toEqual(responseResult);
    expect(response.code).toBe(200)
  });
  it('should return and error with code 400 if note id is note provided', async () => {
    const {sut} = makeSut()
    const request: IHttpRequest = {
      body: null,
      params: {
        noteId: "",
      },
    };

    const response = await sut.route(request);

    expect(response.error).toBeTruthy();
    expect(response.error?.message.message).toBe("parameter: noteId, not provided");
    expect(response.code).toBe(400)
  })
  it('should return an error if dependecies disparates an error', async () => {
    const {sut} = makeSut()
    const request: IHttpRequest = {
      body: null,
      params: {
        noteId: "0",
      },
    };

    const response = await sut.route(request);

    expect(response.error).toBeTruthy()
  })
});
