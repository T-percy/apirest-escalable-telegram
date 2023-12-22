const store = require('./message.store');

const createMessage = async (chat, user, message) => {

    if (!chat || !user || !message) {
        throw new Error('{message.controller} = faltó chat o user o mensaje.');
    }

    const dataMessage = {
        chat: chat,
        user: user,
        message: message,
        date: new Date(),
    };

    try {
        const createdMsg = await store.add(dataMessage);
        return createdMsg;
    } catch (error) {
        return error;
    }
}

module.exports = {
    create: createMessage,
};