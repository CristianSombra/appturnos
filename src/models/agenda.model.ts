import { DataTypes, Model, Sequelize } from 'sequelize';

export interface AgendaAttributes {
  id: number;
  id_profesional: number;
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
  duracion_turno_min: number;
}

export type AgendaCreationAttributes = Omit<AgendaAttributes, 'id'>;

export class Agenda extends Model<AgendaAttributes, AgendaCreationAttributes> implements AgendaAttributes {
  public id!: number;
  public id_profesional!: number;
  public dia_semana!: number;
  public hora_inicio!: string;
  public hora_fin!: string;
  public duracion_turno_min!: number;
}

export const initAgendaModel = (sequelize: Sequelize) => {
  Agenda.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_profesional: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dia_semana: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      hora_fin: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      duracion_turno_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'agendas',
      timestamps: false,
    }
  );
};
