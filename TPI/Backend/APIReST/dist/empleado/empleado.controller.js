import { EmpleadoRepository } from "./empleado.repository.js";
import { Empleado } from "./empleado.entity.js";
/*
    La siguiente clase repository se encarga de enlazar la capa del
    repositorio con la capa del controlador, a partir de sus funciones.
*/
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
function findOne(req, res) {
    const id = req.params.id;
    const empleado = repository.findOne({ id });
    if (!empleado) {
        return res.status(404).send({ message: 'Empleado not Found' });
    }
    res.json({ data: empleado });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const empleadoInput = new Empleado(input.nombre, input.apellido, input.profesion);
    const empleado = repository.add(empleadoInput);
    return res.status(201).send({ message: 'Empleado Creado', data: empleado });
}
function update(req, res) {
    //Por alguna razon, el id del sanitizedInput no es id, sino idEmpleado
    req.body.sanitizedInput.idEmpleado = req.params.id;
    const empleado = repository.update(req.body.sanitizedInput);
    if (!empleado) {
        return res.status(404).send({ message: 'Empleado not Found' });
    }
    return res.status(200).send({ message: "Empleado actualizado correctamente", data: empleado });
}
function remove(req, res) {
    const id = req.params.id;
    const empleado = repository.delete({ id });
    if (!empleado) {
        return res.status(404).send({ message: 'Empleado not Found' });
    }
    else {
        return res.status(200).send({ message: 'Empleado eliminado exitosamente' });
    }
}
export { sanitizeEmpleadoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=empleado.controller.js.map