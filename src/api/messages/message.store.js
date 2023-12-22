const Model = require('./message.model');

const addMessage = async (message) => {
    const data = await new Model(message);
    try {
        const savedData = await data.save();
        
        return savedData;
    } catch (error) {
        return error;
    }
}

module.exports = {
    add: addMessage,
}