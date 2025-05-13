import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  if (process.env.NODE_ENV !== 'production') {
    console.error('❌ Error:', err);
  }

  res.status(statusCode).json({
    status: 'error',
    message,
  });
};
