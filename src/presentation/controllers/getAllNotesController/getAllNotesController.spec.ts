import { Note } from "../../../domain/models/Note";
import { GetAllNotesRepository } from "../../../domain/repositories/getAllNotesRepository/GetAllNotesRepository";
import { DatabaseSpy } from "../../../domain/repositories/mocks/repository/DatabaseSpy";
import { SaveNotesRepository } from "../../../domain/repositories/saveNotesRepository/SaveNotesRepository";
import { UpdateNotesRepository } from "../../../domain/repositories/updateNotesRepository/UpdateNotesRepository";
import { GetAllNotesUseCase } from "../../../domain/usecases/getAllNotesUseCase/GetAllNotesUseCase";
import { IGetAllNotesUseCase } from "../../../domain/usecases/getAllNotesUseCase/interfaces/IGetAllNotesUseCase";
import { SaveNotesUseCase } from "../../../domain/usecases/saveNotesUseCase/SaveNotesUseCase";
import { IHttpRequest } from "../../helpers/http/IHttpRequest";
import { IHttpResponse } from "../../helpers/http/IHttpResponse";
import { SaveNotesController } from "../saveNotesController/SaveNotesController";

const makeSut = () => {
  const databaseSpy = new DatabaseSpy();
  const saveNotesController = new SaveNotesController(
    new SaveNotesUseCase(
      new SaveNotesRepository(databaseSpy),
      new UpdateNotesRepository(databaseSpy)
    )
  );
  const getAllNotesUseCase = new GetAllNotesUseCase(
    new GetAllNotesRepository(databaseSpy)
  );

  const sut = new GetAllNotesController(getAllNotesUseCase);

  return { sut, saveNotesController };
};

class GetAllNotesController {
  constructor(private getAllNotesUseCase: IGetAllNotesUseCase) {}

  async route(request: IHttpRequest): Promise<IHttpResponse> {
    const { author } = request.params;

    const { notes } = await this.getAllNotesUseCase.getAllNotes(author);

    return {
      response: { notes },
      code: 200,
      error: null,
    };
  }
}

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
    expect(response.code).toBe(200)
  });
});
