const Producto = require("../models/producto")
const httpProductos={
    getProducto: async (req, res) => {
        try {
            const productos = await Producto.find()
            res.json({ productos })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getProductosXId: async (req, res) => {
        try {
            const id = req.params.id
            const productos = await Producto.findById(id)
            if (productos) {
                res.json({ productos })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getMayorX:async (req, res) =>{
        try {
            const precioMax = req.params.precioMax
            const productos = await Producto.find({precio:{$gt:precioMax}})
            if (productos) {
                res.json({ productos })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getListarActivos: async (req, res) => {
        try {
            const productos = await Producto.find({ estado: 1 })
            res.json({ productos })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    getListarInactivos: async (req, res) => {
        try {
            const productos = await Producto.find({ estado: 0 })
            res.json({ productos })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    getBajoStockMin:async (req, res) => {
        try {
            const productos = await Producto.find({ cantidad: { $lt:20 } })
            res.json({ productos })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    postProductos: async (req, res) => {
        try {
            const { nombre, precio, cantidad } = req.body;
            const newProducto = new Producto({ nombre, precio, cantidad });
            await newProducto.save();
            res.json({ msj: "Producto creado" });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    putModificar: async (req, res) => {
        try {
            const  id  = req.params.id;
            const { nombre, precio, cantidad } = req.body
            const productos = await Producto.findByIdAndUpdate(id, { nombre, precio, cantidad })
            res.json({ productos })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    putActivar: async (req,res)=>{
        try {
            const id = req.params.id
            const productos = await Producto.findByIdAndUpdate(id, {estado:1})
            res.json({ msg:"Producto Activado" })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    putDesactivar: async (req,res)=>{
        try {
            const id = req.params.id
            const productos = await Producto.findByIdAndUpdate(id, {estado:0})
            res.json({ msg:"Producto Desactivado" })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    deleteProducto: async (req,res)=>{
        try {
            const id = req.params.id
            const productos = await Producto.findByIdAndDelete(id)
            res.json({ msg:"Productos Eliminado" })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}
module.exports = { httpProductos }