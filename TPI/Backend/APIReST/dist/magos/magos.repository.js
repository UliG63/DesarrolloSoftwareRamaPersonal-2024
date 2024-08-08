import { Magos } from "./magos.entity.js";
const magos = [
    new Magos('Harry', 'Potter', ['Acebo', 'Pluma de Fenix', '28cm'], '08fd3621-4b75-4041-af49-6071547e81a8'),
    new Magos('Albus Percival Wulfric Brian', 'Dumbledore', ['Sauco', 'Pelo de cola de Thestral', '34cm'], '6481190f-5832-4946-a1bd-ac2a332b4f6b'),
];
export class MagosRepository {
    findAll() {
        return magos;
    }
    findOne(item) {
        return magos.find((mago) => mago.idMago === item.id);
    }
    add(item) {
        magos.push(item);
        return item;
    }
    update(item) {
        const magoIdx = magos.findIndex((mago) => mago.idMago === item.idMago);
        if (magoIdx !== -1) {
            magos[magoIdx] = { ...magos[magoIdx], ...item };
        }
        return magos[magoIdx];
    }
    delete(item) {
        const magoIdx = magos.findIndex((mago) => mago.idMago === item.id);
        if (magoIdx !== -1) {
            const deletedMagos = magos[magoIdx];
            magos.splice(magoIdx, 1);
            return deletedMagos;
        }
    }
}
//# sourceMappingURL=magos.repository.js.map