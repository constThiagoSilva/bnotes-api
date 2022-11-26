import { ProvidedParamsError } from "../../domain/helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { DatabaseSpy } from "../../domain/repositories/mocks/repository/DatabaseSpy";
import { SaveNotesRepository } from "../../domain/repositories/saveNotesRepository/SaveNotesRepository";
import { UpdateNotesRepository } from "../../domain/repositories/updateNotesRepository/UpdateNotesRepository";
import { ISaveNotesUseCase } from "../../domain/usecases/saveNotesUseCase/interfaces/usecases/ISaveNotesUseCase";
import { SaveNotesUseCase } from "../../domain/usecases/saveNotesUseCase/SaveNotesUseCase";
import { IHttpRequest } from "../helpers/http/IHttpRequest";
import { IHttpResponse } from "../helpers/http/IHttpResponse";

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