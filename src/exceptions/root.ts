//message, status code, error codes

export class HttpException extends Error {
    constructor(
        public message:string, 
        public statusCode:number, 
        public errorCode:ErrorCodes,
        public errors: any
    ) {
        super(message)
    }

}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESS_ABLE_ENTITY = 2001,
    INTERNAL_EXCEPTION = 3001,
}