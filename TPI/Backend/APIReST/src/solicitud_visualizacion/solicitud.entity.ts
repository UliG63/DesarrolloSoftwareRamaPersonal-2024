import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection, OneToOne, ManyToOne, Rel } from "@mikro-orm/core"
import { Hechizo } from "../hechizo/hechizo.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.js"
import { Magos } from "../magos/magos.entity.js"

@Entity()
export class Solicitud extends BaseEntity{
    @Property({nullable: true, unique: false})
    fecha_hasta?: Date
    @Property({nullable: false, unique: false})
    permanente!: boolean
    @Property({nullable: false, unique: false})
    motivo!: string
    @Property({nullable: true, unique: false})
    motivo_rechazo?: string
    @Property({nullable: false, unique: false})
    estado?: string
    @ManyToOne(()=>Hechizo,{nullable:false})
    hechizo!: Rel<Hechizo>
    @ManyToOne(()=>Magos, {nullable:false})
    mago!: Rel<Magos>
    @ManyToOne(()=>Magos, {nullable:true})
    empleado?: Rel<Magos>
}