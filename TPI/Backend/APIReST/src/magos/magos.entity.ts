import crypto from 'node:crypto'
export class Magos {
    constructor(
        public name:string, 
        public apellido:string, 
        public varita:string[],
        public idMago= crypto.randomUUID()
    ) {}

}