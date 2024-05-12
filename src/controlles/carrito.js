const Carrito = require("../models/carrito")
const httpCarrito = {
    getCarrito: async (req, res)=>{
        try {
            const carritos = await Carrito.find()
            res.json({ carritos })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getCarritoXId: async (req, res) => {
        try {
            const id = req.params.id
            const carrito = await Carrito.findById(id)
            if (carrito) {
                res.json({ carrito })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    postCarrito: async (req, res) => {
        try {
            const { idproducto, idcliente, cantidad, total } = req.body;
            const newCarrito = new Carrito({ idproducto, idcliente, cantidad, total });
            await newCarrito.save();
            res.json({ msj: "Carrito creado" });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    deleteCarrito: async (req,res)=>{
        try {
            const id = req.params.id
            const carrito = await Carrito.findByIdAndDelete(id)
            res.json({ msg:"Carrito Eliminado" })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}
module.exports = { httpCarrito }