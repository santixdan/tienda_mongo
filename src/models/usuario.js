const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true, default: "", min: 8, max: 15 },
    estado: { type: Number, default: 1 }
}, { timestamps: true })


module.exports = mongoose.model('Usuario', usuarioSchema)