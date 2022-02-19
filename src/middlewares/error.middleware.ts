import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validation';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import config from '../config';
import Logger, { LOG_LABELS } from '../utilities/logger';

export default function (error: Error, req: Request, res: Response, next: NextFunction): Response {
    if (error instanceof ValidationError) {
        Logger.error(LOG_LABELS.DATA_VALIDATION, `Validation error in: ${req.originalUrl} `, error)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: error.message,
            details: error.details,
        });
    }
    
    Logger.error(LOG_LABELS.UNHANDLED_INTERNAL_ERROR, 'Unhandled error: ', error);

    if (config.debugMode) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            details: error.stack,
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
}