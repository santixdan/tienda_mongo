const Cliente = require("../models/clientes")
const httpClientes = {
    getClientes: async (req, res) => {
        try {
            const clientes = await Cliente.find()
            res.json({ clientes })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getClienteXId: async (req, res) => {
        try {
            const id = req.params.id
            const clientes = await Cliente.findById(id)
            if (clientes) {
                res.json({ clientes })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getListarActivos: async (req, res) => {
        try {
            const clientes = await Cliente.find({ estado: 1 })
            res.json({ clientes })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    getListarInactivos: async (req, res) => {
        try {
            const clientes = await Cliente.find({ estado: 0 })
            res.json({ clientes })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    postClientes: async (req, res) => {
        try {
            const { nombre, direccion, telefono, email, documento } = req.body;
            const newCliente = new Cliente({ nombre, direccion, telefono, email, documento });
            await newCliente.save();
            res.json({ msj: "Cliente creado" });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    putModificar: async (req, res) => {
        try {
            const  id  = req.params.id;
            const { nombre, direccion, telefono, email, documento } = req.body
            const clientes = await Cliente.findByIdAndUpdate(id, { nombre, direccion, telefono, email, documento })
            res.json({ clientes })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    putActivar: async (req,res)=>{
        try {
            const id = req.params.id
            const clientes = await Cliente.findByIdAndUpdate(id, {estado:1})
            res.json({ msg:"Cliente Activado" })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    putDesactivar: async (req,res)=>{
        try {
            const id = req.params.id
            const clientes = await Cliente.findByIdAndUpdate(id, {estado:0})
            res.json({ msg:"Cliente Desactivado" })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    deleteCliente: async (req,res)=>{
        try {
            const id = req.params.id
            const clientes = await Cliente.findByIdAndDelete(id)
            res.json({ msg:"Cliente Eliminado" })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}
module.exports = { httpClientes }