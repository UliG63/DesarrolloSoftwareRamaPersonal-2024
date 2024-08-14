import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection, OneToOne, ManyToOne } from "@mikro-orm/core"
import { Hechizo } from "../hechizo/hechizo.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.js"
import { Empleado } from "../empleado/empleado.entity.js"
import { Magos } from "../magos/magos.entity.js"

@Entity()
export class Patente extends BaseEntity{
    @Property({nullable: false, unique: false})
    fechaCreacion!: Date
    @Property({nullable: false, unique: true})
    descripcion!: string
    @Property({nullable: true, unique: false})
    estado?: boolean
    @OneToOne(() => Hechizo, hechizo => hechizo.patente)
    hechizo?: Hechizo
    @ManyToOne(()=>Empleado,{nullable:true})
    empleado?: Empleado
    @ManyToOne(()=>Magos,{nullable:false})
    mago!: Magos
}