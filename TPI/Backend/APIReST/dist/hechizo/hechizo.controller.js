import { orm } from "../shared/db/orm.js";
import { Hechizo } from "./hechizo.entity.js";
const em = orm.em;
async function findAll(req, res) {
    try {
        const hechizos = await em.find(Hechizo, {}, { populate: ['nombre', 'descripcion', 'instrucciones', 'restringido', 'patente',
                'patente.tipo_hechizo', 'patente.mago', 'patente.etiquetas'] });
        res.status(200).json({ message: "Found All Hechizos", data: hechizos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const hechizo = await em.findOneOrFail(Hechizo, { id });
        res.status(200).json({ message: 'found hechizo', data: hechizo });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    res.status(500).json({ message: 'Not implemented' });
}
async function update(req, res) {
    res.status(500).json({ message: 'Not implemented' });
}
async function remove(req, res) {
    res.status(500).json({ message: 'Not implemented' });
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=hechizo.controller.js.map