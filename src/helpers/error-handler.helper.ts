// Зависимости
import type { FastifyReply, FastifyRequest } from 'fastify';
import { ValidationError as JoiValidationError } from 'joi';

// Конфигурация
import { APP_CONFIG } from '../configs';
// Константы
import { ERR } from '../constants';
// Логгер
import { logger } from '../core/logger';
// Утилиты
import { ApiError } from '../utils/api-error';

/**
 * Обработчик ошибок
 */
export const errorHandler = async (
  error: Error | ApiError | JoiValidationError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  /**
   * Определение статуса, кода и сообщения ошибки
   */
  const status =
    error instanceof ApiError
      ? error.status || 400
      : error instanceof JoiValidationError
        ? 400
        : 500;

  /**
   * Определение кода и сообщения ошибки
   */
  const code =
    error instanceof ApiError
      ? error.code
      : error instanceof JoiValidationError
        ? ERR.VALIDATION_ERROR.code
        : ERR.UNKNOWN_ERROR.code;

  /**
   * Определение сообщения ошибки
   */
  const msg =
    error instanceof ApiError
      ? error.message
      : error instanceof JoiValidationError
        ? ERR.VALIDATION_ERROR.message
        : ERR.UNKNOWN_ERROR.message;

  /**
   * Определение деталей и стека ошибки
   */
  const details =
    error instanceof ApiError && error.details
      ? error.details
      : error instanceof JoiValidationError
        ? error.details.map((e) => e.message)
        : undefined;

  /**
   * Определение стека ошибки
   */
  const stack = APP_CONFIG.env.isDev() ? { stack: error.stack } : {};

  /**
   * Логирование ошибки
   */
  logger.error(
    {
      code,
      msg,
      ...stack,
    },
    error.message,
  );

  /**
   * Отправка ответа
   */
  reply.status(status).send({
    success: false,
    error: {
      code,
      msg,
      ...(Object.keys(details ?? {}).length && { details }),
      ...stack,
    },
  });

  return reply;
};
