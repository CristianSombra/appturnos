import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 3000,
    DB: {
        HOST: process.env.DB_HOST || 'localhost',
        PORT: Number(process.env.DB_PORT) || 5432,
        NAME: process.env.DB_NAME || 'appturnos',
        USER: process.env.DB_USER || 'postgres',
        PASSWORD: process.env.DB_PASSWORD || 'minombre12'
    }
};