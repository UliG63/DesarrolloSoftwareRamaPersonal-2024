import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection, OneToOne, ManyToOne } from "@mikro-orm/core"
import { Hechizo } from "../hechizo/hechizo.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.js"
import { Empleado } from "../empleado/empleado.entity.js"
import { Magos } from "../magos/magos.entity.js"

@Entity()
export class Solicitud extends BaseEntity{
    @Property({nullable: false, unique: false})
    fecha!: Date
    @Property({nullable: false, unique: false})
    motivo!: string
    @Property({nullable: true, unique: false})
    estado?: boolean
    @ManyToOne(()=>Hechizo,{nullable:false})
    hechizo!: Hechizo
    @ManyToOne(()=>Empleado, {nullable:true})
    empleado?: Empleado
    @ManyToOne(()=>Magos, {nullable:false})
    mago!: Magos
}