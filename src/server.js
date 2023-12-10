require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dbConnect = require('./config/mongodb');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Comunicandome con metodo get desde el server.js')
})

dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🔥🔥🔥 http://localhost:${PORT}`);
});