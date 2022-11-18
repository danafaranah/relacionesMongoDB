import { mongoModel } from "../models/mongo.model.js";
import { response } from "../helpers/response.js";

const mongoCtrl = {}

mongoCtrl.listar = async(req, res) => {
    try {
        const registros = await mongoModel.find()
        response(res, 200, true, registros, "Lista de Registros")
    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

mongoCtrl.crear = async(req, res) => {
    try {
        const nuevoRegistro = await mongoModel.create(req.body)

        response(res, 201, true, nuevoRegistro, "Registro Creado")
    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

mongoCtrl.listarPorId = async(req, res) => {
    try {

        const { _id } = req.params
        const registro = await mongoModel.findById(_id)

        if (!registro) {
            return response(res, 404, false, "", "No se encontró el registro")
        }

        response(res, 200, true, registro, "Registro Encontrado")

    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

mongoCtrl.actualizar = async(req, res) => {
    try {

        const { _id } = req.params

        const registroEncontrado = await mongoModel.findById(_id)

        if (!registroEncontrado) {
            return response(res, 404, false, "", "No se encontró el registro")
        }

        await registroEncontrado.updateOne({
            ...req.body,
            school: {
                ...registroEncontrado.school,
                ...req.body.school,
            }
        });
        response(res, 200, true, "", "Registro Actualizado")

    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}
mongoCtrl.eliminar = async(req, res) => {
    try {

        const { _id } = req.params

        const registroEncontrado = await mongoModel.findById(_id)

        if (!registroEncontrado) {
            return response(res, 404, false, "", "No se encontró el registro")
        }

        await registroEncontrado.deleteOne();
        response(res, 200, true, "", "Registro Eliminado")

    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

export default mongoCtrl