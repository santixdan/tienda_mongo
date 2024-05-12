const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
    detalle: { type: mongoose.Schema.Types.ObjectId, ref: 'DetalleVenta' },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    fecha: { type: Date, required: true },
    descuento: { type: Number, default: 0 },
    estado: { type: Number, default: 1 },
    valor: { type: Number, required: true }
}, { timestamps: true })

module.exports = mongoose.model("Venta", ventaSchema)