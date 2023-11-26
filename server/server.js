/* process.env.TZ = "America/La_Paz"; */
import express from "express";
import config from "./config.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import routerAuth from "./routes/auth.routes.js";
import routerContent from "./routes/content.routes.js";
import routerUpdate from "./routes/update.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import https from "https";
import fs from "fs";
import Stripe from "stripe";

dotenv.config();

const app = express();
const port = config.port;
/* import "./certs/localhost-key.pem" */

// Middleware para servir archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Middleware para parsear el cuerpo de las solicitudes y las cookies
app.use(express.json());
app.use(cookieParser());

// Configuración de CORS
const corsOptions = {
    origin: function (origin, callback) {
        /* const allowedOrigins = ["http://192.168.17.228:5173", "http://localhost:5173"]; */
        const allowedOrigins = ["https://192.168.75.228:5173", "https://localhost:5173"];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Origen no permitido por CORS"));
        }
    },
    credentials: true, // Importante para enviar cookies entre dominios
};

app.use(cors(corsOptions));

const options = {
    key: fs.readFileSync(path.resolve(__dirname, "./localhost-key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "./localhost.pem")),
};

// Rutas

app.use(routerAuth);
app.use(routerContent);
app.use(routerUpdate);

// Iniciar el servidor
/* app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
 */
https.createServer(options, app).listen(port, () => {
    console.log(`Servidor HTTPS corriendo en el puerto ${port}`);
});
