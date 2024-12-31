// Зависимости
import type { FastifyPluginAsync } from 'fastify';

// Контроллеры
import { userController } from '../controllers/user.controller';
// Схемы валидации
import { registerSchema } from '../validators/user.validator';

/**
 * Маршруты пользователей
 */
// eslint-disable-next-line @typescript-eslint/require-await
export const userRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * Регистрация
   */
  fastify.post(
    '/register',
    {
      schema: registerSchema,
    },
    userController.register,
  );

  /**
   * Получение информации о пользователе
   */
  fastify.get('/get/:id', {}, userController.getUser);
};
