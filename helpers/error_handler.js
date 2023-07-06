const errorHandler = (res, error) => {
    res.status(500).send(`Server Error: ${error.message}`);
};

module.exports = {
    errorHandler,
};
