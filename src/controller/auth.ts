import { NextFunction, Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { prisma } from "../server";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    SignUpSchema.parse(req.body);
    const { email, password, name } = req.body;
    let user = await prisma.user.findFirst({ where: { email } });
    if (user) {
        new BadRequestException(
          "User already exist",
          ErrorCodes.USER_ALREADY_EXISTS
        )
    }

    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });

    res.json(user);
  
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const { email, password } = req.body;
    let user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new BadRequestException("User not found", ErrorCodes.USER_NOT_FOUND);
    }

     if (!compareSync(password, user.password)) {
        throw new BadRequestException("Wrong password", ErrorCodes.INCORRECT_PASSWORD);
          } 

          const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "1h",
          });
        res.json({ user, token });
};
