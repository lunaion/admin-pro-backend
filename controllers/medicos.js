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
        });
    }
}

const actulizarMedico = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {

            return res.status(404).json({
                ok: true,
                msg: 'Médico no encontrado con el id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActulizado = await Medico.findByIdAndUpdate( id, cambiosMedico,  { new: true } );

        res.json({
            ok: true,
            medico: medicoActulizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador'
        });
    }

}

const borrarMedico = async (req, res = response) => {

    const id = req.params.id;
    
    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {

            return res.status(404).json({
                ok: true,
                msg: 'Médico no encontrado con el id'
            });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Médico eliminado'
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
    getMedicos,
    crearMedico,
    actulizarMedico,
    borrarMedico
}