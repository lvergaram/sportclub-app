import { Sport } from "../models/sports.model.js"

export const getAllSports = async(req,res)=>{
    const sports = await Sport.getAll() || []
    res.json(sports)    
}

export const getSport = async(req,res)=>{
    const {id} = req.params
    const sport = await Sport.getById(id)
    res.json(sport)
}


export const createSport = async (req,res)=>{
    console.log(req.body)
    const {nombre,precio} = req.body
    const newSport = await Sport.create(nombre,precio)    
    res.json(newSport)
}


export const updateSport = async(req,res)=>{
    const {id} = req.params
    const {nombre,precio} = req.body
    console.log({id,nombre,precio})
    const newSport = await Sport.update(id,nombre,precio)    
    res.json(newSport)
}


export const removeSport = async(req,res)=>{
    const {id} = req.params
    const sports = await Sport.remove(id)
    res.json(sports)
}









