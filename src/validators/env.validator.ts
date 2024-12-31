// Зависимости
import dotenv from 'dotenv';
import Joi from 'joi';

/**
 * Извлечь переменные окружения
 */
dotenv.config({ path: __dirname + '/../../.env' });

/**
 * Схема проверки переменных окружения
 */
export const envVarsSchema = Joi.object<Record<string, string>>()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),

    PORT: Joi.number().integer().required(),

    CONCURRENCY: Joi.number()
      .integer()
      .description('number of workers for cluster mode')
      .default(1),

    DATABASE_URL: Joi.string().uri().optional().description('Database URL'),

    JWT_SECRET: Joi.string().required().description('JWT Secret Key'),
  })
  .unknown();

// Функция для обработки ошибок
export const makeError = (error?: Joi.ValidationError) => {
  // Если ошибок нет
  if (!error) {
    return;
  }
  // Если это среда разработки
  const isDev = process.env.NODE_ENV === 'development';
  console.log('\n');
  console.log(
    isDev ? '\x1b[36m%s\x1b[0m' : '%s',
    '================================',
  );
  console.log(
    isDev ? '\x1b[36m%s\x1b[0m' : '%s',
    'Missing environment variables:',
  );
  error.details.forEach((detail) => {
    console.log(isDev ? '\x1b[33m%s\x1b[0m' : '%s', detail.message);
  });
  console.log(
    isDev ? '\x1b[36m%s\x1b[0m' : '%s',
    '================================',
  );
  console.log('\n');

  // Создать новую ошибку
  const newError = new Error('Environment variables are not set correctly');
  // Удалить стек вызовов
  newError.stack = undefined;
  // Выбросить ошибку
  throw newError;
};
