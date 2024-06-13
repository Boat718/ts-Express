import { ErrorCodes, HttpException } from "./root";

export class InternalException extends HttpException {
    constructor(message:string, statusCode:number, errorCode:ErrorCodes, errors:any) {
        super(message, 500, errorCode, errors)
    }
}