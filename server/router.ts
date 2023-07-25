import express, {Express, Request, Response} from 'express'
import path from 'path';

import {counterMiddleWare} from './middlewares'

const DIST_PATH = 'dist'
const CLIENT_PATH = 'client'
const INDEX_PATH = 'index.html'
export const configureRouter = (app: Express) => {
  app.use(express.json());
  app.use(express.static(path.join(path.resolve("./"), DIST_PATH, CLIENT_PATH)));

  app.get("/health", (req: Request, res: Response) => res.send("Hello world!"));

  app.use("/counter", counterMiddleWare)

  app.get("*", (req: Request, res: Response): void => {
    res.sendFile(path.join(path.resolve("./"), DIST_PATH, CLIENT_PATH, INDEX_PATH));
  });
}
