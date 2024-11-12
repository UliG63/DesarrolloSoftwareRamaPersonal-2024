import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection, ManyToMany } from "@mikro-orm/core"
import { Hechizo } from "../hechizo/hechizo.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.js"
import { Patente } from "../patente/patente.entity.js"

@Entity()
export class Etiqueta extends BaseEntity{
    @Property({nullable: false, unique: true})
    nombre!: string
    @Property({nullable: false, unique: true})
    descripcion!: string
    @ManyToMany(() => Patente, (patente)=>patente.etiquetas)
    patentes = new Collection<Patente>(this) 

}