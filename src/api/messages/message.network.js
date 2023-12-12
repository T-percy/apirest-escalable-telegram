const express = require('express');
//const response = require('../../network/response');

const router = express.Router();

router.post('/', async (req, res) => {
    res.send('Ruta post de messages ✅')
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