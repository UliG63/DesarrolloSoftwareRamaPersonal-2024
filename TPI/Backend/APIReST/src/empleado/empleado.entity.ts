import crypto from 'node:crypto'
export class Empleado {
    constructor(
        public nombre:string, 
        public apellido:string, 
        public profesion:string[],
        public idEmpleado= crypto.randomUUID()
    ) {}
 
}