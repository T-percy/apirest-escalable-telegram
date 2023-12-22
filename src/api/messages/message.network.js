const express = require('express');
const response = require('../../network/response');
const controller = require('./message.controller');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const dataMessage = await controller.create(req.body.chat, req.body.user, req.body.message);
        response.success(req, res, dataMessage, 201);
    } catch (error) {
        response.error(req, res, 'Información invalida', 400, error);
    }
});

router.get('/', async (req, res) => {
    res.send('Ruta get de messages ✅')
});

router.patch('/', async (req, res) => {
    res.send('Ruta patch de messages ✅')
});

router.delete('/', async (req, res) => {
    res.send('Ruta delete de messages ✅')
});

module.exports = router;