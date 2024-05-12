const Venta = require("../models/venta")
const httpVenta = {
    getVentas: async (req, res) => {
        try {
            const ventas = await Venta.find()
            res.json({ ventas })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getVentaXId: async (req, res) => {
        try {
            const id = req.params.id
            const ventas = await Venta.findById(id)
            if (ventas) {
                res.json({ ventas })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getListarActivos: async (req, res) => {
        try {
            const ventas = await Venta.find({ estado: 1 })
            res.json({ ventas })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    getListarInactivos: async (req, res) => {
        try {
            const ventas = await Venta.find({ estado: 0 })
            res.json({ ventas })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    getVentaCliente: async (req, res) => {
        try {
            const cliente = req.params.cliente
            const ventas = await Venta.find({ cliente: cliente })
            res.json({ ventas })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getVentasDeDosFechas: async (req, res) => {
        try {
            const { fecha1, fecha2 } = req.body
            const ventas = await Venta.find({ fecha: { $gte: fecha1, $lte: fecha2 } })
            res.json({ ventas })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getVentaMax: async (req, res) =>{
        try {
            const precioMax = req.params.precioMax
            const ventas = await Venta.find({ valor: { $gt: precioMax } })
            res.json({ ventas })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    postVentas: async (req, res) => {
        try {
            const { detalle, cliente, fecha, descuento, valor } = req.body;
            const newVenta = new Venta({ detalle, cliente, fecha, descuento, valor });
            await newVenta.save();
            res.json({ msj: "Venta creada" });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    putModificar: async (req, res) => {
        try {
            const id = req.params.id;
            const { detalle, cliente, fecha, descuento, valor } = req.body
            const ventas = await Venta.findByIdAndUpdate(id, { detalle, cliente, fecha, descuento, valor })
            res.json({ ventas })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    putActivar: async (req, res) => {
        try {
            const id = req.params.id
            const ventas = await Venta.findByIdAndUpdate(id, { estado: 1 })
            res.json({ msg: "Venta Activada" })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    putDesactivar: async (req, res) => {
        try {
            const id = req.params.id
            const ventas = await Venta.findByIdAndUpdate(id, { estado: 0 })
            res.json({ msg: "Venta Desactivada" })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    deleteVenta: async (req, res) => {
        try {
            const id = req.params.id
            const ventas = await Venta.findByIdAndDelete(id)
            res.json({ msg: "Venta Eliminada" })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}
module.exports = { httpVenta }
