require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

/* Crear e servidor expres */
const app = express();

/* Configurar CORS */
app.use( cors() );

/* Lectura y parseo del body */
app.use( express.json() );

/* Base de datos */
dbConnection();


/* Manu0613 */
/* lunaion_mean */

/* Rutas */
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});
