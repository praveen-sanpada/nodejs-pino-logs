const pino = require('pino');
const path = require('path');
const fs = require('fs');

class Logger {
    constructor() {
        this.logDir = path.join(__dirname, 'logs');
        this.ensureLogDirectoryExists();
        this.logger = this.createLogger();
    }

    ensureLogDirectoryExists() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    getLogFilePath() {
        const date = new Date().toISOString().slice(0, 10);
        return path.join(this.logDir, `${date}.log`);
    }

    createLogger() {
        const logFilePath = this.getLogFilePath();
        return pino(
            {
                level: 'info',
                timestamp: pino.stdTimeFunctions.isoTime,
            },
            pino.destination(logFilePath)
        );
    }

    info(message) {
        this.logger.info(message);
    }

    warn(message) {
        this.logger.warn(message);
    }

    error(message) {
        this.logger.error(message);
    }

    logError(err) {
        this.logger.error({
            name: err.name,
            message: err.message,
            stack: err.stack,
        }, `An error occurred: ${err.message}`);
    }
}

module.exports = new Logger();
