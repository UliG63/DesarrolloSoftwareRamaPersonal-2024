import express, { NextFunction, Request, Response } from 'express'
import { Magos } from './magos/magos.entity.js'
import { MagosRepository } from './magos/magos.repository.js'

const app = express()

app.use(express.json())


const repository = new MagosRepository
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

function sanitizeMagoInput(req: Request, res: Response, next: NextFunction){
    
    req.body.sanitizedInput = {
        name: req.body.name,
        apellido: req.body.apellido,
        varita: req.body.varita,
    }

    Object.keys(req.body.sanitizedInput).forEach(key=>{
        if(req.body.sanitizedInput[key]===undefined) delete req.body.sanitizedInput[key]
    })

    next()
}

app.get('/api/magos', (req,res)=>{
    res.json({data:repository.findAll()})
})

app.get('/api/magos/:id',(req,res)=>{
    const id= req.params.id
    const mago = repository.findOne({id})
    if(!mago){
        return res.status(404).send({message:'Mago not Found'})
    }
    res.json({data:mago})
})

app.post('/api/magos',sanitizeMagoInput,(req,res)=>{
    const input=req.body.sanitizedInput

    const mago=new Magos(
        input.name,input.apellido,input.varita
    )
    magos.push(mago)
    return res.status(201).send({message:'Mago Creado',data:mago})
})

app.put('/api/magos/:id',sanitizeMagoInput,(req,res)=>{
    const magoIdx = magos.findIndex((mago) => mago.idMago === req.params.id)
    if(magoIdx === -1){
        return res.status(404).send({message:'Mago not Found'}) 
    }
    magos[magoIdx] = { ...magos[magoIdx], ...req.body.sanitizedInput}
    return res.status(200).send({message:"Mago actualizado correctamente",data: magos[magoIdx] })
})

app.patch('/api/magos/:id',sanitizeMagoInput,(req,res)=>{
    const magoIdx = magos.findIndex((mago) => mago.idMago === req.params.id)
    if(magoIdx === -1){
        return res.status(404).send({message:'Mago not Found'}) 
    }
    magos[magoIdx] = { ...magos[magoIdx], ...req.body.sanitizedInput}
    return res.status(200).send({message:"Mago actualizado correctamente",data: magos[magoIdx] })
})

app.delete('/api/magos/:id', (req,res)=>{
    const magoIdx = magos.findIndex((mago) => mago.idMago === req.params.id)
    if(magoIdx === -1){
        return res.status(404).send({message:'Mago not Found'}) 
    }
    magos.splice(magoIdx,1)
    return res.status(200).send({message:'Mago eliminado exitosamente'})

})
/*
    El siguiente metodo se encarga de devolver un mensaje compatible
    con la API cuando se introduce una URL invalida, y no contenido HTML
*/
app.use((_, res) =>{
    return res.status(404).send({message:'Resource not found'})
})

app.listen(3000, ()=>{
    console.log('Server running on http://localhost:3000/')
})