import express from 'express';
import { Magos } from './magos.js';
const app = express();
app.use(express.json());
const magos = [
    new Magos('Harry', 'Potter', ['Acebo', 'Pluma de Fenix', '28cm']),
    new Magos('Albus Percival Wulfric Brian', 'Dumbledore', ['Sauco', 'Pelo de cola de Thestral', '34cm']),
];
app.get('/api/magos', (req, res) => {
    res.json({ data: magos });
});
app.get('/api/magos/:id', (req, res) => {
    const mago = magos.find((mago) => mago.idMago === req.params.id);
    if (!mago) {
        res.status(404).send({ message: 'Mago not Found' });
    }
    res.json({ data: mago });
});
app.post('/api/magos', (req, res) => {
    const { name, apellido, varita } = req.body;
    const mago = new Magos(name, apellido, varita);
    magos.push(mago);
    res.status(201).send({ message: 'Mago Creado', data: mago });
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map