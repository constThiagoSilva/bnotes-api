import { IHttpRequest } from "../../helpers/http/IHttpRequest";
import {makeSut} from './factories/makeFactory'

describe("Get All Notes Controller", () => {
  it("should return a list of notes in response, with 200 code", async () => {
    const { sut, saveNotesController } = makeSut();
    const request: IHttpRequest = {
      params: {
        author: "any_author",
      },
      body: null,
    };
    const mockCreateNotes: IHttpRequest = {
      body: {
        author: "any_author",
        title: "any_title",
        content: "any_content",
      },
      params: null,
    };
    const responseResult = [
      {
        author: request.params.author,
        id: "1",
        title: "any_title",
        content: "any_content",
        createAt: new Date("2022-10-31"),
        updateAt: new Date("2022-10-31"),
        status: "Active",
      },
      {
        author: request.params.author,
        id: "2",
        title: "any_title",
        content: "any_content",
        createAt: new Date("2022-10-31"),
        updateAt: new Date("2022-10-31"),
        status: "Active",
      },
    ];

    await saveNotesController.route(mockCreateNotes);
    await saveNotesController.route(mockCreateNotes);

    const response = await sut.route(request);

    expect(response.response.notes).toEqual(responseResult);
    expect(response.code).toBe(200);
  });
  it("should return a 400 error if author is not provided", async () => {
    const { sut } = makeSut();
    const request: IHttpRequest = {
      body: null,
      params: {
        author: null,
      },
    };

    const response = await sut.route(request);

    expect(response.error?.message.message).toBe(
      "parameter: author, not provided"
    );
    expect(response.code).toBe(400);
  });
  it("should return an error if dependecies return an error", async () => {
    const { sut } = makeSut();
    const request: IHttpRequest = {
      params: {
        author: "any_author",
      },
      body: null,
    };

    const response = await sut.route(request);

    expect(response.error).toBeTruthy();
  });
});
