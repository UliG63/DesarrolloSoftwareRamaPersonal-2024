import { MagosRepository } from "./magos.repository.js";
import { Magos } from "./magos.entity.js";
const repository = new MagosRepository;
function sanitizeMagoInput(req, res, next) {
    req.body.sanitizedInput = {
        name: req.body.name,
        apellido: req.body.apellido,
        varita: req.body.varita,
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
    const mago = repository.findOne({ id });
    if (!mago) {
        return res.status(404).send({ message: 'Mago not Found' });
    }
    res.json({ data: mago });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const magoInput = new Magos(input.name, input.apellido, input.varita);
    const mago = repository.add(magoInput);
    return res.status(201).send({ message: 'Mago Creado', data: mago });
}
function update(req, res) {
    //Por laguna razon, el id del sanitizedInput no es id, sino idMago
    req.body.sanitizedInput.idMago = req.params.id;
    const mago = repository.update(req.body.sanitizedInput);
    if (!mago) {
        return res.status(404).send({ message: 'Mago not Found' });
    }
    return res.status(200).send({ message: "Mago actualizado correctamente", data: mago });
}
function remove(req, res) {
    const id = req.params.id;
    const mago = repository.delete({ id });
    if (!mago) {
        return res.status(404).send({ message: 'Mago not Found' });
    }
    else {
        return res.status(200).send({ message: 'Mago eliminado exitosamente' });
    }
}
export { sanitizeMagoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=magos.controller.js.map