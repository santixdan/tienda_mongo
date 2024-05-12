const Usuario = require("../models/usuario")
const bcryptjs = require("bcryptjs")
const {generarJWT} = require("../middlewares/validarJWT")
const httpUsuarios = {
    getUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.find()
            res.json({ usuarios })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getUsuariosXId: async (req, res) => {
        try {
            const id = req.params.id
            const usuarios = await Usuario.findById(id)
            if (usuarios) {
                res.json({ usuarios })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getListarActivos: async (req, res) => {
        try {
            const usuarios = await Usuario.find({ estado: 1 })
            res.json({ usuarios })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    getListarInactivos: async (req, res) => {
        try {
            const usuarios = await Usuario.find({ estado: 0 })
            res.json({ usuarios })
        }
        catch (error) {
            res.status(400).json({ error })
        }
    },
    postUsuarios: async (req, res) => {
        try {
            const { nombre, email, password } = req.body;
            const newUsuario = new Usuario({ nombre, email, password });
            const salt = bcryptjs.genSaltSync();
            newUsuario.password = bcryptjs.hashSync(password, salt)
            await newUsuario.save();
            res.json({ newUsuario });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    postLogin: async (req, res) => {
        const { email, password } = req.body
        try {
            const usuario = await Usuario.findOne({ email })

            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(401).json({msg: "Usuario / Password no son correctos",})
            }
            const token = await generarJWT(usuario._id);
            res.json({usuario: usuario,token})
        } catch (error) {
            return res.status(500).json({msg: "Hable con el WebMaster"})
        }

    },
    postCambiarpassword: async (req, res) => {
        try {
            const { email, password, newPassword } = req.body
            const usuario = await Usuario.findOne({ email })
            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(401).json({msg: "Usuario / Password no son correctos",})
            }else {
                const salt = bcryptjs.genSaltSync();
                usuario.password = bcryptjs.hashSync(newPassword, salt)
                await usuario.save();
                res.json({ usuario })
            }
        } catch (error) {
            res.status(401).json({ msg: "Usuario no existe" })
        }
    },
    putModificar: async (req, res) => {
        try {
            const id = req.params.id;
            const { nombre, email } = req.body
            const usuario = await Usuario.findByIdAndUpdate(id, { nombre, email })
            res.json({ usuario })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    putActivar: async (req, res) => {
        try {
            const id = req.params.id
            const usuarios = await Usuario.findByIdAndUpdate(id, { estado: 1 })
            res.json({ msg: "Usuario Activado" })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    putDesactivar: async (req, res) => {
        try {
            const id = req.params.id
            const usuarios = await Usuario.findByIdAndUpdate(id, { estado: 0 })
            res.json({ msg: "Usuario Desactivado" })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    deleteUsuario: async (req, res) => {
        try {
            const id = req.params.id
            const usuarios = await Usuario.findByIdAndDelete(id)
            res.json({ msg: "Usuario Eliminado" })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}

module.exports = { httpUsuarios }