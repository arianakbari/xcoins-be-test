import * as winston from "winston";
import { format } from "logform";

export enum LOG_LABELS {
    START_APP = "START_APP",
    DB_CONNECTION = "DB_CONNECTION",
    DATA_SEED = "DATA_SEED",
    UNHANDLED_INTERNAL_ERROR = "UNHANDLED_INTERNAL_ERROR",
    DATA_VALIDATION = "DATA_VALIDATION",
}

const customFormatter = format.printf(
    ({ level, message, timestamp }) => `${timestamp} ${level} ${message}`
);

const options = {
    transports: [
        new winston.transports.Console({
            format: format.combine(format.timestamp(), customFormatter),
        }),
        new winston.transports.File({
            filename: "logs/app.log",
            format: format.combine(format.timestamp(), customFormatter),
        }),
    ],
};

const logger = winston.createLogger(options);

export default class Logger {
    static error(
        label: string,
        info: Record<string, unknown> | string,
        error: Error
    ): void {
        logger.log("error", `[${label}]`, {
            info,
            error,
        });
    }

    static debug(
        label: string,
        message: Record<string, unknown> | string,
        meta?: Record<string, unknown>
    ): void {
        logger.log("debug", `[${label.toUpperCase()}]: ${message}`, {
            message: JSON.stringify(meta),
        });
    }

    static info(
        label: string,
        message: Record<string, unknown> | string,
        meta?: Record<string, unknown>
    ): void {
        logger.log("info", `[${label.toUpperCase()}]: ${message}`, {
            message: JSON.stringify(meta),
        });
    }
}
