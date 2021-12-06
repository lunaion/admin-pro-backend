const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}

/* Crear medico */
const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        
        const medicoDB = await medico.save();
        
        res.json({
            ok: true,
            medico: medicoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador'
        })
    }
}

const actulizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actulizarMedico'
    });
}

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    });
}


module.exports = {
    getMedicos,
    crearMedico,
    actulizarMedico,
    borrarMedico
}