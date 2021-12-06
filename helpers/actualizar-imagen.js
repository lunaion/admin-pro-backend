const fs = require('fs');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');

const borrarImagen = ( path ) => {

    /* Borrar imagen si existe para actulizar a la más reciente */
    if ( fs.existsSync( path ) ) {
        /* Borrar la imagen anterior */
        fs.unlinkSync( path );
    }
}


const actualizarImgen = async ( tipo, id, nombreArchivo ) => {

    let pathViejo = '';

    switch ( tipo ) {
        case 'hospitales':
            /* Se busca medico por id */
            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                console.log('No se encontro hospital por id');
                return false;
            }

            /* Borrar imagen si existe para actulizar a la más reciente */
            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;

        case 'medicos':
            /* Se busca medico por id */
            const medico = await Medico.findById(id);
            if ( !medico ) {
                console.log('No se encontro médico por id');
                return false;
            }

            /* Borrar imagen si existe para actulizar a la más reciente */
            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;

        case 'usuarios':
            /* Se busca medico por id */
            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No se encontro usuario por id');
                return false;
            }

            /* Borrar imagen si existe para actulizar a la más reciente */
            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            
            break;
    
        default:
            break;
    }

}


module.exports = {
    actualizarImgen
}

