import { IHttpRequest } from "../../helpers/http/IHttpRequest";
import { IHttpResponse } from "../../helpers/http/IHttpResponse";

export interface IController {
    route(request: IHttpRequest): Promise<IHttpResponse>
}