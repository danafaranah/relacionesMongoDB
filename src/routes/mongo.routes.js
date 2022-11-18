import { Router } from 'express';
import mongoCtrl from '../controllers/mongo.controller.js';


const route = Router();

route.get('/', mongoCtrl.listar)
route.get('/:_id', mongoCtrl.listarPorId)
route.post('/', mongoCtrl.crear)
route.put('/:_id', mongoCtrl.actualizar)
route.delete('/:_id', mongoCtrl.eliminar)

export default route