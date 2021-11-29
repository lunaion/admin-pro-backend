require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

/* Crear e servidor expres */
const app = express();

/* Configurar CORS */
app.use( cors() );

/* Base de datos */
dbConnection();


/* Manu0613 */
/* lunaion_mean */
/* Rutas */
app.get( '/', (req, res) => {

    res.json({

        ok: true,
        msg: 'Hola Mundo'

    });

});


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});
