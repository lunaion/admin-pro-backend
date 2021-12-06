/* 
    Buquedas.
    ruta: api/todo/
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');


const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas'); 


const router = Router();

/* Obtener busquedas */
router.get( '/:busqueda', validarJWT, getTodo);

router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);



module.exports = router;