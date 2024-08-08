import crypto from 'node:crypto';
export class Magos {
    constructor(name, apellido, varita, idMago = crypto.randomUUID()) {
        this.name = name;
        this.apellido = apellido;
        this.varita = varita;
        this.idMago = idMago;
    }
}
//# sourceMappingURL=magos.js.map