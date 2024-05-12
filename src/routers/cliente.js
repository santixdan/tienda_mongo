const express = require('express');
const { httpClientes } = require('../controlles/cliente');
const routerCliente = express.Router()
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

routerCliente.get('/listarTodo',[
    validarJWT,
    validarCampos
],httpClientes.getClientes)//listar todo
routerCliente.get('/listar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpClientes.getClienteXId)//listar por un id
routerCliente.get('/listarActivos',[
    validarJWT,
    validarCampos
],httpClientes.getListarActivos)// listar activos, listar inactivos
routerCliente.get('/listarInactivos',[
    validarJWT,
    validarCampos
],httpClientes.getListarInactivos)

routerCliente.post('/insertar',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('direccion','La dirreción es obligatoria').notEmpty(),
    check('telefono','El teléfono es obligatorio').notEmpty().isNumeric(),
    check('email','El email es obligatorio').notEmpty().isEmail(),
    check('documento','El documento es obligatorio').not().isEmpty(),
    validarCampos
],httpClientes.postClientes)//insertar

routerCliente.put('/modificar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpClientes.putModificar)//modificar
routerCliente.put('/activar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpClientes.putActivar)//activar
routerCliente.put('/desactivar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpClientes.putDesactivar)//desactivar

routerCliente.delete('/eliminar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpClientes.deleteCliente)

module.exports=routerCliente