const express = require('express');
const { httpProductos } = require('../controlles/producto');
const routerProducto = express.Router()
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');


routerProducto.get('/listarTodo',[
    validarJWT,
    validarCampos
],httpProductos.getProducto)//listar todo
routerProducto.get('/listar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpProductos.getProductosXId)//listar por un id
routerProducto.get('/mayorAlPrecioX/:precioMax',[
    validarJWT,
    check('precioMax','Precio inválido').notEmpty().isNumeric(),
    validarCampos
],httpProductos.getMayorX)//listar todos los articulos por encima del precio xxx
routerProducto.get('/listarActivos',[
    validarJWT,
    validarCampos
],httpProductos.getListarActivos)// listar activos, listar inactivos
routerProducto.get('/listarInactivos',[
    validarJWT,
    validarCampos
],httpProductos.getListarInactivos)
routerProducto.get('/bajoStockMin',[
    validarJWT,
    validarCampos
],httpProductos.getBajoStockMin)//liste todos los productos por debajo stockminimo

routerProducto.post('/insertar',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio').notEmpty().isNumeric(),
    check('cantidad','La cantidad es obligatoria').notEmpty(),
    check('stockminimo','El stockminimo es obligatorio').not().isEmpty(),
    validarCampos
],httpProductos.postProductos)//insertar

routerProducto.put('/modificar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpProductos.putModificar)//modificar
routerProducto.put('/activar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpProductos.putActivar)//activar
routerProducto.put('/desactivar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpProductos.putDesactivar)//desactivar

routerProducto.delete('/eliminar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpProductos.deleteProducto)

module.exports=routerProducto