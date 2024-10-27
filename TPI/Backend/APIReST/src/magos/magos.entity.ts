import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection, OneToOne, ManyToOne, Rel } from "@mikro-orm/core"
import { Hechizo } from "../hechizo/hechizo.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.js"
import { Institucion } from "../institucion/institucion.entity.js"
import { Patente } from "../patente/patente.entity.js"
import { Solicitud } from "../solicitud_visualizacion/solicitud.entity.js"


@Entity()
export class Magos extends BaseEntity{
    @Property({nullable:false,unique:false})
    nombre!:String
    @Property({nullable:false,unique:false})
    apellido!:String
    @Property({nullable:false,unique:true})
    email!:String
    @Property({nullable:false,unique:false})
    pass!:string
    @Property({nullable:true,unique:false})
    profesion?:String
    @Property({nullable:false,unique:false})
    madera_varita!:String
    @Property({nullable:false,unique:false})
    nucleo_varita!:String
    @Property({nullable:false,unique:false})
    largo_varita!:number
    @Property({nullable:false,unique:false})
    isEmpleado!:boolean
    @ManyToOne(()=>Institucion,{nullable:false})
    institucion!:Rel<Institucion>
    @OneToMany(()=>Patente, patente=>patente.mago,{cascade: [Cascade.ALL]})
    patentes?= new Collection<Patente>(this)
    @OneToMany(()=>Solicitud, solicitud=>solicitud.mago,{cascade: [Cascade.ALL]})
    solicitudes?= new Collection<Solicitud>(this)
}