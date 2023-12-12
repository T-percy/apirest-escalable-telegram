const express = require('express');
//const response = require('../../network/response');

const router = express.Router();

router.post('/', async (req, res) => {
    res.send('Ruta post de chats ✅')
});

router.get('/', async (req, res) => {
    res.send('Ruta get de chats ✅')
});

router.patch('/', async (req, res) => {
    res.send('Ruta patch de chats ✅')
});

router.delete('/', async (req, res) => {
    res.send('Ruta delete de chats ✅')
});

module.exports = router;