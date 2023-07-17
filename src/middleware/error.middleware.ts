import { Response, Request, NextFunction } from "express";
import HttpExceptions from "../utils/Exceptions/http.exceptions";
function ErrorMiddleware(
  
  error: HttpExceptions,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const status = error.status || 500;
  const message = error.message || "something went wrong";

  res.status(status).send({
    status,
    message,
  });
}
export default ErrorMiddleware;
