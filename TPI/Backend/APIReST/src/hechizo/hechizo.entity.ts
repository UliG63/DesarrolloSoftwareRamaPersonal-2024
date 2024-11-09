import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection, ManyToOne, ManyToMany, OneToOne,  Rel } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.js"
import { Patente } from "../patente/patente.entity.js"


@Entity()
export class Hechizo extends BaseEntity{
    @Property({nullable: false, unique: true})
    nombre!: string
    @Property({nullable: false, unique: true})
    descripcion!: string
    @Property({nullable: false, unique: false})
    instrucciones!: string
    @Property({nullable: false, unique: false})
    restringido!: boolean
    @ManyToOne(() => Patente, { nullable: false })
    patente!: Rel<Patente>;
    
}