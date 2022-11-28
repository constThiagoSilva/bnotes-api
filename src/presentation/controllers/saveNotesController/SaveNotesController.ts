import { ISaveNotesUseCase } from "../../../domain/usecases/saveNotesUseCase/interfaces/usecases/ISaveNotesUseCase";
import { IHttpRequest } from "../../helpers/http/IHttpRequest";
import { IHttpResponse } from "../../helpers/http/IHttpResponse";
import { ProvidedParamsError } from "../../../domain/helpers/errors/saveNotesUseCaseError/ProviedParamsError";
import { IController } from "../interfaces/IController";

export class SaveNotesController implements IController{
    constructor (private  saveNotesUseCase: ISaveNotesUseCase) {}

    async route(httpRequest: IHttpRequest): Promise<IHttpResponse> {
      const { author, title, content } = httpRequest.body;
      const {noteId} = httpRequest.params
  
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
  
      if (noteId) {
        const { note } = await this.saveNotesUseCase.save({ author, content, title }, noteId);

        return {
          response: { note },
          code: 200,
          error: null,
        };
      }


      const { note } = await this.saveNotesUseCase.save({ author, content, title }, noteId);
  
      return {
        response: { note },
        code: 200,
        error: null,
      };
    }
  }