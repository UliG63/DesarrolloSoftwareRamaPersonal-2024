import { Empleado } from "./empleado.entity.js";
const empleados = [
    new Empleado('Arthur', 'Weasley', ['Jefe del Departamento del Uso Indebido de la Magia'], 'f23b520b-96c6-485a-99bc-fe60214583c2'),
    new Empleado('Amelia', 'Bones', ['Jefa del Departamento de Aplicación de la Ley Mágica'], 'c1e2e9f1-b401-46ca-95eb-349267710941'),
    new Empleado('Cornelius', 'Fudge', ['Ministro de Magia'], 'f7878e37-8c84-44c3-85c0-1987c1a6baa1'),
    new Empleado('Rufus', 'Scrimgeour', ['Jefe de la Oficina de Aurores'], 'b12a7332-7e71-4666-8361-5de6bd9ec5fd'),
];
export class EmpleadoRepository {
    findAll() {
        return empleados;
    }
    findOne(item) {
        return empleados.find((empleado) => empleado.idEmpleado === item.id);
    }
    add(item) {
        empleados.push(item);
        return item;
    }
    update(item) {
        const empleadoIdx = empleados.findIndex((empleado) => empleado.idEmpleado === item.idEmpleado);
        if (empleadoIdx !== -1) {
            empleados[empleadoIdx] = { ...empleados[empleadoIdx], ...item };
        }
        return empleados[empleadoIdx];
    }
    delete(item) {
        const empleadoIdx = empleados.findIndex((empleado) => empleado.idEmpleado === item.id);
        if (empleadoIdx !== -1) {
            const deletedEmpleado = empleados[empleadoIdx];
            empleados.splice(empleadoIdx, 1);
            return deletedEmpleado;
        }
    }
}
/*

*/ 
//# sourceMappingURL=empleado.repository.js.map