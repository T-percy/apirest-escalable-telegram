const error = (req, res, msgError, status, details) => {
    console.error(`[responseError]🚫: ${details}`);
    res.status(status || 403).send({
        error: msgError,
        body: '',
    });
}

module.exports = error;
