import { ProvidedParamsError } from "../../domain/helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { Note } from "../../domain/models/Note";
import { DatabaseSpy } from "../../domain/repositories/mocks/repository/DatabaseSpy";
import { SaveNotesRepository } from "../../domain/repositories/saveNotesRepository/SaveNotesRepository";
import { UpdateNotesRepository } from "../../domain/repositories/updateNotesRepository/UpdateNotesRepository";
import { SaveNotesUseCase } from "../../domain/usecases/saveNotesUseCase/SaveNotesUseCase";

interface HttpResponseError {
  message: Error;
}

interface HttpRequest {
  body: any;
}
interface HttpResponse {
  response: { note: Note | null };
  code: number;
  error: HttpResponseError | null;
}

class SaveNotesController {
  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { author, title, content } = httpRequest.body;

    if (!author) {
      return {
        response: {
          note: null,
        },
        code: 500,
        error: {
          message: new ProvidedParamsError("author"),
        },
      };
    } else if (!title) {
      return {
        response: {
          note: null,
        },
        code: 500,
        error: {
          message: new ProvidedParamsError("title"),
        },
      };
    } else if (!content) {
      return {
        response: {
          note: null,
        },
        code: 500,
        error: {
          message: new ProvidedParamsError("content"),
        },
      };
    }

    const { note } = await new SaveNotesUseCase(
      new SaveNotesRepository(new DatabaseSpy()),
      new UpdateNotesRepository(new DatabaseSpy())
    ).save({ author, content, title });

    return {
      response: { note },
      code: 200,
      error: null,
    };
  }
}

describe("Save Notes Controller", () => {
  it("should return a created note in response, with 200 code", async () => {
    const sut = new SaveNotesController();
    const requestBody = {
      body: {
        author: "any_author",
        title: "any_title",
        content: "any_content",
      },
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

  it("should return error 500 if author is not provided, and error with message: parameter: author, not provided", async () => {
    const sut = new SaveNotesController();
    const requestBody = {
      body: {
        author: "",
        title: "any_title",
        content: "any_content",
      },
    };

    const response = await sut.route(requestBody);

    expect(response.code).toBe(500);
    expect(response.error?.message.message).toBe(
      "parameter: author, not provided"
    );
  });
  it("should return error 500 if title is not provided, and error with message: parameter: author, not provided", async () => {
    const sut = new SaveNotesController();
    const requestBody = {
      body: {
        author: "any_author",
        title: "",
        content: "any_content",
      },
    };

    const response = await sut.route(requestBody);

    expect(response.code).toBe(500);
    expect(response.error?.message.message).toBe(
      "parameter: title, not provided"
    );
  });
  it("should return error 500 if content is not provided, and error with message: parameter: author, not provided", async () => {
    const sut = new SaveNotesController();
    const requestBody = {
      body: {
        author: "any_author",
        title: "any_title",
        content: "",
      },
    };

    const response = await sut.route(requestBody);

    expect(response.code).toBe(500);
    expect(response.error?.message.message).toBe(
      "parameter: content, not provided"
    );
  });
});
