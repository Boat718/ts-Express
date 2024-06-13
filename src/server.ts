import express, { Express, Request, Response } from 'express'
import { PORT } from './secrets'
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/error';
import { SignUpSchema } from './schema/users';

export const prisma = new PrismaClient({
    log:['query']
})

const app:Express = express()

app.use(express.json());


app.use('/api', rootRouter)

app.use(errorMiddleware)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

