import { Request, Response, NextFunction } from 'express';

interface Error {
  statusCode?: number;
  message?: string;
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.statusCode, "status error code");
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
