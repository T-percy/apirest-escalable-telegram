require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./network/routes')
const dbConnect = require('./config/mongodb');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));

router(app);
dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🔥🔥🔥 http://localhost:${PORT}`);
});