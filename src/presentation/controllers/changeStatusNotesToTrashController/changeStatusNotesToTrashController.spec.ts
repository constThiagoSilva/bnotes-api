import { Note } from "../../../domain/models/Note";
import { ChangeStatusNotesToTrashRepository } from "../../../domain/repositories/changeStatusNotesToTrashRepository/ChangeStatusNotesToTrashRepository";
import { DatabaseSpy } from "../../../domain/repositories/mocks/repository/DatabaseSpy";
import { IChangeStatusNotesToTrashUseCase } from "../../../domain/usecases/changeStatusNotesToTrashUseCase/interfaces/IChangeStatusNotesToTrashUseCase";
import { IHttpRequest } from "../../helpers/http/IHttpRequest";
import { IHttpResponse } from "../../helpers/http/IHttpResponse";
import { IController } from "../interfaces/IController";
import {ChangeStatusNotesToTrashUseCase} from '../../../domain/usecases/changeStatusNotesToTrashUseCase/ChangeStatusNotesToTrashUseCase'
import { GetAllNotesUseCase } from "../../../domain/usecases/getAllNotesUseCase/GetAllNotesUseCase";
import { GetAllNotesRepository } from "../../../domain/repositories/getAllNotesRepository/GetAllNotesRepository";
import { SaveNotesController } from "../saveNotesController/SaveNotesController";
import { SaveNotesUseCase } from "../../../domain/usecases/saveNotesUseCase/SaveNotesUseCase";
import { SaveNotesRepository } from "../../../domain/repositories/saveNotesRepository/SaveNotesRepository";
import { UpdateNotesRepository } from "../../../domain/repositories/updateNotesRepository/UpdateNotesRepository";
import { ProvidedParamsError } from "../../../domain/helpers/errors/saveNotesUseCaseError/ProviedParamsError";

class StatusNoteToTrashController implements IController {
    constructor (private statusNoteToTrashUseCase: IChangeStatusNotesToTrashUseCase) {}

  async route(request: IHttpRequest): Promise<IHttpResponse> {
    const {noteId} = request.params

    if (!noteId) return {
        error: {
            message: new ProvidedParamsError('noteId')
        },
        code: 400,
        response: null
    }

    const {trashedNote} = await this.statusNoteToTrashUseCase.changeStatusNotesToTrashUseCase(noteId)

    return {
      response: {trashedNote},
      code: 200,
      error: null,
    };
  }
}

const makeSut = () => {
    const databaseSpy = new DatabaseSpy()
    const changeStatusNotesToTrashRepository = new ChangeStatusNotesToTrashRepository(databaseSpy)
    const changeStatusNotesToTrashUseCase = new ChangeStatusNotesToTrashUseCase(changeStatusNotesToTrashRepository)
    const sut = new StatusNoteToTrashController(changeStatusNotesToTrashUseCase);

    const saveNotesController = new SaveNotesController(
        new SaveNotesUseCase(
          new SaveNotesRepository(databaseSpy),
          new UpdateNotesRepository(databaseSpy)
        )
      );

    return {sut, saveNotesController}
}

describe("Change Status Note to Trash Controller", () => {
  it("should change status notes to trash and return a note in response, with code 200", async () => {
    const {sut,saveNotesController} = makeSut()
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
        params: null,
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
    const {sut,saveNotesController} = makeSut()
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
});
