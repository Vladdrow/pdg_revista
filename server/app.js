/* Archivo de configuración y configuración inicial del servidor Express) */
import express from "express";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());


export default app;