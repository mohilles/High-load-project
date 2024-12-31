// Зависимости
import { FastifyRequest, RouteHandler } from 'fastify';

// Типы
import { LoginPayloadDto } from '../@types';
// Сервисы
import { authService } from '../services/auth.service';

/**
 * Контроллер для работы с авторизацией
 */
export const authController = {
  /**
   * Авторизация
   */
  login: (async (
    request: FastifyRequest<{
      Body: LoginPayloadDto;
    }>,
    reply,
  ) => {
    /**
     * Получить данные
     */
    const token = await authService.login(request.body);

    /**
     * Отправить ответ
     */
    return reply.success({
      token,
    });
  }) as RouteHandler,
};
