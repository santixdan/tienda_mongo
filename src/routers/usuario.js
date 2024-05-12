// import { usuario } from "../models/usuario";
const { Router } = require('express');
const { httpUsuarios } = require('../controlles/usuario');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');
// const { generarJWT } = require('../middlewares/validarJWT');

// const {Router}=Router()

const routerUsuario = Router()

routerUsuario.get('/listarTodo',[
    validarJWT,
    validarCampos
],httpUsuarios.getUsuarios)//listar todo
routerUsuario.get('/listar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpUsuarios.getUsuariosXId)//listar por un id
routerUsuario.get('/listarActivos',[
    validarJWT,
    validarCampos
],httpUsuarios.getListarActivos)// listar activos, listar inactivos
routerUsuario.get('/listarInactivos',[
    validarJWT,
    validarCampos
],httpUsuarios.getListarInactivos)

routerUsuario.post('/insertar',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','El email no es válido').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('password','La contraseña debe ser mayor a 8 caracteres').isLength({min:8}),
    validarCampos
],httpUsuarios.postUsuarios)//insertar
routerUsuario.post('/login',[
    check('email','El email es obligatorio').notEmpty().isEmail(),
    check('password','La contraseña es obligatoria').notEmpty().isLength({min:8}),
    validarCampos
],httpUsuarios.postLogin)//login
routerUsuario.post('/cambiarPassword',[
    validarJWT,
    check('email','El email es obligatorio').notEmpty().isEmail(),
    check('password','La contraseña es obligatoria').notEmpty().isLength({min:8}),
    validarCampos
],httpUsuarios.postCambiarpassword)//cambio contraseña

routerUsuario.put('/modificar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpUsuarios.putModificar)//modificar
routerUsuario.put('/activar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpUsuarios.putActivar)//activar
routerUsuario.put('/desactivar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpUsuarios.putDesactivar)//desactivar

routerUsuario.delete('/eliminar/:id',[
    validarJWT,
    check('id','Id no válido').isMongoId(),
    validarCampos
],httpUsuarios.deleteUsuario)

module.exports=routerUsuario