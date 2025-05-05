import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Api Turnos médicos funcionando ✅")
});

export default app;