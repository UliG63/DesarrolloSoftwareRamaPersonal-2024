import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection, OneToOne, ManyToOne, Rel, ManyToMany } from "@mikro-orm/core"
import { Hechizo } from "../hechizo/hechizo.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.js"
import { Magos } from "../magos/magos.entity.js"
import { Tipo_Hechizo } from "../tipo_hechizo/tipo_hechizo.entity.js"
import { Etiqueta } from "../etiqueta/etiqueta.entity.js"

@Entity()
export class Patente extends BaseEntity{
    @Property({nullable: false, unique: false})
    fechaCreacion!: Date
    @Property({nullable: true, unique: false})
    nombre!: string
    @Property({nullable: false, unique: false})
    descripcion!: string
    @Property({nullable: false, unique: false})
    estado!: string
    @Property({nullable: true, unique: false})
    motivo_rechazo?:string
    @Property({nullable: false, unique: false})
    instrucciones!: string
    @Property({nullable: true, unique: false})
    restringido?:boolean
    @Property({nullable:true, unique:false})
    imagen?:string | null
    @OneToMany(() => Hechizo, hechizo => hechizo.patente)
    hechizos = new Collection<Hechizo>(this); 
    @ManyToOne(()=>Tipo_Hechizo,{nullable:true})
    tipo_hechizo?:Rel<Tipo_Hechizo>
    @ManyToMany(() => Etiqueta, (etiqueta) => etiqueta.patentes, {cascade: [Cascade.ALL], owner: true})
    etiquetas? = new Collection<Etiqueta>(this)
    @ManyToOne(()=>Magos,{nullable:true})
    empleado!: Rel<Magos>
    @ManyToOne(()=>Magos,{nullable:false})
    mago!: Rel<Magos>
}