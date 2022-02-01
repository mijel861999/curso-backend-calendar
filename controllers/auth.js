//Librerías
const { response } = require('express');
const bcrypt = require('bcryptjs')

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const createUser = async (req, res = response )=> { 

    const { name,email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });
        console.log(usuario)

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con este correo'
            })
        }

        usuario = new Usuario( req.body );

        //Ecriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);


        await usuario.save();
        //GENERAR JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            msg: 'Register',
            uid: usuario.id,
            name: usuario.name ,
            token
        })

    }catch( e ) {
        console.log( e );
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

    /*

    MANEJO DE ERRORES

    if( name.length < 5) {
        // Se pone return si se tiene más de un response, también se podría 
        // poner return en todos los res
        return res.status(404).json({
            ok: false,
            msg: 'El nombre debe tener al menos 5 caracteres'
        })
    }
    */
   //SE RECIBEN LOS ERRORES DESDE EL MIDDLEWARE, ES UN ARRAY DE OBJETOS CON LOS ERRORES 
    
}


const loginUser = async (req, res = response )=> {

    /*
    const { body } = req;
    const { email, password } = body;

    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status(404).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    */

    const { body } = req;
    const { email, password } = body;

    try {
        const usuario = await Usuario.findOne({ email })
        
        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email' 
            })
        }

        const validPassword = bcrypt.compareSync( password, usuario.password )

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //ahora se genera un JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        

    }catch( e ) {
        console.log( e );
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}


const renewUser = async (req, res = response )=> {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        msg: 'Renew',
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    renewUser
}