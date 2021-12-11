/*  
    Medicos.
    ruta: '/api/medicos'
 */

const { Router, response } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actulizarMedico,
    borrarMedico
} = require('../controllers/medicos')

const router = Router();

/* Obtener medico */
router.get( '/', getMedicos );

/* Crear medico */
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearMedico 
);

/* Actulizar medico */
router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ], 
    actulizarMedico 
);

/* Borrar medico */
router.delete('/:id',
    validarJWT,
    borrarMedico
);


module.exports = router;