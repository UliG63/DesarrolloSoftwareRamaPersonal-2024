import { Router } from "express";
import { authMiddleware } from "../auth/auth.controller.js";
import { findAll, findAllPending, findByMago, add, grant, reject, sanitizeSolicitudInput } from "./solicitud.controller.js";
export const solicitudRouter = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Solicitud:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         fecha_hasta:
 *           type: string
 *           format: date-time
 *         permanente:
 *           type: boolean
 *         motivo:
 *           type: string
 *         motivo_rechazo:
 *           type: string
 *         estado:
 *           type: string
 *         hechizo:
 *           type: object
 *           properties:
 *              id:
 *                  type: integer
 *                  description: ID autogenerado de la solicitud
 *              nombre:
 *                  type: string
 *                  description: nombre del hechizo
 *              descripcion:
 *                  type: string
 *                  description: descripcion del hechizo
 *              instrucciones:
 *                  type: string
 *                  description: instrucciones sobre como llevar a cabo el hechizo
 *              restringido:
 *                  type: boolean
 *                  description: indica si el hechizo esta tiene sus instrucciones restringidas para visualizacion
 *              patente:
 *                  type: object
 *                  description: patente que dio origen al hechizo (inconsecuente para la solicitud)
 *         mago:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID autogenerado del mago
 *             nombre:
 *               type: string
 *             apellido:
 *               type: string
 *             email:
 *               type: string
 *             pass:
 *               type: string
 *             profesion:
 *               type: string
 *             madera_varita:
 *               type: string
 *             largo_varita:
 *               type: number
 *             nucleo_varita:
 *               type: string
 *             isEmpleado:
 *               type: boolean
 *             institucion:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 ciudad:
 *                   type: string
 *                 pais:
 *                   type: string
 *         empleado:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID autogenerado del mago
 *             nombre:
 *               type: string
 *             apellido:
 *               type: string
 *             email:
 *               type: string
 *             pass:
 *               type: string
 *             profesion:
 *               type: string
 *             madera_varita:
 *               type: string
 *             largo_varita:
 *               type: number
 *             nucleo_varita:
 *               type: string
 *             isEmpleado:
 *               type: boolean
 *             institucion:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 ciudad:
 *                   type: string
 *                 pais:
 *                   type: string
 *       required:
 *         - id
 *         - permanente
 *         - motivo
 *         - hechizo
 *         - mago
 *       example:
 *         id: 1
 *         fecha_hasta: "2025-02-18T14:30:00Z"
 *         permanente: false
 *         motivo: "Quiero estudiar los efectos"
 *         estado: "aprobada"
 *         hechizo:
 *           id: 1
 *           nombre: "Sectumsempra"
 *           descripcion: "Hechizo que hace mal"
 *           instrucciones: "[REDACTED]"
 *           restringido: true
 *           patente: []
 *         mago:
 *           id: 1
 *           nombre: "Ejemplo"
 *           apellido: "Ejemplo"
 *           email: "ejemplo@ejemplo.com"
 *           pass: "EstoNoEsVerdad"
 *           profesion: "Ejemplo"
 *           madera_varita: "Ejemplo"
 *           largo_varita: 23
 *           nucleo_varita: "Ejemplo"
 *           isEmpleado: false
 *           institucion:
 *             id: 1
 *             nombre: "Hogwarts"
 *             ciudad: "Unknown"
 *             pais: "Scotland"
 *         empleado:
 *           id: 2
 *           nombre: "Amelia"
 *           apellido: "Bones"
 *           email: "amelia@bones.com"
 *           pass: "EstoNoEsVerdadDeVuelta"
 *           profesion: "Jefa del departamento de seguridad Magica"
 *           madera_varita: "Nogal"
 *           largo_varita: 23
 *           nucleo_varita: "Fibra de Corazon de Dragon"
 *           isEmpleado: false
 *           institucion:
 *             id: 1
 *             nombre: "Hogwarts"
 *             ciudad: "Unknown"
 *             pais: "Scotland"
 */
/**
 * @swagger
 * tags:
 *  name: Solicitud
 *  description: La API que maneja las Solicitudes de Visualizacion de hechizos restringidos, realizadas por los magos (usuarios) y revisada por los empleados.
 */
/**
 * @swagger
 * /api/solicitud_visualizacion:
 *  get:
 *      summary: Devuelve todas las solicitudes de visualizacion disponibles en la Base de Datos
 *      tags: [Solicitud]
 *      responses:
 *          200:
 *              description: Found All Solicitudes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Solicitud'
 *          500:
 *              description: Error en el Servidor
 *          401:
 *              description: No autenticado
 */
solicitudRouter.get('/', authMiddleware, findAll);
solicitudRouter.get('/pending', authMiddleware, findAllPending);
solicitudRouter.get('/mago', authMiddleware, findByMago);
solicitudRouter.post('/', authMiddleware, sanitizeSolicitudInput, add);
solicitudRouter.put('/grant/:id', authMiddleware, sanitizeSolicitudInput, grant);
solicitudRouter.put('/reject/:id', authMiddleware, sanitizeSolicitudInput, reject);
//# sourceMappingURL=solicitud.routes.js.map