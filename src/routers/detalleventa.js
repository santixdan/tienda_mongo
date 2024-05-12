const express = require('express');
const { httpDetalleVenta } = require('../controlles/detalleventa');
const routerDetalle = express.Router()
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

routerDetalle.get('/listarTodo',[
    validarJWT,
    validarCampos
],httpDetalleVenta.getDetalleVenta)//listar todo
routerDetalle.get('/listar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpDetalleVenta.getDetalleXId)//listar por un id venta

routerDetalle.post('/insertar',[
    check('producto','El id del producto es obligatorio').notEmpty().isMongoId(),
    check('valor','El precio es obligatorio').notEmpty().isNumeric(),
    check('cantidad','La cantidad es obligatoria').notEmpty().isNumeric(),
    validarCampos
],httpDetalleVenta.postDetalles)//insertar

routerDetalle.put('/modificar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpDetalleVenta.putModificar)//modificar

routerDetalle.delete('/eliminar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpDetalleVenta.deleteDetalle)//eliminar

module.exports=routerDetalle