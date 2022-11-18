import { response } from "../helpers/response.js";
import { studentModel } from "../models/student.model.js";


const studentCtrl = {}

studentCtrl.listar = async(req, res) => {
    try {
        const registros = await studentModel.find().populate("school")
        response(res, 200, true, registros, "Lista de Registros")
    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

studentCtrl.crear = async(req, res) => {
    try {
        const nuevoRegistro = await studentModel.create(req.body)

        response(res, 201, true, nuevoRegistro, "Registro Creado")
    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

studentCtrl.listarPorId = async(req, res) => {
    try {

        const { _id } = req.params
        const registro = await studentModel.findById(_id).populate("school")

        if (!registro) {
            return response(res, 404, false, "", "No se encontró el registro")
        }

        response(res, 200, true, registro, "Registro Encontrado")

    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

studentCtrl.actualizar = async(req, res) => {
    try {

        const { _id } = req.params

        const registroEncontrado = await studentModel.findById(_id)

        if (!registroEncontrado) {
            return response(res, 404, false, "", "No se encontró el registro")
        }

        await registroEncontrado.updateOne(req.body);
        response(res, 200, true, "", "Registro Actualizado")

    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}
studentCtrl.eliminar = async(req, res) => {
    try {

        const { _id } = req.params

        const registroEncontrado = await studentModel.findById(_id)

        if (!registroEncontrado) {
            return response(res, 404, false, "", "No se encontró el registro")
        }

        await registroEncontrado.deleteOne();
        response(res, 200, true, "", "Registro Eliminado")

    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

export default studentCtrl