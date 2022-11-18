import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDb } from './database.js';

//Importar Rutas
import mongoRoutes from "./routes/mongo.routes.js"
import schoolRoutes from "./routes/school.routes.js"
import studentRoutes from "./routes/student.routes.js"

connectDb()
const app = express();

app.set('port', 4000);
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/mongo", mongoRoutes)
app.use("/school", schoolRoutes)
app.use("/student", studentRoutes)

app.listen(app.get('port'), () => { console.log('Servidor escuchando por el puerto', app.get('port')); });