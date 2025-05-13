import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

export interface EspecialidadAttributes {
  id: number;
  nombre: string;
}

export type EspecialidadCreationAttributes = Optional<EspecialidadAttributes, 'id'>;

export class Especialidad extends Model<EspecialidadAttributes, EspecialidadCreationAttributes> implements EspecialidadAttributes {
  public id!: number;
  public nombre!: string;
}

export const initEspecialidadModel = (sequelize: Sequelize) => {
  Especialidad.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'especialidades',
      timestamps: false,
    }
  );
};
