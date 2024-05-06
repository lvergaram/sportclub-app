import { Router } from "express";
import {createSport, getAllSports, getSport, removeSport, updateSport} from '../controllers/sports.controller.js'

const route = Router()

route.get('/',getAllSports)
route.get('/:id',getSport)
route.post('/',createSport)
route.put('/:id',updateSport)
route.delete('/:id',removeSport)




export default route