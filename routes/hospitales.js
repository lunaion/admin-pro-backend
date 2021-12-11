/*  
    Hospitales.
    ruta: '/api/hospitales'
 */

const { Router, response } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actulizarHospital,
    borrarHospital
} = require('../controllers/hospitales')

const router = Router();

/* Obtener hospital */
router.get( '/', getHospitales );

/* Crear hospital */
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    crearHospital 
);

/* Actulizar hospital */
router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    actulizarHospital 
);

/* Borrar hospital */
router.delete('/:id',
    validarJWT,
    borrarHospital
);


module.exports = router;