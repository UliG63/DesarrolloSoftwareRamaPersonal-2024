import { Repository } from "../shared/repository.js";
import { Empleado } from "./empleado.entity.js";

const empleados: Empleado[]=[
  new Empleado(
    'Arthur',
    'Weasley',
    ['Jefe del Departamento del Uso Indebido de la Magia'],
    'f23b520b-96c6-485a-99bc-fe60214583c2'
  ),
  new Empleado(
    'Amelia',
    'Bones',
    ['Jefa del Departamento de Aplicación de la Ley Mágica'],
    'c1e2e9f1-b401-46ca-95eb-349267710941'
  ),
  new Empleado(
    'Cornelius',
    'Fudge',
    ['Ministro de Magia'],
    'f7878e37-8c84-44c3-85c0-1987c1a6baa1'
  ),
  
  /*
  El siguiente empleado estara comentado por que lo utilizaremos
  temporalmente para probar la creacion de un nuevo empleado

  new Empleado(
    'Rufus',
    'Scrimgeour',
    ['Jefe de la Oficina de Aurores'],
    'b12a7332-7e71-4666-8361-5de6bd9ec5fd'
  ),
  */
]

/*
La siguiente clase utiliza la interfaz "Repository<T>""
utilizada por todas las clases que la implementen para
ser la clase "XRepository" que representara la capa de datos
para cada CRUD.
*/ 
export class EmpleadoRepository implements Repository<Empleado>{

  public findAll(): Empleado[] | undefined {
    return empleados
  }
  public findOne(item: { id: string; }): Empleado | undefined {
    return empleados.find((empleado)=>empleado.idEmpleado===item.id)
  }
  public add(item: Empleado): Empleado | undefined {
    empleados.push(item)
    return item
  }
  public update(item: Empleado): Empleado | undefined {
    const empleadoIdx = empleados.findIndex((empleado) => empleado.idEmpleado === item.idEmpleado)
    
    if(empleadoIdx !== -1){
      empleados[empleadoIdx] = { ...empleados[empleadoIdx], ...item}

    }
    return empleados[empleadoIdx]
  }
  public delete(item: { id: string; }): Empleado | undefined {
    const empleadoIdx = empleados.findIndex((empleado) => empleado.idEmpleado === item.id)
    
    if(empleadoIdx !== -1){
        const deletedEmpleado = empleados[empleadoIdx]
        empleados.splice(empleadoIdx,1)
        return deletedEmpleado
    }
    
   
  }
}
/*

*/