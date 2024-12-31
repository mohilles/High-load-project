/**
 * Тело запроса на регистрацию
 */
export interface RegisterPayloadDto {
  first_name: string;
  last_name: string;
  birthdate: Date;
  biography: string;
  city: string;
  password: string;
}
