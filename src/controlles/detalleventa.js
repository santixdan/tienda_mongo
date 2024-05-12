const DetalleVenta = require("../models/detalleventa")
const httpDetalleVenta={
    getDetalleVenta: async (req, res) => {
        try {
            const detalles = await DetalleVenta.find()
            res.json({ detalles })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getDetalleXId: async (req, res) => {
        try {
            const id = req.params.id
            const detalles = await DetalleVenta.findById(id)
            if (detalles) {
                res.json({ detalles })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    postDetalles: async (req, res) => {
        try {
            const { producto, valor, cantidad } = req.body;
            const newDetalle = new DetalleVenta({ producto, valor, cantidad });
            await newDetalle.save();
            res.json({ newDetalle });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    putModificar: async (req, res) => {
        try {
            const  id  = req.params.id;
            const { producto, valor, cantidad } = req.body
            const detalles = await DetalleVenta.findByIdAndUpdate(id, { producto, valor, cantidad })
            res.json({ detalles })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    deleteDetalle: async (req,res)=>{
        try {
            const id = req.params.id
            const Detalles = await DetalleVenta.findByIdAndDelete(id)
            res.json({ msg:"Detalles de ventas Eliminados" })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}
module.exports = { httpDetalleVenta }