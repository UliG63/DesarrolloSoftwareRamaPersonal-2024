import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection, OneToOne, ManyToOne } from "@mikro-orm/core"
import { Hechizo } from "../hechizo/hechizo.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.js"
import { Institucion } from "../institucion/institucion.entity.js"
import { Patente } from "../patente/patente.entity.js"
import { Solicitud } from "../solicitud_visualizacion/solicitud.entity.js"


@Entity()
export class Empleado extends BaseEntity{
    @Property({nullable:false,unique:false})
    nombre!:String
    @Property({nullable:false,unique:false})
    apellido!:String
    @Property({nullable:false,unique:true})
    email!:String
    @Property({nullable:false,unique:false})
    pass!:String
    @Property({nullable:false,unique:false})
    profesion!:String
    @Property({nullable:false,unique:false})
    madera_varita!:String
    @Property({nullable:false,unique:false})
    nucleo_varita!:String
    @Property({nullable:false,unique:false})
    largo_varita!:number
    @Property({nullable:false,unique:false})
    isEmpleado!:boolean
    @OneToMany(()=>Patente, patente=>patente.empleado,{cascade: [Cascade.ALL]})
    patentes?= new Collection<Patente>(this)
    @OneToMany(()=>Solicitud, solicitud=>solicitud.empleado,{cascade: [Cascade.ALL]})
    solicitudes?= new Collection<Solicitud>(this)
}