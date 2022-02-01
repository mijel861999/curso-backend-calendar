/*
    RUTAS DE USUARIOS / AUTH
    host + /api/auth
*/



const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Controllers
const { createUser, loginUser, renewUser } = require('../controllers/auth');

const router = Router();

//EL ARRAY ES UNA COLECCIÓN DE MIDDELWARES
router.post(
    '/new', 
    [
        check('name' , 'El nombre no es válido').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    createUser
);

router.post(
    '/', 
    [
        check('email', 'El email es inválido').isEmail(),
        check('password', 'La contraseña tiene que ser válida').isLength({ min: 6 }),
        validarCampos
    ], 
    loginUser
);

router.get('/renew',validarJWT ,renewUser);

module.exports = router;