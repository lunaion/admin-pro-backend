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

const actulizarHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {

            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado con el id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador'
        })
    }


}

const borrarHospital = async (req, res = response) => {
    const id = req.params.id;
    
    try {
        
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {

            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado con el id'
            });
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador'
        });
    }
}


module.exports = {
    getHospitales,
    crearHospital,
    actulizarHospital,
    borrarHospital
}