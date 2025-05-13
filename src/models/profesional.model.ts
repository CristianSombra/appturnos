import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ProfesionalAttributes {
  id: number;
  usuario_id: number;
  matricula: string;
  especialidad_id: number;
  descripcion: string;
}

export type ProfesionalCreationAttributes = ProfesionalAttributes;

export class Profesional extends Model<ProfesionalAttributes, ProfesionalCreationAttributes> implements ProfesionalAttributes {
  public id!: number;
  public usuario_id!: number;
  public matricula!: string;
  public especialidad_id!: number;
  public descripcion!: string;
}

export const initProfesionalModel = (sequelize: Sequelize) => {
  Profesional.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      matricula: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      especialidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'profesionales',
      timestamps: false,
    }
  );
};
