// Зависимости
import type { FastifySchemaCompiler } from 'fastify';
import Joi from 'joi';

/**
 * Компилятор схемы валидации
 */
export const schemaValidatorCompiler: FastifySchemaCompiler<Joi.AnySchema> = ({
  schema,
}) => {
  /**
   * Функция валидации данных
   */
  return (data: Record<string, unknown>) => {
    /**
     * Валидация данных
     */
    return schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
  };
};
