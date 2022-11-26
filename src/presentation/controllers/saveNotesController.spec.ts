import { DatabaseSpy } from "../../domain/repositories/mocks/repository/DatabaseSpy";
import { SaveNotesRepository } from "../../domain/repositories/saveNotesRepository/SaveNotesRepository";
import { UpdateNotesRepository } from "../../domain/repositories/updateNotesRepository/UpdateNotesRepository";
import { SaveNotesUseCase } from "../../domain/usecases/saveNotesUseCase/SaveNotesUseCase";
import { SaveNotesController } from "./SaveNotesController";

const makeSut = () => {
  const saveNotesController = new SaveNotesController(
    new SaveNotesUseCase(
      new SaveNotesRepository(new DatabaseSpy()),
      new UpdateNotesRepository(new DatabaseSpy())
    )
  );

  return saveNotesController;
};

describe("Save Notes Controller", () => {
  it("should return a created note in response, with 200 code", async () => {
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
