import path from 'path'
import { readFile,writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'

const __dirname = import.meta.dirname
const dataPath = path.join(__dirname,'../data/sports.json')

const getAll = async() =>{
    const data = await readFile(dataPath,"utf-8")
    const sports = JSON.parse(data)
    return sports
}

const getById = async(id) =>{
    const sports = await getAll()
    const sport = sports.find( sport => sport.id===id) || {ok:false, msg:"id no existe"}
    return sport
}

const create = async(nombre,precio) =>{
    const sports = await getAll()
    const newSport = {
        id: nanoid(),
        nombre,
        precio
    }
    sports.push(newSport)
    writeFile(dataPath,JSON.stringify(sports))
    return newSport
}

const update = async(id,nombre,precio) =>{
    const sports = await getAll()
    const sport = sports.find( sport => sport.id === id)
    sport.nombre = nombre || sport.nombre
    sport.precio = precio || sport.precio
    
    writeFile(dataPath,JSON.stringify(sports))
    return sport
    
}

const remove = async(id) =>{
    let sports = await getAll()
    sports = sports.filter( sport => sport.id!==id)
    writeFile(dataPath,JSON.stringify(sports))
    return sports
}


export const Sport = {
    getAll,
    getById,
    create,
    update,
    remove
}