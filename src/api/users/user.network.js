const express = require('express');
//const response = require('../../network/response');

const router = express.Router();

router.post('/', async (req, res) => {
    res.send('Ruta post de users ✅')
});

router.get('/', async (req, res) => {
    res.send('Ruta get de users ✅')
});

router.patch('/', async (req, res) => {
    res.send('Ruta patch de users ✅')
});

router.delete('/', async (req, res) => {
    res.send('Ruta delete de users ✅')
});

module.exports = router;