import { Request, Response } from "express";

async function findAll(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function findOne(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function add(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function update(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function remove(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

export {findAll, findOne, add, update, remove}