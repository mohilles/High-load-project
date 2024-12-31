// Зависимости
import 'fastify';

/**
 * Декларация модуля fastify
 */
declare module 'fastify' {
  //   interface FastifyRequest {
  //     /** Содержимое токена */
  //     auth: TokenPayload;
  //   }

  interface FastifyReply {
    /**
     * Успешный ответ
     */
    success: (
      data?: unknown,
      message?: string,
      statusCode?: number,
    ) => FastifyReply;
  }
}
