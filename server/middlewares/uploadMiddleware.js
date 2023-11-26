// middlewares/uploadMiddleware.js
import multer from "multer";
import path from "path";
import fs from "fs";

function buildDestinationPath(req) {
    // Obtén los parámetros que definen la estructura de la carpeta.
    // Podrías pasar estos como campos ocultos en el formulario de carga o como parte de la solicitud.
    const base = "server/assets";
    let subPath = "default";

    if (req.body.fileType === "web-sections") {
        subPath = "web/sections";
    } else if (req.body.fileType === "company-image") {
        // Asegúrate de validar o limpiar el nombre de la compañía para prevenir problemas de seguridad.
        const companyName = sanitize(req.body.companyName); // 'sanitize' es una función hipotética que debes implementar para limpiar el input
        subPath = `companies/${companyName}/images`;
    }

    // Otros casos podrían añadirse aquí

    return path.join(base, subPath);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destPath = buildDestinationPath(req);
        fs.mkdirSync(destPath, { recursive: true }); // Asegura que la carpeta existe
        cb(null, destPath);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        // Reemplaza espacios en blanco con guiones bajos en el nombre del archivo, excluyendo la extensión
        const filenameWithoutSpaces = file.originalname.replace(/\s+/g, "_").replace(ext, "");
        // Agrega la extensión al nombre del archivo limpio
        const cleanFilename = `${filenameWithoutSpaces}${ext}`;
        cb(null, cleanFilename);
    },

    /* filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.originalname.split(".")[0] + "-" + ext);
        
    }, */
});
const upload = multer({ storage: storage });

export default upload;
