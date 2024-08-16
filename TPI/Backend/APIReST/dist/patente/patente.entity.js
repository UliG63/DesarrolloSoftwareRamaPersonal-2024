var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, OneToMany, Property, Collection, ManyToOne } from "@mikro-orm/core";
import { Hechizo } from "../hechizo/hechizo.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Empleado } from "../empleado/empleado.entity.js";
import { Magos } from "../magos/magos.entity.js";
let Patente = class Patente extends BaseEntity {
    constructor() {
        super(...arguments);
        this.hechizos = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false, unique: false }),
    __metadata("design:type", Date)
], Patente.prototype, "fechaCreacion", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Patente.prototype, "descripcion", void 0);
__decorate([
    Property({ nullable: true, unique: false }),
    __metadata("design:type", Boolean)
], Patente.prototype, "estado", void 0);
__decorate([
    OneToMany(() => Hechizo, hechizo => hechizo.patente),
    __metadata("design:type", Object)
], Patente.prototype, "hechizos", void 0);
__decorate([
    ManyToOne(() => Empleado, { nullable: true }),
    __metadata("design:type", Object)
], Patente.prototype, "empleado", void 0);
__decorate([
    ManyToOne(() => Magos, { nullable: false }),
    __metadata("design:type", Magos)
], Patente.prototype, "mago", void 0);
Patente = __decorate([
    Entity()
], Patente);
export { Patente };
//# sourceMappingURL=patente.entity.js.map