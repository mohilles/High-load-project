// Зависимости
import Joi from 'joi';

/**
 * Схема валидации для авторизации
 */
export const loginSchema = {
  body: Joi.object().keys({
    id: Joi.string().uuid().required(),
    password: Joi.string().required(),
  }),
};
