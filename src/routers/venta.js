const express = require('express');
const { httpVenta } = require('../controlles/venta');
const routerVenta = express.Router()
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');


routerVenta.get('/listarTodo',[
    validarJWT,
    validarCampos
],httpVenta.getVentas)
routerVenta.get('/listar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpVenta.getVentaXId)
routerVenta.get('/listarActivos',[
    validarJWT,
    validarCampos
],httpVenta.getListarActivos)// listar activos, listar inactivos
routerVenta.get('/listarInactivos',[
    validarJWT,
    validarCampos
],httpVenta.getListarInactivos)
routerVenta.get('/listarVentaCliente/:cliente',[
    validarJWT,
    check('cliente','El id del cliente no es válido').isMongoId(),
    validarCampos
],httpVenta.getVentaCliente)// listar ventas del cliente xxx
routerVenta.get('/listarVentasDeDosFechas',[
    validarJWT,
    validarCampos
],httpVenta.getVentasDeDosFechas)// listar todas las ventas entre dos fechas
routerVenta.get('/listarVentaMax/:precioMax',[
    validarJWT,
    check('precioMax','El precio máximo es obligatorio').notEmpty().isNumeric(),
    validarCampos
],httpVenta.getVentaMax)// listar ventas con un valor superior a xxxx

routerVenta.post('/insertar',[
    check('detalle','El id del detalle es obligatorio').notEmpty().isMongoId(),
    check('cliente','El id del cliente es obligatorio').notEmpty().isMongoId(),
    check('fecha','La fecha es obligatoria').notEmpty(),
    check('valor','El valor es obligatorio').not().isEmpty(),
    validarCampos
],httpVenta.postVentas)//insertar

routerVenta.put('/modificar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpVenta.putModificar)//modificar
routerVenta.put('/activar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpVenta.putActivar)//activar
routerVenta.put('/desactivar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpVenta.putDesactivar)//desactivar

routerVenta.delete('/eliminar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpVenta.deleteVenta)

module.exports=routerVenta