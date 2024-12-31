// Зависимости
import { FastifyRequest, RouteHandler } from 'fastify';

// Типы
import { RegisterPayloadDto } from '../@types';
// Сервисы
import { ERR } from '../constants';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { ApiError } from '../utils/api-error';

/**
 * Контроллер для работы с пользователями
 */
export const userController = {
  /**
   * Регистрация
   */
  register: (async (
    request: FastifyRequest<{
      Body: RegisterPayloadDto;
    }>,
    reply,
  ) => {
    /**
     * Получить данные
     */
    const user = await userService.create(request.body);

    /**
     * Создать токен
     */
    const token = authService.createToken(user.id);

    /**
     * Отправить ответ
     */
    return reply.success({
      token,
    });
  }) as RouteHandler,

  getUser: (async (
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply,
  ) => {
    /**
     * Получить пользователя
     */
    const user = await userService.findOne(request.params.id);

    if (!user) {
      throw new ApiError(ERR.NOT_FOUND);
    }

    /**
     * Отправить ответ
     */
    return reply.success({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      birthdate: user.birthdate,
      biography: user.biography,
      city: user.city,
    });
  }) as RouteHandler,
};
