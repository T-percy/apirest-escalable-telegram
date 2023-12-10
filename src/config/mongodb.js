const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB_URI); 
        console.log('[mongodb]: ¡Conexión ✅!');
        
    } catch (error) {
        console.log('[mongodb]: ¡Conexión ❌!', error.message);
    }
}

module.exports = dbConnect;