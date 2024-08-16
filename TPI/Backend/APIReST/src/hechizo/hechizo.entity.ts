import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection, ManyToOne, ManyToMany, OneToOne,  Rel } from "@mikro-orm/core"
import { BaseEntity } from "../shared/db/baseEntity.js"
import { Tipo_Hechizo } from "../tipo_hechizo/tipo_hechizo.entity.js"
import { Etiqueta } from "../etiqueta/etiqueta.entity.js" 
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
    @ManyToOne(()=>Tipo_Hechizo, {nullable:false})
    tipo_hechizo!: Tipo_Hechizo
    @ManyToMany(() => Etiqueta, (etiqueta) => etiqueta.hechizos, {cascade: [Cascade.ALL], owner: true})
    etiquetas = new Collection<Etiqueta>(this) 

}