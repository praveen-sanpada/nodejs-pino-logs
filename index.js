const logger = require('./logger');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    logger.info('Application started successfully.');
    logger.warn('This is a warning message.');
    logger.error('An error occurred in the application.');
    res.status(200).send({ status: 'ok', message: "route" });
});

app.get('/test', (req, res, next) => {
    try {
        let myobject = {};
        myobject.name = "praveen";
        myobject.class_name = "10";
        myobject.subject = "Hindi";
        logger.info({ myobject }, "Logging object");
        res.status(200).send({ status: 'ok', message: "test" });
    } catch (err) {
        logger.logError(err);
        res.status(500).send({
            status: 'error',
            message: 'An internal server error occurred.',
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
