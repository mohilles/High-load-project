// Зависимости
import type { FastifyReply } from 'fastify';

/**
 * Формат успешного ответа
 */
export const successResFormatter = function (
  this: FastifyReply,
  data: unknown,
  message?: string,
  statusCode = 200,
) {
  return this.status(statusCode).send({ success: true, data, message });
};
