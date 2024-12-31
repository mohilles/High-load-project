// Зависимости
import type { FastifyPluginAsync } from 'fastify';

// Контроллеры
import { authController } from '../controllers/auth.controller';
// Схемы валидации
import { loginSchema } from '../validators/auth.validator';

/**
 * Маршруты авторизации
 */
// eslint-disable-next-line @typescript-eslint/require-await
export const authRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * Получение информации
   */
  fastify.post(
    '/login',
    {
      schema: loginSchema,
    },
    authController.login,
  );
};
