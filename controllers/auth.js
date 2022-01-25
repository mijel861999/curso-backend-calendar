const { response } = require('express');
const Usuario = require('../models/Usuario');


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
        await usuario.save();



        res.status(201).json({
            ok: true,
            msg: 'Register',
            uid: usuario.id,
            name: usuario.name 
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


const loginUser = (req, res = response )=> {

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

    res.json({
        ok: true,
        msg: 'Login',
        email,
        password
    });
}


const renewUser = (req, res = response )=> {
    res.json({
        ok: true,
        msg: 'Renew'
    });
}

module.exports = {
    createUser,
    loginUser,
    renewUser
}