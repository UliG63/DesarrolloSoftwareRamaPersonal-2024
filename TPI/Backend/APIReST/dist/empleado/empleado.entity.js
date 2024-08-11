import crypto from 'node:crypto';
export class Empleado {
    constructor(nombre, apellido, profesion, idEmpleado = crypto.randomUUID()) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.profesion = profesion;
        this.idEmpleado = idEmpleado;
    }
}
//# sourceMappingURL=empleado.entity.js.map