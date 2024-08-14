"use strict";
/*import { Repository } from "../shared/repository.js";
import { Magos } from "./magos.entity.js";

//Para facilitar la lectura se aconseja que el nombre de la clase "Magos" se lea como "Mago"
const magos: Magos[] = [
    new Magos(
        'Harry',
        'Potter',
        ['Acebo','Pluma de Fenix', '28cm'],
        '08fd3621-4b75-4041-af49-6071547e81a8'
    ),
    new Magos (
        'Albus Percival Wulfric Brian',
        'Dumbledore',
        ['Sauco', 'Pelo de cola de Thestral','34cm'],
        '6481190f-5832-4946-a1bd-ac2a332b4f6b'
    ),
]

export class MagosRepository implements Repository<Magos>{

  public findAll(): Magos[] | undefined {
    return magos
  }
  public findOne(item: { id: string; }): Magos | undefined {
    return magos.find((mago)=>mago.idMago===item.id)
  }
  public add(item: Magos): Magos | undefined {
    magos.push(item)
    return item
  }
  public update(item: Magos): Magos | undefined {
    const magoIdx = magos.findIndex((mago) => mago.idMago === item.idMago)
    
    if(magoIdx !== -1){
      magos[magoIdx] = { ...magos[magoIdx], ...item}

    }
    return magos[magoIdx]
  }
  public delete(item: { id: string; }): Magos | undefined {
    const magoIdx = magos.findIndex((mago) => mago.idMago === item.id)
    
    if(magoIdx !== -1){
        const deletedMagos = magos[magoIdx]
        magos.splice(magoIdx,1)
        return deletedMagos
    }
    
   
  }
}*/ 
//# sourceMappingURL=magos.repository.js.map