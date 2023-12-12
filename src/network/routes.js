const chat = require('../api/chats/chat.network');
const user = require('../api/users/user.network');
const message = require('../api/messages/message.network');


const routes = (server) => {
    server.use('/chats', chat);
    server.use('/users', user);
    server.use('/messages', message);
}

module.exports = routes;