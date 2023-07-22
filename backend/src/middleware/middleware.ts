import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
): void => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

export const errorHandler = (
  error: any,
  _request: Request,
  response: Response,
  next: NextFunction
): void => {
  console.error(error.message);

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else {
    next(error);
  }
};

export const unknownEndpoint = (
  _request: Request,
  response: Response
): void => {
  response.status(404).send({ error: "unknown endpoint" });
};
