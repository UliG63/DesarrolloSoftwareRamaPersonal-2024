import 'reflect-metadata';
import express from 'express';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { magosRouter } from './magos/magos.routes.js';
import { institucionRouter } from './institucion/institucion.routes.js';
import { etiquetaRouter } from './etiqueta/etiqueta.routes.js';
import { hechizoRouter } from './hechizo/hechizo.routes.js';
import { patenteRouter } from './patente/patente.routes.js';
import { solicitudRouter } from './solicitud_visualizacion/solicitud.routes.js';
import { tipo_hechizoRouter } from './tipo_hechizo/tipo_hechizo.routes.js';
import { authRouter } from './auth/auth.routes.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
//Cargo las variables de entorno
const ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${ENV}` });
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, // Permitir solo solicitudes desde este origen
    credentials: true, // Permitir el envío de cookies, si es necesario
}));
app.use(cookieParser());
app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
});
app.use('/api/institucion', institucionRouter);
app.use('/api/magos', magosRouter);
app.use('/api/etiqueta', etiquetaRouter);
app.use('/api/hechizo', hechizoRouter);
app.use('/api/patente', patenteRouter);
app.use('/api/solicitud_visualizacion', solicitudRouter);
app.use('/api/tipo_hechizo', tipo_hechizoRouter);
app.use('/api/auth', authRouter);
/*
    El siguiente metodo se encarga de devolver un mensaje compatible
    con la API cuando se introduce una URL invalida, y no contenido HTML
*/
const uploadsPath = path.join(__dirname, '../public/uploads');
app.use('/uploads', express.static(uploadsPath));
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});
await syncSchema(); //solo en development
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
//# sourceMappingURL=app.js.map