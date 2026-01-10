// src/middleware/errorHandler.js
import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Якщо помилка створена через http-errors
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  // Усі інші помилки — як внутрішні
  res.status(500).json({
    message: err.message,
  });
};
