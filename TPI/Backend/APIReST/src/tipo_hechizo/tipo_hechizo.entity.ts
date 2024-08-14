import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection } from "@mikro-orm/core"
import { Hechizo } from "../hechizo/hechizo.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.js"

@Entity()
export class Tipo_Hechizo extends BaseEntity{
    @Property({nullable: false, unique: true})
    nombre!: string
    @Property({nullable: false, unique: true})
    caracteristicas!: string
    @OneToMany(()=>Hechizo, hechizo => hechizo.tipo_hechizo, {cascade: [Cascade.ALL]})
    hechizos = new Collection<Hechizo>(this) 

}