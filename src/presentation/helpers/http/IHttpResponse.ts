import { IHttpResponseError } from './errors/IHttpResponseError'

export interface IHttpResponse {
  response: any;
  code: number;
  error: IHttpResponseError | null;
}
