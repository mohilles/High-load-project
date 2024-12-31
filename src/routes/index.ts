// Зависимости
import type { FastifyInstance } from 'fastify';

// Маршруты
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';

/**
 * Маршруты приложения
 */
const appRoutes = [
  {
    route: authRoutes,
    prefix: '/',
  },
  {
    route: userRoutes,
    prefix: '/user',
  },
];

/**
 * Основной маршрутизатор
 */
export const routes = async (fastify: FastifyInstance) => {
  // Регистрация всех маршрутов
  await Promise.all(
    appRoutes.map((route) =>
      fastify.register(route.route, { prefix: route.prefix }),
    ),
  );
};
