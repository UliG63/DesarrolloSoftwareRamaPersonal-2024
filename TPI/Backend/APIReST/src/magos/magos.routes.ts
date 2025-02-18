import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizeMagoInput } from "./magos.controller.js";

export const magosRouter = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Magos:
 *          type: object
 *          required:
 *              - id
 *              - nombre
 *              - apellido
 *              - email
 *              - pass
 *              - profesion
 *              - madera_varita
 *              - largo_varita
 *              - nucleo_varita
 *              - isEmpleado
 *              - institucion
 *          properties:
 *            id:
 *              type: integer
 *              description: ID autogenerado (autoincremental) del mago en Base de Datos
 *            nombre:
 *              type: string
 *              description: Nombre del mago
 *            apellido:
 *              type: string
 *              description: Apellido del mago
 *            email:
 *              type: string
 *              description: email del mago
 *            pass: 
 *              type: string
 *              description: password del mago
 *            profesion:
 *              type: string
 *              description: empleo o profesion a la que se dedica el mago
 *            madera_varita:
 *              type: string
 *              description: madera de la que esta hecha la varita del mago
 *            largo_varita:
 *              type: number
 *              description: largo de la varita del mago
 *            nucleo_varita:
 *              type: string
 *              description: nucleo de la varita del mago
 *            isEmpleado:
 *              type: boolean
 *              description: determina si el mago es empleado o no
 *            institucion:
 *              type: object
 *              properties:
 *                 id:
 *                  type: integer
 *                  description: ID autogenerado (autoincremental) de la institucion academica en la Base de Datos
 *                 nombre:
 *                  type: string
 *                  description: Nombre de la institucion academica
 *                 ciudad:
 *                  type: string
 *                  description: Ciudad donde se encuentra ubicada la institucion academica
 *                 pais:
 *                  type: string
 *                  description: Pais donde se encuentra ubicada la institucion academica
 *          example:
 *              id: 1
 *              nombre: Ejemplo
 *              apellido: Ejemplo
 *              email: ejemplo@ejemplo.com
 *              pass: EstoNoEsVerdad
 *              profesion: Ejemplo
 *              madera_varita: Ejemplo
 *              largo_varita: 23
 *              nucleo_varita: Ejemplo
 *              isEmpleado: true
 *              institucion:
 *                  id: 1
 *                  nombre: Hogwarts
 *                  ciudad: Unknown
 *                  pais: Scotland   
 */
 

magosRouter.get('/',findAll)
magosRouter.get('/:id', findOne)
magosRouter.post('/',sanitizeMagoInput, add)
magosRouter.put('/:id',sanitizeMagoInput, update)
magosRouter.patch('/:id', sanitizeMagoInput, update)
magosRouter.delete('/:id', remove)