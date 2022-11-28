import { IHttpRequest } from "../../helpers/http/IHttpRequest";
import { IHttpResponse } from "../../helpers/http/IHttpResponse";
import { makeSut } from "./factories/sutFactory";

describe("Save Notes Controller", () => {
  it("should return a created note in response, with 200 code", async () => {
    const sut = makeSut();
    const requestBody: IHttpRequest = {
      body: {
        author: "any_author",
        title: "any_title",
        content: "any_content",
      },
      params: null,
    };
    const responseBody = {
      id: "1",
      author: "any_author",
      title: "any_title",
      content: "any_content",
      updateAt: new Date("2022-10-31"),
      createAt: new Date("2022-10-31"),
      status: "Active",
    };

    const response = await sut.route(requestBody);

    expect(response.response.note).toEqual(responseBody);
  });
  it("should update an existig note", async () => {
    const sut = makeSut();
    const createNote: IHttpRequest = {
      body: {
        author: "any_author",
        title: "any_title",
        content: "any_content",
      },
      params: null,
    };
    const updateNote: IHttpRequest = {
      body: {
        author: "any_author",
        title: "other_title",
        content: "other_content",
      },
      params: {
        noteId: "1",
      },
    };
    const responseBody: IHttpResponse = {
      code: 200,
      error: null,
      response: {
        noteId: {
          id: "1",
          author: "any_author",
          title: "other_title",
          content: "other_content",
          updateAt: new Date("2022-10-31"),
          createAt: new Date("2022-10-31"),
          status: "Active",
        },
      },
    };

    await sut.route(createNote);
    const response = await sut.route(updateNote);

    expect(response.response).toEqual(responseBody)
  });

  it("should return error 500 if author is not provided, and error with message: parameter: author, not provided", async () => {
    const sut = makeSut();
    const requestBody: IHttpRequest = {
      body: {
        author: "",
        title: "any_title",
        content: "any_content",
      },
      params: null,
    };

    const response = await sut.route(requestBody);

    expect(response.code).toBe(500);
    expect(response.error?.message.message).toBe(
      "parameter: author, not provided"
    );
  });
  it("should return error 500 if title is not provided, and error with message: parameter: author, not provided", async () => {
    const sut = makeSut();
    const requestBody: IHttpRequest = {
      body: {
        author: "any_author",
        title: "",
        content: "any_content",
      },
      params: null,
    };

    const response = await sut.route(requestBody);

    expect(response.code).toBe(500);
    expect(response.error?.message.message).toBe(
      "parameter: title, not provided"
    );
  });
  it("should return error 500 if content is not provided, and error with message: parameter: author, not provided", async () => {
    const sut = makeSut();
    const requestBody: IHttpRequest = {
      body: {
        author: "any_author",
        title: "any_title",
        content: "",
      },
      params: null,
    };

    const response = await sut.route(requestBody);

    expect(response.code).toBe(500);
    expect(response.error?.message.message).toBe(
      "parameter: content, not provided"
    );
  });
});
