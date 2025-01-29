import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Ruta del directorio de subida
const uploadDir = path.join(__dirname, '../../public/uploads');
// Crear el directorio si no existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Usar la ruta absoluta al directorio
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName); // Asignar un nombre único al archivo
    },
});
// Filtro de archivos para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Aceptar imágenes
    }
    else {
        cb(new Error('Solo se permiten imágenes')); // Rechazar otros tipos de archivo
    }
};
// Middleware de Multer
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limitar el tamaño máximo del archivo a 10 MB
});
//# sourceMappingURL=multerConfig.js.map