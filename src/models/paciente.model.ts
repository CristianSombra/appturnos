import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { Usuario } from './usuario.model';

//Definición de atributos que tiene el usuario en BD
export interface PacienteAttributes {
  id: number;
  usuario_id: number;
  fecha_nacimiento: Date;
  dni: string;
}

//Todos los campos obligatorios
export type PacienteCreationAttributes = Optional<PacienteAttributes, 'id'>;

export class Paciente extends Model<PacienteAttributes, PacienteCreationAttributes> implements PacienteAttributes {
  public id!: number;
  public usuario_id!: number;
  public fecha_nacimiento!: Date;
  public dni!: string;

  public usuario?: Usuario;
}

export const initPacienteModel = (sequelize: Sequelize) => {
//Inicializamos el modelo con Sequelize en la BD
  Paciente.init(
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
      fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'pacientes',
      timestamps: false,
    }
  );
};
