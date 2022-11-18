import mongoose from "mongoose";
import { studentModel } from "./student.model.js";
const { Schema, model } = mongoose;

const schoolSchema = new Schema({
    name: String,
    adress: String,
    city: String,
    state: String,
    zipcode: String,
});

schoolSchema.pre("deleteOne", { document: true }, async function() {

    //trigger o disparador
    await studentModel.deleteMany({ school: this._id.toString() });
});

export const schoolModel = model("school", schoolSchema);