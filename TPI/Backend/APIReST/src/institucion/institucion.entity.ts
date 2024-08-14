import { Entity, OneToMany, PrimaryKey, Property, Cascade, Collection } from "@mikro-orm/core"
import { Magos } from "../magos/magos.entity.js"
import { BaseEntity } from "../shared/db/baseEntity.js"

@Entity()
export class Institucion extends BaseEntity{
    @Property({nullable: false, unique: true})
    nombre!: string
    @Property({nullable: true, unique: false})
    ciudad!: string
    @Property({nullable: false, unique: false})
    pais!: string
    @OneToMany(()=>Magos, magos => magos.institucion, {cascade: [Cascade.ALL]})
    magos = new Collection<Magos>(this) 

}