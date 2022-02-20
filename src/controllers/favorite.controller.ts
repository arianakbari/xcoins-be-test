import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Favorite, IFavorite } from "../models";

export default {
    async getFavorites(
        req: Request<
            null,
            { success: boolean; data: IFavorite[] },
            null,
            { pageNumber: number; pageSize: number }
        >,
        res: Response
    ): Promise<Response> {
        const { pageNumber = 1, pageSize = 10 } = req.query;
        const data = await Favorite.find()
            .skip(Number(pageSize) * (Number(pageNumber) - 1))
            .limit(Number(pageSize))
            .select("-__v")
            .lean();

        return res.status(StatusCodes.OK).json({
            success: true,
            data,
        });
    },
    async getFavorite(
        req: Request<
            { id: string },
            { success: boolean; data?: IFavorite; message?: ReasonPhrases },
            null,
            null
        >,
        res: Response
    ): Promise<Response> {
        const { id } = req.params;
        const data = await Favorite.findById(id).lean().select("-__v");
        if (!data) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: ReasonPhrases.NOT_FOUND,
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            data,
        });
    },
};
