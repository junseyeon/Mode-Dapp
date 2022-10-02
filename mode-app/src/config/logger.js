const {createLogger, transports, format} = require("winston");

const {combine, json, colorize, timestamp, printf, simple, label} = format;

const pirntLogFormat = {
    file: combine(
        label({
            label : "어느페이지인지알려줌"
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd",
        }),
        printf(({timestamp, label, level, message}) => {
            return `${timestamp} [${label}] ${level} ${message}`;
        }),
    ),

    console : combine(
        colorize(),
        simple(),
    ),
};

const opts = {
    file : new transports.File({
        level: 'info',
        filename: '221001.log',
        dirname: './logs',
        format: pirntLogFormat.file,
    }),

    console : new transports.Console({
        level : "info",
        format: pirntLogFormat.console,
    }),
}

const logger = createLogger({
    transports: [
        opts.file
    ],
});

if(process.env.NODE_ENV !== 'production'){
    logger.add(opts.console)
}

module.exports = logger;