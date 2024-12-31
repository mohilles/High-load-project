// Зависимости
import httpStatus from 'http-status';

/**
 * Константы кодов ошибок
 */
export const ERR = {
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'Unauthorized',
    status: +httpStatus.UNAUTHORIZED,
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Not found',
    status: +httpStatus.NOT_FOUND,
  },
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    message: 'Internal server error',
    status: +httpStatus.INTERNAL_SERVER_ERROR,
  },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'Validation error',
  },
  TOO_MANY_ATTEMPTS: {
    code: 'TOO_MANY_ATTEMPTS',
    message: 'Too many attempts',
    status: +httpStatus.TOO_MANY_REQUESTS,
  },
  CONFLICT: {
    code: 'CONFLICT',
    message: 'Conflict',
    status: +httpStatus.CONFLICT,
  },
};
