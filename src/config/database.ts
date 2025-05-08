import { Sequelize } from "sequelize";
import { ENV } from "./env";

export const sequelize = new Sequelize(
    ENV.DB.NAME,
    ENV.DB.USER,
    ENV.DB.PASSWORD,
    {
        host:ENV.DB.HOST,
        port:ENV.DB.PORT,
        dialect: 'postgres',
        logging: false
    }
);

console.log(ENV.DB)

export const connectDataBase = async () => {
    try {
        console.log(ENV.DB)
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida')
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error)
        process.exit(1)
    }
};