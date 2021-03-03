const {createLogger, transports, format} = require('winston');

const customFormatter = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp(),
		customFormatter,
	),
	transports: [
		new transports.Console({level: 'verbose'})
	]
});

module.exports = logger