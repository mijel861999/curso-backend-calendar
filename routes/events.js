/*
    RUTAS DE EVENTOS / Events
    host + /api/events
*/

const { Router } = require('express');

// Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');

// Controllers
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

// AL PONER EL MIDDELWARE AQUI, HARÁ QUE CUALQUIER PETICIÓN TENGA QUE PASAR POR VALIDAR JWT
router.use( validarJWT );


router.get('/', getEventos);
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);


module.exports=router;