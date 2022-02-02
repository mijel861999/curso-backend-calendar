const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async(req, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');


    res.status(200).json({
        ok: true,
        eventos
    });
}

const crearEvento = async (req, res = response) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
         
        const eventoGuardado = evento.save()

        res.json({
            ok: true,
            evento: evento
        })

    }catch(e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = (req, res=response) => {
    res.status(200).json({
        ok: true,
        msg: 'Actualizar Eventos'
    });
}

const eliminarEvento = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'Eliminar Evento'
    })
}


module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}