import 'reflect-metadata'
import express from 'express'
import { magoRouter } from './magos/magos.routes.js'
import { empleadoRouter } from './empleado/empleado.routes.js'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
const app = express()

app.use(express.json())

app.use((req, res, next)=>{
    RequestContext.create(orm.em, next)
})

app.use('/api/magos',magoRouter)
app.use('/api/empleado',empleadoRouter)
/*
    El siguiente metodo se encarga de devolver un mensaje compatible
    con la API cuando se introduce una URL invalida, y no contenido HTML
*/

app.use((_, res) =>{
    return res.status(404).send({message:'Resource not found'})
})

await syncSchema() //solo en development

app.listen(3000, ()=>{
    console.log('Server running on http://localhost:3000/')
})