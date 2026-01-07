/*
Надано посилання на вихідний код у GitHub у форматі https://github.com/student/nodejs-hw/tree/01-express
Надано посилання на задеплоєний проєкт на render.com
Код виконується без помилок
Використовується змінна PORT через dotenv
Підключено cors
Підключено express.json()
Налаштований логер pino-http
Додано middleware для 404
Додано middleware для помилок 500
Файлова структура відповідає вимогам
Реалізований маршрут GET /notes
Реалізований маршрут GET /notes/:noteId
Реалізований маршрут GET /test-error
 */

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors()); // Дозволяє запити з будь-яких джерел
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.get('/notes', (req, res) => {
  res
    .status(200)
    .json({
      message: 'All notes retrieved',
      data: [{ id: 1, msg: 'This is 1st note' }],
    });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ id: noteId, msg: `This is the note ${noteId}` });
});

app.get('/test-error', (req, res) => {
  throw new Error('Something went wrong');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
