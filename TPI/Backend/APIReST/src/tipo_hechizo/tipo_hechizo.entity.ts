import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection } from "@mikro-orm/core"
import { Patente } from "../patente/patente.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.js"

@Entity()
export class Tipo_Hechizo extends BaseEntity{
    @Property({nullable: false, unique: true})
    nombre!: string
    @Property({nullable: false, unique: true})
    caracteristicas!: string
    @OneToMany(()=>Patente, patente => patente.tipo_hechizo, {cascade: [Cascade.ALL]})
    patentes = new Collection<Patente>(this) 

}