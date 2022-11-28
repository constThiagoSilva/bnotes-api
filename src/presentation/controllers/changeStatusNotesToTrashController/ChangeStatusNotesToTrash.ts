import { ProvidedParamsError } from "../../../core/helpers/errors/saveNotesUseCaseError/ProvidedParamsError";
import { IChangeStatusNotesToTrashUseCase } from "../../../core/usecases/changeStatusNotesToTrashUseCase/interfaces/IChangeStatusNotesToTrashUseCase";
import { IHttpRequest } from "../../helpers/http/IHttpRequest";
import { IHttpResponse } from "../../helpers/http/IHttpResponse";
import { IController } from "../interfaces/IController";

export class ChangeStatusNoteToTrashController implements IController {
  constructor(
    private statusNoteToTrashUseCase: IChangeStatusNotesToTrashUseCase
  ) {}

  async route(request: IHttpRequest): Promise<IHttpResponse> {
    const { noteId } = request.params;

    if (!noteId)
      return {
        error: {
          message: new ProvidedParamsError("noteId"),
        },
        code: 400,
        response: null,
      };

    const { trashedNote, error } =
      await this.statusNoteToTrashUseCase.changeStatusNotesToTrashUseCase(
        noteId
      );

    if (error)
      return {
        error: error,
        code: error.code,
        response: null,
      };

    return {
      response: { trashedNote },
      code: 200,
      error: null,
    };
  }
}
