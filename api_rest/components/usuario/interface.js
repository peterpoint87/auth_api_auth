const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const jwt = require('jsonwebtoken');

const routes = express.Router();

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

    if (!token) return res.status(403).send({ auth: false, message: 'Sin Token' });

    jwt.verify(token, 'tu_clave_secreta', (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido.');
        }
        if (err) return res.status(500).send({ auth: false, message: 'Fallo autntificación con Token.' });
        if (req.userRole !== role) {
            return res.status(403).send({ message: 'Acceso Denegado: Sin permisos' });
        }
        req.usuario = decoded; // Puedes usar la info del token en el request
        next();
    });
}

// Rutas protegidas por el middleware
routes.post('/', function(req, res) {
    controller.insertar_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

routes.get('/', function(req, res) {
    controller.obtener_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

routes.put('/', function(req, res) {
    controller.actualizar_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

routes.delete('/', function(req, res) {
    controller.eliminar_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

// Login no necesita autenticación
routes.post('/login',function(req, res) {
    controller.loguear_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

router.post('/materia', [verificarToken], (req, res) => {
    // Código para insertar materia
    res.send('Materia insertada');
});

router.put('/materia/:id', [verificarToken], (req, res) => {
    // Código para modificar materia
    res.send('Materia modificada');
});

router.delete('/materia/:id', [verificarToken], (req, res) => {
    // Código para eliminar materia
    res.send('Materia eliminada');
});

router.get('/materia', verificarToken, (req, res) => {
    // Código para obtener materias (acceso para todos los roles)
    res.send('Materias obtenidas');
});

module.exports = routes;
