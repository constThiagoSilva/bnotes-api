import { ISaveNotesUseCase } from "../../../domain/usecases/saveNotesUseCase/interfaces/usecases/ISaveNotesUseCase";
import { IHttpRequest } from "../../helpers/http/IHttpRequest";
import { IHttpResponse } from "../../helpers/http/IHttpResponse";
import { ProvidedParamsError } from "../../../domain/helpers/errors/saveNotesUseCaseError/ProviedParamsError";

export class SaveNotesController {
    constructor (private  saveNotesUseCase: ISaveNotesUseCase) {}

    async route(httpRequest: IHttpRequest): Promise<IHttpResponse> {
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
  
      const { note } = await this.saveNotesUseCase.save({ author, content, title });
  
      return {
        response: { note },
        code: 200,
        error: null,
      };
    }
  }