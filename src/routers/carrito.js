const express = require('express');
const { httpCarrito } = require('../controlles/carrito');
const routerCarrito = express.Router()
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

routerCarrito.get('/listarTodo',httpCarrito.getCarrito)//listar todo
routerCarrito.get('/listar/:id',[
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpCarrito.getCarritoXId)//listar carrrito x cliente

routerCarrito.post('/insertar',[
    check('idproducto','El id del producto es obligatorio').notEmpty().isMongoId(),
    check('idcliente','El id del cliente es obligatorio').notEmpty().isMongoId(),
    check('cantidad','La cantidad es obligatoria').notEmpty(),
    check('total','El total es obligatorio').notEmpty().isNumeric(),
    validarCampos
],httpCarrito.postCarrito)//insertar

routerCarrito.delete('/eliminar/:id',[
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpCarrito.deleteCarrito)//eliminar

module.exports=routerCarrito