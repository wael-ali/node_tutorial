
const errorHandler = (err, next) => {
    console.log(err.message);

    const error = new Error(err);
    error.httpStatusCode = 500;
    next(error);
};

module.exports = errorHandler;