const Response = {
    sendMessage: (res, status, message, data) => {
        res.status(status).json({
            isSuccessful: true,
            message: message,
            data: data
        })
    },
    sendError: (res, status, message, errors) => {
        res.status(status).json({
            isSuccessful: false,
            message: message,
            errors: errors
        })
    }
}

module.exports = Response