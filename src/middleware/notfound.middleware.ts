 import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const message = "Antud ressurssi ei leitud";

  response.status(404).send(message);
}; 