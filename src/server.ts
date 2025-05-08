import app from './app';
import { connectDataBase } from './config/database';

const PORT = process.env.PORT || 3000;

connectDataBase()

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});