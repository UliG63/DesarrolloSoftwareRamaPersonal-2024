import { orm } from "../shared/db/orm.js";
import { Patente } from "./patente.entity.js";
import { PatenteEstado } from "./patente.enum.js";
import { Magos } from "../magos/magos.entity.js";
import { Tipo_Hechizo } from "../tipo_hechizo/tipo_hechizo.entity.js";
import { Etiqueta } from "../etiqueta/etiqueta.entity.js";
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
        tipo_hechizo: req.body.TipoHechizo,
        empleado: req.body.empleado,
        etiquetas: req.body.Etiquetas,
        idMago: req.body.idMago
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
        const patentes = await em.find(Patente, {}, { populate: ['hechizos', 'empleado', 'mago', 'etiquetas', 'tipo_hechizo'] });
        res.status(200).json({ message: "Found All Patentes", data: patentes });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findByMago(req, res) {
    try {
        const id = Number.parseInt(req.params.idMago);
        const patentes = await em.find(Patente, { mago: id }, { populate: ['empleado', 'mago'] });
        if (patentes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron patentes para este mago' });
        }
        res.status(200).json({ message: "Found All Patentes del Mago", data: patentes });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findAllPending(req, res) {
    try {
        const patentesPendientes = await em.find(Patente, { estado: PatenteEstado.PENDIENTE_REVISION }, { populate: ['hechizos', 'empleado', 'mago', 'etiquetas', 'tipo_hechizo'] });
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
        const { idMago, ...patenteData } = req.body;
        // Verificar si el mago existe
        let magoExistente = await em.findOne(Magos, { id: idMago });
        if (!magoExistente) {
            return res.status(404).json({ message: 'Mago no encontrado' });
        }
        // Crear la patente vinculada al mago existente
        const nuevaPatente = em.create(Patente, {
            ...patenteData,
            mago: magoExistente, // Asociar el mago con la patente
            estado: PatenteEstado.PENDIENTE_REVISION,
            fechaCreacion: new Date()
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
        console.log('la req:', req.body);
        const id = Number.parseInt(req.params.id);
        const patente = await em.findOneOrFail(Patente, { id });
        const idTH = Number.parseInt(req.body.tipoHechizo);
        const tipo_hechizo = await em.findOneOrFail(Tipo_Hechizo, { id: idTH });
        console.log('El tipo de hechizo:', tipo_hechizo);
        const empleado = await em.findOneOrFail(Magos, { id: req.body.empleado.id });
        console.log('etiquetas', req.body.Etiquetas);
        if (!patente) {
            return res.status(404).json({ message: 'Patente no encontrada' });
        }
        // Verificar que el estado actual sea "pendiente_revision"
        if (patente.estado !== PatenteEstado.PENDIENTE_REVISION) {
            return res.status(400).json({ message: 'La patente no está pendiente de revisión' });
        }
        console.log('la patente:', patente);
        // Actualizar el estado
        patente.estado = PatenteEstado.PUBLICADA;
        patente.empleado = empleado;
        patente.restringido = req.body.restringido;
        patente.tipo_hechizo = tipo_hechizo;
        console.log('La cantidad de etiuetas:', req.body.Etiquetas.length);
        for (let i = 0; i < req.body.Etiquetas.length; i++) {
            const etiqueta = await em.findOneOrFail(Etiqueta, { id: req.body.Etiquetas[i].id });
            patente.etiquetas?.add(etiqueta);
        }
        console.log('La patente actualizada', patente);
        //Crear el hechizo si la patente ha sido publicada
        const hechizo = {
            nombre: patente.nombre,
            descripcion: patente.descripcion,
            instrucciones: patente.instrucciones,
            restringido: patente.restringido,
            patente: patente // Asociar el hechizo con la patente
        };
        const newHechizo = em.create('Hechizo', hechizo);
        await em.persistAndFlush([patente, newHechizo]);
        res.status(200).json({ message: 'Patente publicada y hechizo creado', data: patente });
    }
    catch (error) {
        console.log('we hebben a serius problem:', error);
        res.status(500).json({ message: 'Hubo un problema al publicar la patente' });
    }
}
async function reject(req, res) {
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
        // Actualizar el estado a "rechazada, agregar el motivo de rechazo y el empleado que lo rechazo"
        patente.estado = PatenteEstado.RECHAZADA;
        patente.motivo_rechazo = req.body.sanitizedInput.motivo_rechazo;
        patente.empleado = req.body.sanitizedInput.empleado;
        // Guardar la actualización de la patente y el nuevo hechizo
        await em.persistAndFlush([patente]);
        res.status(200).json({ message: 'Patente rechazada', data: patente });
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un problema rechazando la patente' });
    }
}
export { sanitizePatenteInput, findAll, findOne, add, update, remove, publish, reject, findAllPending, findByMago };
//# sourceMappingURL=patente.controller.js.map