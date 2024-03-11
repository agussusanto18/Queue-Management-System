exports.generalErrorHandler = function (res, status, message) {
    if (status === 404) {
        // Handle 404 errors
        res.status(404).json({
            error: {
                message: message || 'Resource not found'
            }
        });
    } else if (status === 400) {
        // Handle 400 errors
        res.status(400).json({
            error: {
                message: message || 'Bad request'
            }
        });
    } else if (status === 401) {
        // Handle 401 errors
        res.status(401).json({
            error: {
                message: message || 'Unauthorized'
            }
        });
    } else {
        // Handle other errors
        res.status(status || 500).json({
            error: {
                message: message || 'Internal Server Error'
            }
        });
    }
};
