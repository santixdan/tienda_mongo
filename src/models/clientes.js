const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    documento: { type: Number, required: true, unique: true },
    estado: { type: Number, default: 1 }
}, { timestamps: true })


module.exports = mongoose.model("Cliente", clienteSchema)