import express from 'express';
import { Magos } from './magos.js';
const app = express();
app.use(express.json());
const magos = [
    new Magos('Harry', 'Potter', ['Acebo', 'Pluma de Fenix', '28cm']),
    new Magos('Albus Percival Wulfric Brian', 'Dumbledore', ['Sauco', 'Pelo de cola de Thestral', '34cm']),
];
function sanitizeMagoInput(req, res, next) {
    req.body.sanitizedInput = {
        name: req.body.name,
        apellido: req.body.apellido,
        varita: req.body.varita,
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined)
            delete req.body.sanitizedInput[key];
    });
    next();
}
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
app.post('/api/magos', sanitizeMagoInput, (req, res) => {
    const input = req.body.sanitizedInput;
    const mago = new Magos(input.name, input.apellido, input.varita);
    magos.push(mago);
    res.status(201).send({ message: 'Mago Creado', data: mago });
});
app.put('/api/magos/:id', sanitizeMagoInput, (req, res) => {
    const magoIdx = magos.findIndex((mago) => { mago.idMago === req.params.id; });
    if (magoIdx === -1) {
        res.status(404).send({ message: 'Mago not Found' });
    }
    magos[magoIdx] = { ...magos[magoIdx], ...req.body.sanitizedInput };
    res.status(200).send({ message: "Mago actualizado correctamente", data: magos[magoIdx] });
});
app.patch('/api/magos/:id', sanitizeMagoInput, (req, res) => {
    const magoIdx = magos.findIndex((mago) => { mago.idMago === req.params.id; });
    if (magoIdx === -1) {
        res.status(404).send({ message: 'Mago not Found' });
    }
    magos[magoIdx] = { ...magos[magoIdx], ...req.body.sanitizedInput };
    res.status(200).send({ message: "Mago actualizado correctamente", data: magos[magoIdx] });
});
app.delete('/api/magos/:id', (req, res) => {
    const magoIdx = magos.findIndex((mago) => { mago.idMago === req.params.id; });
    if (magoIdx === -1) {
        res.status(404).send({ message: 'Mago not Found' });
    }
    magos.splice(magoIdx, 1);
    res.status(200).send({ message: 'Mago eliminado exitosamente' });
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map