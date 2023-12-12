const success = (req, res, msg, status) => {
    res.status(status || 200).send({
        error: '',
        body: msg,
    });
}

module.exports = success;