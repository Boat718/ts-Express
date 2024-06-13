import { ErrorCodes, HttpException } from "./root";

export class BadRequestException extends HttpException {
    constructor(message: string, errorCode:ErrorCodes, errors?:any) {
        super(message, 400, errorCode, errors);
    }
}