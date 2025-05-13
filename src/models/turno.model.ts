import { DataTypes, Model, Sequelize } from 'sequelize';

export interface TurnoAttributes {
  id: number;
  id_paciente: number;
  id_profesional: number;
  fecha: Date;
  hora: string;
  estado: string;
  motivo: string;
}

export type TurnoCreationAttributes = Omit<TurnoAttributes, 'id'>;

export class Turno extends Model<TurnoAttributes, TurnoCreationAttributes> implements TurnoAttributes {
  public id!: number;
  public id_paciente!: number;
  public id_profesional!: number;
  public fecha!: Date;
  public hora!: string;
  public estado!: string;
  public motivo!: string;
}

export const initTurnoModel = (sequelize: Sequelize) => {
  Turno.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_profesional: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      motivo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'turnos',
      timestamps: false,
    }
  );
};
