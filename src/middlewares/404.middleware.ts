import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default function(req: Request, res: Response): Response {
    return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND
    });
}