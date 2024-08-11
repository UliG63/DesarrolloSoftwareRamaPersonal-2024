import express from 'express'
import { magoRouter } from './magos/magos.routes.js'
import { empleadoRouter } from './empleado/empleado.routes.js'
const app = express()

app.use(express.json())

app.use('/api/magos',magoRouter)
app.use('/api/empleado',empleadoRouter)
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