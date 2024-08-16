var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, Cascade, Collection, ManyToOne, ManyToMany } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Tipo_Hechizo } from "../tipo_hechizo/tipo_hechizo.entity.js";
import { Etiqueta } from "../etiqueta/etiqueta.entity.js";
import { Patente } from "../patente/patente.entity.js";
let Hechizo = class Hechizo extends BaseEntity {
    constructor() {
        super(...arguments);
        this.etiquetas = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Hechizo.prototype, "nombre", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Hechizo.prototype, "descripcion", void 0);
__decorate([
    Property({ nullable: false, unique: false }),
    __metadata("design:type", String)
], Hechizo.prototype, "instrucciones", void 0);
__decorate([
    Property({ nullable: false, unique: false }),
    __metadata("design:type", Boolean)
], Hechizo.prototype, "restringido", void 0);
__decorate([
    ManyToOne(() => Patente, { nullable: false }),
    __metadata("design:type", Object)
], Hechizo.prototype, "patente", void 0);
__decorate([
    ManyToOne(() => Tipo_Hechizo, { nullable: false }),
    __metadata("design:type", Tipo_Hechizo)
], Hechizo.prototype, "tipo_hechizo", void 0);
__decorate([
    ManyToMany(() => Etiqueta, (etiqueta) => etiqueta.hechizos, { cascade: [Cascade.ALL], owner: true }),
    __metadata("design:type", Object)
], Hechizo.prototype, "etiquetas", void 0);
Hechizo = __decorate([
    Entity()
], Hechizo);
export { Hechizo };
//# sourceMappingURL=hechizo.entity.js.map