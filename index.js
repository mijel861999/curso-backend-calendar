
//LIBRERÍAS
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//CREANDO EL SERVIDOR DE EXPRES
const app = express();

//BASE DE DATOS
dbConnection();

// CORS
app.use(cors());


const port = process.env.PORT;

//Directorio Público
app.use( express.static('public'));

//Lectura y parseo del body
app.use( express.json() );


//RUTAS
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos


//ESCUCHAR LA RUTA Y PONER A CORRER
app.listen( port, ()=>{
    console.log('Your aplication run in the port ' + port);
})