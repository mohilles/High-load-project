// Зависимости
import Joi from 'joi';

/**
 * Схема валидации для регистрации
 */
export const registerSchema = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    birthdate: Joi.date().required(),
    biography: Joi.string().required(),
    city: Joi.string().required(),
    password: Joi.string().min(5).max(32).required(),
  }),
};
