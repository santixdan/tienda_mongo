const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    stockminimo: { type: Number, default:20 },
    estado: { type: Number, default: 1 }
}, { timestamps: true })


module.exports = mongoose.model("Producto", productoSchema)