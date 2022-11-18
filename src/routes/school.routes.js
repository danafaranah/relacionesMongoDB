import { Router } from 'express';
import schoolCtrl from '../controllers/school.controller.js';

const route = Router();

route.get('/', schoolCtrl.listar)
route.get('/:_id', schoolCtrl.listarPorId)
route.post('/', schoolCtrl.crear)
route.put('/:_id', schoolCtrl.actualizar)
route.delete('/:_id', schoolCtrl.eliminar)

export default route