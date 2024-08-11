import { EmpleadoRepository } from "./empleado.repository.js";
const repository = new EmpleadoRepository;
function sanitizeEmpleadoInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.name,
        apellido: req.body.apellido,
        profesion: req.body.profesion,
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined)
            delete req.body.sanitizedInput[key];
    });
    next();
}
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
export { sanitizeEmpleadoInput, findAll };
//# sourceMappingURL=empleado.controller.js.map