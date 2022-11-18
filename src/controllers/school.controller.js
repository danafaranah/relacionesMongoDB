import { response } from "../helpers/response.js";
import { schoolModel } from "../models/school.model.js";
import { studentModel } from "../models/student.model.js";

const schoolCtrl = {}

schoolCtrl.listar = async(req, res) => {
    try {
        const registros = await schoolModel.find()
        response(res, 200, true, registros, "Lista de Registros")
    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

schoolCtrl.crear = async(req, res) => {
    try {
        const nuevoRegistro = await schoolModel.create(req.body)
        response(res, 201, true, nuevoRegistro, "Registro Creado")

    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

schoolCtrl.listarPorId = async(req, res) => {
    try {

        const { _id } = req.params
        const registro = await schoolModel.findById(_id)

        if (!registro) {
            return response(res, 404, false, "", "No se encontró el registro")
        }

        response(res, 200, true, registro, "Registro Encontrado")

    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

schoolCtrl.actualizar = async(req, res) => {
    try {

        const { _id } = req.params

        const registroEncontrado = await schoolModel.findById(_id)

        if (!registroEncontrado) {
            return response(res, 404, false, "", "No se encontró el registro")
        }

        await registroEncontrado.updateOne(req.body);
        response(res, 200, true, "", "Registro Actualizado")

    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}
schoolCtrl.eliminar = async(req, res) => {
    try {

        const { _id } = req.params

        const registroEncontrado = await schoolModel.findById(_id)

        if (!registroEncontrado) {
            return response(res, 404, false, "", "No se encontró el registro")
        }

        // await studentModel.deleteMany({ school: registro._id })

        await registroEncontrado.deleteOne();
        response(res, 200, true, "", "Registro Eliminado")

    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

export default schoolCtrl