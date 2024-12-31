// Зависимости
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

// Типы
import { LoginPayloadDto } from '../@types';
// Конфигурации
import { AUTH_CONFIG } from '../configs';
// Константы
import { ERR } from '../constants';
// Утилиты
import { userService } from './user.service';
import { ApiError } from '../utils/api-error';

/**
 * Сервис авторизации
 */
export const authService = {
  /**
   * Авторизация
   */
  login: async (payload: LoginPayloadDto) => {
    /**
     * Получить данные
     */
    const user = await userService.findOne(payload.id);

    /**
     * Проверить пользователя
     */
    if (!user) {
      throw new ApiError(ERR.NOT_FOUND);
    }

    /**
     * Сравнить пароли
     */
    try {
      const compare = await bcrypt.compare(payload.password, user.password);

      if (!compare) {
        throw new Error('Invalid password');
      }
    } catch {
      throw new ApiError(ERR.NOT_FOUND);
    }

    /**
     * Создать токен
     */
    const token = authService.createToken(user.id);

    /**
     * Вернуть токен
     */
    return token;
  },

  /**
   * Создать токен
   */
  createToken: (id: string) => {
    /**
     * Создать токен
     */
    const token = jwt.sign(
      {
        id,
      },
      AUTH_CONFIG.jwt.secret,
      { expiresIn: 60 * 60 },
    );

    /**
     * Вернуть токен
     */
    return token;
  },
};
