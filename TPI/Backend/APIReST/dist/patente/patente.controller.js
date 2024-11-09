import { orm } from "../shared/db/orm.js";
import { Patente } from "./patente.entity.js";
import { PatenteEstado } from "./patente.enum.js";
import { Magos } from "../magos/magos.entity.js";
const em = orm.em;
function sanitizePatenteInput(req, res, next) {
    req.body.sanitizedInput = {
        fechaCreacion: req.body.fechaCreacion,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        motivo_rechazo: req.body.motivo_rechazo,
        instrucciones: req.body.instrucciones,
        restringido: req.body.restringido,
        hechizo: req.body.hechizo,
        tipo_hechizo: req.body.tipo_hechizo,
        empleado: req.body.empleado,
        etiquetas: req.body.etiquetas,
        mago: req.body.mago
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
        const patentes = await em.find(Patente, {}, { populate: ['hechizos', 'empleado', 'mago', 'etiquetas'] });
        res.status(200).json({ message: "Found All Patentes", data: patentes });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findAllPending(req, res) {
    try {
        const patentesPendientes = await em.find(Patente, { estado: PatenteEstado.PENDIENTE_REVISION }, { populate: ['hechizos', 'empleado', 'mago', 'etiquetas'] });
        res.status(200).json({ message: "Patentes pendientes de revisión encontradas", data: patentesPendientes });
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
        // Obtener los datos del cuerpo de la solicitud
        const { mago, ...patenteData } = req.body;
        // Verificar si el mago existe
        let magoExistente = await em.findOne(Magos, { email: mago.email });
        if (!magoExistente) {
            return res.status(404).json({ message: 'Mago no encontrada' });
        }
        // Crear la patente vinculada al mago existente
        const nuevaPatente = em.create(Patente, {
            ...patenteData,
            mago: magoExistente, // Asociar el mago con la patente
        });
        // Guardar en la base de datos
        await em.flush();
        // Responder con la nueva patente creada
        res.status(201).json({ message: "Patente creada correctamente", data: nuevaPatente });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    res.status(500).json({ message: 'Not implemented' });
}
async function remove(req, res) {
    res.status(500).json({ message: 'Not implemented' });
}
async function publish(req, res) {
    try {
        // Buscar la patente por su ID
        const id = Number.parseInt(req.params.id);
        const patente = await em.findOneOrFail(Patente, { id }, { populate: ['hechizos', 'tipo_hechizo', 'empleado', 'mago', 'etiquetas'] });
        if (!patente) {
            return res.status(404).json({ message: 'Patente no encontrada' });
        }
        // Verificar que el estado actual sea "pendiente_revision"
        if (patente.estado !== PatenteEstado.PENDIENTE_REVISION) {
            return res.status(400).json({ message: 'La patente no está pendiente de revisión' });
        }
        // Actualizar el estado a "publicada"
        patente.estado = PatenteEstado.PUBLICADA;
        // Crear el hechizo si la patente ha sido publicada
        const hechizo = {
            nombre: req.body.sanitizedInput.nombre,
            descripcion: req.body.sanitizedInput.descripcion,
            instrucciones: req.body.sanitizedInput.instrucciones,
            restringido: req.body.sanitizedInput.restringido,
            patente: patente // Asociar el hechizo con la patente
        };
        const newHechizo = em.create('Hechizo', hechizo);
        // Guardar la actualización de la patente y el nuevo hechizo
        await em.persistAndFlush([patente, newHechizo]);
        res.status(200).json({ message: 'Patente publicada y hechizo creado', data: patente });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function reject(req, res) {
    try {
        // Buscar la patente por su ID
        const id = Number.parseInt(req.params.id);
        const patente = await em.findOneOrFail(Patente, { id }, { populate: ['hechizos', 'tipo_hechizo', 'empleado', 'mago'] });
        if (!patente) {
            return res.status(404).json({ message: 'Patente no encontrada' });
        }
        // Verificar que el estado actual sea "pendiente_revision"
        if (patente.estado !== PatenteEstado.PENDIENTE_REVISION) {
            return res.status(400).json({ message: 'La patente no está pendiente de revisión' });
        }
        // Actualizar el estado a "rechazada"
        patente.estado = PatenteEstado.RECHAZADA;
        // Guardar la actualización de la patente y el nuevo hechizo
        await em.persistAndFlush([patente]);
        res.status(200).json({ message: 'Patente rechazada', data: patente });
    }
    catch (error) {
    }
}
export { sanitizePatenteInput, findAll, findOne, add, update, remove, publish, reject, findAllPending };
//# sourceMappingURL=patente.controller.js.map