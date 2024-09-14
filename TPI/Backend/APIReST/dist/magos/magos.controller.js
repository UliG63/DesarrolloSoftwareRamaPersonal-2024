/*import { Request, Response, NextFunction } from "express"
import { MagosRepository } from "./magos.repository.js"
import { Magos } from "./magos.entity.js"
*/
import { orm } from "../shared/db/orm.js";
import { Magos } from "./magos.entity.js";
const em = orm.em;
function sanitizeMagoInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        pass: req.body.pass,
        madera_varita: req.body.madera_varita,
        nucleo_varita: req.body.nucleo_varita,
        largo_varita: req.body.largo_varita,
        isEmpleado: req.body.isEmpleado,
        institucion: req.body.institucion,
        patentes: req.body.patentes,
        solicitudes: req.body.solicitudes,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const magos = await em.find(Magos, {}, { populate: ['institucion'] });
        res.status(200).json({ message: 'found all magos', data: magos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    res.status(500).json({ message: 'Not implemented' });
}
async function add(req, res) {
    try {
        const mago = em.create(Magos, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Mago created', data: mago });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    res.status(500).json({ message: 'Not implemented' });
}
async function remove(req, res) {
    res.status(500).json({ message: 'Not implemented' });
}
export { sanitizeMagoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=magos.controller.js.map