import { NextFunction, Request, Response } from "express"
import { HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internalException";


export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next:NextFunction) => { 
        try {
            await method(req, res, next);
        } catch (error: any) {
            let exception: HttpException;
            if (error instanceof HttpException) {
                exception = error;
            } else {
                exception = new InternalException('Something went wrong!', error.statusCode, error.errorCode, error.errors);
            }
            next(exception);
        }
    }
}