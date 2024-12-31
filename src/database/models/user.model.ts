// Зависимости
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

// База данных
import { database } from '../../core/database';

/**
 * Модель
 */
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare password: string;
  declare first_name: string;
  declare last_name: CreationOptional<string>;
  declare birthdate: Date;
  declare biography: CreationOptional<string>;
  declare city: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

/**
 * Инициализация модели
 */
User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4(),
      comment: 'User ID',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Password',
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'First name',
    },
    last_name: {
      type: DataTypes.STRING,
      comment: 'Second name',
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: 'Birthdate',
    },
    biography: {
      type: DataTypes.TEXT,
      comment: 'Biography',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'City',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: database,
    modelName: User.name,
    timestamps: true,
  },
);
