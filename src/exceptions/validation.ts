import { ErrorCodes, HttpException } from "./root";

export class UnprocessableEntity extends HttpException {
    constructor(message: string, errorCode:ErrorCodes, error:any ) {
        super(message, 422, errorCode, error);
    }
}