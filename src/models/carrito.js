const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    idproducto: { type: mongoose.Schema.Types.ObjectId,ref:'Producto' },
    idcliente: { type: mongoose.Schema.Types.ObjectId,ref:'Cliente' },
    cantidad: { type: Number, required: true },
    total: { type: Number, required: true }
}, { timestamps: true })

module.exports= mongoose.model("Carrito", carritoSchema)