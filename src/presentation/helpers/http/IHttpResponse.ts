import { Note } from "../../../domain/models/Note";
import { IHttpResponseError } from './errors/IHttpResponseError'

export interface IHttpResponse {
  response: { note: Note | null };
  code: number;
  error: IHttpResponseError | null;
}
