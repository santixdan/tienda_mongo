const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const routerUsuario=require('./src/routers/usuario')
const routerVenta=require('./src/routers/venta')
const routerProducto=require('./src/routers/producto')
const routerDetalle=require('./src/routers/detalleventa')
const routerCliente=require('./src/routers/cliente')
const routerCarrito=require('./src/routers/carrito')

const app= express()

app.use(express.json())
app.use('/usuario',routerUsuario)
app.use('/venta',routerVenta)
app.use('/producto',routerProducto)
app.use('/detalleventa',routerDetalle)
app.use('/cliente',routerCliente)
app.use('/carrito',routerCarrito)

app.listen(process.env.PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${process.env.PORT}`);
    mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=>console.log('Connected!'))
});