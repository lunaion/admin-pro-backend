/* 
    Cargar archivos al servidor.
    ruta: api/uploads/
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload, retornaImagen } = require('../controllers/uploads');


const router = Router();

router.use( expressFileUpload() );

/* Subir archivos al servidor */
router.put( '/:tipo/:id', validarJWT, fileUpload );

/* Obtener imagen */
router.get( '/:tipo/:foto', retornaImagen );


module.exports = router;