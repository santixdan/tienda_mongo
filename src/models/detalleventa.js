const mongoose = require('mongoose');

const detalleVentaSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    valor: { type: Number, required: true },
    cantidad: { type: Number, required: true }
}, { timestamps: true })


module.exports = mongoose.model("DetalleVenta", detalleVentaSchema)