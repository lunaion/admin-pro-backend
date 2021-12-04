const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        /* Verificar email */
        const usuarioBD = await Usuario.findOne({ email });

        if ( !usuarioBD ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o contraseña invalido'
            });
        }

        /* Verificar contraseña */
        const validPassword = bcrypt.compareSync( password, usuarioBD.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña invalido'
            });
        }

        /* Generar el TOKEN - JWT */
        const token = await generarJWT( usuarioBD.id );


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador'
        })
    }

}

module.exports = {
    login
}

