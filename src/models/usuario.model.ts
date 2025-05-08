import { DataTypes, Model, Sequelize } from "sequelize";

//Definición de atributos que tiene el usuario en BD
interface UsuarioAttributes {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password_hash: string;
    telefono: string;
    tipo_usuario: string;
    fecha_creacion: Date;
}

//Todos los campos obligatorios
type UsuarioCreationAttributes = UsuarioAttributes;

export class Usuario extends Model <UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
    public id!: number;
    public nombre!: string;
    public apellido!: string;
    public email!: string;
    public password_hash!: string;
    public telefono!: string;
    public tipo_usuario!: string;
    public fecha_creacion!: Date;
}

export const initUsuarioModel = (sequelize: Sequelize) => {
    //Inicializamos el modelo con Sequelize en la BD
    Usuario.init(
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            apellido: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password_hash: {
                type: DataTypes.STRING,
                allowNull: false
            },
            telefono: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tipo_usuario: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fecha_creacion: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW //Asignar automáticamente si no se especifica
            }
        },
        {
            sequelize, //Conexión con la bse de datos
            tableName: 'usuarios', //Nombre de la tabla
            timestamps: false, //Ya se define en fecha_creacion
        }
    );
}