import { Router } from 'express';
import studentCtrl from '../controllers/student.controller.js';

const route = Router();

route.get('/', studentCtrl.listar)
route.get('/:_id', studentCtrl.listarPorId)
route.post('/', studentCtrl.crear)
route.put('/:_id', studentCtrl.actualizar)
route.delete('/:_id', studentCtrl.eliminar)

export default route