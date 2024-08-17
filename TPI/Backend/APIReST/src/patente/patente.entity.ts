import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection, OneToOne, ManyToOne, Rel } from "@mikro-orm/core"
import { Hechizo } from "../hechizo/hechizo.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.js"
import { Magos } from "../magos/magos.entity.js"

@Entity()
export class Patente extends BaseEntity{
    @Property({nullable: false, unique: false})
    fechaCreacion!: Date
    @Property({nullable: false, unique: true})
    descripcion!: string
    @Property({nullable: true, unique: false})
    estado?: boolean
    @OneToMany(() => Hechizo, hechizo => hechizo.patente)
    hechizos = new Collection<Hechizo>(this); 
    @ManyToOne(()=>Magos,{nullable:true})
    empleado!: Rel<Magos>
    @ManyToOne(()=>Magos,{nullable:false})
    mago!: Rel<Magos>
}