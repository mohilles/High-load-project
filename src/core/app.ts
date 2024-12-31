// Зависимости
import compression from '@fastify/compress';
import formbody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import Fastify from 'fastify';

// Константы
import { ERR } from '../constants';
// Логгер
import { pinoConfigs } from './logger';
// Помощники
import { errorHandler } from '../helpers/error-handler.helper';
import { schemaValidatorCompiler } from '../helpers/schema-validator.helper';
import { successResFormatter } from '../helpers/success-res-format.helper';
// Маршруты
import { routes } from '../routes';
// Утилиты
import { ApiError } from '../utils/api-error';

/**
 * Создание экземпляра приложения
 */
export const app = Fastify({
  logger: pinoConfigs,
  bodyLimit: 5 * 1024 * 1024, // Ограничение размера тела запроса до 5 МБ
  trustProxy: true, // Доверие прокси
});

/**
 * Защита заголовков
 */
app.register(helmet);

/**
 * Парсинг тела запроса
 */
app.register(formbody);

/**
 * Сжатие ответа gzip
 */
app.register(compression);

/**
 * Форматирование успешных ответов
 */
app.decorateReply('success', successResFormatter);

/**
 * Валидация схем
 */
app.setValidatorCompiler(schemaValidatorCompiler);

/**
 * Регистрация маршрутов
 */
app.register(routes, { prefix: '/api' });

/**
 * Обработка 404 несуществующих маршрутов
 */
app.setNotFoundHandler(() => {
  throw new ApiError(ERR.NOT_FOUND);
});

/**
 * Обработка ошибок
 */
app.setErrorHandler(errorHandler);
