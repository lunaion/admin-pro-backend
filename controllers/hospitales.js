const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
}

/* Crear hospital */
const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hopsitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hopsitalDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador'
        });
    }
}

const actulizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actulizarHospital'
    });
}

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
}


module.exports = {
    getHospitales,
    crearHospital,
    actulizarHospital,
    borrarHospital
}