import { Response } from 'express';
import { AuthRequest } from './types.js'; 

//Funcion que valida que el usuario este logeado y pertenezca al sitio, devuelve dicho usuario.
export function validateUser(req: AuthRequest) {
    const magoExistente = req.user;
    if (!magoExistente) {
        return null;  
    }
    return magoExistente;
}
//Funcion que valida que el usuario loggeado sea empleado y sea el mismo enviado desde el front, devuelve dicho empleado
export function validateEmpleado(req: AuthRequest){
    const empleado = req.user;
    if(!empleado || empleado.id!=req.body.empleado || !empleado.isEmpleado){
        return null;
    }
    return empleado;
}