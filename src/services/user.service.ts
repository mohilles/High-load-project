import * as bcrypt from 'bcrypt';

// Типы
import { RegisterPayloadDto } from '../@types';
// Модели
import { User } from '../database/models';

/**
 * Сервис для работы с пользователями
 */
export const userService = {
  /**
   * Регистрация
   */
  async create(payload: RegisterPayloadDto) {
    /**
     * Хешировать пароль
     */
    const password = await bcrypt.hash(payload.password, 10);

    /**
     * Создать пользователя
     */
    const user = await User.create({
      first_name: payload.first_name,
      last_name: payload.last_name,
      birthdate: payload.birthdate,
      biography: payload.biography,
      city: payload.city,
      password,
    });

    /**
     * Вернуть пользователя
     */
    return user;
  },

  /**
   * Получить пользователя
   */
  findOne: async (id: string) => {
    return User.findByPk(id);
  },
};
