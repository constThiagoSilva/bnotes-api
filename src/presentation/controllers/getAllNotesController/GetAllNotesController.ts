import { ProvidedParamsError } from "../../../domain/helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { IGetAllNotesUseCase } from "../../../domain/usecases/getAllNotesUseCase/interfaces/IGetAllNotesUseCase";
import { IHttpRequest } from "../../helpers/http/IHttpRequest";
import { IHttpResponse } from "../../helpers/http/IHttpResponse";

export class GetAllNotesController {
  constructor(private getAllNotesUseCase: IGetAllNotesUseCase) {}

  async route(request: IHttpRequest): Promise<IHttpResponse> {
    const { author } = request.params;

    if (!author)
      return {
        response: null,
        code: 400,
        error: {
          message: new ProvidedParamsError("author"),
        },
      };

    const { notes, error } = await this.getAllNotesUseCase.getAllNotes(author);

    if (error)
      return {
        error: error,
        code: error.code,
        response: null,
      };

    return {
      response: { notes },
      code: 200,
      error: null,
    };
  }
}
