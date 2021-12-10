const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        /* Verificar email */
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o contraseña invalido'
            });
        }

        /* Verificar contraseña */
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña invalido'
            });
        }

        /* Generar el TOKEN - JWT */
        const token = await generarJWT( usuarioDB.id );


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

const googleSignIn = async ( req, res = response ) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        /* Autenticación con google */
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            /* Si no existe el usuario */
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            /* Existe usuario */
            usuario = usuarioDB;
            usuario.google = true;
        }

        /* Guardar en DB*/
        await usuario.save();

        /* Generar el TOKEN - JWT */
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
        
    }

}

module.exports = {
    login,
    googleSignIn
}

